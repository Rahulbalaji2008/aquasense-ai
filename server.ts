import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily or safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Prediction Endpoint
app.post("/api/predict", async (req, res) => {
  try {
    const {
      rainfall = 35,
      waterUsage = 1450,
      previousLevel = 70,
      region = "Central Valley Aquifer",
      soilType = "Sandy Loam",
      daysForecast = 7
    } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // Graceful fallback with domain mathematical estimation if no key present
      const netGain = (rainfall * 0.45) - (waterUsage / 200);
      const predictedLevel = Math.min(100, Math.max(10, Math.round((previousLevel + netGain) * 10) / 10));
      let risk: "Low" | "Medium" | "High" | "Critical" = "Low";
      if (predictedLevel < 30) risk = "Critical";
      else if (predictedLevel < 50) risk = "High";
      else if (predictedLevel < 68) risk = "Medium";

      const futureTrend = Array.from({ length: daysForecast }, (_, i) => {
        const day = i + 1;
        const level = Math.min(100, Math.max(10, Math.round((predictedLevel + Math.sin(day * 0.8) * 1.5 - (day * 0.2)) * 10) / 10));
        return { day: `Day ${day}`, level, rainfall: Math.max(0, Math.round((rainfall + Math.cos(day) * 5) * 10) / 10) };
      });

      return res.json({
        predictedLevel,
        risk,
        confidenceScore: 94,
        rechargeRate: "+1.8 mm/hr",
        depletionForecast: `${(waterUsage / 1000).toFixed(1)} m³/day`,
        recommendation: "Maintain balanced extraction. Optimum recharge expected following current precipitation trends.",
        analysisSummary: `Based on ${rainfall}mm recent rainfall and ${waterUsage}L/day extraction rate in ${region} (${soilType}), groundwater levels are estimated to remain stable with a ${risk} risk profile.`,
        futureTrend,
        isAiGenerated: false
      });
    }

    const prompt = `Analyze groundwater hydrogeology for region "${region}" with soil type "${soilType}".
Current metrics:
- Recent Rainfall: ${rainfall} mm
- Daily Water Extraction: ${waterUsage} L/day
- Current/Previous Groundwater Level: ${previousLevel}%

Predict the updated groundwater level (%), risk status ("Low", "Medium", "High", or "Critical"), confidence score (%), recharge rate (e.g. "+2.1 mm/hr"), depletion rate, hydrogeological analysis summary, actionable water conservation recommendations, and daily 7-day trend forecasts.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predictedLevel: { type: Type.NUMBER, description: "Predicted groundwater percentage (0-100)" },
            risk: { type: Type.STRING, description: "Risk level: Low, Medium, High, or Critical" },
            confidenceScore: { type: Type.NUMBER, description: "Confidence score percentage (80-99)" },
            rechargeRate: { type: Type.STRING, description: "Aquifer recharge rate description" },
            depletionForecast: { type: Type.STRING, description: "Estimated daily net depletion/gain rate" },
            recommendation: { type: Type.STRING, description: "Hydrological management advice" },
            analysisSummary: { type: Type.STRING, description: "Detailed AI groundwater analysis" },
            futureTrend: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING },
                  level: { type: Type.NUMBER },
                  rainfall: { type: Type.NUMBER }
                },
                required: ["day", "level", "rainfall"]
              }
            }
          },
          required: ["predictedLevel", "risk", "confidenceScore", "rechargeRate", "recommendation", "analysisSummary", "futureTrend"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({
      ...parsed,
      isAiGenerated: true
    });
  } catch (error) {
    console.error("Error in AI prediction:", error);
    res.status(500).json({ error: "Failed to generate AI groundwater prediction" });
  }
});

// AI Assistant Chatbot Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, context = {} } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: `AquaSense AI Assistant: Standard local response mode active. Analyzing prompt regarding "${message}". Based on current IoT telemetry (Groundwater at ${context.waterLevel || 72}%, Rainfall at ${context.rainfall || 34}mm), aquifers are operating in normal parameters. You can run predictive models in the AI Prediction tab for targeted regional simulations.`,
        isAiGenerated: false
      });
    }

    const systemInstruction = `You are AquaSense AI, an expert environmental hydrogeology and IoT groundwater monitoring virtual assistant.
Provide concise, authoritative, scientifically sound, and helpful responses regarding groundwater levels, rainfall analytics, sensor status, drought mitigation, irrigation optimization, and water conservation.
Keep responses direct, well-structured, with key bullet points or clear actionable steps where appropriate.
Context data available: Current Groundwater Level: ${context.waterLevel || '72'}%, Today's Rainfall: ${context.rainfall || '34'}mm, Water Usage: ${context.waterUsage || '1450'}L/day.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return res.json({
      reply: response.text || "No response generated.",
      isAiGenerated: true
    });
  } catch (error) {
    console.error("Error in AI chat:", error);
    res.status(500).json({ error: "AI Assistant unavailable" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AquaSense AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
