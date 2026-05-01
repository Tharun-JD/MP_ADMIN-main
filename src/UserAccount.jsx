import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

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

const initialAccounts = []

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

function UserAccount({ onBackToDashboard, onOpenUserAccount, onOpenLeadActive, onOpenChannelPartners, onOpenEmails, onOpenSms, onOpenReports, onSignOut }) {
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('mp_user_accounts_v4')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.length > 0) return parsed
      } catch (e) {
        console.error('Error loading accounts', e)
      }
    }
    return initialAccounts
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
      sellDoLeadId: '',
      timeZone: '(GMT+05:30) Mumbai',
    }
  })
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false)
  const [countryCodeSearch, setCountryCodeSearch] = useState('')
  const countryCodeDropdownRef = useRef(null)
  const [viewingAccountIndex, setViewingAccountIndex] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [openActionIndex, setOpenActionIndex] = useState(null)
  const [menuAnchorRect, setMenuAnchorRect] = useState(null)
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
    remark: '',
  })

  useEffect(() => {
    localStorage.setItem('mp_user_accounts_v3', JSON.stringify(accounts))
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
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target) && !event.target.closest('.ua-action-trigger')) {
        setOpenActionIndex(null)
        setMenuAnchorRect(null)
      }
      if (followUpFormRef.current && !followUpFormRef.current.contains(event.target)) {
        // Only close if not clicking outside modal
      }
      if (countryCodeDropdownRef.current && !countryCodeDropdownRef.current.contains(event.target) && !event.target.closest('.ua-cc-trigger')) {
        setIsCountryCodeOpen(false)
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
      sellDoLeadId: addUserFormValues.sellDoLeadId?.trim() ? addUserFormValues.sellDoLeadId : '-',
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
    const currentLeads = JSON.parse(localStorage.getItem('mp_leads_v2') || '[]')
    const existingIndex = currentLeads.findIndex((l) => l.name === followUpFormValues.name)

    if (existingIndex !== -1) {
      // Update existing lead
      currentLeads[existingIndex] = {
        ...currentLeads[existingIndex],
        ...followUpFormValues,
        // We update the lead but keep its original ID and registration date if they exist
      }
    } else {
      // Add new lead if not found
      const newLead = {
        id: Date.now(),
        ...followUpFormValues,
        registeredAt: new Date().toISOString().split('T')[0],
        validityPeriod: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      }
      currentLeads.unshift(newLead)
    }

    localStorage.setItem('mp_leads_v2', JSON.stringify(currentLeads))

    setAccounts((prevAccounts) => {
      const updatedAccounts = prevAccounts.map((acc) =>
        acc.name === followUpFormValues.name
          ? { ...acc, sellDoLeadId: followUpFormValues.sellDoLeadId || acc.sellDoLeadId }
          : acc
      )
      // Force write to localStorage immediately to prevent unmount race condition
      localStorage.setItem('mp_user_accounts_v3', JSON.stringify(updatedAccounts))
      return updatedAccounts
    })

    setIsFollowUpFormOpen(false)
    // Automatically navigate to Lead Activities page to show the update
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
    <main ref={pageRef} className="relative min-h-screen overflow-x-hidden bg-[#f8fafc] text-[#0f172a]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_36px,rgba(129,144,177,0.08)_37px),linear-gradient(90deg,transparent_36px,rgba(129,144,177,0.08)_37px)] bg-[size:37px_37px]" />
        <div ref={(n) => (glowRefs.current[0] = n)} className="absolute -left-14 top-12 h-56 w-56 rounded-full bg-[#6e70ff]/15 blur-3xl" />
        <div ref={(n) => (glowRefs.current[1] = n)} className="absolute right-0 top-16 h-64 w-64 rounded-full bg-[#8f6ce0]/15 blur-3xl" />
      </div>

      <Navbar
        activePage="user-account"
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
                    <IconUsers />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-[#1e293b]">User Accounts</h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">Transaction Monitoring Portal</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full bg-[#f8fafc] p-1.5 border border-[#f1f5f9]">
                  <span className="px-3 text-[11px] font-bold text-[#94a3b8]">VIEW:</span>
                  <button className="rounded-full bg-white px-4 py-1.5 text-[11px] font-bold text-[#6366f1] shadow-sm border border-[#f1f5f9]">All Users</button>
                </div>

                <div ref={addUserMenuRef} className="relative">
                  <button
                    onClick={() => setIsAddUserOpen((prev) => !prev)}
                    className="flex items-center gap-2 rounded-xl bg-[#6366f1] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-[#4f46e5] active:scale-95"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add User
                  </button>
                  {isAddUserOpen && (
                    <div className="ua-add-user-menu absolute right-0 top-[calc(100%+0.5rem)] z-[100] w-64 overflow-hidden rounded-2xl border border-[#f1f5f9] bg-white p-2 shadow-2xl animate-elastic-pop">
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
                          className="flex w-full items-center rounded-xl px-4 py-2.5 text-left text-xs font-bold text-[#64748b] transition hover:bg-[#f0f4ff] hover:text-[#6366f1]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
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
                      {['Name / Email / Phone', 'Sell.Do Lead ID', 'Payment', 'Role', 'Status', 'Actions'].map((h) => (
                        <th key={h} className="pb-6 text-[10px] font-black uppercase tracking-[0.15em] text-[#94a3b8] px-4 first:pl-0">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-24">
                          <div className="flex flex-col items-center justify-center text-center">
                            <div className="relative mb-6">
                              <div className="absolute inset-0 scale-150 rounded-full bg-[#6366f1]/5 blur-2xl animate-pulse" />
                              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#f0f4ff] text-[#6366f1]">
                                <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                  <circle cx="9" cy="7" r="4" />
                                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                                </svg>
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#1e293b]">No users found</h3>
                            <p className="mt-2 text-sm text-[#94a3b8]">Get started by adding your first administrative user.</p>
                            <button
                              onClick={() => setIsAddUserOpen(true)}
                              className="mt-8 rounded-full bg-[#2549b8] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-200 transition hover:bg-[#1e3a8a] active:scale-95"
                            >
                              + Add User Now
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      accounts.map((row, index) => (
                        <tr key={row.id || index} className="group transition-colors hover:bg-[#f8fafc]/80">
                          <td className="py-5 pr-4 pl-0">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0f4ff] to-[#e0e7ff] text-sm font-bold text-[#6366f1]">
                                {row.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-[#1e293b]">{row.name}</div>
                                <div className="text-[10px] font-medium text-[#94a3b8]">{row.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-4 text-xs font-bold text-[#64748b]">#{row.sellDoLeadId || '---'}</td>
                          <td className="py-5 px-4 text-xs font-bold text-[#64748b]">{row.payment}</td>
                          <td className="py-5 px-4">
                            <span className="inline-flex rounded-full bg-[#eff6ff] px-3 py-1 text-[10px] font-bold text-[#2563eb] border border-[#dbeafe]">
                              {row.role}
                            </span>
                          </td>
                          <td className="py-5 px-4">
                            <span className="inline-flex rounded-full bg-[#f8fafc] px-3 py-1 text-[10px] font-bold text-[#64748b] border border-[#f1f5f9]">
                              {row.status}
                            </span>
                          </td>
                          <td className="py-5 px-4">
                            <button
                              onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect()
                                setMenuAnchorRect({ top: rect.bottom + window.scrollY, left: rect.right + window.scrollX })
                                setOpenActionIndex(index)
                              }}
                              className="ua-action-trigger flex h-8 w-8 items-center justify-center rounded-lg text-[#94a3b8] transition hover:bg-[#f1f5f9] hover:text-[#1e293b]"
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
                  <p className="mt-1 text-xs font-bold text-[#1e293b]">{accounts.length} of {accounts.length} Users</p>
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

        {/* Floating Add Button */}
        {accounts.length > 0 && (
          <div className="fixed top-28 right-8 z-[100] group">
            <button
              onClick={() => setIsAddUserOpen((prev) => !prev)}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6366f1] text-white shadow-2xl shadow-indigo-300 transition hover:bg-[#4f46e5] hover:scale-105 active:scale-95"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            {isAddUserOpen && (
              <div className="absolute top-[calc(100%+0.5rem)] right-0 w-64 overflow-hidden rounded-2xl border border-[#f1f5f9] bg-white p-2 shadow-2xl animate-elastic-pop">
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
                    className="flex w-full items-center rounded-xl px-4 py-2.5 text-left text-xs font-bold text-[#64748b] transition hover:bg-[#f0f4ff] hover:text-[#6366f1]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modals & Overlays */}
        {isFilterOpen && (
          <div className="ua-filter-overlay fixed inset-0 z-[260] flex items-center justify-center bg-[#0f172a]/20 px-4 py-6 backdrop-blur-sm">
            <div ref={filterPanelRef} className="w-full max-w-4xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl animate-elastic-pop">
              <div className="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6 rounded-t-[2.5rem]">
                <h2 className="text-2xl font-black text-[#1e293b]">Filter Users</h2>
                <button onClick={() => setIsFilterOpen(false)} className="text-[#94a3b8] hover:text-[#ef4444]">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid gap-6 p-8 md:grid-cols-2">
                <div className="ua-filter-field space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Name/Email/Phone</label>
                  <input
                    type="text"
                    value={filterValues.nameEmailPhone}
                    onChange={(e) => setFilterField('nameEmailPhone', e.target.value)}
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1]"
                  />
                </div>
                <div className="ua-filter-field space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Role</label>
                  <input
                    type="text"
                    value={filterValues.role}
                    onChange={(e) => setFilterField('role', e.target.value)}
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 border-t border-[#e2e8f0] bg-[#f8fafc]/50 px-8 py-6 rounded-b-[2.5rem]">
                <button onClick={resetFilter} className="rounded-xl px-6 py-2.5 text-sm font-bold text-[#64748b] hover:text-[#1e293b]">Reset</button>
                <button onClick={() => setIsFilterOpen(false)} className="rounded-xl bg-[#6366f1] px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-[#4f46e5]">Apply Filters</button>
              </div>
            </div>
          </div>
        )}

        {isAddUserFormOpen && (
          <div className="ua-add-user-overlay fixed inset-0 z-[290] flex items-center justify-center bg-[#0f172a]/40 px-4 py-6 backdrop-blur-sm">
            <div ref={addUserFormRef} className="w-full max-w-5xl rounded-[2.5rem] bg-white shadow-2xl animate-elastic-pop">
              <div className="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6 rounded-t-[2.5rem]">
                <div>
                  <h2 className="text-2xl font-black text-[#1e293b]">Add New User</h2>
                  <p className="text-xs font-bold text-[#6366f1] uppercase tracking-wider">{selectedAddUserRole}</p>
                </div>
                <button onClick={() => setIsAddUserFormOpen(false)} className="text-[#94a3b8] hover:text-[#ef4444]">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid gap-6 p-8 md:grid-cols-2">
                <div className="ua-add-user-field space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">First Name</label>
                  <input
                    type="text"
                    value={addUserFormValues.firstName}
                    onChange={(e) => setAddUserField('firstName', e.target.value)}
                    placeholder="Enter first name"
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-4 text-base font-semibold text-[#1e293b] outline-none transition-all focus:border-[#6366f1] focus:bg-white"
                  />
                </div>
                <div className="ua-add-user-field space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Last Name</label>
                  <input
                    type="text"
                    value={addUserFormValues.lastName}
                    onChange={(e) => setAddUserField('lastName', e.target.value)}
                    placeholder="Enter last name"
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-4 text-base font-semibold text-[#1e293b] outline-none transition-all focus:border-[#6366f1] focus:bg-white"
                  />
                </div>
                <div className="ua-add-user-field space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Email Address</label>
                  <input
                    type="email"
                    value={addUserFormValues.email}
                    onChange={(e) => setAddUserField('email', e.target.value)}
                    placeholder="email@example.com"
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-4 text-base font-semibold text-[#1e293b] outline-none transition-all focus:border-[#6366f1] focus:bg-white"
                  />
                </div>
                <div className="ua-add-user-field space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCountryCodeOpen(!isCountryCodeOpen)}
                        className="ua-cc-trigger flex items-center gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-4 text-sm font-bold text-[#1e293b] outline-none transition-all hover:bg-white focus:border-[#6366f1]"
                        style={{ minWidth: '130px' }}
                      >
                        <span className="text-[11px] font-black uppercase tracking-widest text-[#64748b]">{countryPhoneOptions.find(opt => opt.code === addUserFormValues.countryCode)?.iso}</span>
                        <span className="text-lg font-black">{addUserFormValues.countryCode}</span>
                        <IconChevron className={`h-4 w-4 transition-transform duration-300 ${isCountryCodeOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isCountryCodeOpen && (
                        <div
                          ref={countryCodeDropdownRef}
                          className="absolute left-0 top-full z-[300] mt-2 w-80 overflow-hidden rounded-2xl border border-[#f1f5f9] bg-white p-2 shadow-2xl animate-fall"
                        >
                          <div className="mb-2 px-2 pt-1">
                            <input
                              type="text"
                              placeholder="Search country or code..."
                              autoFocus
                              value={countryCodeSearch}
                              onChange={(e) => setCountryCodeSearch(e.target.value)}
                              className="w-full rounded-xl border border-[#f1f5f9] bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#0f172a] outline-none focus:border-[#6366f1]"
                            />
                          </div>
                          <div className="max-h-80 overflow-y-auto no-scrollbar">
                            {countryPhoneOptions
                              .filter(opt => opt.country.toLowerCase().includes(countryCodeSearch.toLowerCase()) || opt.code.includes(countryCodeSearch) || opt.iso.toLowerCase().includes(countryCodeSearch.toLowerCase()))
                              .map(opt => (
                                <button
                                  key={`${opt.country}-${opt.code}`}
                                  type="button"
                                  onClick={() => {
                                    setAddUserField('countryCode', opt.code)
                                    setIsCountryCodeOpen(false)
                                    setCountryCodeSearch('')
                                  }}
                                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-bold text-[#475569] transition hover:bg-[#f0f4ff] hover:text-[#6366f1]"
                                >
                                  <span className="text-xl">{opt.flag}</span>
                                  <span className="flex-1 font-bold text-[#1e293b]">{opt.country}</span>
                                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-black text-[#94a3b8] uppercase">{opt.iso}</span>
                                  <span className="font-black text-[#0f172a]">{opt.code}</span>
                                </button>
                              ))
                            }
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      value={addUserFormValues.phone}
                      onChange={(e) => setAddUserField('phone', e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-4 text-base font-semibold text-[#1e293b] outline-none transition-all focus:border-[#6366f1] focus:bg-white"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end border-t border-[#f1f5f9] bg-[#f8fafc]/50 px-8 py-6 rounded-b-[2.5rem]">
                <button onClick={handleSaveUser} className="rounded-xl bg-[#6366f1] px-10 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-[#4f46e5]">Create Account</button>
              </div>
            </div>
          </div>
        )}

        {isDetailsOpen && viewingAccountIndex !== null && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#0f172a]/40 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-[2.5rem] bg-white shadow-2xl animate-elastic-pop">
              <div className="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6 rounded-t-[2.5rem]">
                <h2 className="text-2xl font-black text-[#1e293b]">User Details</h2>
                <button onClick={() => setIsDetailsOpen(false)} className="text-[#94a3b8] hover:text-[#ef4444]">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { label: 'Name', value: accounts[viewingAccountIndex].name },
                    { label: 'Email', value: accounts[viewingAccountIndex].email },
                    { label: 'Phone', value: `${accounts[viewingAccountIndex].countryCode || ''} ${accounts[viewingAccountIndex].phone}`.trim() },
                    { label: 'Sell.Do Lead ID', value: accounts[viewingAccountIndex].sellDoLeadId },
                    { label: 'Role', value: accounts[viewingAccountIndex].role },
                    { label: 'Status', value: accounts[viewingAccountIndex].status },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#94a3b8]">{item.label}</p>
                      <p className="text-sm font-bold text-[#1e293b]">{item.value || '---'}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end border-t border-[#f1f5f9] bg-[#f8fafc]/50 px-8 py-6 rounded-b-[2.5rem]">
                  <button onClick={() => setIsDetailsOpen(false)} className="rounded-xl bg-[#f1f5f9] px-8 py-2.5 text-sm font-bold text-[#64748b] hover:bg-[#e2e8f0]">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isFollowUpFormOpen && (
          <div className="ua-followup-overlay fixed inset-0 z-[295] flex items-center justify-center bg-[#0f172a]/40 px-4 py-6 backdrop-blur-sm">
            <div ref={followUpFormRef} className="w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl animate-elastic-pop">
              <div className="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6 rounded-t-[2.5rem]">
                <h2 className="text-2xl font-black text-[#1e293b]">Add Follow-up</h2>
                <button onClick={() => setIsFollowUpFormOpen(false)} className="text-[#94a3b8] hover:text-[#ef4444]">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-6 p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Lead Stage</label>
                    <select
                      value={followUpFormValues.leadStage}
                      onChange={(e) => setFollowUpFormValues({ ...followUpFormValues, leadStage: e.target.value })}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1]"
                    >
                      <option>Fresh</option>
                      <option>Enquiry Received</option>
                      <option>Visit Done</option>
                      <option>Interested</option>
                      <option>Not Interested</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Project</label>
                    <input
                      type="text"
                      value={followUpFormValues.project}
                      onChange={(e) => setFollowUpFormValues({ ...followUpFormValues, project: e.target.value })}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Lead Status</label>
                    <select
                      value={followUpFormValues.leadStatus}
                      onChange={(e) => setFollowUpFormValues({ ...followUpFormValues, leadStatus: e.target.value })}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1]"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Closed</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Count Status</label>
                    <select
                      value={followUpFormValues.countStatus}
                      onChange={(e) => setFollowUpFormValues({ ...followUpFormValues, countStatus: e.target.value })}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1]"
                    >
                      <option>Pending</option>
                      <option>Count Given</option>
                      <option>No Count</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Remarks</label>
                  <textarea
                    rows={3}
                    value={followUpFormValues.remark}
                    onChange={(e) => setFollowUpFormValues({ ...followUpFormValues, remark: e.target.value })}
                    className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#6366f1] resize-none"
                  />
                </div>
                <div className="flex justify-end border-t border-[#f1f5f9] bg-[#f8fafc]/50 px-8 py-6 rounded-b-[2.5rem]">
                  <button onClick={handleSaveFollowUp} className="rounded-xl bg-[#6366f1] px-10 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-[#4f46e5]">Save to Leads</button>
                </div>
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
              top: `${menuAnchorRect.top - window.scrollY + 12}px`,
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
                  setViewingAccountIndex(openActionIndex)
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
                  handleOpenFollowUp(accounts[openActionIndex])
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
      </section>
    </main>
  )
}

export default UserAccount
