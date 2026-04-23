import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  LifeBuoy, 
  Settings, 
  AlertCircle, 
  ArrowUpRight,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  CheckCircle2,
  Clock,
  ArrowRight,
  Briefcase,
  Share2,
  Mail,
  Calendar,
  Send,
  Zap,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { cn } from './lib/utils';
import { Agent, ApprovalItem, Partner, PartnershipCampaign } from './types';

const data = [
  { name: 'Mon', leads: 4, hiring: 2, shifts: 45 },
  { name: 'Tue', leads: 7, hiring: 5, shifts: 52 },
  { name: 'Wed', leads: 5, hiring: 3, shifts: 48 },
  { name: 'Thu', leads: 12, hiring: 8, shifts: 61 },
  { name: 'Fri', leads: 8, hiring: 4, shifts: 55 },
  { name: 'Sat', leads: 3, hiring: 1, shifts: 30 },
  { name: 'Sun', leads: 2, hiring: 0, shifts: 28 },
];

export default function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [campaigns, setCampaigns] = useState<PartnershipCampaign[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsRes, approvalsRes, partnershipsRes] = await Promise.all([
          fetch('/api/agents/status'),
          fetch('/api/ceo/approvals'),
          fetch('/api/partnerships')
        ]);
        const agentsData = await agentsRes.json();
        const approvalsData = await approvalsRes.json();
        const pData = await partnershipsRes.json();

        setAgents(agentsData);
        setApprovals(approvalsData);
        setPartners(pData.partners);
        setCampaigns(pData.campaigns);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#020617] border-r border-[#1e293b] flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              <BrainCircuit className="text-slate-950 w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight uppercase tracking-tighter">APSA</h1>
              <p className="text-[10px] text-sky-400 font-bold tracking-widest uppercase">Ops Control</p>
            </div>
          </div>

          <nav className="space-y-1">
            <NavButton 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
            />
            <NavButton 
              icon={<Target size={20} />} 
              label="Marketing" 
              active={activeTab === 'marketing'} 
              onClick={() => setActiveTab('marketing')} 
            />
            <NavButton 
              icon={<MessageSquare size={20} />} 
              label="Sales & Intake" 
              active={activeTab === 'sales'} 
              onClick={() => setActiveTab('sales')} 
            />
            <NavButton 
              icon={<Briefcase size={20} />} 
              label="Partnerships" 
              active={activeTab === 'partnerships'} 
              onClick={() => setActiveTab('partnerships')} 
            />
            <NavButton 
              icon={<Users size={20} />} 
              label="Recruiting & HR" 
              active={activeTab === 'hr'} 
              onClick={() => setActiveTab('hr')} 
            />
            <NavButton 
              icon={<LifeBuoy size={20} />} 
              label="Operations" 
              active={activeTab === 'ops'} 
              onClick={() => setActiveTab('ops')} 
            />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-[#1e293b] space-y-4">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-3">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Human CEO</p>
            <p className="font-bold text-sm text-sky-400">Fidelio Paul</p>
          </div>
          <NavButton icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-light text-slate-400 tracking-tight">
              AMAZING <span className="font-extrabold text-[#38bdf8]">PERSONALSERVICE</span> // <span className="text-slate-100 uppercase font-medium">{activeTab === 'dashboard' ? 'AGENTIC OPERATIONS CONTROL' : `${activeTab} STATUS`}</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex px-4 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-[10px] font-bold uppercase tracking-widest items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_#38bdf8] animate-pulse" />
              Global Sync Active
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-none lg:grid-rows-4 gap-4 h-full lg:h-[800px]">
            {/* Master Agent - Director of Ops */}
            <div className="lg:col-span-2 lg:row-span-2 bento-card bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] border-sky-900/50">
              <div className="flex justify-between items-start mb-6">
                <span className="card-label">Director of Operations (AI)</span>
                <span className="px-2 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-[9px] font-bold text-sky-400 uppercase">Master Agent</span>
              </div>
              <div className="mb-auto">
                <h3 className="card-title text-xl mb-4">Operations Engine Active</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="w-1 h-1 rounded-full bg-sky-400 shadow-[0_0_5px_#38bdf8]" />
                    Cross-agent workflow optimization: 99.4%
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="w-1 h-1 rounded-full bg-sky-400" />
                    Inter-departmental conflicts: 0 detected
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="w-1 h-1 rounded-full bg-sky-400" />
                    Agent throughput: 1,420 tasks/hr
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <div className="text-4xl font-extrabold text-sky-400">98.2%</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">System Health Score</div>
              </div>
            </div>

            {/* CEO Oversight */}
            <div className="lg:col-span-2 lg:row-span-2 bento-card border-dashed border-slate-700 bg-slate-900/50">
              <div className="flex justify-between items-start mb-6">
                <span className="card-label text-amber-500">Human CEO Oversight (YOU)</span>
                <span className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[9px] font-bold text-amber-400 uppercase">Close Loop Required</span>
              </div>
              <div className="space-y-3 mb-6 overflow-y-auto max-h-[140px]">
                {approvals.map(approval => (
                  <div key={approval.id} className={cn(
                    "p-3 rounded-xl border flex flex-col gap-1 transition-all hover:translate-x-1 cursor-pointer",
                    approval.priority === 'high' ? "bg-rose-500/10 border-rose-500/20" : "bg-slate-800/50 border-slate-800"
                  )}>
                    <div className="flex justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">{approval.type}</span>
                      {approval.priority === 'high' && <AlertCircle size={12} className="text-rose-500" />}
                    </div>
                    <p className="text-xs font-bold">{approval.title}</p>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex justify-between items-end">
                <div>
                  <div className="text-4xl font-extrabold text-white">{approvals.length}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase">Pending Actions</div>
                </div>
                <button className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                  Enter CEO Portal
                </button>
              </div>
            </div>

            {/* Stat: Business Development */}
            <div className="lg:col-span-1 bento-card">
              <span className="card-label">Business Dev</span>
              <h3 className="card-title mb-2">Partnerships</h3>
              <div className="text-2xl font-extrabold text-sky-400">14 <span className="text-xs text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded ml-1 font-bold">+2 today</span></div>
              <div className="mt-4 text-[11px] text-slate-500">AI Outreach Agent Active</div>
            </div>

            {/* Stat: Intake/Sales */}
            <div className="lg:col-span-1 bento-card">
              <span className="card-label">Intake / Sales</span>
              <h3 className="card-title mb-2">Active Enquiries</h3>
              <div className="text-2xl font-extrabold text-white">42</div>
              <div className="mt-4 text-[11px] text-slate-500">12 Conversions Pending</div>
            </div>

            {/* Stat: Scheduler (Wide) */}
            <div className="lg:col-span-2 bento-card">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="card-label">Scheduler Agent</span>
                  <h3 className="card-title">Shift Utilization</h3>
                </div>
                <div className="text-3xl font-extrabold text-sky-400">94%</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Hours Set</p>
                  <p className="text-sm font-bold">1,240 HR</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Open Shifts</p>
                  <p className="text-sm font-bold text-green-500">0</p>
                </div>
              </div>
            </div>

            {/* Bottom Row - More specific agents */}
            <div className="bento-card">
              <span className="card-label">HR Agent</span>
              <h3 className="card-title text-sm mb-1">Talent Pipeline</h3>
              <div className="text-xl font-extrabold">118</div>
              <p className="text-[10px] text-slate-500 mt-auto">Candidates Vetted</p>
            </div>
            
            <div className="bento-card">
              <span className="card-label">Compliance</span>
              <h3 className="card-title text-sm mb-1">License Audit</h3>
              <div className="text-xl font-extrabold text-green-500 underline decoration-green-500/30 decoration-2">100%</div>
              <p className="text-[10px] text-slate-500 mt-auto">Full Regulatory Compliance</p>
            </div>

            <div className="bento-card">
              <span className="card-label">Marketing</span>
              <h3 className="card-title text-sm mb-1">Content Flow</h3>
              <div className="text-xl font-extrabold">24</div>
              <p className="text-[10px] text-slate-400 mt-auto">AI Posts Active</p>
            </div>

            <div className="bento-card">
              <span className="card-label">Billing</span>
              <h3 className="card-title text-sm mb-1">Cycle Status</h3>
              <div className="text-xl font-extrabold text-sky-400">$142k</div>
              <p className="text-[10px] text-slate-500 mt-auto">Payroll Processed</p>
            </div>
          </div>
        )}

        {activeTab === 'partnerships' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Campaign Performance */}
              <div className="lg:col-span-8 bento-card border-sky-500/20">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="card-label">Strategic Outreach</span>
                    <h3 className="card-title text-xl">HNW Referral Pipeline</h3>
                  </div>
                  <button className="bg-sky-500 hover:bg-sky-400 text-slate-950 text-[10px] px-4 py-2 rounded-lg font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)] flex items-center gap-2">
                    <Send size={12} /> Start Campaign
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {campaigns.map((camp) => (
                    <div key={camp.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-sky-500/30 transition-all">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-sm text-slate-200">{camp.targetType}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                        <MetricBox label="Outreach" value={camp.delivered} />
                        <MetricBox label="Replies" value={camp.replied} color="text-amber-400" />
                        <MetricBox label="Set Rate" value={`${Math.round((camp.meetingsSet / camp.delivered) * 100)}%`} color="text-sky-400" />
                        <MetricBox label="Meetings" value={camp.meetingsSet} color="text-emerald-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CEO Meeting Calendar / Close Queue */}
              <div className="lg:col-span-4 bento-card border-amber-500/10">
                <div className="flex justify-between items-start mb-6">
                  <span className="card-label text-amber-500">Closing Queue</span>
                  <Calendar className="text-amber-500" size={18} />
                </div>
                <div className="space-y-3">
                  {partners.filter(p => p.status === 'meeting_scheduled' || p.status === 'responded').map(p => (
                    <div key={p.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden group hover:border-sky-500/50 transition-all">
                      <p className="text-[9px] font-extrabold text-sky-400 uppercase tracking-tighter mb-1">{p.type}</p>
                      <h4 className="font-bold text-sm mb-1">{p.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                        <Users size={12} /> {p.contactPerson}
                      </div>
                      <button className="w-full bg-sky-500/10 hover:bg-sky-500 hover:text-slate-950 text-sky-400 text-xs py-2 rounded-lg font-bold transition-all border border-sky-500/20">
                        Join Briefing
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partner Network Table */}
              <div className="lg:col-span-12 bento-card p-0 overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
                  <h3 className="card-title">Network Explorer</h3>
                  <div className="flex gap-2">
                    {['Wealth Advisor', 'Attorney', 'Physician', 'Family Office', 'Care Manager'].map(t => (
                      <button key={t} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[9px] text-slate-400 font-bold uppercase tracking-widest hover:text-sky-400 transition-colors">
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-800 bg-slate-900/50">
                        <th className="px-6 py-4">Entity</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Value</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {partners.map((p) => (
                        <tr key={p.id} className="hover:bg-sky-500/5 transition-colors group">
                          <td className="px-6 py-4">
                            <p className="font-bold text-sm text-slate-200">{p.name}</p>
                            <p className="text-xs text-slate-500">{p.contactPerson}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs text-slate-400 flex items-center gap-2">
                              <Building2 size={12} className="text-slate-500" /> {p.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={p.status} />
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-tighter",
                              p.potentialValue === 'Ultra High' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            )}>
                              {p.potentialValue}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 text-slate-500 hover:text-sky-400 transition-colors">
                              <ArrowRight size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'dashboard' && activeTab !== 'partnerships' && (
          <div className="max-w-4xl mx-auto py-10 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl mx-auto flex items-center justify-center">
              <BrainCircuit className="text-indigo-500 w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold">In-Depth {activeTab} Intelligence</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              This specialized module exposes the full decision tree of the {activeTab} agent, 
              including direct API logs from GHL, AxisCare, and automated reasoning steps.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-10">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-left">
                <p className="text-xs text-slate-500 mb-1">Queue Status</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span className="font-bold">Optimal</span>
                </div>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-left">
                <p className="text-xs text-slate-500 mb-1">Last Sync</p>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-indigo-400" />
                  <span className="font-bold">42s ago</span>
                </div>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-left">
                <p className="text-xs text-slate-500 mb-1">Data Throughput</p>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-amber-400" />
                  <span className="font-bold">12.4 GB/hr</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function NavButton({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
        active 
          ? "bg-sky-400/10 text-sky-400 border border-sky-400/20 shadow-[inset_0_0_10px_rgba(56,189,248,0.1)]" 
          : "text-slate-500 hover:text-slate-200 hover:bg-slate-800/30"
      )}
    >
      {icon}
      {label}
      {active && <motion.div layoutId="nav-indicator" className="ml-auto w-1 h-4 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />}
    </button>
  );
}

function StatCard({ title, value, change, icon, isUrgent = false }: { title: string, value: string, change: string, icon: React.ReactNode, isUrgent?: boolean }) {
  return (
    <div className={cn(
      "bg-slate-900 p-6 rounded-2xl border transition-all",
      isUrgent ? "border-rose-500/50 ring-1 ring-rose-500/20" : "border-slate-800"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-800 rounded-lg">
          {icon}
        </div>
        <div className={cn("text-xs font-bold px-2 py-1 rounded-full", change.startsWith('+') ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10")}>
          {change}
        </div>
      </div>
      <h4 className="text-slate-400 text-sm font-medium mb-1">{title}</h4>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  const statusColors = {
    active: 'text-emerald-400 bg-emerald-400/20',
    idle: 'text-slate-400 bg-slate-400/20',
    processing: 'text-indigo-400 bg-indigo-400/20',
    error: 'text-rose-400 bg-rose-400/20'
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold">{agent.name}</h4>
        <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold uppercase", statusColors[agent.status])}>
          {agent.status}
        </span>
      </div>

      <div className="space-y-4">
        {agent.id === 'marketing' && (
          <>
            <AgentMetric label="Campaigns" value={agent.activeCampaigns || 0} />
            <AgentMetric label="Efficiency" value={`${agent.efficiency}%`} />
          </>
        )}
        {agent.id === 'sales' && (
          <>
            <AgentMetric label="Leads" value={agent.leadsContacted || 0} />
            <AgentMetric label="Conversion" value={`${agent.conversionRate}%`} />
          </>
        )}
        {agent.id === 'hr' && (
          <>
            <AgentMetric label="Applicants" value={agent.applicantsScreened || 0} />
            <AgentMetric label="Hiring Speed" value={agent.timeToHire || 'N/A'} />
          </>
        )}
        {agent.id === 'ops' && (
          <>
            <AgentMetric label="Shifts" value={agent.shiftsScheduled || 0} />
            <AgentMetric label="Billing" value={agent.billingStatus || 'N/A'} />
          </>
        )}
      </div>

      <button className="w-full mt-6 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-800 group-hover:bg-indigo-600 text-xs font-semibold transition-all">
        Enter Module <ArrowRight size={14} />
      </button>
    </div>
  );
}

function AgentMetric({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-mono text-slate-200">{value}</span>
    </div>
  );
}

function MetricBox({ label, value, color = "text-slate-200" }: { label: string, value: string | number, color?: string }) {
  return (
    <div className="text-center">
      <p className="text-[10px] text-slate-500 font-bold uppercase mb-1 tracking-tight">{label}</p>
      <p className={cn("text-xl font-bold font-mono", color)}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Partner['status'] }) {
  const configs = {
    cold: { label: 'Cold Target', color: 'bg-slate-800 text-slate-400 border-slate-700' },
    outreach_sent: { label: 'Outreach Sent', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    responded: { label: 'Responded', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    meeting_scheduled: { label: 'Meeting Set', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    partnered: { label: 'Partner Active', color: 'bg-indigo-600 text-white border-indigo-700 shadow-[0_0_10px_rgba(79,70,229,0.3)]' },
  };

  const config = configs[status];
  return (
    <span className={cn("px-2 py-1 rounded-md text-[9px] font-bold uppercase border", config.color)}>
      {config.label}
    </span>
  );
}
