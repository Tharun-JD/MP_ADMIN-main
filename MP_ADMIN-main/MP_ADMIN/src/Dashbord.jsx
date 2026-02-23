import { useEffect, useRef, useState } from 'react'

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

const navItems = [
  {
    label: 'Dashbord',
    icon: 'dashboard',
  },
  {
    label: 'UserAccount',
    icon: 'user',
  },
  {
    label: 'Lead Activity',
    icon: 'lead',
  },
  {
    label: 'More',
    icon: 'more',
    options: [
      { label: 'Channel Partner Application', icon: 'docs' },
      { label: 'Emails', icon: 'reports' },
      { label: 'SMSs', icon: 'reports' },
    ],
  },
]

function Dashbord({ onSignOut, onBackToDashboard, onOpenUserAccount, onOpenLeadActive, onOpenChannelPartners, onOpenEmails, onOpenSms }) {
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

  const canvasRef = useRef(null)
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

  const toggleMainFilter = () => {
    setIsFilterOpen((current) => {
      const next = !current
      if (next) {
        setIsIncentiveFilterOpen(false)
        setIsChannelFilterOpen(false)
        setIsManagerFilterOpen(false)
      }
      return next
    })
  }

  const toggleIncentiveFilter = () => {
    setIsIncentiveFilterOpen((current) => {
      const next = !current
      if (next) {
        setIsFilterOpen(false)
        setIsChannelFilterOpen(false)
        setIsManagerFilterOpen(false)
      }
      return next
    })
  }

  const toggleChannelFilter = () => {
    setIsChannelFilterOpen((current) => !current)
  }

  const toggleManagerFilter = () => {
    setIsManagerFilterOpen((current) => !current)
  }

  useEffect(() => {
    if (!window.gsap) {
      return
    }

    const gsap = window.gsap
    const cleanups = []

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
    const metricCardsEls = gsap.utils.toArray('.metric-card')
    intro
      .fromTo('.dash-nav', { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
      .fromTo(filterRef.current, { y: 18, opacity: 0, rotateX: -20 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.45 }, '-=0.2')
      .fromTo(
        metricCardsEls,
        { y: 44, opacity: 0, rotateX: -35, z: -120 },
        { y: 0, opacity: 1, rotateX: 0, z: 0, duration: 0.75, stagger: 0.1 },
        '-=0.15',
      )
      .fromTo(canvasRef.current, { scale: 0.98, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, '-=0.55')
      .fromTo(incentiveRef.current, { y: 24, opacity: 0, rotateX: -12 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.5 }, '-=0.25')
      .fromTo(channelRef.current, { y: 24, opacity: 0, rotateX: -12 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.5 }, '-=0.28')
      .fromTo(managerRef.current, { y: 24, opacity: 0, rotateX: -12 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.5 }, '-=0.3')

    cleanups.push(() => intro.kill())

    navBeamRefs.current.filter(Boolean).forEach((beam, index) => {
      const flow = gsap.fromTo(
        beam,
        { xPercent: -45, opacity: 0.14 + index * 0.04 },
        {
          xPercent: 45,
          opacity: 0.26 + index * 0.03,
          duration: 6 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      )
      cleanups.push(() => flow.kill())
    })

    pageAuraRefs.current.filter(Boolean).forEach((aura, index) => {
      const drift = gsap.to(aura, {
        x: index % 2 ? -30 : 32,
        y: index % 2 ? 20 : -24,
        scale: index % 2 ? 1.12 : 0.9,
        duration: 6 + index * 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      cleanups.push(() => drift.kill())
    })

    ringRefs.current.filter(Boolean).forEach((ring, index) => {
      const orbitSpin = gsap.to(ring, {
        rotate: 360,
        transformOrigin: 'center center',
        duration: 24 + index * 6,
        repeat: -1,
        ease: 'none',
      })
      cleanups.push(() => orbitSpin.kill())
    })

    const navButtons = gsap.utils.toArray('.nav-btn')
    if (navButtons.length > 0) {
      const idleFloat = gsap.to(navButtons, {
        y: -2,
        duration: 1.9,
        yoyo: true,
        repeat: -1,
        stagger: 0.1,
        ease: 'sine.inOut',
      })
      cleanups.push(() => idleFloat.kill())

      navButtons.forEach((button) => {
        const handleEnter = () => {
          gsap.to(button, {
            y: -4,
            scale: 1.04,
            rotateX: -6,
            duration: 0.28,
            boxShadow: '0 10px 24px rgba(47,63,169,0.2)',
            ease: 'power2.out',
          })
        }
        const handleLeave = () => {
          gsap.to(button, {
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.3,
            boxShadow: '0 0 0 rgba(47,63,169,0)',
            ease: 'power2.out',
          })
        }
        const handleDown = () => {
          gsap.to(button, { scale: 0.97, duration: 0.12, ease: 'power1.out' })
        }
        const handleUp = () => {
          gsap.to(button, { scale: 1.02, duration: 0.12, ease: 'power1.out' })
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
    }

    metricCardsEls.forEach((card, index) => {
      const hoverIn = () => {
        gsap.to(card, {
          y: -6,
          rotateX: -6,
          rotateY: index % 2 ? -6 : 6,
          scale: 1.02,
          duration: 0.35,
          boxShadow: '0 18px 35px rgba(47,63,169,0.25)',
          ease: 'power2.out',
        })
      }
      const hoverOut = () => {
        gsap.to(card, {
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.35,
          boxShadow: '0 0 0 rgba(47,63,169,0)',
          ease: 'power2.out',
        })
      }
      const handleMove = (event) => {
        const rect = card.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        gsap.to(card, {
          rotateY: x * 18,
          rotateX: -y * 14,
          transformPerspective: 1200,
          duration: 0.18,
          ease: 'power1.out',
        })
      }

      card.addEventListener('mouseenter', hoverIn)
      card.addEventListener('mouseleave', hoverOut)
      card.addEventListener('mousemove', handleMove)
      cleanups.push(() => card.removeEventListener('mouseenter', hoverIn))
      cleanups.push(() => card.removeEventListener('mouseleave', hoverOut))
      cleanups.push(() => card.removeEventListener('mousemove', handleMove))
    })

    const cardFloat = gsap.to(metricCardsEls, {
      y: -3,
      duration: 2.2,
      stagger: 0.14,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })
    cleanups.push(() => cardFloat.kill())

    const filterPulse = gsap.to(filterRef.current, {
      boxShadow: '0 16px 32px rgba(26,121,209,0.26)',
      duration: 1.8,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })
    cleanups.push(() => filterPulse.kill())

    const incentiveFilterPulse = gsap.to(incentiveFilterRef.current, {
      boxShadow: '0 14px 28px rgba(47,63,169,0.22)',
      duration: 1.9,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })
    cleanups.push(() => incentiveFilterPulse.kill())

    const channelFilterPulse = gsap.to(channelFilterRef.current, {
      boxShadow: '0 14px 28px rgba(26,121,209,0.24)',
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })
    cleanups.push(() => channelFilterPulse.kill())

    const managerFilterPulse = gsap.to(managerFilterRef.current, {
      boxShadow: '0 14px 28px rgba(47,63,169,0.22)',
      duration: 2.1,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })
    cleanups.push(() => managerFilterPulse.kill())

    orbRefs.current.filter(Boolean).forEach((orb, index) => {
      const float = gsap.to(orb, {
        y: index % 2 ? -24 : 24,
        x: index % 2 ? 16 : -18,
        rotateY: index % 2 ? -18 : 18,
        rotateX: index % 2 ? 12 : -12,
        duration: 5 + index * 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      cleanups.push(() => float.kill())
    })

    const scrollPanels = gsap.utils.toArray('.scroll-3d')
    const handleScroll3D = () => {
      const viewportMid = window.innerHeight / 2
      scrollPanels.forEach((panel, index) => {
        const rect = panel.getBoundingClientRect()
        const delta = (rect.top + rect.height / 2 - viewportMid) / viewportMid
        const intensity = Math.min(Math.abs(delta), 1)
        gsap.to(panel, {
          rotateX: delta * -5,
          rotateY: index % 2 ? delta * 4 : delta * -4,
          y: delta * -12,
          scale: 1 - intensity * 0.03,
          opacity: 1 - intensity * 0.18,
          duration: 0.35,
          ease: 'power2.out',
        })
      })
    }
    window.addEventListener('scroll', handleScroll3D, { passive: true })
    handleScroll3D()
    cleanups.push(() => window.removeEventListener('scroll', handleScroll3D))

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  useEffect(() => {
    if (!window.gsap || !filterPanelRef.current) {
      return
    }

    const gsap = window.gsap
    if (isFilterOpen) {
      gsap.fromTo(
        filterPanelRef.current,
        { autoAlpha: 0, y: -14, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.34, ease: 'power2.out' },
      )
    }
  }, [isFilterOpen])

  useEffect(() => {
    if (!window.gsap || !incentiveFilterPanelRef.current) {
      return
    }

    const gsap = window.gsap
    if (isIncentiveFilterOpen) {
      gsap.fromTo(
        incentiveFilterPanelRef.current,
        { autoAlpha: 0, y: -12, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: 'power2.out' },
      )
    }
  }, [isIncentiveFilterOpen])

  useEffect(() => {
    if (!window.gsap || !channelFilterPanelRef.current) {
      return
    }

    const gsap = window.gsap
    if (isChannelFilterOpen) {
      gsap.fromTo(
        channelFilterPanelRef.current,
        { autoAlpha: 0, y: -12, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: 'power2.out' },
      )
    }
  }, [isChannelFilterOpen])

  useEffect(() => {
    if (!window.gsap || !managerFilterPanelRef.current) {
      return
    }

    const gsap = window.gsap
    if (isManagerFilterOpen) {
      gsap.fromTo(
        managerFilterPanelRef.current,
        { autoAlpha: 0, y: -12, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: 'power2.out' },
      )
    }
  }, [isManagerFilterOpen])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_14%,#eaf2ff_0%,#f6faff_45%,#ffffff_100%)] text-[#112f59] [perspective:1400px]">
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
          className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2f3fa9]/10"
        />
        <div
          ref={(node) => {
            ringRefs.current[1] = node
          }}
          className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1a79d1]/12"
        />
      </div>

      <header className="dash-nav relative z-20 border-b border-[#2f3fa9]/10 bg-white/80 backdrop-blur">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            ref={(node) => {
              navBeamRefs.current[0] = node
            }}
            className="absolute -left-20 top-0 h-full w-[28rem] rotate-[3deg] bg-gradient-to-r from-transparent via-[#2f3fa9]/20 to-transparent blur-xl"
          />
          <div
            ref={(node) => {
              navBeamRefs.current[1] = node
            }}
            className="absolute right-0 top-0 h-full w-[24rem] rotate-[-2deg] bg-gradient-to-r from-transparent via-[#1a79d1]/18 to-transparent blur-xl"
          />
          <div
            ref={(node) => {
              navBeamRefs.current[2] = node
            }}
            className="absolute left-1/3 top-0 h-full w-[22rem] rotate-[1deg] bg-gradient-to-r from-transparent via-[#eb7a26]/16 to-transparent blur-xl"
          />
        </div>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <div className="text-xl font-black tracking-tight text-[#2f3fa9]">MP Developers</div>

          <nav className="flex flex-wrap items-center gap-2 lg:gap-3">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenWelcome(false)
                    if (item.label === 'More') {
                      setOpenMenu((current) => (current === item.label ? null : item.label))
                    } else {
                      setOpenMenu(null)
                      if (item.label === 'Dashbord') onBackToDashboard?.()
                      if (item.label === 'UserAccount') onOpenUserAccount?.()
                      if (item.label === 'Lead Activity') onOpenLeadActive?.()
                    }
                  }}
                  className="nav-btn flex items-center gap-1.5 rounded-lg border border-[#2f3fa9]/15 bg-white px-3 py-2 text-sm font-semibold text-[#1a3c6b] transition hover:border-[#1a79d1]/50 hover:text-[#1a79d1]"
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.label}
                  {item.label === 'More' && <Icon name="chevron" className="h-3 w-3" />}
                </button>

                {item.label === 'More' && openMenu === item.label && (
                  <div className="absolute left-0 top-12 z-30 min-w-44 rounded-xl border border-[#d5e3f7] bg-white p-2 shadow-xl">
                    {item.options.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => {
                          setOpenMenu(null)
                          if (option.label === 'Channel Partner Application') {
                            onOpenChannelPartners?.()
                          }
                          if (option.label === 'Emails') {
                            onOpenEmails?.()
                          }
                          if (option.label === 'SMSs') {
                            onOpenSms?.()
                          }
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#274873] hover:bg-[#eef5ff]"
                      >
                        <Icon name={option.icon} className="h-4 w-4 text-[#1a79d1]" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setOpenMenu(null)
                setOpenWelcome((current) => !current)
              }}
              className="nav-btn flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#1a79d1] to-[#2f3fa9] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-[#2f3fa9]/20"
            >
              <Icon name="user" className="h-4 w-4" />
              Welcome
              <Icon name="chevron" className="h-3 w-3" />
            </button>

            {openWelcome && (
              <div className="absolute right-0 top-12 z-30 min-w-48 rounded-xl border border-[#d5e3f7] bg-white p-2 shadow-xl">
                <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#274873] hover:bg-[#eef5ff]">
                  <Icon name="profile" className="h-4 w-4 text-[#1a79d1]" />
                  Channel Manager Profile
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#274873] hover:bg-[#eef5ff]">
                  <Icon name="settings" className="h-4 w-4 text-[#1a79d1]" />
                  Settings
                </button>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#c43d2f] hover:bg-[#fff1ef]"
                >
                  <Icon name="signout" className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl items-center justify-center px-4 py-8 lg:px-8">
        <div ref={canvasRef} className="relative w-full max-w-6xl [transform-style:preserve-3d]">
          <div className="relative z-50 mb-5">
            <div className="flex justify-start">
              <button
                ref={filterRef}
                type="button"
                onClick={toggleMainFilter}
                aria-label="Open main filter"
                className="flex items-center rounded-xl border border-[#1a79d1]/20 bg-white p-2.5 text-[#1a79d1] shadow-lg shadow-[#1a79d1]/15"
              >
                <Icon name="filter" className="h-5 w-5" />
              </button>
            </div>

            {isFilterOpen && (
              <div
                ref={filterPanelRef}
                className="mt-3 grid w-full max-w-5xl grid-cols-1 gap-3 rounded-2xl border border-[#d6e5fb] bg-white/95 p-4 shadow-2xl shadow-[#2f3fa9]/20 backdrop-blur sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto_auto]"
              >
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
                  }}
                  className="rounded-xl border border-[#d4deef] bg-white px-4 py-2 text-sm font-semibold text-[#435d84] transition hover:bg-[#f4f8ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="rounded-xl bg-gradient-to-r from-[#1a79d1] to-[#2f3fa9] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <div className="scroll-3d relative z-10 mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 [transform-style:preserve-3d]">
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
            className="scroll-3d relative z-20 mt-14 rounded-2xl border border-white/65 bg-white/75 p-5 shadow-xl shadow-[#2f3fa9]/12 backdrop-blur-xl [transform-style:preserve-3d]"
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

            {isIncentiveFilterOpen && (
              <div
                ref={incentiveFilterPanelRef}
                className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-[#d6e5fb] bg-[#f8fbff]/90 p-4 shadow-inner sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto]"
              >
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
                  }}
                  className="rounded-xl border border-[#d4deef] bg-white px-4 py-2 text-sm font-semibold text-[#435d84] transition hover:bg-[#eef5ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsIncentiveFilterOpen(false)}
                  className="rounded-xl bg-gradient-to-r from-[#2f3fa9] to-[#1a79d1] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <div className="scroll-3d relative z-20 mt-14 rounded-2xl border border-white/65 bg-white/80 p-5 shadow-xl shadow-[#2f3fa9]/10 backdrop-blur-xl [transform-style:preserve-3d]">
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
            className="scroll-3d relative z-30 mt-14 rounded-2xl border border-white/65 bg-white/80 p-5 shadow-xl shadow-[#2f3fa9]/10 backdrop-blur-xl [transform-style:preserve-3d]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-base font-black text-[#1b3e72]">Channel Partner Performance</h4>
            </div>

            <div
              ref={channelFilterPanelRef}
              className="relative z-20 mt-4 overflow-hidden rounded-lg border border-[#d3dbe9] bg-[#f3f5f9]"
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
                    }}
                    className="h-10 rounded-md border border-[#6d76ff] bg-white px-5 text-sm font-semibold text-[#636eff] transition hover:bg-[#f3f4ff]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {}}
                    className="h-10 rounded-md bg-gradient-to-r from-[#777dff] to-[#6b69ec] px-6 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    Apply
                  </button>
                </div>
            </div>
          </div>

          <div
            ref={managerRef}
            className="scroll-3d relative z-30 mt-14 rounded-2xl border border-white/65 bg-white/80 p-5 shadow-xl shadow-[#2f3fa9]/10 backdrop-blur-xl pointer-events-auto [transform-style:preserve-3d]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-base font-black text-[#1b3e72]">Channel Partner Manager Performance</h4>
            </div>

            <div
              ref={managerFilterPanelRef}
              className="relative z-20 mt-3 overflow-hidden rounded-lg border border-[#d3dbe9] bg-[#f3f5f9] shadow-2xl"
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
                    }}
                    className="h-10 rounded-md border border-[#6d76ff] bg-white px-5 text-sm font-semibold text-[#636eff] transition hover:bg-[#f3f4ff]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {}}
                    className="h-10 rounded-md bg-gradient-to-r from-[#777dff] to-[#6b69ec] px-6 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    Apply
                  </button>
                </div>
            </div>
          </div>

          <div className="scroll-3d relative z-20 mt-14 rounded-2xl border border-white/65 bg-white/80 p-5 shadow-xl shadow-[#2f3fa9]/10 backdrop-blur-xl [transform-style:preserve-3d]">
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
