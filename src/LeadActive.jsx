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

const countryPhoneOptions = [
  { flag: '🇮🇳', country: 'India', code: '+91' },
  { flag: '🇺🇸', country: 'United States', code: '+1' },
  { flag: '🇨🇦', country: 'Canada', code: '+1' },
  { flag: '🇬🇧', country: 'United Kingdom', code: '+44' },
  { flag: '🇦🇺', country: 'Australia', code: '+61' },
  { flag: '🇳🇿', country: 'New Zealand', code: '+64' },
  { flag: '🇸🇬', country: 'Singapore', code: '+65' },
  { flag: '🇦🇪', country: 'UAE', code: '+971' },
  { flag: '🇸🇦', country: 'Saudi Arabia', code: '+966' },
  { flag: '🇶🇦', country: 'Qatar', code: '+974' },
  { flag: '🇰🇼', country: 'Kuwait', code: '+965' },
  { flag: '🇧🇭', country: 'Bahrain', code: '+973' },
  { flag: '🇴🇲', country: 'Oman', code: '+968' },
  { flag: '🇩🇪', country: 'Germany', code: '+49' },
  { flag: '🇫🇷', country: 'France', code: '+33' },
  { flag: '🇮🇹', country: 'Italy', code: '+39' },
  { flag: '🇪🇸', country: 'Spain', code: '+34' },
  { flag: '🇵🇹', country: 'Portugal', code: '+351' },
  { flag: '🇳🇱', country: 'Netherlands', code: '+31' },
  { flag: '🇧🇪', country: 'Belgium', code: '+32' },
  { flag: '🇸🇪', country: 'Sweden', code: '+46' },
  { flag: '🇳🇴', country: 'Norway', code: '+47' },
  { flag: '🇩🇰', country: 'Denmark', code: '+45' },
  { flag: '🇫🇮', country: 'Finland', code: '+358' },
  { flag: '🇨🇭', country: 'Switzerland', code: '+41' },
  { flag: '🇦🇹', country: 'Austria', code: '+43' },
  { flag: '🇮🇪', country: 'Ireland', code: '+353' },
  { flag: '🇵🇱', country: 'Poland', code: '+48' },
  { flag: '🇨🇿', country: 'Czech Republic', code: '+420' },
  { flag: '🇬🇷', country: 'Greece', code: '+30' },
  { flag: '🇹🇷', country: 'Turkey', code: '+90' },
  { flag: '🇷🇺', country: 'Russia', code: '+7' },
  { flag: '🇺🇦', country: 'Ukraine', code: '+380' },
  { flag: '🇯🇵', country: 'Japan', code: '+81' },
  { flag: '🇰🇷', country: 'South Korea', code: '+82' },
  { flag: '🇨🇳', country: 'China', code: '+86' },
  { flag: '🇭🇰', country: 'Hong Kong', code: '+852' },
  { flag: '🇹🇼', country: 'Taiwan', code: '+886' },
  { flag: '🇲🇾', country: 'Malaysia', code: '+60' },
  { flag: '🇹🇭', country: 'Thailand', code: '+66' },
  { flag: '🇻🇳', country: 'Vietnam', code: '+84' },
  { flag: '🇵🇭', country: 'Philippines', code: '+63' },
  { flag: '🇮🇩', country: 'Indonesia', code: '+62' },
  { flag: '🇵🇰', country: 'Pakistan', code: '+92' },
  { flag: '🇧🇩', country: 'Bangladesh', code: '+880' },
  { flag: '🇱🇰', country: 'Sri Lanka', code: '+94' },
  { flag: '🇳🇵', country: 'Nepal', code: '+977' },
  { flag: '🇿🇦', country: 'South Africa', code: '+27' },
  { flag: '🇳🇬', country: 'Nigeria', code: '+234' },
  { flag: '🇪🇬', country: 'Egypt', code: '+20' },
  { flag: '🇰🇪', country: 'Kenya', code: '+254' },
  { flag: '🇬🇭', country: 'Ghana', code: '+233' },
  { flag: '🇪🇹', country: 'Ethiopia', code: '+251' },
  { flag: '🇲🇦', country: 'Morocco', code: '+212' },
  { flag: '🇹🇿', country: 'Tanzania', code: '+255' },
  { flag: '🇦🇷', country: 'Argentina', code: '+54' },
  { flag: '🇧🇷', country: 'Brazil', code: '+55' },
  { flag: '🇲🇽', country: 'Mexico', code: '+52' },
  { flag: '🇨🇱', country: 'Chile', code: '+56' },
  { flag: '🇨🇴', country: 'Colombia', code: '+57' },
  { flag: '🇵🇪', country: 'Peru', code: '+51' },
  { flag: '🇺🇾', country: 'Uruguay', code: '+598' },
]

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

