import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar.jsx'

gsap.registerPlugin(ScrollTrigger)

const exportOptions = ['All Export', 'Active Filter Export']
const countStatusOptions = ['Pending', 'Count Given', 'No Count']
const actionOptions = ['Show', 'Add Follow']

const initialLeads = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    sellDoLeadId: 'SDL-100234',
    project: 'Mountain View Estates',
    channelPartner: 'Skyline Realty',
    leadStage: 'Visit Done',
    leadStatus: 'Active',
    countStatus: 'Count Given',
    registeredAt: '2026-04-10',
    validityPeriod: '2026-05-10',
  },
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
    const saved = localStorage.getItem('mp_leads')
    if (saved) {
      try {
        return JSON.parse(saved)
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

  useEffect(() => {
    localStorage.setItem('mp_leads', JSON.stringify(leads))
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
        <div ref={headerRef} className="relative z-30 flex flex-wrap items-center justify-between gap-4">
          <h1 className="flex items-center gap-3 font-sans text-2xl font-bold tracking-tight text-[#0f172a] lg:text-3xl">
            <span className="text-[#6366f1]"><IconKey /></span>
            Lead Activities
          </h1>

          <div ref={controlsRef} className="flex items-center gap-3">
            <button type="button" className="la-control la-clickable rounded-lg border border-[#e2e8f0] bg-white px-5 py-2.5 text-base font-bold text-[#475569] shadow-sm">
              Total : {leads.length}
            </button>
            <div ref={exportMenuRef} className="relative z-40">
              <button
                type="button"
                onClick={() => setIsExportOpen((prev) => !prev)}
                className="la-control la-clickable flex items-center gap-1 rounded-lg bg-[#6366f1] px-5 py-2.5 text-base font-bold text-white shadow-md shadow-indigo-100 transition hover:bg-[#4f46e5]"
              >
                Exports <IconChevron />
              </button>
              {isExportOpen && (
                <div className="absolute right-0 top-[calc(100%+0.4rem)] z-[320] w-56 rounded-md border border-[#d8ddf3] bg-white p-2 shadow-lg">
                  {exportOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setIsExportOpen(false)}
                      className="la-clickable block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-[#324765] hover:bg-[#eef2ff]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setIsExportOpen(false)
                setIsFilterOpen(true)
              }}
              className="la-control la-clickable rounded-lg border border-[#e2e8f0] bg-white p-2.5 text-[#475569] shadow-sm"
            >
              <IconFilter />
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="la-filter-overlay fixed inset-0 z-[280] flex items-center justify-center bg-[#0e1730]/30 px-4 py-6 backdrop-blur-[2px]">
            <div
              ref={filterPanelRef}
              className="w-full rounded-2xl border border-[#cfd6f8] bg-[linear-gradient(180deg,#f8faff_0%,#f4f6ff_100%)] shadow-2xl shadow-[#5d68d8]/20 [transform-style:preserve-3d]"
            >
              <div className="flex items-center justify-between border-b border-[#d5dcfb] px-6 py-4">
                <h2 className="text-2xl font-semibold text-[#20365c]">Filter</h2>
              </div>

              <div className="grid gap-6 px-6 py-6 md:grid-cols-2">
                <div className="la-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Lead</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={filterValues.lead}
                      onChange={(event) => setFilterField('lead', event.target.value)}
                      className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a879a]">
                      <IconChevron />
                    </span>
                  </div>
                </div>

                <div className="la-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Sell Do Lead ID</label>
                  <input
                    type="text"
                    value={filterValues.sellDoLeadId}
                    onChange={(event) => setFilterField('sellDoLeadId', event.target.value)}
                    className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                  />
                </div>

                <div className="la-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Lead Stage</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select"
                      value={filterValues.leadStage}
                      onChange={(event) => setFilterField('leadStage', event.target.value)}
                      className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none placeholder:text-[#6c7890] transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a879a]">
                      <IconChevron />
                    </span>
                  </div>
                </div>

                <div className="la-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Channel Partner</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={filterValues.channelPartner}
                      onChange={(event) => setFilterField('channelPartner', event.target.value)}
                      className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a879a]">
                      <IconChevron />
                    </span>
                  </div>
                </div>

                <div className="la-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy - dd/mm/yyyy"
                    value={filterValues.expiryDate}
                    onChange={(event) => setFilterField('expiryDate', event.target.value)}
                    className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none placeholder:text-[#6c7890] transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                  />
                </div>

                <div className="la-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Project</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select"
                      value={filterValues.project}
                      onChange={(event) => setFilterField('project', event.target.value)}
                      className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none placeholder:text-[#6c7890] transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a879a]">
                      <IconChevron />
                    </span>
                  </div>
                </div>

                <div ref={countStatusRef} className="la-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Count Status</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCountStatusOpen((prev) => !prev)}
                      className="la-clickable flex w-full items-center justify-between rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-left text-base text-[#1f2f45] transition hover:border-[#9fb0cc]"
                    >
                      <span className={filterValues.countStatus === 'Select' ? 'text-[#6c7890]' : ''}>{filterValues.countStatus}</span>
                      <span className={`transition ${isCountStatusOpen ? 'rotate-180' : ''}`}>
                        <IconChevron />
                      </span>
                    </button>

                    {isCountStatusOpen && (
                      <div className="absolute left-0 top-[calc(100%+0.2rem)] z-[300] w-full rounded-md border border-[#c7d0df] bg-white shadow-lg">
                        {countStatusOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setFilterField('countStatus', option)
                              setIsCountStatusOpen(false)
                            }}
                            className="la-clickable block w-full px-4 py-2 text-left text-base text-[#1f2f45] hover:bg-[#e7edf5]"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="la-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Registered At</label>
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy - dd/mm/yyyy"
                    value={filterValues.registeredAt}
                    onChange={(event) => setFilterField('registeredAt', event.target.value)}
                    className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none placeholder:text-[#6c7890] transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-[#d5dcfb] px-6 py-4">
                <button
                  type="button"
                  onClick={resetFilter}
                  className="la-clickable la-filter-action rounded-lg border border-[#6f73ff] bg-white px-6 py-2 text-xl font-semibold text-[#6f73ff] transition hover:bg-[#eef0ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCountStatusOpen(false)
                    setIsFilterOpen(false)
                  }}
                  className="la-clickable la-filter-action rounded-lg bg-gradient-to-r from-[#6f73ff] to-[#6a6eea] px-7 py-2 text-xl font-semibold text-white transition hover:brightness-105"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        <div ref={tableRef} className="relative z-10 mt-6 overflow-x-auto overflow-y-visible no-scrollbar rounded-xl border border-[#e2e8f0] bg-white shadow-xl shadow-slate-200/40">
          <div className="grid min-w-[1320px] grid-cols-[1.9fr_1.5fr_0.9fr_1.35fr_1.2fr_1.3fr_1.1fr_1.4fr_1.5fr_0.8fr] bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] border-b border-[#f1f5f9] text-sm font-bold tracking-wider text-[#475569]">
            <div className="px-4 py-3">Name/Email/Phone</div>
            <div className="px-4 py-3">Sell Do Lead ID</div>
            <div className="px-4 py-3">Project</div>
            <div className="px-4 py-3">Channel Partner</div>
            <div className="px-4 py-3">Lead Stage</div>
            <div className="px-4 py-3">Lead Status</div>
            <div className="px-4 py-3">Count Status</div>
            <div className="px-4 py-3">Registered At</div>
            <div className="px-4 py-3">Lead validity period</div>
            <div className="px-4 py-3">Actions</div>
          </div>
          {leads.length === 0 ? (
            <div className="px-4 py-6 text-sm text-[#7384a3]">No data available.</div>
          ) : (
            leads.map((lead, index) => (
              <div
                key={lead.id || index}
                className="la-row hover:bg-[#f8faff]/50 grid min-w-[1320px] grid-cols-[1.9fr_1.5fr_0.9fr_1.35fr_1.2fr_1.3fr_1.1fr_1.4fr_1.5fr_0.8fr] items-center border-t border-[#f1f5f9] transition-colors"
              >
                <div className="flex items-center gap-4 px-4 py-5 text-sm font-medium text-[#2d4568]">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-lg font-bold text-[#3b82f6]">
                    {lead.name.charAt(0).toLowerCase()}
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#0f172a]">{lead.name}</div>
                    <div className="text-[11px] text-[#64748b]">
                      <span className="font-semibold uppercase text-[#94a3b8] mr-1">en:</span>{lead.email}
                    </div>
                    <div className="text-[11px] text-[#64748b]">
                      <span className="font-semibold uppercase text-[#94a3b8] mr-1">ph:</span>{lead.phone}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-4">
                  <span className="inline-block rounded bg-[#eff6ff] px-2 py-0.5 text-[11px] font-bold text-[#4f46e5] border border-[#e0e7ff]">
                    {lead.sellDoLeadId}
                  </span>
                </div>
                <div className="px-4 py-4 text-sm font-semibold text-[#475569]">{lead.project}</div>
                <div className="px-4 py-4 text-sm font-semibold text-[#475569]">{lead.channelPartner}</div>
                <div className="px-4 py-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold ${
                    lead.leadStage === 'Fresh' ? 'bg-[#fff7ed] text-[#ea580c]' : 'bg-[#eff6ff] text-[#2563eb]'
                  }`}>
                    {lead.leadStage}
                  </span>
                </div>
                <div className="px-4 py-4">
                  <span className="inline-block rounded bg-[#f1f5f9] px-3 py-1 text-[11px] font-bold text-[#475569] border border-[#e2e8f0]">
                    {lead.leadStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-4 text-sm font-bold text-[#0f172a]">
                  <span className="h-2 w-2 rounded-full bg-[#10b981]"></span>
                  {lead.countStatus}
                </div>
                <div className="px-4 py-4 text-sm font-semibold text-[#64748b]">{lead.registeredAt}</div>
                <div className="px-4 py-4 text-sm font-semibold text-[#64748b]">{lead.validityPeriod}</div>
                <div className="relative px-4 py-4 text-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      if (openActionIndex === index) {
                        setOpenActionIndex(null)
                        setMenuAnchorRect(null)
                      } else {
                        const rect = e.currentTarget.getBoundingClientRect()
                        setMenuAnchorRect({
                          top: rect.bottom + window.scrollY,
                          left: rect.right + window.scrollX
                        })
                        setOpenActionIndex(index)
                      }
                    }}
                    className={`la-action-trigger la-clickable flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${openActionIndex === index ? 'bg-[#312e81] text-white shadow-lg' : 'bg-[#eff6ff] text-[#312e81] hover:bg-[#312e81] hover:text-white'}`}
                  >
                    <span className="text-xl font-bold leading-none mb-1">...</span>
                  </button>
                  {openActionIndex === index && menuAnchorRect && createPortal(
                    <div
                      ref={actionMenuRef}
                      className="fixed z-[999] w-72 overflow-hidden rounded-[2.5rem] border border-white bg-white/90 p-4 shadow-[0_25px_70px_rgba(49,46,129,0.25)] backdrop-blur-3xl animate-elastic-pop"
                      style={{ 
                        top: `${Math.min(menuAnchorRect.top - window.scrollY + 12, window.innerHeight - 200)}px`, 
                        left: `${Math.max(20, menuAnchorRect.left - window.scrollX - 260)}px` 
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#312e81]/5 to-transparent opacity-50" />
                      <div className="relative space-y-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setOpenActionIndex(null)
                            setMenuAnchorRect(null)
                            setViewingLeadIndex(index)
                            setIsDetailsOpen(true)
                          }}
                          className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all duration-300 hover:bg-[#312e81] hover:text-white hover:shadow-lg hover:shadow-indigo-200"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff6ff] text-[#312e81] transition-colors group-hover:bg-white/20 group-hover:text-white">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-base font-bold">View Details</div>
                            <div className="text-[10px] opacity-70 font-medium">Full profile & history</div>
                          </div>
                        </button>
                        
                         <button
                           type="button"
                           onClick={() => {
                             setOpenActionIndex(null)
                             setMenuAnchorRect(null)
                             handleOpenFollowUp(index)
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
                             <div className="text-base font-bold">Add Follow-up</div>
                             <div className="text-[10px] opacity-70 font-medium">Schedule next activity</div>
                           </div>
                         </button>
                         
                        </div>
                    </div>,
                    document.body
                  )}
                </div>
              </div>
            ))
          )}
        </div>

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
