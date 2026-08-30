'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Trash2, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Send,
  Search,
  Copy,
  Check,
  Sparkles,
  Inbox,
  UserCheck,
  FileCheck
} from 'lucide-react';
import { InquiryType } from '@/lib/seedData';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/inquiries', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) {
        setInquiries(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: InquiryType['status']) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries(inquiries.map((inq) => (inq.id === id || inq._id === id ? { ...inq, status: newStatus } : inq)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this client inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq.id !== id && inq._id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Metrics
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === 'new').length;
  const contactedCount = inquiries.filter((i) => i.status === 'contacted').length;
  const proposalCount = inquiries.filter((i) => i.status === 'proposal_sent').length;

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = filterStatus === 'all' || inq.status === filterStatus;
    const matchesSearch = 
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(search.toLowerCase())) ||
      inq.projectType.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-blue-600/20 text-cyan-400 border border-cyan-500/30 mb-2">
            <MessageSquare className="w-3 h-3" />
            <span>Lead & Briefing Inflow</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Client Inquiries & Briefings
          </h1>
          <p className="text-sm text-slate-400">
            Incoming production leads, scope requests, and calculated budget estimates submitted from the contact form.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          Refresh Inquiries
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-white">{totalCount}</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">Total Inquiries</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-emerald-300">{newCount}</p>
            <p className="text-[11px] text-emerald-400/80 uppercase tracking-wider font-semibold">New Leads</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-white">{contactedCount}</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">In Discussion</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-white">{proposalCount}</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">Proposal Sent</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by client, email, scope..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] overflow-x-auto w-full sm:w-auto">
          {[
            { key: 'all', label: 'All Inquiries' },
            { key: 'new', label: 'New Leads' },
            { key: 'contacted', label: 'Contacted' },
            { key: 'proposal_sent', label: 'Proposal Sent' },
            { key: 'archived', label: 'Archived' },
          ].map((st) => (
            <button
              key={st.key}
              onClick={() => setFilterStatus(st.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterStatus === st.key
                  ? 'bg-blue-600/40 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full inline-block animate-spin mb-3" />
          <p>Loading inquiries...</p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="text-center py-16 rounded-3xl glass-panel border border-white/[0.08] text-slate-400 space-y-3">
          <MessageSquare className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm font-semibold text-slate-300">No client inquiries found.</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When potential clients submit the Interactive Production Estimator on the live site, their briefs appear here instantly.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => {
            const inqId = inq.id || inq._id || '';
            const createdDate = inq.createdAt ? new Date(inq.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : 'Recent';

            return (
              <div
                key={inqId}
                className={`p-6 sm:p-7 rounded-3xl glass-panel border transition-all space-y-4 ${
                  inq.status === 'new'
                    ? 'border-emerald-500/40 bg-emerald-950/[0.08] shadow-[0_0_20px_rgba(16,185,129,0.08)]'
                    : 'border-white/[0.08] hover:border-cyan-500/30'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {inq.name}
                      {inq.status === 'new' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </h3>
                    {inq.company && (
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-slate-300 flex items-center gap-1">
                        <Building className="w-3 h-3 text-cyan-400" />
                        <span>{inq.company}</span>
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{createdDate}</span>
                    </span>
                  </div>

                  {/* Status Dropdown & Actions */}
                  <div className="flex items-center gap-3">
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inqId, e.target.value as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border focus:outline-none transition-colors ${
                        inq.status === 'new'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : inq.status === 'contacted'
                          ? 'bg-blue-500/20 text-cyan-300 border-cyan-500/40'
                          : inq.status === 'proposal_sent'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      <option value="new">● New Lead</option>
                      <option value="contacted">● In Discussion</option>
                      <option value="proposal_sent">● Proposal Sent</option>
                      <option value="archived">● Archived</option>
                    </select>

                    <button
                      onClick={() => handleDelete(inqId)}
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Contact Meta Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex items-center gap-2 text-slate-300 truncate">
                      <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <a href={`mailto:${inq.email}`} className="hover:text-cyan-300 underline truncate">
                        {inq.email}
                      </a>
                    </div>
                    <button
                      onClick={() => copyToClipboard(inq.email, `email-${inqId}`)}
                      className="text-slate-500 hover:text-white p-1 ml-1"
                      title="Copy Email"
                    >
                      {copiedId === `email-${inqId}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {inq.phone ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{inq.phone}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(inq.phone, `phone-${inqId}`)}
                        className="text-slate-500 hover:text-white p-1 ml-1"
                        title="Copy Phone"
                      >
                        {copiedId === `phone-${inqId}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-500 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <Phone className="w-3.5 h-3.5 opacity-40" />
                      <span>No phone provided</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-slate-300 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-mono font-bold text-emerald-300">{inq.budgetRange}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-300 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{inq.timeline}</span>
                  </div>
                </div>

                {/* Scope & Brief Details */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 block">
                    Requested Capabilities: {inq.projectType}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {inq.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
