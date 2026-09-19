import React from 'react';
import { useTransit, NavigationTab } from '../context/TransitContext';
import { Home, Navigation as NavIcon, Smartphone, MonitorCheck, AlertTriangle } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, alerts } = useTransit();
  const role = (() => { try { return JSON.parse(localStorage.getItem('transitpulse-user') || '{}').role || 'passenger'; } catch { return 'passenger'; } })();
  const common = [{id:'dashboard',label:'Home',icon:Home},{id:'live_tracking',label:'Find a Bus',icon:NavIcon},{id:'alerts',label:'Alerts',icon:AlertTriangle}];
  const roleItems = role === 'driver' ? [{id:'driver_mode',label:'Driver Mode',icon:MonitorCheck}] : role === 'student' ? [{id:'my_bus',label:'My Bus',icon:Smartphone}] : [{id:'my_bus',label:'My Bus',icon:Smartphone}];
  const items = [...common, ...roleItems] as {id: NavigationTab; label:string; icon:React.ElementType}[];
  return <nav className="w-full bg-slate-900 border-b border-slate-800 sticky top-[61px] z-30"><div className="max-w-7xl mx-auto px-4 lg:px-8"><div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">{items.map(item => {const Icon=item.icon; const active=activeTab===item.id; return <button key={item.id} onClick={()=>setActiveTab(item.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap ${active?'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40':'text-slate-300 hover:bg-slate-800'}`}><Icon size={17}/>{item.label}{item.id==='alerts'&&alerts.length>0?<span className="text-xs">({alerts.length})</span>:null}</button>})}</div></div></nav>;
};
