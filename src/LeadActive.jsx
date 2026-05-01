import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar.jsx'

gsap.registerPlugin(ScrollTrigger)

const exportOptions = ['All Export', 'Active Filter Export']
const countStatusOptions = ['Pending', 'Count Given', 'No Count']
const actionOptions = ['Show', 'Add Follow']

const initialLeads = []

function IconKey() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        d="M14.5 3.5a6 6 0 0 0-5.85 7.35L3 16.5V21h4.5l2-2h2.5l2-2h2.5l1.15-1.15A6 6 0 0 0 14.5 3.5Zm0 3a3 3 0 1 1-3 3a3 3 0 0 1 3-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconFilter() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  )
}

function LeadActive({ onBackToDashboard, onOpenUserAccount, onOpenLeadActive, onOpenChannelPartners, onOpenEmails, onOpenSms, onSignOut }) {
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isCountStatusOpen, setIsCountStatusOpen] = useState(false)
  const [filterValues, setFilterValues] = useState({
    lead: '',
    sellDoLeadId: '',
    leadStage: '',
    channelPartner: '',
    expiryDate: '',
    project: '',
    countStatus: 'Select',
    registeredAt: '',
  })
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('mp_leads_v3')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.length > 0) return parsed
      } catch (e) {
        console.error('Error loading leads', e)
      }
    }
    return initialLeads
  })
  const [viewingLeadIndex, setViewingLeadIndex] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [openActionIndex, setOpenActionIndex] = useState(null)
  const [menuAnchorRect, setMenuAnchorRect] = useState(null)
  const actionMenuRef = useRef(null)

  // -- Follow-up State --
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false)
  const [editingLeadIndex, setEditingLeadIndex] = useState(null)
  const [followUpValues, setFollowUpValues] = useState({
    leadStage: 'Visit Done',
    leadStatus: 'Active',
    countStatus: 'Pending',
    remark: ''
  })
  const followUpPanelRef = useRef(null)
  
  // -- Add Lead State --
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    sellDoLeadId: '',
    project: '',
    channelPartner: '',
    leadStage: 'Fresh',
    leadStatus: 'Active',
    countStatus: 'Pending',
    validityPeriod: '90 Days'
  })
  const addLeadModalRef = useRef(null)

  useEffect(() => {
    const savedLeads = localStorage.getItem('mp_leads_v2')
    if (savedLeads) {
      try {
        const parsed = JSON.parse(savedLeads)
        // Filter out any seeded leads if they exist
        const filtered = parsed.filter((l) => typeof l.id === 'string' && !l.id.startsWith('seed-'))
        if (filtered.length !== parsed.length) {
          setLeads(filtered)
          localStorage.setItem('mp_leads_v2', JSON.stringify(filtered))
        }
      } catch (e) {
        console.error('Error filtering leads', e)
      }
    }
    localStorage.setItem('mp_leads_v2', JSON.stringify(leads))
  }, [leads])
  const pageRef = useRef(null)
  const headerRef = useRef(null)
  const controlsRef = useRef(null)
  const tableRef = useRef(null)
  const bgGlowRefs = useRef([])
  const exportMenuRef = useRef(null)
  const filterPanelRef = useRef(null)
  const countStatusRef = useRef(null)

  useEffect(() => {
    const onPointerDown = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setIsExportOpen(false)
      }
      if (countStatusRef.current && !countStatusRef.current.contains(event.target)) {
        setIsCountStatusOpen(false)
      }
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
        setIsFilterOpen(false)
        setIsCountStatusOpen(false)
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target) && !event.target.closest('.la-action-trigger')) {
        setOpenActionIndex(null)
        setMenuAnchorRect(null)
      }
      if (followUpPanelRef.current && !followUpPanelRef.current.contains(event.target)) {
        setIsFollowUpOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    if (!isFollowUpOpen || !followUpPanelRef.current) return
    
    gsap.fromTo(followUpPanelRef.current,
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
    )
  }, [isFollowUpOpen])

  useEffect(() => {
    if (!pageRef.current) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups = []
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power2.out' } })
      intro
        .fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.24 })
        .fromTo(headerRef.current, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.36 }, '-=0.08')
        .fromTo('.la-control', { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.24 }, '-=0.18')
        .fromTo(tableRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.34 }, '-=0.12')
      cleanups.push(() => intro.kill())

      if (!prefersReducedMotion) {
        bgGlowRefs.current.filter(Boolean).forEach((node, index) => {
          const drift = gsap.to(node, {
            x: index % 2 ? -14 : 14,
            y: index % 2 ? 10 : -10,
            duration: 6 + index * 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
          cleanups.push(() => drift.kill())
        })

        if (tableRef.current) {
          const reveal = gsap.fromTo(
            tableRef.current,
            { y: 16, autoAlpha: 0.92 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: tableRef.current,
                start: 'top 84%',
                once: true,
              },
            },
          )
          cleanups.push(() => {
            reveal.scrollTrigger?.kill()
            reveal.kill()
          })
        }
      }

      const controlButtons = gsap.utils.toArray('.la-control')
      controlButtons.forEach((button) => {
        const onEnter = () => {
          gsap.to(button, {
            y: -2,
            scale: 1.01,
            boxShadow: '0 10px 20px rgba(101,111,240,0.2)',
            duration: 0.2,
            ease: 'power2.out',
          })
        }
        const onLeave = () => {
          gsap.to(button, {
            y: 0,
            scale: 1,
            boxShadow: '0 0 0 rgba(0,0,0,0)',
            duration: 0.2,
            ease: 'power2.out',
          })
        }
        const onDown = () => {
          gsap.to(button, { scale: 0.98, duration: 0.1, ease: 'power1.out' })
        }
        const onUp = () => {
          gsap.to(button, { scale: 1.01, duration: 0.1, ease: 'power1.out' })
        }
        button.addEventListener('mouseenter', onEnter)
        button.addEventListener('mouseleave', onLeave)
        button.addEventListener('mousedown', onDown)
        button.addEventListener('mouseup', onUp)
        cleanups.push(() => button.removeEventListener('mouseenter', onEnter))
        cleanups.push(() => button.removeEventListener('mouseleave', onLeave))
        cleanups.push(() => button.removeEventListener('mousedown', onDown))
        cleanups.push(() => button.removeEventListener('mouseup', onUp))
      })

      const clickButtons = gsap.utils.toArray('.la-clickable')
      clickButtons.forEach((button) => {
        const onClick = () => {
          gsap.fromTo(
            button,
            { boxShadow: '0 0 0 0 rgba(111,99,255,0.18)' },
            { boxShadow: '0 0 0 8px rgba(111,99,255,0)', duration: 0.26, ease: 'power2.out' },
          )
          gsap.fromTo(button, { scale: 1 }, { scale: 0.986, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.out' })
        }
        button.addEventListener('click', onClick)
        cleanups.push(() => button.removeEventListener('click', onClick))
      })
    }, pageRef)

    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (!isFilterOpen || !filterPanelRef.current) {
      return
    }

    const panel = filterPanelRef.current
    const fields = panel.querySelectorAll('.la-filter-field')
    const actions = panel.querySelectorAll('.la-filter-action')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .fromTo('.la-filter-overlay', { opacity: 0 }, { opacity: 1, duration: 0.2 })
      .fromTo(panel, { y: 16, opacity: 0, scale: 0.982, rotateX: -4 }, { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.34 }, '-=0.02')
      .fromTo(fields, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.045, duration: 0.22 }, '-=0.18')
      .fromTo(actions, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.2 }, '-=0.14')

    return () => tl.kill()
  }, [isFilterOpen])

  const setFilterField = (field, value) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }))
  }

  const resetFilter = () => {
    setFilterValues({
      lead: '',
      sellDoLeadId: '',
      leadStage: '',
      channelPartner: '',
      expiryDate: '',
      project: '',
      countStatus: 'Select',
      registeredAt: '',
    })
    setIsCountStatusOpen(false)
    setIsFilterOpen(false)
  }

  const handleOpenFollowUp = (index) => {
    const lead = leads[index]
    setEditingLeadIndex(index)
    setFollowUpValues({
      leadStage: lead.leadStage || 'Visit Done',
      leadStatus: lead.leadStatus || 'Active',
      countStatus: lead.countStatus || 'Pending',
      remark: ''
    })
    setIsFollowUpOpen(true)
  }

  const handleSaveFollowUp = () => {
    if (editingLeadIndex === null) return
    
    const updatedLeads = [...leads]
    updatedLeads[editingLeadIndex] = {
      ...updatedLeads[editingLeadIndex],
      leadStage: followUpValues.leadStage,
      leadStatus: followUpValues.leadStatus,
      countStatus: followUpValues.countStatus,
      remark: followUpValues.remark,
    }
    
    setLeads(updatedLeads)
    setIsFollowUpOpen(false)
    setEditingLeadIndex(null)
  }

  const handleAddLead = (e) => {
    e.preventDefault()
    const leadWithId = {
      ...newLead,
      id: `lead-${Date.now()}`,
      registeredAt: new Date().toLocaleDateString('en-GB')
    }
    const updatedLeads = [leadWithId, ...leads]
    setLeads(updatedLeads)
    localStorage.setItem('mp_leads_v3', JSON.stringify(updatedLeads))
    setIsAddLeadOpen(false)
    setNewLead({
      name: '',
      email: '',
      phone: '',
      sellDoLeadId: '',
      project: '',
      channelPartner: '',
      leadStage: 'Fresh',
      leadStatus: 'Active',
      countStatus: 'Pending',
      validityPeriod: '90 Days'
    })
  }

  return (
    <main ref={pageRef} className="relative min-h-screen overflow-x-hidden bg-[#f8fafc] text-[#0f172a]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_36px,rgba(129,144,177,0.08)_37px),linear-gradient(90deg,transparent_36px,rgba(129,144,177,0.08)_37px)] bg-[size:37px_37px]" />
        <div ref={(n) => (bgGlowRefs.current[0] = n)} className="absolute -left-14 top-12 h-56 w-56 rounded-full bg-[#6e70ff]/15 blur-3xl" />
        <div ref={(n) => (bgGlowRefs.current[1] = n)} className="absolute right-0 top-16 h-64 w-64 rounded-full bg-[#8f6ce0]/15 blur-3xl" />
      </div>

      <Navbar
        activePage="lead-active"
        onBackToDashboard={onBackToDashboard}
        onOpenUserAccount={onOpenUserAccount}
        onOpenLeadActive={onOpenLeadActive}
        onOpenChannelPartners={onOpenChannelPartners}
        onOpenEmails={onOpenEmails}
        onOpenSms={onOpenSms}
        onSignOut={onSignOut}
      />

      <section className="relative z-10 w-full overflow-visible px-4 py-7 lg:px-6">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#f1f5f9]">
            {/* Header */}
            <header className="flex flex-wrap items-center justify-between gap-6 px-8 py-8 lg:px-10">
              <div className="space-y-1">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f4ff] text-[#6366f1] shadow-inner">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2v20M2 12h20" strokeDasharray="4 4" className="opacity-20" />
                      <path d="M4 12h16M12 4v16" className="animate-[pulse_2s_infinite]" />
                      <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.1" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-[#1e293b]">Lead Activities</h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">Transaction Monitoring Portal</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full bg-[#f8fafc] p-1.5 border border-[#f1f5f9]">
                  <span className="px-3 text-[11px] font-bold text-[#94a3b8]">VIEW:</span>
                  <button className="rounded-full bg-white px-4 py-1.5 text-[11px] font-bold text-[#6366f1] shadow-sm border border-[#f1f5f9]">All Leads</button>
                </div>
                
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-[#f8fafc] px-5 py-2.5 text-xs font-bold text-[#64748b] border border-[#f1f5f9] transition hover:bg-white hover:shadow-md"
                >
                  <IconFilter />
                  Filter
                  <IconChevron />
                </button>

                <button 
                  onClick={onBackToDashboard}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8fafc] text-[#94a3b8] border border-[#f1f5f9] transition hover:text-[#ef4444] hover:bg-red-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </header>

            {/* Table Area */}
            <div className="px-8 pb-4 lg:px-10">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full min-w-[1100px] border-separate border-spacing-0">
                  <thead>
                    <tr className="text-left">
                      {['Name & Contact', 'Lead ID', 'Project', 'Stage', 'Status', 'Timeline', 'Validity', 'Actions'].map((h) => (
                        <th key={h} className="pb-6 text-[10px] font-black uppercase tracking-[0.15em] text-[#94a3b8] px-4 first:pl-0">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-24">
                          <div className="flex flex-col items-center justify-center text-center">
                            <div className="relative mb-6">
                              <div className="absolute inset-0 scale-150 rounded-full bg-[#6366f1]/5 blur-2xl animate-pulse" />
                              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#f0f4ff] text-[#6366f1]">
                                <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <path d="M3 12h3l3-9 4 18 3-9h3" strokeLinecap="round" strokeLinejoin="round" className="animate-[dash_2s_ease-in-out_infinite]" />
                                </svg>
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#1e293b]">No activities found</h3>
                            <p className="mt-2 text-sm text-[#94a3b8]">Get started by adding your first lead to the system.</p>
                            <button 
                              onClick={() => setIsAddLeadOpen(true)}
                              className="mt-8 rounded-full bg-[#2549b8] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-200 transition hover:bg-[#1e3a8a] active:scale-95"
                            >
                              + Add Lead Now
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead, index) => (
                        <tr key={lead.id || index} className="group transition-colors hover:bg-[#f8fafc]/80">
                          <td className="py-5 pr-4 pl-0">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0f4ff] to-[#e0e7ff] text-sm font-bold text-[#6366f1]">
                                {lead.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-[#1e293b]">{lead.name}</div>
                                <div className="text-[10px] font-medium text-[#94a3b8]">{lead.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-4 text-xs font-bold text-[#64748b]">#{lead.sellDoLeadId || '---'}</td>
                          <td className="py-5 px-4 text-xs font-bold text-[#64748b]">{lead.project}</td>
                          <td className="py-5 px-4">
                            <span className="inline-flex rounded-full bg-[#f0fdf4] px-3 py-1 text-[10px] font-bold text-[#16a34a] border border-[#dcfce7]">
                              {lead.leadStage}
                            </span>
                          </td>
                          <td className="py-5 px-4">
                            <span className="inline-flex rounded-full bg-[#f8fafc] px-3 py-1 text-[10px] font-bold text-[#64748b] border border-[#f1f5f9]">
                              {lead.leadStatus}
                            </span>
                          </td>
                          <td className="py-5 px-4 text-xs font-bold text-[#64748b]">{lead.registeredAt}</td>
                          <td className="py-5 px-4 text-xs font-bold text-[#64748b]">{lead.validityPeriod}</td>
                          <td className="py-5 px-4">
                            <button
                              onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect()
                                setMenuAnchorRect({ top: rect.bottom + window.scrollY, left: rect.right + window.scrollX })
                                setOpenActionIndex(index)
                              }}
                              className="la-action-trigger flex h-8 w-8 items-center justify-center rounded-lg text-[#94a3b8] transition hover:bg-[#f1f5f9] hover:text-[#1e293b]"
                            >
                              <span className="text-lg font-bold">...</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <footer className="flex flex-wrap items-center justify-between border-t border-[#f1f5f9] bg-[#f8fafc]/50 px-8 py-6 lg:px-10">
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#94a3b8]">Viewing</p>
                  <p className="mt-1 text-xs font-bold text-[#1e293b]">{leads.length} of {leads.length} Leads</p>
                </div>
                <div className="h-8 w-px bg-[#e2e8f0]" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#94a3b8]">Last Sync</p>
                  <p className="mt-1 text-xs font-bold text-[#1e293b]">Just now</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f1f5f9] bg-white text-[#94a3b8] transition hover:text-[#1e293b] hover:shadow-sm disabled:opacity-30" disabled>
                  <IconChevron className="rotate-90" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f1f5f9] bg-white text-[#1e293b] shadow-sm transition hover:bg-[#f8fafc]">
                  <IconChevron className="-rotate-90" />
                </button>
              </div>
            </footer>
          </div>
        </div>

        {/* Add Lead Button (Floating) */}
        {leads.length > 0 && (
          <button 
            onClick={() => setIsAddLeadOpen(true)}
            className="fixed bottom-8 right-8 z-[100] flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6366f1] text-white shadow-2xl shadow-indigo-300 transition hover:bg-[#4f46e5] hover:scale-105 active:scale-95"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        )}

        {/* Add Lead Modal */}
        {isAddLeadOpen && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center bg-[#0f172a]/40 p-4 backdrop-blur-sm">
            <div ref={addLeadModalRef} className="w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl animate-elastic-pop">
              <div className="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6">
                <h2 className="text-2xl font-black text-[#1e293b]">Add New Lead</h2>
                <button onClick={() => setIsAddLeadOpen(false)} className="text-[#94a3b8] hover:text-[#ef4444] transition">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddLead} className="p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Name</label>
                    <input 
                      type="text" required value={newLead.name}
                      onChange={e => setNewLead({...newLead, name: e.target.value})}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1] transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Email</label>
                    <input 
                      type="email" required value={newLead.email}
                      onChange={e => setNewLead({...newLead, email: e.target.value})}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1] transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Phone</label>
                    <input 
                      type="tel" required value={newLead.phone}
                      onChange={e => setNewLead({...newLead, phone: e.target.value})}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1] transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Sell Do Lead ID</label>
                    <input 
                      type="text" value={newLead.sellDoLeadId}
                      onChange={e => setNewLead({...newLead, sellDoLeadId: e.target.value})}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1] transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Project</label>
                    <input 
                      type="text" required value={newLead.project}
                      onChange={e => setNewLead({...newLead, project: e.target.value})}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1] transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Channel Partner</label>
                    <input 
                      type="text" required value={newLead.channelPartner}
                      onChange={e => setNewLead({...newLead, channelPartner: e.target.value})}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1] transition"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button type="submit" className="rounded-xl bg-[#6366f1] px-10 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-[#4f46e5]">
                    Add Lead Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isDetailsOpen && viewingLeadIndex !== null && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#0f172a]/10 p-4 backdrop-blur-sm">
            <div className="w-full overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-2xl shadow-slate-200/50">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] px-6 py-5">
                <h2 className="text-2xl font-bold tracking-tight text-[#0f172a]">Lead Activity Details</h2>
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="la-clickable text-3xl font-bold leading-none text-[#64748b] transition hover:text-[#0f172a]"
                >
                  &times;
                </button>
              </div>
              <div className="max-h-[75vh] overflow-y-auto p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { label: 'Name', value: leads[viewingLeadIndex].name },
                    { label: 'Email', value: leads[viewingLeadIndex].email },
                    { label: 'Phone', value: leads[viewingLeadIndex].phone },
                    { label: 'Sell Do Lead ID', value: leads[viewingLeadIndex].sellDoLeadId },
                    { label: 'Project', value: leads[viewingLeadIndex].project },
                    { label: 'Channel Partner', value: leads[viewingLeadIndex].channelPartner },
                    { label: 'Lead Stage', value: leads[viewingLeadIndex].leadStage },
                    { label: 'Status', value: leads[viewingLeadIndex].leadStatus },
                    { label: 'Count Status', value: leads[viewingLeadIndex].countStatus },
                    { label: 'Registered At', value: leads[viewingLeadIndex].registeredAt },
                    { label: 'Validity Period', value: leads[viewingLeadIndex].validityPeriod },
                  ].map((item) => (
                    <div key={item.label} className="border-b border-[#f1f4ff] pb-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#7a879a]">
                        {item.label}
                      </div>
                      <div className="mt-1 text-lg font-medium text-[#2d4568]">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-[#e2e8f0] bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] px-6 py-5 text-right">
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="la-clickable rounded-xl bg-[#6366f1] px-8 py-2.5 text-base font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-[#4f46e5]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isFollowUpOpen && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#0f172a]/10 p-4 backdrop-blur-sm">
            <div ref={followUpPanelRef} className="w-full overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-2xl shadow-slate-200/50">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] px-6 py-5">
                <h2 className="text-2xl font-bold tracking-tight text-[#c2410c]">Lead Follow-up</h2>
                <button
                  type="button"
                  onClick={() => setIsFollowUpOpen(false)}
                  className="la-clickable text-3xl font-bold leading-none text-[#9a3412]/60 transition hover:text-[#9a3412]"
                >
                  &times;
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Lead Stage</label>
                  <select
                    value={followUpValues.leadStage}
                    onChange={(e) => setFollowUpValues({...followUpValues, leadStage: e.target.value})}
                    className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none focus:border-[#7f8cff]"
                  >
                    <option>Fresh</option>
                    <option>Enquiry Received</option>
                    <option>Visit Done</option>
                    <option>Interested</option>
                    <option>Not Interested</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Lead Status</label>
                  <select
                    value={followUpValues.leadStatus}
                    onChange={(e) => setFollowUpValues({...followUpValues, leadStatus: e.target.value})}
                    className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none focus:border-[#7f8cff]"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Closed</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Count Status</label>
                  <select
                    value={followUpValues.countStatus}
                    onChange={(e) => setFollowUpValues({...followUpValues, countStatus: e.target.value})}
                    className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none focus:border-[#7f8cff]"
                  >
                    <option>Pending</option>
                    <option>Count Given</option>
                    <option>No Count</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Remarks</label>
                  <textarea
                    value={followUpValues.remark}
                    onChange={(e) => setFollowUpValues({...followUpValues, remark: e.target.value})}
                    placeholder="Enter follow-up details..."
                    className="w-full h-24 rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none focus:border-[#7f8cff] resize-none"
                  />
                </div>
              </div>
              <div className="border-t border-[#e2e8f0] bg-[#f8fafc] px-6 py-5 text-right">
                <button
                  type="button"
                  onClick={handleSaveFollowUp}
                  className="la-clickable rounded-xl bg-[#ea580c] px-8 py-2.5 text-base font-bold text-white shadow-lg shadow-orange-100 transition hover:bg-[#d9480f]"
                >
                  Update Lead
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default LeadActive