function LeadActive({ onBackToDashboard, onOpenUserAccount, onOpenLeadActive, onOpenChannelPartners, onOpenEmails, onOpenSms, onOpenReports, onSignOut }) {
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
    countryCode: '+91',
    sellDoLeadId: '',
    project: '',
    channelPartner: '',
    leadStage: 'Fresh',
    leadStatus: 'Active',
    countStatus: 'Pending',
    validityPeriod: '90 Days'
  })
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false)
  const [countryCodeSearch, setCountryCodeSearch] = useState('')
  const countryCodeDropdownRef = useRef(null)
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
      if (countryCodeDropdownRef.current && !countryCodeDropdownRef.current.contains(event.target) && !event.target.closest('.la-cc-trigger')) {
        setIsCountryCodeOpen(false)
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
      countryCode: '+91',
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
        onOpenReports={onOpenReports}
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
                  onClick={() => setIsAddLeadOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-[#6366f1] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-[#4f46e5] active:scale-95"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Add Lead
                </button>

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
            className="fixed top-28 right-8 z-[100] flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6366f1] text-white shadow-2xl shadow-indigo-300 transition hover:bg-[#4f46e5] hover:scale-105 active:scale-95"
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
                    <div className="flex gap-2">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsCountryCodeOpen(!isCountryCodeOpen)}
                          className="la-cc-trigger flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#1e293b] outline-none transition-all hover:bg-white focus:border-[#6366f1]"
                        >
                          <span className="text-base">{countryPhoneOptions.find(opt => opt.code === (newLead.countryCode || '+91'))?.flag}</span>
                          <span className="text-sm">{newLead.countryCode || '+91'}</span>
                          <IconChevron className={`transition-transform duration-300 ${isCountryCodeOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isCountryCodeOpen && (
                          <div 
                            ref={countryCodeDropdownRef}
                            className="absolute left-0 top-full z-[700] mt-2 w-64 overflow-hidden rounded-2xl border border-[#f1f5f9] bg-white p-2 shadow-2xl animate-fall"
                          >
                            <div className="mb-2 px-2 pt-1">
                              <input 
                                type="text"
                                placeholder="Search code..."
                                autoFocus
                                value={countryCodeSearch}
                                onChange={(e) => setCountryCodeSearch(e.target.value)}
                                className="w-full rounded-xl border border-[#f1f5f9] bg-[#f8fafc] px-3 py-2 text-xs font-bold text-[#0f172a] outline-none focus:border-[#6366f1]"
                              />
                            </div>
                            <div className="max-h-60 overflow-y-auto no-scrollbar">
                              {countryPhoneOptions
                                .filter(opt => opt.country.toLowerCase().includes(countryCodeSearch.toLowerCase()) || opt.code.includes(countryCodeSearch))
                                .map(opt => (
                                  <button
                                    key={`${opt.country}-${opt.code}`}
                                    type="button"
                                    onClick={() => {
                                      setNewLead({...newLead, countryCode: opt.code})
                                      setIsCountryCodeOpen(false)
                                      setCountryCodeSearch('')
                                    }}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-bold text-[#64748b] transition hover:bg-[#f0f4ff] hover:text-[#6366f1]"
                                  >
                                    <span className="text-base">{opt.flag}</span>
                                    <span className="flex-1">{opt.country}</span>
                                    <span className="text-[#94a3b8]">{opt.code}</span>
                                  </button>
                                ))
                              }
                            </div>
                          </div>
                        )}
                      </div>
                      <input 
                        type="tel" required value={newLead.phone}
                        onChange={e => setNewLead({...newLead, phone: e.target.value})}
                        placeholder="Enter phone number"
                        className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1] transition focus:bg-white"
                      />
                    </div>
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
          <div className="fixed inset-0 z-[500] flex flex-col bg-[#f8faff] animate-fade-in">
            {/* Header */}
            <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md">
              <div className="flex items-center gap-3">
                 <button onClick={() => setIsDetailsOpen(false)} className="group flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-slate-100">
                    <svg className="h-5 w-5 text-slate-400 group-hover:text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6" /></svg>
                 </button>
                 <h1 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-blue" />
                    Customer Detail
                 </h1>
              </div>
              <div className="flex items-center gap-3">
                 <button onClick={() => setIsDetailsOpen(false)} className="rounded-xl border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50">Back to Lead Activities</button>
                 <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:bg-slate-50"><span className="text-xl font-bold">...</span></button>
                 <button onClick={() => setIsDetailsOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:text-rose-500 hover:bg-rose-50">&times;</button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 lg:p-8 no-scrollbar">
              <div className="mx-auto max-w-[1600px] space-y-6">
                
                {/* Section 1: Customer Detail */}
                <section className="rounded-3xl border border-white bg-white/70 p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.04)] backdrop-blur-xl">
                   <h2 className="mb-8 text-xl font-black text-slate-800 tracking-tight">Customer Detail</h2>
                   <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
                      {[
                        { label: 'First Name', value: leads[viewingLeadIndex].name.split(' ')[0] },
                        { label: 'Last Name', value: leads[viewingLeadIndex].name.split(' ')[1] || '---' },
                        { label: 'Name', value: leads[viewingLeadIndex].name },
                        { label: 'Email', value: leads[viewingLeadIndex].email },
                        { label: 'Phone', value: leads[viewingLeadIndex].phone || '+91 1234567890' },
                        { label: 'Sell Do Lead ID', value: leads[viewingLeadIndex].sellDoLeadId || 'SD-0959818' },
                        { label: 'Project', value: leads[viewingLeadIndex].project || 'MP Amber' },
                        { label: 'Lead Stage', value: leads[viewingLeadIndex].leadStage || 'Fresh' },
                        { label: 'Lead Status', value: leads[viewingLeadIndex].leadStatus || 'Already Exists' },
                        { label: 'Count Status', value: leads[viewingLeadIndex].countStatus || 'Pending' },
                        { label: 'Registered At', value: leads[viewingLeadIndex].registeredAt || '24/04/2026' },
                        { label: 'Lead Validity Period', value: leads[viewingLeadIndex].validityPeriod || '90 Days' },
                        { label: 'Budget', value: leads[viewingLeadIndex].budget || 'INR 50 Lakh' },
                        { label: 'Location', value: leads[viewingLeadIndex].location || 'Chn' },
                        { label: 'Configuration', value: leads[viewingLeadIndex].configuration || '1 BHK' },
                        { label: 'Property Type', value: leads[viewingLeadIndex].propertyType || 'Apartment' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-slate-50 py-3">
                           <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}:</span>
                           <span className="text-sm font-black text-slate-800">{item.value}</span>
                        </div>
                      ))}
                   </div>
                </section>

                {/* Section 2: Sell Do Lead Site Visit */}
                <section className="rounded-3xl border border-white bg-white/70 p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.04)] backdrop-blur-xl">
                   <h2 className="mb-8 text-xl font-black text-slate-800 tracking-tight">Sell Do Lead Site Visit</h2>
                   <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
                      {[
                        { label: 'Lead ID', value: leads[viewingLeadIndex].sellDoLeadId || 'SD-0959818' },
                        { label: 'Project', value: leads[viewingLeadIndex].project || 'MP Amber' },
                        { label: 'Visit Date', value: 'Not scheduled' },
                        { label: 'Visit Status', value: 'Pending' },
                        { label: 'Assigned Executive', value: 'Not assigned' },
                        { label: 'Remarks', value: 'No site visit remark yet.' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-slate-50 py-3">
                           <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}:</span>
                           <span className="text-sm font-black text-slate-800">{item.value}</span>
                        </div>
                      ))}
                   </div>
                </section>

                {/* Section 3: Remark from Selldo */}
                <section className="rounded-3xl border border-white bg-white/70 p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.04)] backdrop-blur-xl">
                   <h2 className="mb-6 text-xl font-black text-slate-800 tracking-tight">Remark from Selldo</h2>
                   <div className="space-y-3">
                      {[
                        'Initial lead captured from panel.',
                        'Current status: Already Exists'
                      ].map((remark, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-100 bg-[#f8fafc] px-5 py-3 text-sm font-medium text-slate-600">
                           {remark}
                        </div>
                      ))}
                   </div>
                </section>

                {/* Section 4: Notes */}
                <section className="rounded-3xl border border-white bg-white/70 p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.04)] backdrop-blur-xl">
                   <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-xl font-black text-slate-800 tracking-tight">Notes</h2>
                      <button className="text-slate-400 transition hover:text-brand-blue">
                         <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1-1-4 9.5-9.5z" /></svg>
                      </button>
                   </div>
                   <div className="min-h-[100px] rounded-2xl border border-slate-100 bg-[#f8fafc] px-6 py-5 text-sm font-medium text-slate-400 italic">
                      No additional notes available for this customer.
                   </div>
                </section>

                {/* Section 5: Follow Up */}
                <section className="rounded-3xl border border-white bg-white/70 p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.04)] backdrop-blur-xl">
                   <h2 className="mb-6 text-xl font-black text-slate-800 tracking-tight">Follow Up</h2>
                   <div className="flex justify-end">
                      <div className="relative">
                         <button className="flex items-center gap-10 rounded-xl border border-slate-100 bg-white px-6 py-3 shadow-sm transition hover:shadow-md">
                            <div className="text-left">
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Follow Up</p>
                               <p className="mt-1 text-xs font-bold text-slate-700">Update Follow Up Status</p>
                            </div>
                            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6" /></svg>
                         </button>
                      </div>
                   </div>
                </section>

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

        {/* Action Menu Portal */}
        {openActionIndex !== null && menuAnchorRect && createPortal(
          <div 
            ref={actionMenuRef}
            className="fixed z-[999] w-72 overflow-hidden rounded-[2.5rem] border border-white bg-white/90 p-4 shadow-[0_25px_70px_rgba(49,46,129,0.25)] backdrop-blur-3xl animate-elastic-pop"
            style={{ 
              top: `${(menuAnchorRect.top - window.scrollY) + 180 > window.innerHeight 
                ? menuAnchorRect.top - window.scrollY - 190 
                : menuAnchorRect.top - window.scrollY + 12}px`, 
              left: `${Math.max(20, menuAnchorRect.left - window.scrollX - 260)}px` 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 to-transparent opacity-50" />
            <div className="relative space-y-1.5">
              <button
                type="button"
                onClick={() => {
                  setOpenActionIndex(null)
                  setMenuAnchorRect(null)
                  setViewingLeadIndex(openActionIndex)
                  setIsDetailsOpen(true)
                }}
                className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all duration-300 hover:bg-[#6366f1] hover:text-white hover:shadow-lg hover:shadow-indigo-200"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0f4ff] text-[#6366f1] transition-colors group-hover:bg-white/20 group-hover:text-white">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="text-base font-bold">Show Details</div>
                  <div className="text-[10px] opacity-70 font-medium">View full activity logs</div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setOpenActionIndex(null)
                  setMenuAnchorRect(null)
                  handleOpenFollowUp(openActionIndex)
                }}
                className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all duration-300 hover:bg-[#ea580c] hover:text-white hover:shadow-lg hover:shadow-orange-200"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7ed] text-[#ea580c] transition-colors group-hover:bg-white/20 group-hover:text-white">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <div>
                  <div className="text-base font-bold">Add Follow</div>
                  <div className="text-[10px] opacity-70 font-medium">Update stage & status</div>
                </div>
              </button>
            </div>
          </div>,
          document.body
        )}
      </section>

    </main>
  )
}

export default LeadActive
