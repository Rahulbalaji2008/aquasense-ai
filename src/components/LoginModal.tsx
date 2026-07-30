import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      setLoggedIn(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050816]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {loggedIn ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#00FF9D]/20 border border-[#00FF9D]/40 text-[#00FF9D] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-white">Authenticated!</h3>
            <p className="text-xs font-mono text-cyan-300">Welcome to AquaSense AI Portal.</p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono text-[#00E5FF] uppercase">Secure Access</span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                {isRegister ? 'Register Portal Account' : 'Water Portal Login'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-300 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="user@aquasense.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050816] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-gray-300 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#050816] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] font-bold text-xs tracking-wider hover:shadow-lg transition-all cursor-pointer mt-2"
              >
                {isRegister ? 'CREATE ACCOUNT' : 'LOGIN TO DASHBOARD'}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-gray-400">
              {isRegister ? 'Already registered?' : "Don't have access?"}{' '}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-[#00E5FF] font-bold underline ml-1"
              >
                {isRegister ? 'Login here' : 'Request account'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
