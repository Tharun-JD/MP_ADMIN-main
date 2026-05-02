import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Navbar from './Navbar.jsx'

function IconReports({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function readLocalArray(key) {
  try {
    const saved = localStorage.getItem(key)
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error(`Failed to read ${key}`, error)
    return []
  }
}

async function fetchArray(url, fallbackKey) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed with ${response.status}`)
    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch {
    return readLocalArray(fallbackKey)
  }
}

function normalize(value) {
  return String(value || '').trim().toLowerCase()
}

function statusClass(status) {
  const value = normalize(status)
  if (value === 'active' || value === 'count given') return 'bg-emerald-50 text-emerald-700 ring-emerald-100'
  if (value === 'pending' || value === 'fresh') return 'bg-amber-50 text-amber-700 ring-amber-100'
  if (value === 'rejected' || value === 'lost' || value === 'inactive') return 'bg-rose-50 text-rose-700 ring-rose-100'
  return 'bg-slate-50 text-slate-600 ring-slate-100'
}

function ReportsPage({ onBackToDashboard, onOpenUserAccount, onOpenLeadActive, onOpenChannelPartners, onOpenEmails, onOpenSms, onOpenReports, onOpenCpApprove, onSignOut }) {
  const [data, setData] = useState({
    leads: [],
    partners: [],
    accounts: [],
    customerDetails: [],
    addressInfo: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const pageRef = useRef(null)
  const headerRef = useRef(null)
  const glowRefs = useRef([])

  useEffect(() => {
    let isMounted = true

    const loadReportsData = async () => {
      setIsLoading(true)
      const [leads, partners, customerDetails, addressInfo] = await Promise.all([
        fetchArray('http://localhost:3000/leads', 'mp_leads_v3'),
        fetchArray('http://localhost:3000/partners', 'mp_channel_partners_v3'),
        fetchArray('http://localhost:3000/customerDetails', 'mp_customer_details'),
        fetchArray('http://localhost:3000/addressInfo', 'mp_address_info'),
      ])

      if (!isMounted) return
      setData({
        leads,
        partners,
        accounts: readLocalArray('mp_user_accounts_v4'),
        customerDetails,
        addressInfo,
      })
      setIsLoading(false)
    }

    loadReportsData()
    return () => {
      isMounted = false
    }
  }, [])

  const report = useMemo(() => {
    const partnerKeys = new Set(
      data.partners
        .flatMap((partner) => [partner.email, partner.name, partner.companyName, partner.cpCompany])
        .map(normalize)
        .filter(Boolean),
    )

    const leadStages = data.leads.reduce((acc, lead) => {
      const stage = lead.leadStage || 'Fresh'
      acc[stage] = (acc[stage] || 0) + 1
      return acc
    }, {})

    const partnerStatuses = data.partners.reduce((acc, partner) => {
      const status = partner.status || 'Pending'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {})

    const relatedLeads = data.leads.filter((lead) => {
      const values = [lead.channelPartner, lead.email, lead.name].map(normalize)
      return values.some((value) => partnerKeys.has(value))
    })

    const customerEmailSet = new Set(data.customerDetails.map((item) => normalize(item.userEmail || item.email)).filter(Boolean))
    const addressedCustomers = data.addressInfo.filter((item) => customerEmailSet.has(normalize(item.userEmail || item.email))).length

    const pendingApprovals = data.partners.filter((partner) => normalize(partner.status) === 'pending').length
    const activeAccounts = data.accounts.filter((account) => normalize(account.status) === 'active').length
    const countGiven = data.leads.filter((lead) => normalize(lead.countStatus) === 'count given').length
    const conversionRate = data.leads.length ? Math.round((countGiven / data.leads.length) * 100) : 0

    const recentLeads = data.leads.slice(0, 5).map((lead) => ({
      id: lead.id || lead.sellDoLeadId || lead.email || lead.name,
      title: lead.name || 'Unnamed lead',
      meta: lead.project || lead.channelPartner || 'No project linked',
      status: lead.leadStage || lead.leadStatus || 'Fresh',
      source: 'Lead',
    }))

    const recentPartners = data.partners.slice(0, 5).map((partner) => ({
      id: partner.id || partner.email || partner.name,
      title: partner.name || partner.companyName || 'Unnamed partner',
      meta: partner.email || partner.phone || 'No contact linked',
      status: partner.status || 'Pending',
      source: 'Partner',
    }))

    return {
      cards: [
        { label: 'Total Leads', value: data.leads.length, hint: `${relatedLeads.length} linked to partners`, tone: 'from-[#2563eb] to-[#0891b2]' },
        { label: 'Channel Partners', value: data.partners.length, hint: `${pendingApprovals} pending approvals`, tone: 'from-[#4f46e5] to-[#7c3aed]' },
        { label: 'User Accounts', value: data.accounts.length, hint: `${activeAccounts} active users`, tone: 'from-[#0f766e] to-[#16a34a]' },
        { label: 'Customer Records', value: data.customerDetails.length, hint: `${addressedCustomers} with address data`, tone: 'from-[#ea580c] to-[#f59e0b]' },
      ],
      leadStages: Object.entries(leadStages).sort((a, b) => b[1] - a[1]),
      partnerStatuses: Object.entries(partnerStatuses).sort((a, b) => b[1] - a[1]),
      recentActivity: [...recentLeads, ...recentPartners].slice(0, 6),
      conversionRate,
      relatedLeads: relatedLeads.length,
    }
  }, [data])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45 })
        .fromTo(headerRef.current, { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.25')
        .fromTo('.report-card', { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.45 }, '-=0.2')
        .fromTo('.report-panel', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.45 }, '-=0.2')

      glowRefs.current.filter(Boolean).forEach((glow, index) => {
        gsap.to(glow, {
          x: index % 2 === 0 ? 18 : -18,
          y: index % 2 === 0 ? -18 : 18,
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [isLoading])

  const maxLeadStage = Math.max(...report.leadStages.map(([, count]) => count), 1)

  return (
    <main ref={pageRef} className="relative min-h-screen overflow-hidden bg-[#f8fafc] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_36px,rgba(129,144,177,0.08)_37px),linear-gradient(90deg,transparent_36px,rgba(129,144,177,0.08)_37px)] bg-[size:37px_37px]" />
        <div ref={(el) => { glowRefs.current[0] = el }} className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div ref={(el) => { glowRefs.current[1] = el }} className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <Navbar
        activePage="reports"
        onBackToDashboard={onBackToDashboard}
        onOpenUserAccount={onOpenUserAccount}
        onOpenLeadActive={onOpenLeadActive}
        onOpenChannelPartners={onOpenChannelPartners}
        onOpenEmails={onOpenEmails}
        onOpenSms={onOpenSms}
        onOpenReports={onOpenReports}
        onOpenCpApprove={onOpenCpApprove}
        onSignOut={onSignOut}
      />

      <section className="relative z-10 mx-auto max-w-[1400px] px-4 py-10 lg:px-6">
        <header ref={headerRef} className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-white text-indigo-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <IconReports className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Analytics & Reports</h1>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Related business data overview</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-right shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lead Conversion</p>
            <p className="text-2xl font-black text-indigo-600">{report.conversionRate}%</p>
          </div>
        </header>

        {isLoading ? (
          <div className="report-panel rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-sm font-bold text-slate-500 shadow-sm">
            Loading related report data...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {report.cards.map((card) => (
                <article key={card.label} className="report-card overflow-hidden rounded-2xl border border-white bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-slate-500">{card.label}</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{card.value}</p>
                      <p className="mt-1 text-xs font-bold text-slate-400">{card.hint}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${card.tone}`} />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="report-panel rounded-2xl border border-white bg-white/85 p-6 shadow-xl shadow-slate-200/60 backdrop-blur">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Lead Pipeline</h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{report.relatedLeads} leads connected to partner records</p>
                  </div>
                  <button onClick={onOpenLeadActive} className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-black text-white transition hover:bg-indigo-700">
                    Open Leads
                  </button>
                </div>
                <div className="space-y-4">
                  {report.leadStages.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-slate-200 py-8 text-center text-sm font-semibold text-slate-400">No lead data found.</p>
                  ) : (
                    report.leadStages.map(([stage, count]) => (
                      <div key={stage}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-bold text-slate-700">{stage}</span>
                          <span className="font-black text-slate-900">{count}</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500" style={{ width: `${Math.max((count / maxLeadStage) * 100, 8)}%` }} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <section className="report-panel rounded-2xl border border-white bg-white/85 p-6 shadow-xl shadow-slate-200/60 backdrop-blur">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Partner Status</h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Approval and activation split</p>
                  </div>
                  <button onClick={onOpenChannelPartners} className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-black text-indigo-600 transition hover:bg-indigo-100">
                    Open CP
                  </button>
                </div>
                <div className="space-y-3">
                  {report.partnerStatuses.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-slate-200 py-8 text-center text-sm font-semibold text-slate-400">No partner data found.</p>
                  ) : (
                    report.partnerStatuses.map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
                        <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ring-1 ${statusClass(status)}`}>{status}</span>
                        <span className="text-lg font-black text-slate-900">{count}</span>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>

            <section className="report-panel mt-6 overflow-hidden rounded-2xl border border-white bg-white/85 shadow-xl shadow-slate-200/60 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-5">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Recent Related Records</h2>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Leads and partners loaded from the same sources as the app pages</p>
                </div>
                <button onClick={onOpenUserAccount} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-600 transition hover:bg-slate-50">
                  User Accounts
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left">
                  <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <tr>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Related Info</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {report.recentActivity.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-10 text-center text-sm font-semibold text-slate-400">No related records available yet.</td>
                      </tr>
                    ) : (
                      report.recentActivity.map((item) => (
                        <tr key={`${item.source}-${item.id}`} className="transition hover:bg-slate-50">
                          <td className="px-6 py-4 text-xs font-black uppercase tracking-widest text-indigo-500">{item.source}</td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900">{item.title}</td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-500">{item.meta}</td>
                          <td className="px-6 py-4">
                            <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ring-1 ${statusClass(item.status)}`}>{item.status}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  )
}

export default ReportsPage
