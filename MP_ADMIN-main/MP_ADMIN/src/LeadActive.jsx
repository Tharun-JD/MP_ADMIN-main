import { useEffect, useRef, useState } from 'react'
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
  const actionMenuRef = useRef(null)

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
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setOpenActionIndex(null)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

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

  return (
    <main ref={pageRef} className="relative min-h-screen overflow-x-hidden bg-[#f2f4f9] text-[#1f365d]">
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

      <section className="relative z-10 mx-auto w-full max-w-[94rem] overflow-visible px-4 py-7 lg:px-6">
        <div ref={headerRef} className="relative z-30 flex flex-wrap items-center justify-between gap-4">
          <h1 className="flex items-center gap-3 font-['Trebuchet_MS','Segoe_UI',sans-serif] text-2xl font-semibold tracking-[0.02em] text-[#1b2d49] lg:text-[2.1rem]">
            <span className="text-[#1b2d49]"><IconKey /></span>
            Lead Activities
          </h1>

          <div ref={controlsRef} className="flex items-center gap-3">
            <button type="button" className="la-control la-clickable rounded-md border border-[#7f85ff]/55 bg-[#f9fbff] px-5 py-2.5 text-xl font-semibold leading-none text-[#6f63ff]">
              Total : 0
            </button>
            <div ref={exportMenuRef} className="relative z-40">
              <button
                type="button"
                onClick={() => setIsExportOpen((prev) => !prev)}
                className="la-control la-clickable flex items-center gap-1 rounded-md border border-[#7f85ff]/55 bg-[#f9fbff] px-5 py-2.5 text-xl font-semibold leading-none text-[#6f63ff]"
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
              className="la-control la-clickable rounded-md border border-[#7f85ff]/55 bg-[#f9fbff] p-2.5 text-[#6f63ff]"
            >
              <IconFilter />
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="la-filter-overlay fixed inset-0 z-[280] flex items-center justify-center bg-[#0e1730]/30 px-4 py-6 backdrop-blur-[2px]">
            <div
              ref={filterPanelRef}
              className="w-full max-w-5xl rounded-2xl border border-[#cfd6f8] bg-[linear-gradient(180deg,#f8faff_0%,#f4f6ff_100%)] shadow-2xl shadow-[#5d68d8]/20 [transform-style:preserve-3d]"
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

        <div ref={tableRef} className="relative z-10 mt-6 overflow-x-auto rounded-sm border border-[#8f83f4]/35 bg-white shadow-xl shadow-[#5f63de]/10">
          <div className="grid min-w-[1320px] grid-cols-[1.9fr_1.5fr_0.9fr_1.35fr_1.2fr_1.3fr_1.1fr_1.4fr_1.5fr_0.8fr] bg-[linear-gradient(95deg,#656ff0_0%,#a165d6_100%)] text-lg font-semibold tracking-wide text-white">
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
                className="la-row hover:bg-[#f8faff] grid min-w-[1320px] grid-cols-[1.9fr_1.5fr_0.9fr_1.35fr_1.2fr_1.3fr_1.1fr_1.4fr_1.5fr_0.8fr] border-t border-[#e8ecf8] transition-colors"
              >
                <div className="px-4 py-4 text-sm font-medium text-[#2d4568]">
                  <div className="font-bold">{lead.name}</div>
                  <div className="text-xs text-[#7a879a]">{lead.email}</div>
                  <div className="text-xs text-[#7a879a]">{lead.phone}</div>
                </div>
                <div className="px-4 py-4 text-sm text-[#2d4568]">{lead.sellDoLeadId}</div>
                <div className="px-4 py-4 text-sm text-[#2d4568]">{lead.project}</div>
                <div className="px-4 py-4 text-sm text-[#2d4568]">{lead.channelPartner}</div>
                <div className="px-4 py-4 text-sm text-[#2d4568]">{lead.leadStage}</div>
                <div className="px-4 py-4">
                  <span className="rounded-full bg-[#e8f5e9] px-2 py-1 text-xs font-bold text-[#2e7d32]">
                    {lead.leadStatus}
                  </span>
                </div>
                <div className="px-4 py-4 text-sm text-[#2d4568]">{lead.countStatus}</div>
                <div className="px-4 py-4 text-sm text-[#2d4568]">{lead.registeredAt}</div>
                <div className="px-4 py-4 text-sm text-[#2d4568]">{lead.validityPeriod}</div>
                <div className="relative px-4 py-4">
                  <button
                    type="button"
                    onClick={() => setOpenActionIndex(openActionIndex === index ? null : index)}
                    className="la-clickable rounded-md border border-[#cfd9ff] bg-white px-3 py-1 text-lg font-bold leading-none text-[#6576c9] hover:bg-[#f4f7ff]"
                  >
                    ...
                  </button>
                  {openActionIndex === index && (
                    <div
                      ref={actionMenuRef}
                      className="absolute bottom-[calc(100%+0.25rem)] right-3 z-[100] w-48 rounded-lg border border-[#d6def5] bg-white p-1.5 shadow-xl"
                    >
                      {actionOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setOpenActionIndex(null)
                            if (option === 'Show') {
                              setViewingLeadIndex(index)
                              setIsDetailsOpen(true)
                            } else {
                              // Add Follow behavior
                              alert('Add Follow feature coming soon!')
                            }
                          }}
                          className="la-clickable block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-[#304769] hover:bg-[#eef3ff]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {isDetailsOpen && viewingLeadIndex !== null && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#0f172a]/40 p-4 backdrop-blur-sm">
            <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-[#c9d3f8] bg-white shadow-2xl">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#656ff0] to-[#a165d6] px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Lead Activity Details</h2>
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="la-clickable text-3xl font-bold text-white/80 hover:text-white"
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
              <div className="border-t border-[#e4e9f7] bg-[#f8faff] px-6 py-4 text-right">
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="la-clickable rounded-lg bg-[#656ff0] px-6 py-2 font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                >
                  Close
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
