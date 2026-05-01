import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from './Navbar.jsx'

function IconReports({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function ReportsPage({ onBackToDashboard, onOpenUserAccount, onOpenLeadActive, onOpenChannelPartners, onOpenEmails, onOpenSms, onOpenReports, onSignOut }) {
  const pageRef = useRef(null)
  const headerRef = useRef(null)
  const cardRef = useRef(null)
  const glowRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      tl.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(headerRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
        .fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')

      glowRefs.current.forEach((glow, i) => {
        gsap.to(glow, {
          x: i % 2 === 0 ? 20 : -20,
          y: i % 2 === 0 ? -20 : 20,
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef} className="relative min-h-screen overflow-hidden bg-[#f8fafc] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_36px,rgba(129,144,177,0.08)_37px),linear-gradient(90deg,transparent_36px,rgba(129,144,177,0.08)_37px)] bg-[size:37px_37px]" />
        <div ref={el => glowRefs.current[0] = el} className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div ref={el => glowRefs.current[1] = el} className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <Navbar
        activePage="reports"
        onBackToDashboard={onBackToDashboard}
        onOpenUserAccount={onOpenUserAccount}
        onOpenLeadActive={onOpenLeadActive}
        onOpenChannelPartners={onOpenChannelPartners}
        onOpenEmails={onOpenEmails}
        onOpenSms={onOpenSms}
        onOpenReports={onOpenReports}
        onSignOut={onSignOut}
      />

      <section className="relative z-10 mx-auto max-w-[1400px] px-4 py-12 lg:px-6">
        <header ref={headerRef} className="mb-10">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <IconReports className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Analytics & Reports</h1>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Transaction Monitoring Portal</p>
            </div>
          </div>
        </header>

        <div ref={cardRef} className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white/80 p-12 text-center backdrop-blur-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 shadow-inner">
            <IconReports className="h-10 w-10 animate-pulse" />
          </div>
          <h2 className="mb-3 text-2xl font-black text-slate-900">Reports Module Coming Soon</h2>
          <p className="mx-auto max-w-lg text-lg font-medium leading-relaxed text-slate-500">
            We're currently building a powerful analytics engine to provide deep insights into your business performance. Stay tuned for advanced data visualizations and custom reporting tools.
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button 
              onClick={onBackToDashboard}
              className="rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-[0_20px_40px_-12px_rgba(79,70,229,0.4)] transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95"
            >
              Return to Dashboard
            </button>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-bold text-slate-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
              </span>
              Development in Progress
            </div>
          </div>

          {/* Decorative Grid */}
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-50/50 blur-3xl" />
        </div>
      </section>
    </main>
  )
}

export default ReportsPage
