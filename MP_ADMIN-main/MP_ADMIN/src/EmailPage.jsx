import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar.jsx'

gsap.registerPlugin(ScrollTrigger)

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
      <path d="M3.5 6.25h17A1.25 1.25 0 0 1 21.75 7.5v9A1.25 1.25 0 0 1 20.5 17.75h-17A1.25 1.25 0 0 1 2.25 16.5v-9A1.25 1.25 0 0 1 3.5 6.25Zm8.5 6.6 7.2-4.35H4.8l7.2 4.35Zm7.5-2.05-7.5 4.5-7.5-4.5v4.7h15v-4.7Z" fill="currentColor" />
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

function EmailPage({
  onBackToDashboard,
  onOpenUserAccount,
  onOpenLeadActive,
  onOpenChannelPartners,
  onOpenEmails,
  onOpenSms,
  onSignOut,
}) {
  const emailRows = []
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
        .fromTo('.email-control', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.28 }, '-=0.24')
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
            { xPercent: -55, opacity: 0.18 },
            { xPercent: 55, opacity: 0.34, duration: 6.6, repeat: -1, yoyo: true, ease: 'none' },
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

      const controls = gsap.utils.toArray('.email-control')
      controls.forEach((button) => {
        const onEnter = () => {
          gsap.to(button, {
            y: -2,
            scale: 1.01,
            boxShadow: '0 12px 22px rgba(47,127,203,0.24)',
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

      const clickable = gsap.utils.toArray('.email-clickable')
      clickable.forEach((button) => {
        const onClick = () => {
          gsap.fromTo(
            button,
            { boxShadow: '0 0 0 0 rgba(62,168,159,0.22)' },
            { boxShadow: '0 0 0 8px rgba(62,168,159,0)', duration: 0.28, ease: 'power2.out' },
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
    <main ref={pageRef} className="relative min-h-screen bg-[linear-gradient(180deg,#f7fbff_0%,#edf4ff_100%)] text-[#19324f]">
      <div className="pointer-events-none absolute inset-0">
        <div ref={(node) => (glowRefs.current[0] = node)} className="absolute -left-16 top-16 h-64 w-64 rounded-full bg-[#3ea89f]/14 blur-3xl" />
        <div ref={(node) => (glowRefs.current[1] = node)} className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#2f7fcb]/14 blur-3xl" />
        <div ref={beamRef} className="absolute left-6 top-20 h-44 w-[34rem] rotate-[-8deg] bg-gradient-to-r from-transparent via-[#3ea89f]/35 to-transparent blur-2xl" />
      </div>

      <Navbar
        activePage="emails"
        onBackToDashboard={onBackToDashboard}
        onOpenUserAccount={onOpenUserAccount}
        onOpenLeadActive={onOpenLeadActive}
        onOpenChannelPartners={onOpenChannelPartners}
        onOpenEmails={onOpenEmails}
        onOpenSms={onOpenSms}
        onSignOut={onSignOut}
      />

      <section className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">
        <div ref={headerRef} className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#cfe0fb] bg-white px-4 py-3 shadow-[0_14px_30px_rgba(24,73,138,0.08)]">
          <h1 className="flex items-center gap-2 text-3xl font-semibold text-[#1e3655]">
            <span className="text-[#2f5ea8]"><IconMail /></span>
            Email
          </h1>
          <div ref={controlsRef} className="flex items-center gap-3">
            <button type="button" className="email-control email-clickable rounded-lg border border-[#7ea4e2] bg-white px-8 py-2 text-3xl font-semibold text-[#6a62db]">
              Total : {emailRows.length}
            </button>
            <button type="button" className="email-control email-clickable rounded-lg border border-[#7ea4e2] bg-white p-2.5 text-[#6a62db]">
              <IconFilter />
            </button>
          </div>
        </div>

        <div ref={tableRef} className="overflow-hidden rounded-2xl border border-[#c9d9f2] bg-white shadow-[0_20px_40px_rgba(24,73,138,0.08)]">
          <div className="grid min-w-[980px] grid-cols-[1.6fr_1.4fr_0.7fr_0.8fr_0.7fr] bg-[linear-gradient(90deg,#2f7fcb_0%,#3ea89f_50%,#e58f45_100%)] text-sm font-semibold tracking-wide text-white lg:text-base">
            <div className="px-5 py-4">To</div>
            <div className="px-5 py-4">Subject</div>
            <div className="px-5 py-4">Status</div>
            <div className="px-5 py-4">Sent On</div>
            <div className="px-5 py-4">Actions</div>
          </div>

          {emailRows.length === 0 ? (
            <div className="email-row grid min-w-[980px] grid-cols-[1.6fr_1.4fr_0.7fr_0.8fr_0.7fr] border-t border-[#e4ecfb]">
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">No email records available.</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
            </div>
          ) : (
            emailRows.map((row) => (
              <div key={row.id} className="email-row grid min-w-[980px] grid-cols-[1.6fr_1.4fr_0.7fr_0.8fr_0.7fr] border-t border-[#e4ecfb]">
                <div className="px-5 py-4 text-sm text-[#314b6d]">{row.to}</div>
                <div className="px-5 py-4 text-sm text-[#314b6d]">{row.subject}</div>
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

export default EmailPage
