import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar.jsx'

gsap.registerPlugin(ScrollTrigger)

function IconSms() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
      <path d="M3.5 7.5A3.5 3.5 0 0 1 7 4h10a3.5 3.5 0 0 1 3.5 3.5V14A3.5 3.5 0 0 1 17 17.5H10l-4.6 2.3a.75.75 0 0 1-1.09-.67v-2.04A3.48 3.48 0 0 1 3.5 14V7.5Zm5.25 2h6.5v1.5h-6.5V9.5Zm0 3h4.2V14h-4.2v-1.5Z" fill="currentColor" />
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

function SmsPage({
  onBackToDashboard,
  onOpenUserAccount,
  onOpenLeadActive,
  onOpenChannelPartners,
  onOpenEmails,
  onOpenSms,
  onSignOut,
}) {
  const smsRows = []
  const pageRef = useRef(null)
  const headerRef = useRef(null)
  const controlsRef = useRef(null)
  const tableRef = useRef(null)
  const glowRefs = useRef([])
  const beamRef = useRef(null)

  useEffect(() => {
    if (!pageRef.current) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups = []
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power2.out' } })
      intro
        .fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(headerRef.current, { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42 }, '-=0.1')
        .fromTo('.sms-control', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.28 }, '-=0.24')
        .fromTo(tableRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.16')
      cleanups.push(() => intro.kill())

      if (!prefersReducedMotion) {
        glowRefs.current.filter(Boolean).forEach((node, index) => {
          const drift = gsap.to(node, {
            x: index % 2 ? -18 : 20,
            y: index % 2 ? 12 : -12,
            duration: 6 + index * 1.1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
          cleanups.push(() => drift.kill())
        })

        if (beamRef.current) {
          const beamSweep = gsap.fromTo(
            beamRef.current,
            { xPercent: -55, opacity: 0.16 },
            { xPercent: 55, opacity: 0.32, duration: 6.8, repeat: -1, yoyo: true, ease: 'none' },
          )
          cleanups.push(() => beamSweep.kill())
        }

        if (tableRef.current) {
          const reveal = gsap.fromTo(
            tableRef.current,
            { y: 18, autoAlpha: 0.92 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.42,
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

      const controls = gsap.utils.toArray('.sms-control')
      controls.forEach((button) => {
        const onEnter = () => {
          gsap.to(button, {
            y: -2,
            scale: 1.01,
            boxShadow: '0 12px 22px rgba(127,111,222,0.24)',
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
        button.addEventListener('mouseenter', onEnter)
        button.addEventListener('mouseleave', onLeave)
        cleanups.push(() => button.removeEventListener('mouseenter', onEnter))
        cleanups.push(() => button.removeEventListener('mouseleave', onLeave))
      })

      const clickable = gsap.utils.toArray('.sms-clickable')
      clickable.forEach((button) => {
        const onClick = () => {
          gsap.fromTo(
            button,
            { boxShadow: '0 0 0 0 rgba(127,111,222,0.22)' },
            { boxShadow: '0 0 0 8px rgba(127,111,222,0)', duration: 0.28, ease: 'power2.out' },
          )
          gsap.fromTo(button, { scale: 1 }, { scale: 0.986, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.out' })
        }
        button.addEventListener('click', onClick)
        cleanups.push(() => button.removeEventListener('click', onClick))
      })
    }, pageRef)

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [])

  return (
    <main ref={pageRef} className="relative min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <div className="pointer-events-none absolute inset-0">
        <div ref={(node) => (glowRefs.current[0] = node)} className="absolute -left-16 top-16 h-64 w-64 rounded-full bg-[#7f6fde]/14 blur-3xl" />
        <div ref={(node) => (glowRefs.current[1] = node)} className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#5e90db]/14 blur-3xl" />
        <div ref={beamRef} className="absolute left-6 top-20 h-44 w-[34rem] rotate-[-8deg] bg-gradient-to-r from-transparent via-[#7f6fde]/35 to-transparent blur-2xl" />
      </div>

      <Navbar
        activePage="sms"
        onBackToDashboard={onBackToDashboard}
        onOpenUserAccount={onOpenUserAccount}
        onOpenLeadActive={onOpenLeadActive}
        onOpenChannelPartners={onOpenChannelPartners}
        onOpenEmails={onOpenEmails}
        onOpenSms={onOpenSms}
        onSignOut={onSignOut}
      />

      <section className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">
        <div ref={headerRef} className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-[#0f172a]">
            <span className="text-[#6366f1]"><IconSms /></span>
            SMSs
          </h1>
          <div ref={controlsRef} className="flex items-center gap-3">
            <button type="button" className="sms-control sms-clickable rounded-lg border border-[#e2e8f0] bg-white px-8 py-2 text-base font-bold text-[#475569] shadow-sm">
              Total : {smsRows.length}
            </button>
            <button type="button" className="sms-control sms-clickable rounded-lg border border-[#e2e8f0] bg-white p-2.5 text-[#475569] shadow-sm">
              <IconFilter />
            </button>
          </div>
        </div>

        <div ref={tableRef} className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-xl shadow-slate-200/40">
          <div className="grid min-w-[980px] grid-cols-[1.1fr_2fr_0.9fr_1fr_0.8fr] bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] border-b border-[#f1f5f9] text-sm font-bold tracking-wider text-[#475569] lg:text-base">
            <div className="px-5 py-4">To</div>
            <div className="px-5 py-4">Content</div>
            <div className="px-5 py-4">Status</div>
            <div className="px-5 py-4">Sent On</div>
            <div className="px-5 py-4">Actions</div>
          </div>

          {smsRows.length === 0 ? (
            <div className="sms-row grid min-w-[980px] grid-cols-[1.1fr_2fr_0.9fr_1fr_0.8fr] border-t border-[#e4ecfb]">
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">No SMS records available.</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
            </div>
          ) : (
            smsRows.map((row) => (
              <div key={row.id} className="sms-row grid min-w-[980px] grid-cols-[1.1fr_2fr_0.9fr_1fr_0.8fr] border-t border-[#e4ecfb]">
                <div className="px-5 py-4 text-sm text-[#314b6d]">{row.to}</div>
                <div className="px-5 py-4 text-sm text-[#314b6d]">{row.content}</div>
                <div className="px-5 py-4 text-sm text-[#314b6d]">{row.status}</div>
                <div className="px-5 py-4 text-sm text-[#314b6d]">{row.sentOn}</div>
                <div className="px-5 py-4 text-sm text-[#314b6d]">{row.action}</div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}

export default SmsPage
