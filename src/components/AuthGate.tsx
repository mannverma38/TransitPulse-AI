import React, { useState } from 'react';
import { User, Bus, GraduationCap, LogIn } from 'lucide-react';

export type UserRole = 'passenger' | 'driver' | 'student';
export interface AppUser { name: string; role: UserRole; }

export const AuthGate: React.FC<{ onLogin: (user: AppUser) => void }> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('passenger');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Please enter your name'); return; }
    onLogin({ name: name.trim(), role });
  };

  return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-5">
    <form onSubmit={submit} className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-7 shadow-xl">
      <div className="text-center mb-7"><div className="text-cyan-400 text-4xl mb-2">🚌</div><h1 className="text-3xl font-bold">TransitPulse</h1><p className="text-slate-400 mt-2">Simple bus tracking for everyone</p></div>
      <label className="block text-sm mb-2">Your name</label>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className="w-full rounded-lg bg-slate-800 border border-slate-600 p-3 mb-5 outline-none" />
      <label className="block text-sm mb-2">Continue as</label>
      <div className="grid grid-cols-3 gap-2 mb-5">
        {([['passenger','Passenger',User],['driver','Driver',Bus],['student','Student',GraduationCap]] as const).map(([value,label,Icon]) => <button type="button" key={value} onClick={() => setRole(value)} className={`p-3 rounded-lg border text-xs ${role===value?'border-cyan-400 bg-cyan-400/10 text-cyan-300':'border-slate-700 text-slate-300'}`}><Icon className="mx-auto mb-1" size={20}/>{label}</button>)}
      </div>
      {error && <p className="text-rose-400 text-sm mb-3">{error}</p>}
      <button className="w-full bg-cyan-600 hover:bg-cyan-500 rounded-lg p-3 font-semibold flex items-center justify-center gap-2"><LogIn size={18}/> Enter TransitPulse</button>
      <p className="text-xs text-slate-500 mt-4 text-center">Demo login: no password required. Add secure authentication before production.</p>
    </form>
  </div>;
};
