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

function IconX() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function UserAccount({
  onBackToDashboard,
  onOpenUserAccount,
  onOpenLeadActive,
  onOpenChannelPartners,
  onOpenEmails,
  onOpenSms,
  onOpenReports,
  onOpenCpApprove,
  onSignOut,
}) {
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
    localStorage.setItem('mp_user_accounts_v4', JSON.stringify(accounts))
  }, [accounts])

  // Fetch partner data from mock API to merge with accounts
  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const [custRes, addrRes] = await Promise.all([
          fetch('http://localhost:3000/customerDetails').catch(() => null),
          fetch('http://localhost:3000/addressInfo').catch(() => null)
        ])
        
        const custData = custRes?.ok ? await custRes.json() : []
        const addrData = addrRes?.ok ? await addrRes.json() : []
        
        if (custData.length === 0 && addrData.length === 0) return
        
        setAccounts(prevAccounts => {
          let hasChanges = false
          const newAccounts = prevAccounts.map(acc => {
            // Match by email to find the corresponding partner data
            const matchedCust = custData.reverse().find(c => c.userEmail === acc.email || c.email === acc.email)
            const matchedAddr = addrData.reverse().find(a => a.userEmail === acc.email)
            
            if (!matchedCust && !matchedAddr) return acc
            
            hasChanges = true
            return {
              ...acc,
              companyName: matchedCust?.cpCompany || acc.companyName,
              rera: matchedCust?.rera || acc.rera,
              pan: matchedCust?.pan || acc.pan,
              bankName: matchedCust?.bankName || acc.bankName,
              accountNumber: matchedCust?.accountNumber || acc.accountNumber,
              ifsc: matchedCust?.ifsc || acc.ifsc,
              accountType: matchedCust?.accountType || acc.accountType,
              gstNumber: matchedCust?.gstNumber || acc.gstNumber,
              house: matchedAddr?.house || acc.house,
              street: matchedAddr?.street || acc.street,
              city: matchedAddr?.city || acc.city,
              state: matchedAddr?.state || acc.state,
              country: matchedAddr?.country || acc.country,
              zip: matchedAddr?.zip || acc.zip,
            }
          })
          
          return hasChanges ? newAccounts : prevAccounts
        })
      } catch (err) {
        console.error('Failed to load partner API data:', err)
      }
    }
    
    fetchPartnerData()
  }, [])

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
      if (countryCodeDropdownRef.current && !countryCodeDropdownRef.current.contains(event.target) && !event.target.closest('.ua-cc-trigger')) {
        setIsCountryCodeOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    if (!isAddUserOpen) return
    gsap.fromTo(
      '.ua-add-user-menu',
      { y: -8, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.22, ease: 'power2.out' },
    )
  }, [isAddUserOpen])

  useEffect(() => {
    if (!isAddUserFormOpen || !addUserFormRef.current) return
    const panel = addUserFormRef.current
    const fields = panel.querySelectorAll('.ua-add-user-field')
    const actions = panel.querySelectorAll('.ua-add-user-action')
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .fromTo('.ua-add-user-overlay', { opacity: 0 }, { opacity: 1, duration: 0.22 })
      .fromTo(panel, { y: 26, opacity: 0, scale: 1.05, rotateX: -6, transformOrigin: '50% 0%' }, { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.4 }, '-=0.05')
      .fromTo(fields, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.2 }, '-=0.2')
      .fromTo(actions, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.2 }, '-=0.12')
    return () => tl.kill()
  }, [isAddUserFormOpen])

  useEffect(() => {
    if (!isFollowUpFormOpen || !followUpFormRef.current) return
    const panel = followUpFormRef.current
    const fields = panel.querySelectorAll('.ua-followup-field')
    const actions = panel.querySelectorAll('.ua-followup-action')
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .fromTo('.ua-followup-overlay', { opacity: 0 }, { opacity: 1, duration: 0.22 })
      .fromTo(panel, { y: 26, opacity: 0, scale: 1.05, rotateX: -6, transformOrigin: '50% 0%' }, { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.4 }, '-=0.05')
      .fromTo(fields, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.2 }, '-=0.2')
      .fromTo(actions, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.2 }, '-=0.12')
    return () => tl.kill()
  }, [isFollowUpFormOpen])

  useEffect(() => {
    if (!isFilterOpen || !filterPanelRef.current) return
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

  const setFilterField = (field, value) => setFilterValues((prev) => ({ ...prev, [field]: value }))
  
  const resetFilter = () => {
    setFilterValues({
      nameEmailPhone: '',
      sellDoLeadId: '',
      role: '',
      confirmation: 'Select',
      registeredAt: '',
    })
    setIsFilterOpen(false)
  }

  const setAddUserField = (field, value) => setAddUserFormValues((prev) => ({ ...prev, [field]: value }))

  const resetAddUserForm = () => {
    setAddUserFormValues({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      countryCode: '+91',
      sellDoLeadId: '',
      timeZone: '(GMT+05:30) Mumbai',
    })
  }

  const handleSaveUser = () => {
    const required = ['firstName', 'lastName', 'email', 'phone']
    if (required.some((field) => !String(addUserFormValues[field] || '').trim())) return

    const isCpRole = selectedAddUserRole.includes('Channel Partner')
    const userRow = {
      id: `row-${Date.now()}`,
      name: `${addUserFormValues.firstName} ${addUserFormValues.lastName}`.trim(),
      email: addUserFormValues.email,
      phone: addUserFormValues.phone,
      countryCode: addUserFormValues.countryCode,
      sellDoLeadId: addUserFormValues.sellDoLeadId?.trim() ? addUserFormValues.sellDoLeadId : '-',
      payment: '-',
      role: selectedAddUserRole,
      status: isCpRole ? 'Pending' : 'Active',
      action: '...',
    }

    setAccounts((prev) => [userRow, ...prev])
    setIsAddUserFormOpen(false)
    setIsAddUserOpen(false)
    resetAddUserForm()
    if (isCpRole) onOpenCpApprove?.()
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
      remark: '',
    })
    setIsFollowUpFormOpen(true)
  }

  const handleSaveFollowUp = () => {
    const currentLeads = JSON.parse(localStorage.getItem('mp_leads_v3') || '[]')
    const existingIndex = currentLeads.findIndex((l) => l.name === followUpFormValues.name)
    if (existingIndex !== -1) {
      currentLeads[existingIndex] = { ...currentLeads[existingIndex], ...followUpFormValues }
    } else {
      currentLeads.unshift({ id: Date.now(), ...followUpFormValues, registeredAt: new Date().toISOString().split('T')[0], validityPeriod: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] })
    }
    localStorage.setItem('mp_leads_v3', JSON.stringify(currentLeads))
    setAccounts((prev) => prev.map((acc) => acc.name === followUpFormValues.name ? { ...acc, sellDoLeadId: followUpFormValues.sellDoLeadId || acc.sellDoLeadId } : acc))
    setIsFollowUpFormOpen(false)
  }

  const filteredAccounts = accounts.filter((acc) => {
    const search = filterValues.nameEmailPhone.toLowerCase()
    const matchesSearch = acc.name.toLowerCase().includes(search) || acc.email.toLowerCase().includes(search) || acc.phone.includes(search)
    const matchesLeadId = filterValues.sellDoLeadId ? acc.sellDoLeadId.includes(filterValues.sellDoLeadId) : true
    const matchesRole = filterValues.role ? acc.role === filterValues.role : true
    const matchesConfirmation = filterValues.confirmation !== 'Select' ? acc.status === filterValues.confirmation : true
    return matchesSearch && matchesLeadId && matchesRole && matchesConfirmation
  })

  return (
    <main ref={pageRef} className="relative min-h-screen w-full overflow-x-hidden bg-[#f8fafc] font-manrope selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar
        activePage="user-account"
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
      
      {/* Background Elements */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div ref={(el) => (glowRefs.current[0] = el)} className="absolute -left-[10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-200/20 blur-[120px]" />
        <div ref={(el) => (glowRefs.current[1] = el)} className="absolute -right-[5%] top-[20%] h-[500px] w-[500px] rounded-full bg-blue-200/20 blur-[100px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
        {/* Header Section */}
        <header ref={headerRef} className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-6">
            <div className="space-y-1.5">
              <h1 className="font-sora text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                {'User Account'.split('').map((char, i) => (
                  <span key={i} className="ua-title-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </h1>
              <p className="flex items-center gap-2 text-sm font-bold text-indigo-500 uppercase tracking-[0.25em]">
                <span className="h-1 w-8 rounded-full bg-indigo-500" />
                Access Management Hub
              </p>
            </div>
            
            <div className="hidden items-center gap-4 rounded-2xl bg-white px-6 py-2.5 shadow-sm ring-1 ring-slate-200 lg:flex">
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total</p>
                  <p className="font-sora text-xl font-black text-indigo-600 leading-none">{accounts.length}</p>
               </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setIsAddUserOpen(!isAddUserOpen)}
                className="ua-control group flex items-center gap-3 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-200 transition-all hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20">
                  <IconUsers />
                </div>
                <span>Add New User</span>
                <IconChevron />
              </button>

              {isAddUserOpen && (
                <div ref={addUserMenuRef} className="ua-add-user-menu absolute right-0 top-full z-[150] mt-3 w-64 overflow-hidden rounded-[2rem] border border-slate-100 bg-white/95 p-2 shadow-2xl backdrop-blur-xl">
                  {addUserOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedAddUserRole(opt)
                        setIsAddUserOpen(false)
                        setIsAddUserFormOpen(true)
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-slate-600 transition-all hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="ua-control flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:-translate-y-0.5 active:scale-95"
            >
              <IconFilter />
              <span>Filters</span>
            </button>
          </div>
        </header>

        {/* Table Section */}
        <div ref={tableRef} className="relative overflow-hidden rounded-[3rem] border border-white bg-white/60 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">User Profile</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity Details</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Access Role</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredAccounts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-200">
                           <IconUsers />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">No users found</h3>
                        <p className="mt-1 text-sm font-medium text-slate-400">Try adjusting your filters or add a new user to get started.</p>
                      </div>
                    </td>
                  </tr>
                )}
                {filteredAccounts.map((acc, idx) => (
                  <tr key={acc.id} ref={(el) => (rowRefs.current[idx] = el)} className="ua-row group transition-colors hover:bg-white">
                    <td className="px-8 py-7">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 font-black text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                          {acc.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-900">{acc.name}</div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ID: {String(acc.id).includes('-') ? String(acc.id).split('-')[1] : String(acc.id).slice(0, 8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-7">
                      <div className="text-sm font-bold text-slate-700">{acc.email}</div>
                      <div className="text-[10px] font-medium text-slate-400">{acc.countryCode} {acc.phone}</div>
                    </td>
                    <td className="px-8 py-7">
                      <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600 ring-1 ring-slate-200">
                        {acc.role.replace('Add ', '')}
                      </span>
                    </td>
                    <td className="px-8 py-7">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                        acc.status === 'Active' ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200' : 
                        acc.status === 'Pending' ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-200' :
                        'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
                      }`}>
                        <span className={`h-1 w-1 rounded-full ${acc.status === 'Active' ? 'bg-emerald-500' : acc.status === 'Pending' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                        {acc.status}
                      </span>
                    </td>
                    <td className="px-8 py-7">
                      <div className="flex justify-end">
                        <button
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            setMenuAnchorRect(rect)
                            setOpenActionIndex(idx)
                          }}
                          className="ua-action-trigger flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Overlays (Portals) */}
        {isFilterOpen && (
          <div className="ua-filter-overlay fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-300">
            <div ref={filterPanelRef} className="relative w-full max-w-xl rounded-[2.5rem] bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] ring-1 ring-slate-200 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
              <div className="relative flex items-center justify-between border-b border-slate-50 px-8 py-7">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-slate-900">Filter Users</h2>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Refine user list by criteria</p>
                </div>
                <button onClick={() => setIsFilterOpen(false)} className="group flex size-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500">
                  <IconX />
                </button>
              </div>
              <div className="relative grid gap-5 p-8 md:grid-cols-2">
                <div className="ua-filter-field space-y-2 md:col-span-2">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Search Name/Email/Phone</label>
                  <input type="text" value={filterValues.nameEmailPhone} onChange={(e) => setFilterField('nameEmailPhone', e.target.value)} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3 text-sm font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5" placeholder="Search users..." />
                </div>
                <div className="ua-filter-field space-y-2">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Role</label>
                  <select value={filterValues.role} onChange={(e) => setFilterField('role', e.target.value)} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3 text-sm font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 appearance-none">
                    <option value="">All Roles</option>
                    <option value="Add Administrator">Administrator</option>
                    <option value="Add Channel Partner">Channel Partner</option>
                    <option value="Add Presales">Presales</option>
                    <option value="Add Sales">Sales</option>
                  </select>
                </div>
                <div className="ua-filter-field space-y-2">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</label>
                  <select value={filterValues.confirmation} onChange={(e) => setFilterField('confirmation', e.target.value)} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3 text-sm font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 appearance-none">
                    <option value="Select">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="relative mt-2 flex items-center justify-between border-t border-slate-50 bg-slate-50/30 px-8 py-7 backdrop-blur-md rounded-b-[2.5rem]">
                <button onClick={resetFilter} className="ua-filter-action text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">Clear Filters</button>
                <button onClick={() => setIsFilterOpen(false)} className="ua-filter-action group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-indigo-600 px-8 py-3 text-sm font-black text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {isAddUserFormOpen && (
          <div className="ua-add-user-overlay fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-300">
            <div ref={addUserFormRef} className="relative w-full max-w-xl rounded-[2.5rem] bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] ring-1 ring-slate-200 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
               {/* Decorative Background Elements */}
               <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-indigo-50/50 blur-3xl" />
               <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-blue-50/50 blur-3xl" />

               <div className="relative flex items-center justify-between border-b border-slate-50 px-8 py-7">
                  <div>
                    <h2 className="text-xl font-black tracking-tight text-slate-900">Partner Registration</h2>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Create a new administrative account</p>
                  </div>
                  <button onClick={() => setIsAddUserFormOpen(false)} className="group flex size-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500">
                    <IconX />
                  </button>
               </div>

               <div className="relative grid gap-5 p-8 md:grid-cols-2">
                  <div className="ua-add-user-field space-y-2">
                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">First Name</label>
                    <div className="relative">
                      <input type="text" value={addUserFormValues.firstName} onChange={(e) => setAddUserField('firstName', e.target.value)} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3 text-sm font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5" placeholder="John" />
                    </div>
                  </div>
                  <div className="ua-add-user-field space-y-2">
                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Last Name</label>
                    <div className="relative">
                      <input type="text" value={addUserFormValues.lastName} onChange={(e) => setAddUserField('lastName', e.target.value)} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3 text-sm font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="ua-add-user-field space-y-2 md:col-span-2">
                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
                    <div className="relative">
                      <input type="email" value={addUserFormValues.email} onChange={(e) => setAddUserField('email', e.target.value)} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3 text-sm font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5" placeholder="john.doe@example.com" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="ua-add-user-field space-y-2 md:col-span-2">
                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Contact Number</label>
                    <div className="relative flex gap-3">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsCountryCodeOpen(!isCountryCodeOpen)}
                          className="ua-cc-trigger flex h-[46px] items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 text-[11px] font-black text-slate-700 transition-all hover:bg-slate-100"
                        >
                          <span className="text-base">{countryPhoneOptions.find(c => c.code === addUserFormValues.countryCode)?.flag || '🇮🇳'}</span>
                          <span>{addUserFormValues.countryCode}</span>
                          <svg className={`size-3 text-slate-400 transition-transform ${isCountryCodeOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                        {isCountryCodeOpen && (
                          <div className="absolute left-0 top-full z-[210] mt-2 max-h-60 w-64 overflow-y-auto rounded-3xl border border-slate-100 bg-white p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 no-scrollbar">
                            {countryPhoneOptions.map((opt) => (
                              <button
                                key={`${opt.country}-${opt.code}`}
                                type="button"
                                onClick={() => {
                                  setAddUserField('countryCode', opt.code)
                                  setIsCountryCodeOpen(false)
                                }}
                                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[13px] font-bold text-slate-600 transition-all hover:bg-indigo-50 hover:text-indigo-600"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-lg">{opt.flag}</span>
                                  <span>{opt.country}</span>
                                </div>
                                <span className="text-slate-400">{opt.code}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="tel"
                        value={addUserFormValues.phone}
                        onChange={(e) => setAddUserField('phone', e.target.value)}
                        className="h-[46px] w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 text-sm font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
               </div>

               <div className="relative mt-2 flex items-center justify-end border-t border-slate-50 bg-slate-50/30 px-8 py-7 backdrop-blur-md">
                  <button 
                    onClick={handleSaveUser} 
                    className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-indigo-600 px-10 py-3.5 text-sm font-black text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span>Complete Registration</span>
                    <svg className="size-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </button>
               </div>
            </div>
          </div>
        )}

        {/* Follow Up Form Overlay */}
        {isFollowUpFormOpen && (
          <div className="ua-followup-overlay fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-300">
            <div ref={followUpFormRef} className="relative w-full max-w-2xl rounded-[2.5rem] bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] ring-1 ring-slate-200 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
              <div className="relative flex items-center justify-between border-b border-slate-50 px-8 py-7">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-slate-900">Add Follow Up</h2>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Log a new interaction</p>
                </div>
                <button onClick={() => setIsFollowUpFormOpen(false)} className="group flex size-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500">
                  <IconX />
                </button>
              </div>
              <div className="relative grid gap-5 p-8 md:grid-cols-2 max-h-[60vh] overflow-y-auto no-scrollbar">
                <div className="ua-followup-field space-y-2">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Project Name</label>
                  <input type="text" value={followUpFormValues.project} onChange={(e) => setFollowUpFormValues(p => ({...p, project: e.target.value}))} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3 text-sm font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5" placeholder="Project" />
                </div>
                <div className="ua-followup-field space-y-2">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Channel Partner</label>
                  <input type="text" value={followUpFormValues.channelPartner} onChange={(e) => setFollowUpFormValues(p => ({...p, channelPartner: e.target.value}))} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3 text-sm font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5" placeholder="Partner Name" />
                </div>
                <div className="ua-followup-field space-y-2">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Lead Stage</label>
                  <select value={followUpFormValues.leadStage} onChange={(e) => setFollowUpFormValues(p => ({...p, leadStage: e.target.value}))} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3 text-sm font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 appearance-none">
                    <option value="Fresh">Fresh</option>
                    <option value="Visit Done">Visit Done</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Booked">Booked</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
                <div className="ua-followup-field space-y-2">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Lead Status</label>
                  <select value={followUpFormValues.leadStatus} onChange={(e) => setFollowUpFormValues(p => ({...p, leadStatus: e.target.value}))} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3 text-sm font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 appearance-none">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="ua-followup-field space-y-2 md:col-span-2">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Remark</label>
                  <textarea value={followUpFormValues.remark} onChange={(e) => setFollowUpFormValues(p => ({...p, remark: e.target.value}))} className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-3 text-sm font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500/30 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 min-h-[100px]" placeholder="Add your remarks here..." />
                </div>
              </div>
              <div className="relative mt-2 flex items-center justify-end border-t border-slate-50 bg-slate-50/30 px-8 py-7 backdrop-blur-md rounded-b-[2.5rem]">
                <button onClick={handleSaveFollowUp} className="ua-followup-action group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-indigo-600 px-10 py-3.5 text-sm font-black text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span>Save Follow Up</span>
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Details Overlay */}
        {isDetailsOpen && viewingAccountIndex !== null && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-2xl rounded-[2.5rem] bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] ring-1 ring-slate-200 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
              <div className="relative flex items-center justify-between border-b border-slate-50 px-8 py-7">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-slate-900">Account Details</h2>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Viewing user profile</p>
                </div>
                <button onClick={() => setIsDetailsOpen(false)} className="group flex size-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-500">
                  <IconX />
                </button>
              </div>
              <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar">
                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[2rem] bg-indigo-50 font-black text-3xl text-indigo-600 shadow-sm">
                    {accounts[viewingAccountIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{accounts[viewingAccountIndex].name}</h3>
                    <p className="text-sm font-bold text-slate-500">{accounts[viewingAccountIndex].email}</p>
                    <p className="text-sm font-bold text-slate-500">{accounts[viewingAccountIndex].countryCode} {accounts[viewingAccountIndex].phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 rounded-3xl bg-slate-50 p-6 border border-slate-100">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Role</p>
                      <p className="text-sm font-bold text-slate-900">{accounts[viewingAccountIndex].role}</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</p>
                      <span className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                        accounts[viewingAccountIndex].status === 'Active' ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200' : 
                        accounts[viewingAccountIndex].status === 'Pending' ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-200' :
                        'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
                      }`}>
                        <span className={`h-1 w-1 rounded-full ${accounts[viewingAccountIndex].status === 'Active' ? 'bg-emerald-500' : accounts[viewingAccountIndex].status === 'Pending' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                        {accounts[viewingAccountIndex].status}
                      </span>
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sell.Do Lead ID</p>
                      <p className="text-sm font-bold text-slate-900">{accounts[viewingAccountIndex].sellDoLeadId || '-'}</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">System ID</p>
                      <p className="text-sm font-bold text-slate-900">{accounts[viewingAccountIndex].id}</p>
                   </div>
                </div>

                {/* Optional Extended Details (e.g. for Channel Partners) */}
                {(accounts[viewingAccountIndex].companyName || accounts[viewingAccountIndex].bankName || accounts[viewingAccountIndex].city) && (
                  <>
                    <h3 className="pt-2 text-lg font-black text-slate-900">Partner Details</h3>
                    <div className="grid grid-cols-2 gap-6 rounded-3xl bg-slate-50 p-6 border border-slate-100">
                      {accounts[viewingAccountIndex].companyName && (
                         <div className="col-span-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company Name</p>
                            <p className="text-sm font-bold text-slate-900">{accounts[viewingAccountIndex].companyName}</p>
                         </div>
                      )}
                      {accounts[viewingAccountIndex].rera && (
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">RERA Number</p>
                            <p className="text-sm font-bold text-slate-900">{accounts[viewingAccountIndex].rera}</p>
                         </div>
                      )}
                      {accounts[viewingAccountIndex].pan && (
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">PAN</p>
                            <p className="text-sm font-bold text-slate-900 uppercase">{accounts[viewingAccountIndex].pan}</p>
                         </div>
                      )}
                    </div>

                    <h3 className="pt-2 text-lg font-black text-slate-900">Address</h3>
                    <div className="grid grid-cols-2 gap-6 rounded-3xl bg-slate-50 p-6 border border-slate-100">
                      {(accounts[viewingAccountIndex].house || accounts[viewingAccountIndex].street) && (
                        <div className="col-span-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Street Address</p>
                          <p className="text-sm font-bold text-slate-900">{accounts[viewingAccountIndex].house ? `${accounts[viewingAccountIndex].house}, ` : ''}{accounts[viewingAccountIndex].street}</p>
                        </div>
                      )}
                      {accounts[viewingAccountIndex].city && (
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">City & State</p>
                          <p className="text-sm font-bold text-slate-900">{accounts[viewingAccountIndex].city}, {accounts[viewingAccountIndex].state || '-'}</p>
                        </div>
                      )}
                      {accounts[viewingAccountIndex].country && (
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Country & Pincode</p>
                          <p className="text-sm font-bold text-slate-900">{accounts[viewingAccountIndex].country} - {accounts[viewingAccountIndex].zip || '-'}</p>
                        </div>
                      )}
                    </div>

                    <h3 className="pt-2 text-lg font-black text-slate-900">Financial Information</h3>
                    <div className="grid grid-cols-2 gap-6 rounded-3xl bg-slate-50 p-6 border border-slate-100">
                      {accounts[viewingAccountIndex].bankName && (
                         <div className="col-span-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bank Name</p>
                            <p className="text-sm font-bold text-slate-900">{accounts[viewingAccountIndex].bankName}</p>
                         </div>
                      )}
                      {accounts[viewingAccountIndex].accountNumber && (
                         <div className="col-span-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Number</p>
                            <p className="text-sm font-bold text-slate-900 font-mono">{accounts[viewingAccountIndex].accountNumber}</p>
                         </div>
                      )}
                      {accounts[viewingAccountIndex].ifsc && (
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">IFSC Code</p>
                            <p className="text-sm font-bold text-slate-900 uppercase">{accounts[viewingAccountIndex].ifsc}</p>
                         </div>
                      )}
                      {accounts[viewingAccountIndex].accountType && (
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Type</p>
                            <p className="text-sm font-bold text-slate-900">{accounts[viewingAccountIndex].accountType}</p>
                         </div>
                      )}
                      {accounts[viewingAccountIndex].gstNumber && (
                         <div className="col-span-2 mt-2 pt-6 border-t border-slate-200">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">GST Number</p>
                            <p className="text-sm font-bold text-slate-900 uppercase">{accounts[viewingAccountIndex].gstNumber}</p>
                         </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Menu Portal */}
        {openActionIndex !== null && menuAnchorRect && createPortal(
          <div ref={actionMenuRef} className="fixed z-[999] w-48 overflow-hidden rounded-2xl border border-slate-100 bg-white py-1.5 shadow-2xl animate-elastic-pop" style={{ top: `${menuAnchorRect.bottom + 8}px`, left: `${menuAnchorRect.left - 150}px` }}>
            <button onClick={() => { setViewingAccountIndex(openActionIndex); setIsDetailsOpen(true); setOpenActionIndex(null); }} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50">Show Details</button>
            <button onClick={() => { handleOpenFollowUp(accounts[openActionIndex]); setOpenActionIndex(null); }} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50">Add Follow</button>
          </div>,
          document.body
        )}
      </section>
    </main>
  )
}



export default UserAccount
