import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar.jsx'

gsap.registerPlugin(ScrollTrigger)

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
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('mp_user_accounts')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error loading accounts', e)
      }
    }
    return []
  })
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false)
  const [selectedAddUserRole, setSelectedAddUserRole] = useState('Add Superadmin')
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [confirmationDropdownPos, setConfirmationDropdownPos] = useState({ top: 0, left: 0, width: 0 })
  const [addUserFormValues, setAddUserFormValues] = useState(() => {
    const saved = localStorage.getItem('mp_ua_form_draft')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error loading form draft', e)
      }
    }
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      countryCode: '+91',
      timeZone: '(GMT+05:30) Mumbai',
    }
  })
  const [viewingAccountIndex, setViewingAccountIndex] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [openActionIndex, setOpenActionIndex] = useState(null)
  const actionMenuRef = useRef(null)

  // -- Follow-up Form State --
  const [isFollowUpFormOpen, setIsFollowUpFormOpen] = useState(false)
  const [followUpFormValues, setFollowUpFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    sellDoLeadId: '',
    project: '',
    channelPartner: '',
    leadStage: 'Visit Done',
    leadStatus: 'Active',
    countStatus: 'Pending',
  })

  useEffect(() => {
    localStorage.setItem('mp_user_accounts', JSON.stringify(accounts))
  }, [accounts])

  useEffect(() => {
    localStorage.setItem('mp_ua_form_draft', JSON.stringify(addUserFormValues))
  }, [addUserFormValues])
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
  const confirmationButtonRef = useRef(null)
  const confirmationDropdownRef = useRef(null)
  const followUpFormRef = useRef(null)

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
        if (!confirmationDropdownRef.current || !confirmationDropdownRef.current.contains(event.target)) {
          setIsConfirmationOpen(false)
        }
      }
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setOpenActionIndex(null)
      }
      if (followUpFormRef.current && !followUpFormRef.current.contains(event.target)) {
        // Only close if not clicking outside modal
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    if (!isAddUserOpen) {
      return
    }

    gsap.fromTo(
      '.ua-add-user-menu',
      { y: -8, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.22, ease: 'power2.out' },
    )
  }, [isAddUserOpen])

  useEffect(() => {
    if (!isAddUserFormOpen || !addUserFormRef.current) {
      return
    }

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
    if (!isFollowUpFormOpen || !followUpFormRef.current) {
      return
    }

    const panel = followUpFormRef.current
    const fields = panel.querySelectorAll('.ua-followup-field')
    const actions = panel.querySelectorAll('.ua-followup-action')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .fromTo('.ua-followup-overlay', { opacity: 0 }, { opacity: 1, duration: 0.22 })
      .fromTo(
        panel,
        { y: 26, opacity: 0, scale: 1.05, rotateX: -6, transformOrigin: '50% 0%' },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.4 },
        '-=0.05',
      )
      .fromTo(fields, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.2 }, '-=0.2')
      .fromTo(actions, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.2 }, '-=0.12')

    return () => tl.kill()
  }, [isFollowUpFormOpen])

  useEffect(() => {
    if (!isFilterOpen || !filterPanelRef.current) {
      return
    }

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

  useEffect(() => {
    if (!isConfirmationOpen || !confirmationButtonRef.current) {
      return
    }

    const updatePosition = () => {
      const rect = confirmationButtonRef.current.getBoundingClientRect()
      setConfirmationDropdownPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isConfirmationOpen])

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
      countryCode: '+91',
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

  const handleSaveUser = () => {
    const required = ['firstName', 'lastName', 'email', 'phone']
    const hasMissing = required.some((field) => !String(addUserFormValues[field] || '').trim())

    if (hasMissing) {
      return
    }

    const fullName = `${addUserFormValues.firstName} ${addUserFormValues.lastName}`.trim()
    const userRow = {
      id: `row-${Date.now()}`,
      name: fullName,
      email: addUserFormValues.email,
      phone: addUserFormValues.phone,
      countryCode: addUserFormValues.countryCode,
      sellDoLeadId: '-',
      payment: '-',
      role: selectedAddUserRole,
      status: 'Active',
      action: '...',
    }

    setAccounts((prev) => [userRow, ...prev])
    setIsAddUserFormOpen(false)
    setIsAddUserOpen(false)
    resetAddUserForm()
  }

  const handleOpenFollowUp = (account) => {
    setFollowUpFormValues({
      name: account.name,
      email: account.email,
      phone: account.phone,
      sellDoLeadId: account.sellDoLeadId === '-' ? '' : account.sellDoLeadId,
      project: '',
      channelPartner: '',
      leadStage: 'Visit Done',
      leadStatus: 'Active',
      countStatus: 'Pending',
    })
    setIsFollowUpFormOpen(true)
  }

  const handleSaveFollowUp = () => {
    const newLead = {
      id: Date.now(),
      ...followUpFormValues,
      registeredAt: new Date().toISOString().split('T')[0],
      validityPeriod: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }

    const currentLeads = JSON.parse(localStorage.getItem('mp_leads') || '[]')
    const updatedLeads = [newLead, ...currentLeads]
    localStorage.setItem('mp_leads', JSON.stringify(updatedLeads))

    setIsFollowUpFormOpen(false)
    // Automatically navigate to Lead Activities page
    onOpenLeadActive()
  }

  useEffect(() => {
    if (!pageRef.current) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups = []
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power2.out' } })
      intro
        .fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28 })
        .fromTo(headerRef.current, { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42 }, '-=0.08')
        .fromTo('.ua-title-char', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.02, duration: 0.2 }, '-=0.34')
        .fromTo('.ua-control', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.28 }, '-=0.24')
        .fromTo(tableRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.14')
        .fromTo('.ua-row', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.28 }, '-=0.2')
      cleanups.push(() => intro.kill())

      if (!prefersReducedMotion) {
        glowRefs.current.filter(Boolean).forEach((node, index) => {
          const anim = gsap.to(node, {
            x: index % 2 ? -18 : 20,
            y: index % 2 ? 14 : -14,
            scale: index % 2 ? 1.1 : 0.95,
            duration: 6 + index * 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
          cleanups.push(() => anim.kill())
        })

        if (tableRef.current) {
          const reveal = gsap.fromTo(
            tableRef.current,
            { y: 18, autoAlpha: 0.92 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.45,
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

      if (beamRef.current) {
        const sweep = gsap.fromTo(
          beamRef.current,
          { xPercent: -50, opacity: 0.12 },
          { xPercent: 50, opacity: 0.2, duration: 7.2, repeat: -1, yoyo: true, ease: 'none' },
        )
        cleanups.push(() => sweep.kill())
      }

      rowRefs.current.filter(Boolean).forEach((row, index) => {
        const onEnter = () => {
          gsap.to(row, {
            y: -3,
            scale: 1.004,
            boxShadow: '0 14px 24px rgba(30,120,200,0.14)',
            duration: 0.24,
            ease: 'power2.out',
          })
        }

        const onLeave = () => {
          gsap.to(row, {
            y: 0,
            scale: 1,
            boxShadow: '0 0 0 rgba(0,0,0,0)',
            duration: 0.22,
            ease: 'power2.out',
          })
        }

        const onDown = () => {
          gsap.to(row, { scale: 0.995, duration: 0.1, ease: 'power1.out' })
        }

        const onUp = () => {
          gsap.to(row, { scale: 1.004, duration: 0.1, ease: 'power1.out' })
        }

        row.addEventListener('mouseenter', onEnter)
        row.addEventListener('mouseleave', onLeave)
        row.addEventListener('mousedown', onDown)
        row.addEventListener('mouseup', onUp)
        cleanups.push(() => row.removeEventListener('mouseenter', onEnter))
        cleanups.push(() => row.removeEventListener('mouseleave', onLeave))
        cleanups.push(() => row.removeEventListener('mousedown', onDown))
        cleanups.push(() => row.removeEventListener('mouseup', onUp))
      })

      const controlButtons = gsap.utils.toArray('.ua-control')
      controlButtons.forEach((button) => {
        const onEnter = () => {
          gsap.to(button, {
            y: -2,
            scale: 1.01,
            boxShadow: '0 12px 22px rgba(32,120,220,0.24)',
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

      const clickButtons = gsap.utils.toArray('.ua-clickable')
      clickButtons.forEach((button) => {
        const onClick = () => {
          gsap.fromTo(
            button,
            { boxShadow: '0 0 0 0 rgba(30,120,200,0.18)' },
            { boxShadow: '0 0 0 8px rgba(30,120,200,0)', duration: 0.28, ease: 'power2.out' },
          )
          gsap.fromTo(button, { scale: 1 }, { scale: 0.985, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.out' })
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
    if (!accounts.length || !rowRefs.current[0]) {
      return
    }

    gsap.fromTo(
      rowRefs.current[0],
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out' },
    )
  }, [accounts.length])

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
            <button type="button" className="ua-control ua-clickable rounded-lg border border-[#1e78c8]/45 bg-gradient-to-r from-[#124785] to-[#1e78c8] px-5 py-2 text-base font-semibold text-white lg:text-lg">
              Total : 0
            </button>
            <div ref={addUserMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsAddUserOpen((prev) => !prev)}
                className="ua-control ua-clickable flex items-center gap-1 rounded-lg border border-[#1e78c8]/45 bg-gradient-to-r from-[#124785] to-[#1e78c8] px-5 py-2 text-base font-semibold text-white lg:text-lg"
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
                      className="ua-clickable block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#2f3e57] transition hover:bg-[#e8f1ff] hover:text-[#124785]"
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
                className="ua-control ua-clickable flex items-center gap-1 rounded-lg border border-[#1e78c8]/45 bg-gradient-to-r from-[#124785] to-[#1e78c8] px-5 py-2 text-base font-semibold text-white lg:text-lg"
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
                      className="ua-clickable block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#2f3e57] transition hover:bg-[#e8f1ff] hover:text-[#124785]"
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
              className="ua-control ua-clickable rounded-lg border border-[#1e78c8]/45 bg-gradient-to-r from-[#124785] to-[#1e78c8] p-2.5 text-white"
            >
              <IconFilter />
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="ua-filter-overlay fixed inset-0 z-[260] flex items-center justify-center bg-[#0f2244]/22 px-4 py-6 backdrop-blur-[2px]">
            <div ref={filterPanelRef} className="w-full max-w-4xl overflow-visible rounded-xl border border-[#c9d3e8] bg-[#f7f9fd] shadow-2xl shadow-[#1f365d]/15">
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
                      ref={confirmationButtonRef}
                      type="button"
                      onClick={() => setIsConfirmationOpen((prev) => !prev)}
                      className="ua-clickable flex w-full items-center justify-between rounded-md border border-[#b8c4d8] bg-white px-4 py-2.5 text-left text-base text-[#1f2f45] transition hover:border-[#9fb0cc] focus:border-[#7f8cff]"
                    >
                      <span className={filterValues.confirmation === 'Select' ? 'text-[#5f6d82]' : ''}>{filterValues.confirmation}</span>
                      <span className={`transition ${isConfirmationOpen ? 'rotate-180' : ''}`}>
                        <IconChevron />
                      </span>
                    </button>
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
                  className="ua-clickable ua-filter-action rounded-lg border border-[#6f73ff] bg-white px-6 py-2 text-xl font-semibold text-[#6f73ff] transition hover:bg-[#eef0ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsConfirmationOpen(false)
                    setIsFilterOpen(false)
                  }}
                  className="ua-clickable ua-filter-action rounded-lg bg-gradient-to-r from-[#6f73ff] to-[#6a6eea] px-7 py-2 text-xl font-semibold text-white transition hover:brightness-105"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {isFilterOpen && isConfirmationOpen && (
          <div
            ref={confirmationDropdownRef}
            style={{ top: confirmationDropdownPos.top, left: confirmationDropdownPos.left, width: confirmationDropdownPos.width }}
            className="fixed z-[1000] max-h-56 overflow-y-auto rounded-md border border-[#c7d0df] bg-white shadow-2xl"
          >
            {confirmationOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setFilterField('confirmation', option)
                  setIsConfirmationOpen(false)
                }}
                className="ua-clickable block w-full px-4 py-2 text-left text-base text-[#1f2f45] hover:bg-[#e7edf5]"
              >
                {option}
              </button>
            ))}
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
                  className="ua-clickable ua-add-user-field text-4xl font-bold leading-none text-white/80 transition hover:text-white"
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
                    <select
                      value={addUserFormValues.countryCode}
                      onChange={(event) => setAddUserField('countryCode', event.target.value)}
                      className="max-w-[170px] border-0 bg-transparent pr-2 text-base text-[#2d4568] outline-none"
                    >
                      {countryPhoneOptions.map((option) => (
                        <option key={`${option.country}-${option.code}`} value={option.code}>
                          {option.flag} {option.country} ({option.code})
                        </option>
                      ))}
                    </select>
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
                  onClick={handleSaveUser}
                  className="ua-clickable ua-add-user-action rounded-md bg-[#1d73ce] px-5 py-2 text-lg font-semibold text-white transition hover:brightness-110"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div ref={tableRef} className="mt-6 overflow-x-auto overflow-y-hidden rounded-2xl border border-[#6d64f8]/20 bg-white/70 shadow-2xl shadow-[#2f3fa9]/12 backdrop-blur-xl">
          <div className="grid min-w-[980px] grid-cols-[2fr_1.4fr_1fr_1fr_0.8fr_0.6fr] bg-[linear-gradient(90deg,#124785_0%,#1e78c8_56%,#30a7c2_100%)] text-sm font-bold tracking-wide text-white lg:text-base">
            <div className="px-6 py-5">Name/Email/Phone</div>
            <div className="px-6 py-5">Sell.Do Lead ID</div>
            <div className="px-6 py-5">Payment</div>
            <div className="px-6 py-5">Role</div>
            <div className="px-6 py-5">Status</div>
            <div className="px-6 py-5">Actions</div>
          </div>

          <div className="divide-y divide-[#dbe4f7] bg-white/90">
            {accounts.length === 0 ? (
              <div className="ua-row grid min-w-[980px] grid-cols-[2fr_1.4fr_1fr_1fr_0.8fr_0.6fr] px-2 py-4">
                <div className="col-span-6 px-4 py-3 text-center text-sm font-semibold text-[#6e83a6]">No users added yet.</div>
              </div>
            ) : (
              accounts.map((row, index) => (
                <div
                  key={row.id}
                  ref={(node) => {
                    rowRefs.current[index] = node
                  }}
                  className="ua-row grid min-w-[980px] grid-cols-[2fr_1.4fr_1fr_1fr_0.8fr_0.6fr] items-center px-2 py-2 [transform-style:preserve-3d]"
                >
                  <div className="px-4 py-3">
                    <p className="text-base font-semibold text-[#213a64]">{row.name}</p>
                    <p className="text-sm text-[#6e83a6]">{`${row.email} | ${row.countryCode || ''} ${row.phone}`.trim()}</p>
                  </div>
                  <div className="px-4 py-3 text-sm font-semibold text-[#344f7f]">{row.sellDoLeadId}</div>
                  <div className="px-4 py-3 text-sm font-semibold text-[#344f7f]">{row.payment}</div>
                  <div className="px-4 py-3 text-sm font-semibold text-[#344f7f]">{row.role}</div>
                  <div className="px-4 py-3 text-sm font-semibold text-[#344f7f]">{row.status}</div>
                  <div className="relative px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => setOpenActionIndex(openActionIndex === index ? null : index)}
                      className="ua-clickable rounded-md border border-[#cfd9ff] bg-white px-3 py-1 text-lg font-bold leading-none text-[#6576c9] hover:bg-[#f4f7ff]"
                    >
                      ...
                    </button>
                    {openActionIndex === index && (
                      <div
                        ref={actionMenuRef}
                        className="absolute bottom-[calc(100%+0.25rem)] right-3 z-[100] w-48 rounded-lg border border-[#d6def5] bg-white p-1.5 shadow-xl"
                      >
                        {['Show', 'Add Follow'].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setOpenActionIndex(null)
                              if (option === 'Show') {
                                setViewingAccountIndex(index)
                                setIsDetailsOpen(true)
                              } else {
                                handleOpenFollowUp(row)
                              }
                            }}
                            className="ua-clickable block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-[#304769] hover:bg-[#eef3ff]"
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
        </div>

        {isDetailsOpen && viewingAccountIndex !== null && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#0a1222]/45 p-4 backdrop-blur-sm">
            <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-[#c9d3f8] bg-[#f4f6fb] shadow-2xl shadow-[#1a1f5f]/35">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#124785] to-[#1e78c8] px-6 py-4">
                <h2 className="text-2xl font-bold text-white">User Account Details</h2>
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="ua-clickable text-3xl font-bold text-white/80 transition hover:text-white"
                >
                  &times;
                </button>
              </div>
              <div className="max-h-[75vh] overflow-y-auto p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { label: 'Name', value: accounts[viewingAccountIndex].name },
                    { label: 'Email', value: accounts[viewingAccountIndex].email },
                    { label: 'Phone', value: `${accounts[viewingAccountIndex].countryCode || ''} ${accounts[viewingAccountIndex].phone}`.trim() },
                    { label: 'Sell.Do Lead ID', value: accounts[viewingAccountIndex].sellDoLeadId },
                    { label: 'Role', value: accounts[viewingAccountIndex].role },
                    { label: 'Payment Status', value: accounts[viewingAccountIndex].payment },
                    { label: 'Status', value: accounts[viewingAccountIndex].status },
                  ].map((item) => (
                    <div key={item.label} className="border-b border-[#dbe4f7] pb-2">
                        <div className="text-xs font-semibold uppercase tracking-wider text-[#6e83a6]">{item.label}</div>
                        <div className="mt-1 text-lg font-semibold text-[#213a64]">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-[#d2dbee] bg-white/75 px-6 py-4 text-right">
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="ua-clickable rounded-lg bg-[#1d73ce] px-6 py-2 font-bold text-white shadow-lg transition hover:brightness-110"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isFollowUpFormOpen && (
          <div className="ua-followup-overlay fixed inset-0 z-[290] flex items-center justify-center bg-[#0f2244]/30 px-4 py-6 backdrop-blur-[2px]">
            <div ref={followUpFormRef} className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-xl border border-[#1e78c8]/40 bg-[#f4f6fb] shadow-2xl shadow-[#1a1f5f]/35">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#124785] to-[#1e78c8] px-5 py-4">
                <h2 className="ua-followup-field text-2xl font-semibold text-white">Add Follow Up</h2>
                <button
                  type="button"
                  onClick={() => setIsFollowUpFormOpen(false)}
                  className="ua-clickable ua-followup-field text-4xl font-bold leading-none text-white/80 transition hover:text-white"
                >
                  &times;
                </button>
              </div>

              <div className="grid gap-5 p-5 md:grid-cols-2">
                <div className="ua-followup-field space-y-2">
                  <label className="text-sm font-semibold text-[#1f3557]">Name</label>
                  <input
                    type="text"
                    disabled
                    value={followUpFormValues.name}
                    className="w-full rounded-md border border-[#c6d4ea] bg-[#e1e8f5] px-4 py-2 text-base text-[#566579] outline-none"
                  />
                </div>

                <div className="ua-followup-field space-y-2">
                  <label className="text-sm font-semibold text-[#1f3557]">Email</label>
                  <input
                    type="text"
                    disabled
                    value={followUpFormValues.email}
                    className="w-full rounded-md border border-[#c6d4ea] bg-[#e1e8f5] px-4 py-2 text-base text-[#566579] outline-none"
                  />
                </div>

                <div className="ua-followup-field space-y-2">
                  <label className="text-sm font-semibold text-[#1f3557]">Phone</label>
                  <input
                    type="text"
                    disabled
                    value={followUpFormValues.phone}
                    className="w-full rounded-md border border-[#c6d4ea] bg-[#e1e8f5] px-4 py-2 text-base text-[#566579] outline-none"
                  />
                </div>

                <div className="ua-followup-field space-y-2">
                  <label className="text-sm font-semibold text-[#1f3557]">Sell.Do Lead ID</label>
                  <input
                    type="text"
                    value={followUpFormValues.sellDoLeadId}
                    onChange={(e) => setFollowUpFormValues({...followUpFormValues, sellDoLeadId: e.target.value})}
                    className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2 text-base text-[#2d4568] outline-none focus:border-[#7d88ff]"
                  />
                </div>

                <div className="ua-followup-field space-y-2">
                  <label className="text-sm font-semibold text-[#1f3557]">Project</label>
                  <input
                    type="text"
                    value={followUpFormValues.project}
                    onChange={(e) => setFollowUpFormValues({...followUpFormValues, project: e.target.value})}
                    placeholder="e.g. Mountain View Estates"
                    className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2 text-base text-[#2d4568] outline-none focus:border-[#7d88ff]"
                  />
                </div>

                <div className="ua-followup-field space-y-2">
                  <label className="text-sm font-semibold text-[#1f3557]">Lead Stage</label>
                  <select
                    value={followUpFormValues.leadStage}
                    onChange={(e) => setFollowUpFormValues({...followUpFormValues, leadStage: e.target.value})}
                    className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2 text-base text-[#2d4568] outline-none focus:border-[#7d88ff]"
                  >
                    <option>Enquiry Received</option>
                    <option>Visit Done</option>
                    <option>Interested</option>
                    <option>Not Interested</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end border-t border-[#d2dbee] bg-white/75 px-5 py-4">
                <button
                  type="button"
                  onClick={handleSaveFollowUp}
                  className="ua-clickable ua-followup-action rounded-md bg-[#1d73ce] px-6 py-2 text-lg font-semibold text-white transition hover:brightness-110"
                >
                  Save to Leads
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default UserAccount
