import { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar.jsx'

const accounts = [
  { id: 'row-1' },
  { id: 'row-2' },
  { id: 'row-3' },
  { id: 'row-4' },
]

const addUserOptions = [
  'Add Superadmin',
  'Add Administrator',
  'Add CRM User',
  'Add Sales Head',
  'Add Sales User',
  'Add Channel Partner Manager',
  'Add Channel Partner Head',
  'Add GRE or Pre-sales',
  'Add Billing Team',
]

const exportOptions = ['All Export', 'Active Filter Export']
const confirmationOptions = ['Confirmed', 'Not Confirmed']

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM2.5 20v-1c0-2.6 2.5-4.5 5.5-4.5s5.5 1.9 5.5 4.5v1h-11Zm11 0v-1c0-.68-.13-1.3-.37-1.87.79-.42 1.8-.63 2.87-.63 3 0 5.5 1.9 5.5 4.5v1h-8Z" fill="currentColor" />
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

function UserAccount({ onBackToDashboard, onOpenUserAccount, onOpenLeadActive, onOpenChannelPartners, onOpenEmails, onOpenSms, onSignOut }) {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false)
  const [selectedAddUserRole, setSelectedAddUserRole] = useState('Add Superadmin')
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [addUserFormValues, setAddUserFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    timeZone: '(GMT+05:30) Mumbai',
  })
  const [filterValues, setFilterValues] = useState({
    nameEmailPhone: '',
    sellDoLeadId: '',
    role: '',
    confirmation: 'Select',
    registeredAt: '',
  })
  const pageRef = useRef(null)
  const headerRef = useRef(null)
  const controlsRef = useRef(null)
  const tableRef = useRef(null)
  const glowRefs = useRef([])
  const rowRefs = useRef([])
  const beamRef = useRef(null)
  const addUserMenuRef = useRef(null)
  const addUserFormRef = useRef(null)
  const exportMenuRef = useRef(null)
  const filterPanelRef = useRef(null)
  const confirmationMenuRef = useRef(null)

  useEffect(() => {
    const onPointerDown = (event) => {
      if (addUserMenuRef.current && !addUserMenuRef.current.contains(event.target)) {
        setIsAddUserOpen(false)
      }
      if (addUserFormRef.current && !addUserFormRef.current.contains(event.target)) {
        setIsAddUserFormOpen(false)
      }
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setIsExportOpen(false)
      }
      if (confirmationMenuRef.current && !confirmationMenuRef.current.contains(event.target)) {
        setIsConfirmationOpen(false)
      }
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    if (!window.gsap || !isAddUserOpen) {
      return
    }

    window.gsap.fromTo(
      '.ua-add-user-menu',
      { y: -8, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.22, ease: 'power2.out' },
    )
  }, [isAddUserOpen])

  useEffect(() => {
    if (!window.gsap || !isAddUserFormOpen || !addUserFormRef.current) {
      return
    }

    const gsap = window.gsap
    const panel = addUserFormRef.current
    const fields = panel.querySelectorAll('.ua-add-user-field')
    const actions = panel.querySelectorAll('.ua-add-user-action')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .fromTo('.ua-add-user-overlay', { opacity: 0 }, { opacity: 1, duration: 0.22 })
      .fromTo(
        panel,
        { y: 26, opacity: 0, scale: 1.05, rotateX: -6, transformOrigin: '50% 0%' },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.4 },
        '-=0.05',
      )
      .fromTo(fields, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.2 }, '-=0.2')
      .fromTo(actions, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.2 }, '-=0.12')

    return () => tl.kill()
  }, [isAddUserFormOpen])

  useEffect(() => {
    if (!window.gsap || !isFilterOpen || !filterPanelRef.current) {
      return
    }

    const gsap = window.gsap
    const panel = filterPanelRef.current
    const fields = panel.querySelectorAll('.ua-filter-field')
    const actions = panel.querySelectorAll('.ua-filter-action')

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
    tl
      .fromTo('.ua-filter-overlay', { opacity: 0 }, { opacity: 1, duration: 0.2 })
      .fromTo(panel, { y: 14, opacity: 0, scale: 0.985 }, { y: 0, opacity: 1, scale: 1, duration: 0.28 }, '-=0.02')
      .fromTo(fields, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.045, duration: 0.2 }, '-=0.18')
      .fromTo(actions, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.2 }, '-=0.12')

    return () => tl.kill()
  }, [isFilterOpen])

  const setFilterField = (field, value) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }))
  }

  const setAddUserField = (field, value) => {
    setAddUserFormValues((prev) => ({ ...prev, [field]: value }))
  }

  const resetAddUserForm = () => {
    setAddUserFormValues({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      timeZone: '(GMT+05:30) Mumbai',
    })
  }

  const resetFilter = () => {
    setFilterValues({
      nameEmailPhone: '',
      sellDoLeadId: '',
      role: '',
      confirmation: 'Select',
      registeredAt: '',
    })
    setIsConfirmationOpen(false)
    setIsFilterOpen(false)
  }

  useEffect(() => {
    if (!window.gsap) {
      return
    }

    const gsap = window.gsap
    const cleanups = []

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
    intro
      .fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 })
      .fromTo(headerRef.current, { y: -22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, '-=0.15')
      .fromTo('.ua-title-char', { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: 0.26 }, '-=0.4')
      .fromTo('.ua-control', { x: 24, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.07, duration: 0.35 }, '-=0.32')
      .fromTo(tableRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
      .fromTo('.ua-row', { y: 20, opacity: 0, rotateX: -10 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, duration: 0.45 }, '-=0.25')

    cleanups.push(() => intro.kill())

    glowRefs.current.filter(Boolean).forEach((node, index) => {
      const anim = gsap.to(node, {
        x: index % 2 ? -24 : 28,
        y: index % 2 ? 18 : -18,
        scale: index % 2 ? 1.2 : 0.9,
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      cleanups.push(() => anim.kill())
    })

    if (beamRef.current) {
      const sweep = gsap.fromTo(
        beamRef.current,
        { xPercent: -65, opacity: 0.12 },
        { xPercent: 65, opacity: 0.26, duration: 5.4, repeat: -1, yoyo: true, ease: 'none' },
      )
      cleanups.push(() => sweep.kill())
    }

    rowRefs.current.filter(Boolean).forEach((row, index) => {
      const onEnter = () => {
        gsap.to(row, {
          y: -6,
          rotateX: -5,
          rotateY: index % 2 ? -5 : 5,
          scale: 1.01,
          boxShadow: '0 18px 34px rgba(235,122,38,0.22)',
          duration: 0.35,
          ease: 'power2.out',
        })
      }

      const onMove = (event) => {
        const rect = row.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        gsap.to(row, {
          rotateY: x * 16,
          rotateX: -y * 12,
          transformPerspective: 1200,
          duration: 0.2,
          ease: 'power1.out',
        })
      }

      const onLeave = () => {
        gsap.to(row, {
          rotateY: 0,
          rotateX: 0,
          y: 0,
          scale: 1,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          duration: 0.35,
          ease: 'power2.out',
        })
      }

      const onDown = () => {
        gsap.to(row, { scale: 0.995, duration: 0.12, ease: 'power1.out' })
      }

      const onUp = () => {
        gsap.to(row, { scale: 1.01, duration: 0.12, ease: 'power1.out' })
      }

      row.addEventListener('mouseenter', onEnter)
      row.addEventListener('mousemove', onMove)
      row.addEventListener('mouseleave', onLeave)
      row.addEventListener('mousedown', onDown)
      row.addEventListener('mouseup', onUp)
      cleanups.push(() => row.removeEventListener('mouseenter', onEnter))
      cleanups.push(() => row.removeEventListener('mousemove', onMove))
      cleanups.push(() => row.removeEventListener('mouseleave', onLeave))
      cleanups.push(() => row.removeEventListener('mousedown', onDown))
      cleanups.push(() => row.removeEventListener('mouseup', onUp))
    })

    const controlButtons = gsap.utils.toArray('.ua-control')
    controlButtons.forEach((button) => {
      const onEnter = () => {
        gsap.to(button, {
          y: -2,
          scale: 1.02,
          boxShadow: '0 12px 22px rgba(32,120,220,0.3)',
          duration: 0.24,
          ease: 'power2.out',
        })
      }

      const onLeave = () => {
        gsap.to(button, {
          y: 0,
          scale: 1,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          duration: 0.24,
          ease: 'power2.out',
        })
      }

      const onDown = () => {
        gsap.to(button, { scale: 0.97, duration: 0.12, ease: 'power1.out' })
      }

      const onUp = () => {
        gsap.to(button, { scale: 1.02, duration: 0.12, ease: 'power1.out' })
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

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <main ref={pageRef} className="relative min-h-screen overflow-hidden bg-[#f4f7ff] text-[#1f365d] [perspective:1300px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_31px,rgba(47,63,169,0.05)_32px),linear-gradient(90deg,transparent_31px,rgba(47,63,169,0.05)_32px)] bg-[size:32px_32px]" />
        <div ref={(n) => (glowRefs.current[0] = n)} className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-[#2f3fa9]/20 blur-3xl" />
        <div ref={(n) => (glowRefs.current[1] = n)} className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#7f5de6]/16 blur-3xl" />
        <div ref={beamRef} className="absolute left-0 top-12 h-40 w-[38rem] rotate-[-8deg] bg-gradient-to-r from-transparent via-[#2f3fa9]/28 to-transparent blur-2xl" />
      </div>

      <Navbar
        activePage="user-account"
        onBackToDashboard={onBackToDashboard}
        onOpenUserAccount={onOpenUserAccount}
        onOpenLeadActive={onOpenLeadActive}
        onOpenChannelPartners={onOpenChannelPartners}
        onOpenEmails={onOpenEmails}
        onOpenSms={onOpenSms}
        onSignOut={onSignOut}
      />

      <section className="relative z-10 mx-auto w-full max-w-7xl px-3 py-8 lg:px-6">
        <div ref={headerRef} className="relative z-40 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/70 bg-white/75 px-4 py-4 shadow-xl shadow-[#2f3fa9]/10 backdrop-blur-xl">
          <h1 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-[#1f2f45] lg:text-3xl">
            <span className="text-[#2f3fa9]"><IconUsers /></span>
            {'Users Accounts'.split('').map((ch, idx) => (
              <span key={`${ch}-${idx}`} className="ua-title-char inline-block">
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </h1>

          <div ref={controlsRef} className="flex flex-wrap items-center gap-3">
            <button type="button" className="ua-control rounded-lg border border-[#1e78c8]/45 bg-gradient-to-r from-[#124785] to-[#1e78c8] px-5 py-2 text-base font-semibold text-white lg:text-lg">
              Total : 0
            </button>
            <div ref={addUserMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsAddUserOpen((prev) => !prev)}
                className="ua-control flex items-center gap-1 rounded-lg border border-[#1e78c8]/45 bg-gradient-to-r from-[#124785] to-[#1e78c8] px-5 py-2 text-base font-semibold text-white lg:text-lg"
              >
                Add User <IconChevron />
              </button>
              {isAddUserOpen && (
                <div className="ua-add-user-menu absolute left-0 top-12 z-[70] w-72 rounded-xl border border-[#d4e3f8] bg-[#f8fbff] p-2 shadow-2xl shadow-[#1e78c8]/25">
                  {addUserOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setIsAddUserOpen(false)
                        setSelectedAddUserRole(option)
                        resetAddUserForm()
                        setIsAddUserFormOpen(true)
                      }}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#2f3e57] transition hover:bg-[#e8f1ff] hover:text-[#124785]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div ref={exportMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsExportOpen((prev) => !prev)}
                className="ua-control flex items-center gap-1 rounded-lg border border-[#1e78c8]/45 bg-gradient-to-r from-[#124785] to-[#1e78c8] px-5 py-2 text-base font-semibold text-white lg:text-lg"
              >
                Exports <IconChevron />
              </button>
              {isExportOpen && (
                <div className="absolute left-0 top-12 z-[70] w-64 rounded-xl border border-[#d4e3f8] bg-[#f8fbff] p-2 shadow-2xl shadow-[#1e78c8]/25">
                  {exportOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setIsExportOpen(false)}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#2f3e57] transition hover:bg-[#e8f1ff] hover:text-[#124785]"
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
                setIsAddUserOpen(false)
                setIsExportOpen(false)
                setIsFilterOpen(true)
              }}
              className="ua-control rounded-lg border border-[#1e78c8]/45 bg-gradient-to-r from-[#124785] to-[#1e78c8] p-2.5 text-white"
            >
              <IconFilter />
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="ua-filter-overlay fixed inset-0 z-[260] flex items-center justify-center bg-[#0f2244]/22 px-4 py-6 backdrop-blur-[2px]">
            <div ref={filterPanelRef} className="w-full max-w-4xl rounded-xl border border-[#c9d3e8] bg-[#f7f9fd] shadow-2xl shadow-[#1f365d]/15">
              <div className="flex items-center justify-between border-b border-[#cdd7ee] px-6 py-4">
                <h2 className="text-2xl font-semibold text-[#20385f]">Filter</h2>
              </div>

              <div className="grid gap-6 px-6 py-6 md:grid-cols-2">
                <div className="ua-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#1f3558]">Name/Email/Phone</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={filterValues.nameEmailPhone}
                      onChange={(event) => setFilterField('nameEmailPhone', event.target.value)}
                      className="w-full rounded-md border border-[#b8c4d8] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a879a]">
                      <IconChevron />
                    </span>
                  </div>
                </div>

                <div className="ua-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#1f3558]">Sell.Do Lead ID</label>
                  <input
                    type="text"
                    value={filterValues.sellDoLeadId}
                    onChange={(event) => setFilterField('sellDoLeadId', event.target.value)}
                    className="w-full rounded-md border border-[#b8c4d8] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                  />
                </div>

                <div className="ua-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#1f3558]">Role</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select"
                      value={filterValues.role}
                      onChange={(event) => setFilterField('role', event.target.value)}
                      className="w-full rounded-md border border-[#b8c4d8] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none placeholder:text-[#6c7890] transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                    />
                  </div>
                </div>

                <div ref={confirmationMenuRef} className="ua-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#1f3558]">Confirmation</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsConfirmationOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-md border border-[#b8c4d8] bg-white px-4 py-2.5 text-left text-base text-[#1f2f45] transition hover:border-[#9fb0cc] focus:border-[#7f8cff]"
                    >
                      <span className={filterValues.confirmation === 'Select' ? 'text-[#5f6d82]' : ''}>{filterValues.confirmation}</span>
                      <span className={`transition ${isConfirmationOpen ? 'rotate-180' : ''}`}>
                        <IconChevron />
                      </span>
                    </button>
                    {isConfirmationOpen && (
                      <div className="absolute left-0 top-[calc(100%+0.15rem)] z-[300] w-full rounded-md border border-[#c7d0df] bg-white shadow-lg">
                        {confirmationOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setFilterField('confirmation', option)
                              setIsConfirmationOpen(false)
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

                <div className="ua-filter-field space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-[#1f3558]">Registered At</label>
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy - dd/mm/yyyy"
                    value={filterValues.registeredAt}
                    onChange={(event) => setFilterField('registeredAt', event.target.value)}
                    className="w-full rounded-md border border-[#b8c4d8] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none placeholder:text-[#6c7890] transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20 md:max-w-[52%]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-[#cdd7ee] px-6 py-4">
                <button
                  type="button"
                  onClick={resetFilter}
                  className="ua-filter-action rounded-lg border border-[#6f73ff] bg-white px-6 py-2 text-xl font-semibold text-[#6f73ff] transition hover:bg-[#eef0ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsConfirmationOpen(false)
                    setIsFilterOpen(false)
                  }}
                  className="ua-filter-action rounded-lg bg-gradient-to-r from-[#6f73ff] to-[#6a6eea] px-7 py-2 text-xl font-semibold text-white transition hover:brightness-105"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {isAddUserFormOpen && (
          <div className="ua-add-user-overlay fixed inset-0 z-[290] flex items-center justify-center bg-[#0f2244]/30 px-4 py-6 backdrop-blur-[2px]">
            <div ref={addUserFormRef} className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-xl border border-[#8f7bf6]/40 bg-[#f4f6fb] shadow-2xl shadow-[#1a1f5f]/35">
              <div className="flex items-center justify-between bg-[linear-gradient(90deg,#6f7df3_0%,#9d67df_100%)] px-5 py-4">
                <h2 className="ua-add-user-field text-3xl font-semibold text-white">{selectedAddUserRole}</h2>
                <button
                  type="button"
                  onClick={() => setIsAddUserFormOpen(false)}
                  className="ua-add-user-field text-4xl font-bold leading-none text-white/80 transition hover:text-white"
                >
                  X
                </button>
              </div>

              <div className="grid gap-5 p-5 md:grid-cols-2">
                <div className="ua-add-user-field space-y-2">
                  <label className="text-base font-semibold text-[#1f3557]">First name <span className="text-[#e54848]">*</span></label>
                  <input
                    type="text"
                    value={addUserFormValues.firstName}
                    onChange={(event) => setAddUserField('firstName', event.target.value)}
                    className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2.5 text-lg text-[#2d4568] outline-none transition focus:border-[#7d88ff] focus:ring-2 focus:ring-[#7d88ff]/25"
                  />
                </div>

                <div className="ua-add-user-field space-y-2">
                  <label className="text-base font-semibold text-[#1f3557]">Last name <span className="text-[#e54848]">*</span></label>
                  <input
                    type="text"
                    value={addUserFormValues.lastName}
                    onChange={(event) => setAddUserField('lastName', event.target.value)}
                    className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2.5 text-lg text-[#2d4568] outline-none transition focus:border-[#7d88ff] focus:ring-2 focus:ring-[#7d88ff]/25"
                  />
                </div>

                <div className="ua-add-user-field space-y-2">
                  <label className="text-base font-semibold text-[#1f3557]">Email <span className="text-[#e54848]">*</span></label>
                  <input
                    type="email"
                    value={addUserFormValues.email}
                    onChange={(event) => setAddUserField('email', event.target.value)}
                    className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2.5 text-lg text-[#2d4568] outline-none transition focus:border-[#7d88ff] focus:ring-2 focus:ring-[#7d88ff]/25"
                  />
                </div>

                <div className="ua-add-user-field space-y-2">
                  <label className="text-base font-semibold text-[#1f3557]">Phone <span className="text-[#e54848]">*</span></label>
                  <div className="flex items-center rounded-md border border-[#c6d4ea] bg-white px-3 py-2.5">
                    <span className="text-lg">🇮🇳</span>
                    <span className="mx-2 text-[#61708a]">▼</span>
                    <input
                      type="text"
                      value={addUserFormValues.phone}
                      onChange={(event) => setAddUserField('phone', event.target.value)}
                      className="w-full border-0 bg-transparent text-lg text-[#2d4568] outline-none"
                    />
                  </div>
                </div>

                <div className="ua-add-user-field space-y-2 md:col-span-1">
                  <label className="text-base font-semibold text-[#1f3557]">User&apos;s Time Zone</label>
                  <select
                    value={addUserFormValues.timeZone}
                    onChange={(event) => setAddUserField('timeZone', event.target.value)}
                    className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2.5 text-lg text-[#2d4568] outline-none transition focus:border-[#7d88ff] focus:ring-2 focus:ring-[#7d88ff]/25"
                  >
                    <option>(GMT+05:30) Mumbai</option>
                    <option>(GMT+00:00) London</option>
                    <option>(GMT-05:00) New York</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end border-t border-[#d2dbee] bg-white/75 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setIsAddUserFormOpen(false)}
                  className="ua-add-user-action rounded-md bg-[#1d73ce] px-5 py-2 text-lg font-semibold text-white transition hover:brightness-110"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div ref={tableRef} className="mt-6 overflow-hidden rounded-2xl border border-[#6d64f8]/20 bg-white/70 shadow-2xl shadow-[#2f3fa9]/12 backdrop-blur-xl">
          <div className="grid grid-cols-[2fr_1.4fr_1fr_0.8fr_0.8fr_0.8fr] bg-[linear-gradient(90deg,#124785_0%,#1e78c8_56%,#30a7c2_100%)] text-sm font-bold tracking-wide text-white lg:text-base">
            <div className="px-6 py-5">Name/Email/Phone</div>
            <div className="px-6 py-5">Sell.Do Lead ID</div>
            <div className="px-6 py-5">Payment</div>
            <div className="px-6 py-5">Role</div>
            <div className="px-6 py-5">Status</div>
            <div className="px-6 py-5">Actions</div>
          </div>

          <div className="divide-y divide-[#dbe4f7] bg-white/90">
            {accounts.map((row, index) => (
              <div
                key={row.id}
                ref={(node) => {
                  rowRefs.current[index] = node
                }}
                className="ua-row grid grid-cols-[2fr_1.4fr_1fr_0.8fr_0.8fr_0.8fr] px-2 py-2 [transform-style:preserve-3d]"
              >
                <div className="px-4 py-3">
                  <p className="text-lg font-semibold text-[#213a64]">&nbsp;</p>
                  <p className="text-sm text-[#6e83a6]">&nbsp;</p>
                </div>
                <div className="px-4 py-3 text-base font-semibold text-[#344f7f]">&nbsp;</div>
                <div className="px-4 py-3 text-base font-semibold text-[#344f7f]">&nbsp;</div>
                <div className="px-4 py-3 text-base font-semibold text-[#344f7f]">&nbsp;</div>
                <div className="px-4 py-3">&nbsp;</div>
                <div className="px-4 py-3">&nbsp;</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default UserAccount
