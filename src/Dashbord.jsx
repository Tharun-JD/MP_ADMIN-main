import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar.jsx'

gsap.registerPlugin(ScrollTrigger)

function Icon({ name, className = 'h-4 w-4' }) {
  const icons = {
    dashboard: (
      <path
        d="M3 13.5h8V3.5H3v10Zm10 7h8v-10h-8v10Zm0-17v5h8v-5h-8Zm-10 17h8v-5H3v5Z"
        fill="currentColor"
      />
    ),
    user: (
      <path
        d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.25c-4.28 0-7.75 2.24-7.75 5v.75h15.5v-.75c0-2.76-3.47-5-7.75-5Z"
        fill="currentColor"
      />
    ),
    lead: (
      <path
        d="M12 2.5 2.5 7.25V12c0 5.24 4.05 9.98 9.5 10.75 5.45-.77 9.5-5.5 9.5-10.75V7.25L12 2.5Zm0 4.25a2.75 2.75 0 1 1-2.75 2.75A2.75 2.75 0 0 1 12 6.75ZM7.5 16.5a4.87 4.87 0 0 1 9 0h-9Z"
        fill="currentColor"
      />
    ),
    activity: <path d="m4 17 4.5-4.5 3 3L20 7m0 0h-5m5 0v5" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    more: <path d="M5 12a1.75 1.75 0 1 0 0 .01V12Zm7 0a1.75 1.75 0 1 0 0 .01V12Zm7 0a1.75 1.75 0 1 0 0 .01V12Z" fill="currentColor" />,
    chevron: <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    overview: <path d="M4 4h7v7H4V4Zm9 0h7v4h-7V4ZM4 13h7v7H4v-7Zm9-3h7v10h-7V10Z" fill="currentColor" />,
    project: <path d="M3 6.5 12 2l9 4.5V17L12 22l-9-5V6.5Zm9-1.9L7 7l5 2.4L17 7l-5-2.4Zm-6 5.2v5.7l4.75 2.65v-5.7L6 9.8Zm13 0-4.75 2.6v5.7L19 15.5V9.8Z" fill="currentColor" />,
    safety: <path d="M12 2.5 3.5 6.8V12c0 4.9 3.15 8.93 8.5 10 5.35-1.07 8.5-5.1 8.5-10V6.8L12 2.5Zm-1.1 12.2-3-3 1.56-1.56 1.44 1.44 3.6-3.6 1.56 1.56-5.16 5.16Z" fill="currentColor" />,
    team: <path d="M7.5 11A3.5 3.5 0 1 0 4 7.5 3.5 3.5 0 0 0 7.5 11Zm9 0A3.5 3.5 0 1 0 13 7.5a3.5 3.5 0 0 0 3.5 3.5ZM2 19.5C2 17 4.46 15 7.5 15S13 17 13 19.5V21H2v-1.5Zm9 1.5v-1.5c0-1.09-.34-2.1-.93-2.97.9-.34 1.9-.53 2.93-.53 3.04 0 5.5 2 5.5 4.5V21h-7.5Z" fill="currentColor" />,
    role: <path d="M12 2.5a5.5 5.5 0 1 0 5.5 5.5A5.5 5.5 0 0 0 12 2.5Zm0 8.7A3.2 3.2 0 1 1 15.2 8 3.2 3.2 0 0 1 12 11.2ZM4 21.5a8 8 0 0 1 16 0H4Z" fill="currentColor" />,
    permission: <path d="M12 2.5 4 6v6c0 4.52 2.9 8.2 8 9.5 5.1-1.3 8-4.98 8-9.5V6l-8-3.5Zm-1.2 12.2-2.8-2.8 1.56-1.56 1.24 1.24 3.7-3.7 1.56 1.56-5.26 5.26Z" fill="currentColor" />,
    updates: <path d="M12 4a8 8 0 1 1-7.8 9.75h2.35A5.8 5.8 0 1 0 12 6.2V9l4 2.3-1.1 1.9L10 10.5V4h2Z" fill="currentColor" />,
    logs: <path d="M5 3.5h14a1.5 1.5 0 0 1 1.5 1.5v14A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5Zm2.5 4h9v2h-9v-2Zm0 4h9v2h-9v-2Zm0 4h6v2h-6v-2Z" fill="currentColor" />,
    approval: <path d="M6 3.5h9l4 4V20.5H6V3.5Zm8 1.9v3.1h3.1L14 5.4Zm-2.07 11.86 4.24-4.24-1.4-1.41-2.84 2.83-1.43-1.43-1.41 1.41 2.84 2.84Z" fill="currentColor" />,
    docs: <path d="M7 2.5h8l4 4V21.5H7V2.5Zm8 2v3h3l-3-3Zm-5 7h6v2h-6v-2Zm0 4h6v2h-6v-2Z" fill="currentColor" />,
    vendors: <path d="M4 5.5h16V8H4V5.5Zm1 4h14v10H5v-10Zm3 2v2h3v-2H8Zm0 3.5v2h3v-2H8Zm5-3.5v2h3v-2h-3Zm0 3.5v2h3v-2h-3Z" fill="currentColor" />,
    reports: <path d="M5 3.5h14a1.5 1.5 0 0 1 1.5 1.5V19A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5Zm2.5 12h2v-5h-2v5Zm3.5 0h2V8h-2v7Zm3.5 0h2v-3h-2v3Z" fill="currentColor" />,
    mail: <path d="M3.5 6.25h17A1.25 1.25 0 0 1 21.75 7.5v9A1.25 1.25 0 0 1 20.5 17.75h-17A1.25 1.25 0 0 1 2.25 16.5v-9A1.25 1.25 0 0 1 3.5 6.25Zm8.5 6.6 7.2-4.35H4.8l7.2 4.35Zm7.5-2.05-7.5 4.5-7.5-4.5v4.7h15v-4.7Z" fill="currentColor" />,
    sms: <path d="M4 4.5h16A1.5 1.5 0 0 1 21.5 6v9a1.5 1.5 0 0 1-1.5 1.5H8.5L4 21V6a1.5 1.5 0 0 1 1.5-1.5ZM7 8h10v2H7V8Zm0 4h7v2H7v-2Z" fill="currentColor" />,
    profile: <path d="M12 12a4.4 4.4 0 1 0-4.4-4.4A4.4 4.4 0 0 0 12 12Zm0 2.2c-4.13 0-7.5 2.18-7.5 4.88V21h15v-1.92c0-2.7-3.37-4.88-7.5-4.88Z" fill="currentColor" />,
    settings: <path d="m12 2.5 1.3 2.2 2.5.5.4 2.5 2 1.5-1 2.3 1 2.3-2 1.5-.4 2.5-2.5.5-1.3 2.2-2.3-1-2.3 1-1.3-2.2-2.5-.5-.4-2.5-2-1.5 1-2.3-1-2.3 2-1.5.4-2.5 2.5-.5L9.7 2.5h2.3Zm0 6.2A3.3 3.3 0 1 0 15.3 12 3.3 3.3 0 0 0 12 8.7Z" fill="currentColor" />,
    signout: <path d="M10 4.5h-4A1.5 1.5 0 0 0 4.5 6v12A1.5 1.5 0 0 0 6 19.5h4v-2H6.5v-11H10v-2Zm4.06 3.44-1.42 1.41L14.8 11.5H8v2h6.8l-2.16 2.15 1.42 1.41L18.6 12l-4.54-4.06Z" fill="currentColor" />,
    filter: <path d="M4 5.5h16v2H4v-2Zm2.5 5h11v2h-11v-2Zm3.5 5h4v2h-4v-2Z" fill="currentColor" />,
    deal: <path d="M12 3.5 3.5 8v8L12 20.5 20.5 16V8L12 3.5Zm0 2.2L17.8 8 12 10.3 6.2 8 12 5.7Zm-6 3.8 5 2v6.5l-5-2.9V9.5Zm13 0v5.6l-5 2.9v-6.5l5-2Z" fill="currentColor" />,
    booking: <path d="M6 3.5h12A2.5 2.5 0 0 1 20.5 6v12a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 18V6A2.5 2.5 0 0 1 6 3.5Zm0 4h12V6H6v1.5Zm2 3h3v3H8v-3Zm5 0h3v3h-3v-3Zm-5 5h8v2H8v-2Z" fill="currentColor" />,
    invoice: <path d="M7 2.5h10l3 3V21l-3-1.5L14 21l-2-1.5L10 21l-3-1.5L4 21V2.5h3Zm1.5 4h7v-2h-7v2Zm0 4h7v-2h-7v2Zm0 4h5v-2h-5v2Z" fill="currentColor" />,
    approved: <path d="M12 2.5a9.5 9.5 0 1 0 9.5 9.5A9.5 9.5 0 0 0 12 2.5Zm-1.35 13.35-3.1-3.1 1.56-1.56 1.54 1.54 4.25-4.25 1.56 1.56-5.81 5.81Z" fill="currentColor" />,
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

// Shared navItems are now in Navbar.jsx

function Dashbord({ 
  onSignOut, 
  onBackToDashboard, 
  onOpenUserAccount, 
  onOpenLeadActive, 
  onOpenChannelPartners, 
  onOpenEmails, 
  onOpenSms, 
  onOpenReports,
  onOpenCpApprove 
}) {
  const [openMenu, setOpenMenu] = useState(null)
  const [openWelcome, setOpenWelcome] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filterFromDate, setFilterFromDate] = useState('')
  const [filterToDate, setFilterToDate] = useState('')
  const [filterProject, setFilterProject] = useState('')
  const [isIncentiveFilterOpen, setIsIncentiveFilterOpen] = useState(false)
  const [incentiveProjectEntry, setIncentiveProjectEntry] = useState('')
  const [isChannelFilterOpen, setIsChannelFilterOpen] = useState(false)
  const [channelFromDate, setChannelFromDate] = useState('')
  const [channelToDate, setChannelToDate] = useState('')
  const [channelProject, setChannelProject] = useState('')
  const [isManagerFilterOpen, setIsManagerFilterOpen] = useState(false)
  const [managerFromDate, setManagerFromDate] = useState('')
  const [managerToDate, setManagerToDate] = useState('')
  const [managerProject, setManagerProject] = useState('')
  const [toast, setToast] = useState(null)

  // Data persistence counts
  const [leadsCount, setLeadsCount] = useState(0)
  const [partnersCount, setPartnersCount] = useState(0)
  const [accountsCount, setAccountsCount] = useState(0)

  useEffect(() => {
    // Fetch live counts from API with local fallbacks
    fetch('http://localhost:3000/leads')
      .then(res => res.json())
      .then(data => setLeadsCount(Array.isArray(data) ? data.length : 0))
      .catch(() => {
        const saved = localStorage.getItem('mp_leads_v3')
        if (saved) setLeadsCount(JSON.parse(saved).length)
      })

    fetch('http://localhost:3000/partners')
      .then(res => res.json())
      .then(data => setPartnersCount(Array.isArray(data) ? data.length : 0))
      .catch(() => {
        const saved = localStorage.getItem('mp_channel_partners_v3')
        if (saved) setPartnersCount(JSON.parse(saved).length)
      })

    // User accounts are primarily local as per architecture
    const savedAccounts = localStorage.getItem('mp_user_accounts_v4')
    if (savedAccounts) setAccountsCount(JSON.parse(savedAccounts).length)
  }, [])

  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const heroRef = useRef(null)
  const heroGlowRef = useRef(null)
  const toastRef = useRef(null)
  const toastTimerRef = useRef(null)
  const filterRef = useRef(null)
  const filterPanelRef = useRef(null)
  const incentiveRef = useRef(null)
  const incentiveFilterRef = useRef(null)
  const incentiveFilterPanelRef = useRef(null)
  const channelRef = useRef(null)
  const channelFilterRef = useRef(null)
  const channelFilterPanelRef = useRef(null)
  const managerRef = useRef(null)
  const managerFilterRef = useRef(null)
  const managerFilterPanelRef = useRef(null)
  const navBeamRefs = useRef([])
  const pageAuraRefs = useRef([])
  const orbRefs = useRef([])
  const ringRefs = useRef([])

  const metricCards = [
    { title: 'Deal Active Partners', icon: 'deal', tone: 'from-[#1a79d1] to-[#2f3fa9]' },
    { title: 'Booking Active Partners', icon: 'booking', tone: 'from-[#2f3fa9] to-[#5967d7]' },
    { title: 'Raised Invoices', icon: 'invoice', tone: 'from-[#1a79d1] to-[#1fb3b9]' },
    { title: 'Approved Invoices', icon: 'approved', tone: 'from-[#eb7a26] to-[#f29f59]' },
  ]

  const showToast = (message, tone = 'info') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
      toastTimerRef.current = null
    }
    setToast({ id: Date.now(), message, tone })
  }

  const toggleMainFilter = () => {
    const next = !isFilterOpen
    setIsFilterOpen(next)
    if (next) {
      setIsIncentiveFilterOpen(false)
      setIsChannelFilterOpen(false)
      setIsManagerFilterOpen(false)
    }
    showToast(next ? 'Main filter opened' : 'Main filter closed')
  }

  const toggleIncentiveFilter = () => {
    const next = !isIncentiveFilterOpen
    setIsIncentiveFilterOpen(next)
    if (next) {
      setIsFilterOpen(false)
      setIsChannelFilterOpen(false)
      setIsManagerFilterOpen(false)
    }
    showToast(next ? 'Incentive filter opened' : 'Incentive filter closed')
  }

  const toggleChannelFilter = () => {
    setIsChannelFilterOpen((current) => !current)
  }

  const toggleManagerFilter = () => {
    setIsManagerFilterOpen((current) => !current)
  }

  useEffect(() => {
    if (!sceneRef.current || !canvasRef.current) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups = []
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power2.out' } })
      const metricCardsEls = gsap.utils.toArray('.metric-card')
      const heroKpiEls = gsap.utils.toArray('.hero-kpi')
      const revealPanels = gsap.utils.toArray('.reveal-panel')
      const scrollFloats = gsap.utils.toArray('.scroll-float')
      const navButtons = gsap.utils.toArray('.nav-btn')

      intro
        .fromTo('.dash-nav', { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42 })
        .fromTo('.hero-title', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.1')
        .fromTo('.hero-copy', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.34 }, '-=0.34')
        .fromTo(heroKpiEls, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.36, stagger: 0.08 }, '-=0.28')
        .fromTo(filterRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28 }, '-=0.12')
        .fromTo(metricCardsEls, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, stagger: 0.06 }, '-=0.1')
      cleanups.push(() => intro.kill())

      if (!prefersReducedMotion && heroGlowRef.current) {
        const glowPulse = gsap.to(heroGlowRef.current, {
          opacity: 0.8,
          scale: 1.03,
          duration: 3.8,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
        cleanups.push(() => glowPulse.kill())
      }

      navButtons.forEach((button) => {
        const handleEnter = () => {
          gsap.to(button, {
            y: -1,
            scale: 1.01,
            duration: 0.18,
            boxShadow: '0 8px 18px rgba(47,63,169,0.14)',
            ease: 'power2.out',
          })
        }
        const handleLeave = () => {
          gsap.to(button, {
            y: 0,
            scale: 1,
            duration: 0.18,
            boxShadow: '0 0 0 rgba(47,63,169,0)',
            ease: 'power2.out',
          })
        }
        const handleDown = () => {
          gsap.to(button, { scale: 0.98, duration: 0.1, ease: 'power1.out' })
        }
        const handleUp = () => {
          gsap.to(button, { scale: 1.01, duration: 0.1, ease: 'power1.out' })
        }

        button.addEventListener('mouseenter', handleEnter)
        button.addEventListener('mouseleave', handleLeave)
        button.addEventListener('mousedown', handleDown)
        button.addEventListener('mouseup', handleUp)
        cleanups.push(() => button.removeEventListener('mouseenter', handleEnter))
        cleanups.push(() => button.removeEventListener('mouseleave', handleLeave))
        cleanups.push(() => button.removeEventListener('mousedown', handleDown))
        cleanups.push(() => button.removeEventListener('mouseup', handleUp))
      })

      metricCardsEls.forEach((card) => {
        const hoverIn = () => {
          gsap.to(card, {
            y: -3,
            scale: 1.01,
            duration: 0.22,
            boxShadow: '0 12px 24px rgba(47,63,169,0.15)',
            ease: 'power2.out',
          })
        }
        const hoverOut = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.2,
            boxShadow: '0 0 0 rgba(47,63,169,0)',
            ease: 'power2.out',
          })
        }
        card.addEventListener('mouseenter', hoverIn)
        card.addEventListener('mouseleave', hoverOut)
        cleanups.push(() => card.removeEventListener('mouseenter', hoverIn))
        cleanups.push(() => card.removeEventListener('mouseleave', hoverOut))
      })

      if (!prefersReducedMotion) {
        if (heroRef.current) {
          const heroScrollTween = gsap.to(heroRef.current, {
            y: -12,
            scale: 0.994,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top+=80',
              end: 'bottom top+=40',
              scrub: 1.2,
            },
          })
          cleanups.push(() => {
            heroScrollTween.scrollTrigger?.kill()
            heroScrollTween.kill()
          })
        }

        scrollFloats.forEach((panel, index) => {
          const distance = index % 2 === 0 ? -6 : -4
          const floatTween = gsap.fromTo(
            panel,
            { y: 3 },
            {
              y: distance,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top 92%',
                end: 'bottom 12%',
                scrub: 1.4,
              },
            },
          )
          cleanups.push(() => {
            floatTween.scrollTrigger?.kill()
            floatTween.kill()
          })
        })

        revealPanels.forEach((panel, index) => {
          const tween = gsap.fromTo(
            panel,
            { y: 20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.45,
              delay: index === 0 ? 0.05 : 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 84%',
                once: true,
              },
            },
          )
          cleanups.push(() => {
            tween.scrollTrigger?.kill()
            tween.kill()
          })
        })
      }
    }, sceneRef)

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (!filterPanelRef.current) return
    if (isFilterOpen) {
      gsap.fromTo(filterPanelRef.current,
        { height: 0, opacity: 0, marginTop: 0 },
        { height: 'auto', opacity: 1, marginTop: 12, duration: 0.4, ease: 'power2.out' }
      )
    } else {
      gsap.to(filterPanelRef.current,
        { height: 0, opacity: 0, marginTop: 0, duration: 0.3, ease: 'power2.in' }
      )
    }
  }, [isFilterOpen])

  useEffect(() => {
    if (!incentiveFilterPanelRef.current) return
    if (isIncentiveFilterOpen) {
      gsap.fromTo(incentiveFilterPanelRef.current,
        { height: 0, opacity: 0, marginTop: 0 },
        { height: 'auto', opacity: 1, marginTop: 16, duration: 0.4, ease: 'power2.out' }
      )
    } else {
      gsap.to(incentiveFilterPanelRef.current,
        { height: 0, opacity: 0, marginTop: 0, duration: 0.3, ease: 'power2.in' }
      )
    }
  }, [isIncentiveFilterOpen])

  useEffect(() => {
    if (!channelFilterPanelRef.current) return
    if (isChannelFilterOpen) {
      gsap.fromTo(channelFilterPanelRef.current,
        { height: 0, opacity: 0, marginTop: 0 },
        { height: 'auto', opacity: 1, marginTop: 16, duration: 0.4, ease: 'power2.out' }
      )
    } else {
      gsap.to(channelFilterPanelRef.current,
        { height: 0, opacity: 0, marginTop: 0, duration: 0.3, ease: 'power2.in' }
      )
    }
  }, [isChannelFilterOpen])

  useEffect(() => {
    if (!managerFilterPanelRef.current) return
    if (isManagerFilterOpen) {
      gsap.fromTo(managerFilterPanelRef.current,
        { height: 0, opacity: 0, marginTop: 0 },
        { height: 'auto', opacity: 1, marginTop: 12, duration: 0.4, ease: 'power2.out' }
      )
    } else {
      gsap.to(managerFilterPanelRef.current,
        { height: 0, opacity: 0, marginTop: 0, duration: 0.3, ease: 'power2.in' }
      )
    }
  }, [isManagerFilterOpen])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!toast || !toastRef.current) {
      return
    }

    gsap.fromTo(
      toastRef.current,
      { autoAlpha: 0, y: -16, scale: 0.98 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.24, ease: 'power2.out' },
    )

    toastTimerRef.current = setTimeout(() => {
      if (!toastRef.current) {
        setToast(null)
        return
      }
      gsap.to(toastRef.current, {
        autoAlpha: 0,
        y: -12,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => setToast(null),
      })
    }, 2200)

    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current)
      }
    }
  }, [toast])

  return (
    <main
      ref={sceneRef}
      className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-[#0f172a] [perspective:1400px] [transform-style:preserve-3d]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_29px,rgba(17,47,89,0.06)_30px),linear-gradient(90deg,transparent_29px,rgba(17,47,89,0.06)_30px)] bg-[size:30px_30px]" />
        <div
          ref={(node) => {
            pageAuraRefs.current[0] = node
          }}
          className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#2f3fa9]/20 blur-3xl"
        />
        <div
          ref={(node) => {
            pageAuraRefs.current[1] = node
          }}
          className="absolute right-4 top-1/4 h-72 w-72 rounded-full bg-[#eb7a26]/20 blur-3xl"
        />
        <div
          ref={(node) => {
            pageAuraRefs.current[2] = node
          }}
          className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#1a79d1]/18 blur-3xl"
        />
        <div
          ref={(node) => {
            ringRefs.current[0] = node
          }}
          className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2f3fa9]/10"
        />
        <div
          ref={(node) => {
            ringRefs.current[1] = node
          }}
          className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1a79d1]/12"
        />
      </div>

      {toast && (
        <div className="pointer-events-none fixed right-4 top-4 z-[90] sm:right-8">
          <div
            ref={toastRef}
            className={`flex min-w-64 items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-xl ${toast.tone === 'success'
                ? 'border-[#1a79d1]/25 bg-[#f2f8ff] text-[#1b3e72]'
                : toast.tone === 'warning'
                  ? 'border-[#eb7a26]/35 bg-[#fff6ef] text-[#7a4313]'
                  : 'border-[#2f3fa9]/18 bg-white text-[#2b4469]'
              }`}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
              <Icon name={toast.tone === 'success' ? 'approved' : toast.tone === 'warning' ? 'approval' : 'updates'} className="h-4 w-4" />
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <Navbar
        activePage="dashboard"
        className="dash-nav"
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

      <section className="relative z-10 flex min-h-[calc(100vh-88px)] w-full items-start justify-center px-4 py-6 lg:px-8">
        <div ref={canvasRef} className="relative w-full [transform-style:preserve-3d]">
          <div
            ref={heroRef}
            className="relative mb-5 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-5 text-[#0f172a] shadow-xl shadow-slate-200/40 [transform-style:preserve-3d] sm:p-6"
          >
            <div
              ref={heroGlowRef}
              className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full bg-[#cfe5ff]/70 blur-3xl"
            />

            <p className="hero-copy text-xs font-bold uppercase tracking-widest text-[#6366f1]">Dashboard Overview</p>
            <h1 className="hero-title mt-2 max-w-2xl text-2xl font-black leading-tight sm:text-4xl">
              Channel Partner Performance Console
            </h1>
            <p className="hero-copy mt-3 max-w-2xl text-sm text-[#456288] sm:text-base">
              Focused operational metrics with clear actions, polished motion, and predictable interactions.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="hero-kpi rounded-xl border border-[#d6e4f7] bg-white p-3">
                <p className="text-xs uppercase tracking-[0.15em] text-[#6784a9]">New Leads</p>
                <p className="mt-1 text-xl font-black">{leadsCount}</p>
              </div>
              <div className="hero-kpi rounded-xl border border-[#d6e4f7] bg-white p-3">
                <p className="text-xs uppercase tracking-[0.15em] text-[#6784a9]">Active Partners</p>
                <p className="mt-1 text-xl font-black">{partnersCount}</p>
              </div>
              <div className="hero-kpi rounded-xl border border-[#d6e4f7] bg-white p-3">
                <p className="text-xs uppercase tracking-[0.15em] text-[#6784a9]">System Users</p>
                <p className="mt-1 text-xl font-black">{accountsCount}</p>
              </div>
            </div>
          </div>

          <div className="relative z-50 mb-5">
            <div className="flex justify-start">
              <button
                ref={filterRef}
                type="button"
                onClick={toggleMainFilter}
                aria-label="Open main filter"
                className="flex items-center rounded-xl bg-[#6366f1] p-2.5 text-white shadow-lg shadow-indigo-100 transition hover:bg-[#4f46e5]"
              >
                <Icon name="filter" className="h-5 w-5" />
              </button>
            </div>

            <div
              ref={filterPanelRef}
              className="overflow-hidden opacity-0"
              style={{ height: 0 }}
            >
              <div className="mt-3 grid w-full grid-cols-1 gap-3 rounded-2xl border border-[#d6e5fb] bg-white/95 p-4 shadow-2xl shadow-[#2f3fa9]/20 backdrop-blur sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto_auto]">
                <input
                  type="text"
                  value={filterFromDate}
                  onChange={(event) => setFilterFromDate(event.target.value)}
                  placeholder="From (dd/mm/yyyy)"
                  className="w-full rounded-xl border border-[#a8c2e9] bg-[#f8fbff] px-3 py-2 text-sm text-[#1f365d] outline-none placeholder:text-[#8094b2] focus:border-[#1a79d1] focus:ring-2 focus:ring-[#1a79d1]/25"
                />
                <input
                  type="text"
                  value={filterToDate}
                  onChange={(event) => setFilterToDate(event.target.value)}
                  placeholder="To (dd/mm/yyyy)"
                  className="w-full rounded-xl border border-[#a8c2e9] bg-[#f8fbff] px-3 py-2 text-sm text-[#1f365d] outline-none placeholder:text-[#8094b2] focus:border-[#1a79d1] focus:ring-2 focus:ring-[#1a79d1]/25"
                />
                <input
                  type="text"
                  value={filterProject}
                  onChange={(event) => setFilterProject(event.target.value)}
                  placeholder="Project"
                  className="w-full rounded-xl border border-[#a8c2e9] bg-[#f8fbff] px-3 py-2 text-sm text-[#1f365d] outline-none placeholder:text-[#8094b2] focus:border-[#1a79d1] focus:ring-2 focus:ring-[#1a79d1]/25"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFilterFromDate('')
                    setFilterToDate('')
                    setFilterProject('')
                    setIsFilterOpen(false)
                    showToast('Main filter cleared')
                  }}
                  className="rounded-xl border border-[#d4deef] bg-white px-4 py-2 text-sm font-semibold text-[#435d84] transition hover:bg-[#f4f8ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFilterOpen(false)
                    showToast('Main filter applied', 'success')
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1a79d1] to-[#2f3fa9] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  <Icon name="approved" className="h-4 w-4" />
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className="scroll-3d scroll-float reveal-panel relative z-10 mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 [transform-style:preserve-3d]">
            {metricCards.map((card) => (
              <article
                key={card.title}
                className="metric-card group rounded-2xl border border-white/65 bg-white/70 p-5 shadow-xl shadow-[#2f3fa9]/10 backdrop-blur-xl [transform-style:preserve-3d]"
              >
                <div className="flex items-start justify-between">
                  <p className="max-w-[13rem] text-sm font-semibold leading-snug text-[#29456e]">{card.title}</p>
                  <div className={`rounded-lg bg-gradient-to-r ${card.tone} p-2 text-white`}>
                    <Icon name={card.icon} className="h-5 w-5" />
                  </div>
                </div>
                <div className={`mt-4 h-1.5 w-full rounded-full bg-gradient-to-r ${card.tone}`} />
              </article>
            ))}
          </div>

          <div
            ref={incentiveRef}
            className="scroll-3d scroll-float reveal-panel relative z-20 mt-14 rounded-2xl border border-white/65 bg-white/75 p-5 shadow-xl shadow-[#2f3fa9]/12 backdrop-blur-xl [transform-style:preserve-3d]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-black text-[#1b3e72]">Incentive Scheme Performance</h3>
              <button
                ref={incentiveFilterRef}
                type="button"
                onClick={toggleIncentiveFilter}
                aria-label="Open incentive filter"
                className="flex items-center rounded-xl border border-[#2f3fa9]/20 bg-white p-2 text-[#2f3fa9]"
              >
                <Icon name="filter" className="h-5 w-5" />
              </button>
            </div>

            <div
              ref={incentiveFilterPanelRef}
              className="overflow-hidden opacity-0"
              style={{ height: 0 }}
            >
              <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-[#d6e5fb] bg-[#f8fbff]/90 p-4 shadow-inner sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto]">
                <input
                  type="text"
                  value={incentiveProjectEntry}
                  onChange={(event) => setIncentiveProjectEntry(event.target.value)}
                  placeholder="Project Entry"
                  className="w-full rounded-xl border border-[#a8c2e9] bg-white px-3 py-2 text-sm text-[#1f365d] outline-none placeholder:text-[#8094b2] focus:border-[#1a79d1] focus:ring-2 focus:ring-[#1a79d1]/25"
                />
                <button
                  type="button"
                  onClick={() => {
                    setIncentiveProjectEntry('')
                    setIsIncentiveFilterOpen(false)
                    showToast('Incentive filter cleared')
                  }}
                  className="rounded-xl border border-[#d4deef] bg-white px-4 py-2 text-sm font-semibold text-[#435d84] transition hover:bg-[#eef5ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsIncentiveFilterOpen(false)
                    showToast('Incentive filter applied', 'success')
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2f3fa9] to-[#1a79d1] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  <Icon name="approved" className="h-4 w-4" />
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className="scroll-3d scroll-float reveal-panel relative z-20 mt-14 rounded-2xl border border-white/65 bg-white/80 p-5 shadow-xl shadow-[#2f3fa9]/10 backdrop-blur-xl [transform-style:preserve-3d]">
            <h4 className="text-base font-black text-[#1b3e72]">Incentive Scheme Summary</h4>
            <div className="mt-4 overflow-hidden rounded-xl border border-[#d6e5fb]">
              <div className="grid grid-cols-2 bg-[#eef5ff] text-sm font-bold text-[#1f365d]">
                <div className="border-r border-[#d6e5fb] px-4 py-3">Incentive Scheme Name</div>
                <div className="px-4 py-3">No. of Channel Partners</div>
              </div>
            </div>
          </div>

          <div
            ref={channelRef}
            className="scroll-3d scroll-float reveal-panel relative z-30 mt-14 rounded-2xl border border-white/65 bg-white/80 p-5 shadow-xl shadow-[#2f3fa9]/10 backdrop-blur-xl [transform-style:preserve-3d]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-base font-black text-[#1b3e72]">Channel Partner Performance</h4>
              <button
                type="button"
                onClick={toggleChannelFilter}
                className={`flex items-center gap-2 rounded-lg border px-4 py-1.5 text-sm font-bold transition-all duration-300 ${isChannelFilterOpen
                    ? 'border-[#6366f1] bg-[#6366f1] text-white shadow-lg shadow-indigo-100'
                    : 'border-[#6366f1]/20 bg-[#6366f1]/5 text-[#6366f1] hover:bg-[#6366f1]/10'
                  }`}
              >
                <Icon name="filter" className="h-4 w-4" />
                Filter
              </button>
            </div>

            <div
              ref={channelFilterPanelRef}
              className="relative z-20 overflow-hidden rounded-lg border border-[#d3dbe9] bg-[#f3f5f9] opacity-0"
              style={{ height: 0 }}
            >
              <div className="flex items-center justify-between border-b border-[#d3dbe9] px-4 py-3.5">
                <h5 className="text-xl font-medium leading-none text-[#2f3e56]">Filter</h5>
              </div>

              <div className="space-y-6 px-4 py-5">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#2f3d53]">From Date</label>
                  <input
                    type="text"
                    value={channelFromDate}
                    onChange={(event) => setChannelFromDate(event.target.value)}
                    placeholder="dd/mm/yyyy"
                    className="h-10 w-full rounded border border-[#b6c0d4] bg-white px-3 text-sm text-[#1f365d] outline-none placeholder:text-[#7e8fa8] focus:border-[#7f8dff] focus:ring-2 focus:ring-[#7f8dff]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#2f3d53]">To Date</label>
                  <input
                    type="text"
                    value={channelToDate}
                    onChange={(event) => setChannelToDate(event.target.value)}
                    placeholder="dd/mm/yyyy"
                    className="h-10 w-full rounded border border-[#b6c0d4] bg-white px-3 text-sm text-[#1f365d] outline-none placeholder:text-[#7e8fa8] focus:border-[#7f8dff] focus:ring-2 focus:ring-[#7f8dff]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#2f3d53]">Project</label>
                  <select
                    value={channelProject}
                    onChange={(event) => setChannelProject(event.target.value)}
                    className="h-10 w-full rounded border border-[#b6c0d4] bg-white px-3 text-sm text-[#1f365d] outline-none focus:border-[#7f8dff] focus:ring-2 focus:ring-[#7f8dff]/20"
                  >
                    <option value="">Select</option>
                    <option value="project_a">Project A</option>
                    <option value="project_b">Project B</option>
                    <option value="project_c">Project C</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 border-t border-[#d3dbe9] px-4 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setChannelFromDate('')
                    setChannelToDate('')
                    setChannelProject('')
                    setIsChannelFilterOpen(false)
                    showToast('Channel partner filter cleared')
                  }}
                  className="h-10 rounded-md border border-[#6d76ff] bg-white px-5 text-sm font-semibold text-[#636eff] transition hover:bg-[#f3f4ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsChannelFilterOpen(false)
                    showToast('Channel partner filter applied', 'success')
                  }}
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-gradient-to-r from-[#777dff] to-[#6b69ec] px-6 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  <Icon name="approved" className="h-4 w-4" />
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div
            ref={managerRef}
            className="scroll-3d scroll-float reveal-panel relative z-30 mt-14 rounded-2xl border border-white/65 bg-white/80 p-5 shadow-xl shadow-[#2f3fa9]/10 backdrop-blur-xl pointer-events-auto [transform-style:preserve-3d]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-base font-black text-[#1b3e72]">Channel Partner Manager Performance</h4>
              <button
                type="button"
                onClick={toggleManagerFilter}
                className={`flex items-center gap-2 rounded-lg border px-4 py-1.5 text-sm font-bold transition-all duration-300 ${isManagerFilterOpen
                    ? 'border-[#6366f1] bg-[#6366f1] text-white shadow-lg shadow-indigo-100'
                    : 'border-[#6366f1]/20 bg-[#6366f1]/5 text-[#6366f1] hover:bg-[#6366f1]/10'
                  }`}
              >
                <Icon name="filter" className="h-4 w-4" />
                Filter
              </button>
            </div>

            <div
              ref={managerFilterPanelRef}
              className="relative z-20 overflow-hidden rounded-lg border border-[#d3dbe9] bg-[#f3f5f9] opacity-0 shadow-2xl"
              style={{ height: 0 }}
            >
              <div className="flex items-center justify-between border-b border-[#d3dbe9] px-4 py-3.5">
                <h5 className="text-xl font-medium leading-none text-[#2f3e56]">Filter</h5>
              </div>

              <div className="space-y-6 px-4 py-5">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#2f3d53]">From Date</label>
                  <input
                    type="text"
                    value={managerFromDate}
                    onChange={(event) => setManagerFromDate(event.target.value)}
                    placeholder="dd/mm/yyyy"
                    className="h-10 w-full rounded border border-[#b6c0d4] bg-white px-3 text-sm text-[#1f365d] outline-none placeholder:text-[#7e8fa8] focus:border-[#7f8dff] focus:ring-2 focus:ring-[#7f8dff]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#2f3d53]">To Date</label>
                  <input
                    type="text"
                    value={managerToDate}
                    onChange={(event) => setManagerToDate(event.target.value)}
                    placeholder="dd/mm/yyyy"
                    className="h-10 w-full rounded border border-[#b6c0d4] bg-white px-3 text-sm text-[#1f365d] outline-none placeholder:text-[#7e8fa8] focus:border-[#7f8dff] focus:ring-2 focus:ring-[#7f8dff]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#2f3d53]">Project</label>
                  <select
                    value={managerProject}
                    onChange={(event) => setManagerProject(event.target.value)}
                    className="h-10 w-full rounded border border-[#b6c0d4] bg-white px-3 text-sm text-[#1f365d] outline-none focus:border-[#7f8dff] focus:ring-2 focus:ring-[#7f8dff]/20"
                  >
                    <option value="">Select</option>
                    <option value="project_a">Project A</option>
                    <option value="project_b">Project B</option>
                    <option value="project_c">Project C</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 border-t border-[#d3dbe9] px-4 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setManagerFromDate('')
                    setManagerToDate('')
                    setManagerProject('')
                    setIsManagerFilterOpen(false)
                    showToast('Manager filter cleared')
                  }}
                  className="h-10 rounded-md border border-[#6d76ff] bg-white px-5 text-sm font-semibold text-[#636eff] transition hover:bg-[#f3f4ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsManagerFilterOpen(false)
                    showToast('Manager filter applied', 'success')
                  }}
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-gradient-to-r from-[#777dff] to-[#6b69ec] px-6 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  <Icon name="approved" className="h-4 w-4" />
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className="scroll-3d scroll-float reveal-panel relative z-20 mt-14 rounded-2xl border border-white/65 bg-white/80 p-5 shadow-xl shadow-[#2f3fa9]/10 backdrop-blur-xl [transform-style:preserve-3d]">
            <div className="overflow-hidden rounded-xl border border-[#d6e5fb]">
              <div className="grid grid-cols-4 bg-[#eef5ff] text-sm font-bold text-[#1f365d]">
                <div className="border-r border-[#d6e5fb] px-4 py-3">Channel Partner Head Name</div>
                <div className="border-r border-[#d6e5fb] px-4 py-3">No. of Deals</div>
                <div className="border-r border-[#d6e5fb] px-4 py-3">No. of Bookings</div>
                <div className="px-4 py-3">Agreement Price</div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 h-[22rem]">
            <div
              ref={(node) => {
                orbRefs.current[0] = node
              }}
              className="absolute left-[6%] top-[8%] h-28 w-28 rounded-[2rem] border border-[#2f3fa9]/30 bg-white/70 shadow-2xl shadow-[#2f3fa9]/15 backdrop-blur"
            />
            <div
              ref={(node) => {
                orbRefs.current[1] = node
              }}
              className="absolute right-[10%] top-[12%] h-20 w-20 rounded-full border border-[#eb7a26]/35 bg-white/75 shadow-2xl shadow-[#eb7a26]/20 backdrop-blur"
            />
            <div
              ref={(node) => {
                orbRefs.current[2] = node
              }}
              className="absolute left-[24%] bottom-[9%] h-24 w-24 rounded-3xl border border-[#1a79d1]/30 bg-white/70 shadow-2xl shadow-[#1a79d1]/15 backdrop-blur"
            />
            <div
              ref={(node) => {
                orbRefs.current[3] = node
              }}
              className="absolute right-[18%] bottom-[8%] h-32 w-32 rounded-[2.25rem] border border-[#2f3fa9]/25 bg-white/65 shadow-2xl shadow-[#2f3fa9]/15 backdrop-blur"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Dashbord
