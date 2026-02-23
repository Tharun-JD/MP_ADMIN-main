import { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar.jsx'

const exportOptions = ['All Export', 'Active Filter Export']
const countStatusOptions = ['Pending', 'Count Given', 'No Count']

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
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    if (!window.gsap) {
      return
    }

    const gsap = window.gsap
    const cleanups = []

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
    intro
      .fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
      .fromTo(headerRef.current, { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.08')
      .fromTo('.la-control', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.28 }, '-=0.22')
      .fromTo(tableRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.38 }, '-=0.16')

    cleanups.push(() => intro.kill())

    bgGlowRefs.current.filter(Boolean).forEach((node, index) => {
      const drift = gsap.to(node, {
        x: index % 2 ? -18 : 18,
        y: index % 2 ? 14 : -14,
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      cleanups.push(() => drift.kill())
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  useEffect(() => {
    if (!window.gsap || !isFilterOpen || !filterPanelRef.current) {
      return
    }

    const gsap = window.gsap
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
            <button type="button" className="la-control rounded-md border border-[#7f85ff]/55 bg-[#f9fbff] px-5 py-2.5 text-xl font-semibold leading-none text-[#6f63ff]">
              Total : 0
            </button>
            <div ref={exportMenuRef} className="relative z-40">
              <button
                type="button"
                onClick={() => setIsExportOpen((prev) => !prev)}
                className="la-control flex items-center gap-1 rounded-md border border-[#7f85ff]/55 bg-[#f9fbff] px-5 py-2.5 text-xl font-semibold leading-none text-[#6f63ff]"
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
                      className="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-[#324765] hover:bg-[#eef2ff]"
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
              className="la-control rounded-md border border-[#7f85ff]/55 bg-[#f9fbff] p-2.5 text-[#6f63ff]"
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
                      className="flex w-full items-center justify-between rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-left text-base text-[#1f2f45] transition hover:border-[#9fb0cc]"
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
                            className="block w-full px-4 py-2 text-left text-base text-[#1f2f45] hover:bg-[#e7edf5]"
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
                  className="la-filter-action rounded-lg border border-[#6f73ff] bg-white px-6 py-2 text-xl font-semibold text-[#6f73ff] transition hover:bg-[#eef0ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCountStatusOpen(false)
                    setIsFilterOpen(false)
                  }}
                  className="la-filter-action rounded-lg bg-gradient-to-r from-[#6f73ff] to-[#6a6eea] px-7 py-2 text-xl font-semibold text-white transition hover:brightness-105"
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
          <div className="px-4 py-6 text-sm text-[#7384a3]">No data available.</div>
        </div>
      </section>
    </main>
  )
}

export default LeadActive
