import { useEffect, useRef, useState } from 'react'

function Login({ onSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

  const pageRef = useRef(null)
  const cardRef = useRef(null)
  const sceneRef = useRef(null)
  const craneArmRef = useRef(null)
  const hookRef = useRef(null)
  const blockRefs = useRef([])
  const glowRefs = useRef([])
  const beamRefs = useRef([])
  const ringRefs = useRef([])
  const shardRefs = useRef([])

  useEffect(() => {
    if (!window.gsap) {
      return
    }

    const gsap = window.gsap
    const cleanups = []

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
    intro
      .fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45 })
      .fromTo(
        cardRef.current,
        { opacity: 0, x: -70, rotateY: 25, rotateX: -10, transformOrigin: 'left center' },
        { opacity: 1, x: 0, rotateY: 0, rotateX: 0, duration: 0.9 },
        '-=0.1',
      )
      .fromTo(
        sceneRef.current,
        { opacity: 0, x: 70, rotateY: -26, rotateX: 10, transformOrigin: 'right center' },
        { opacity: 1, x: 0, rotateY: 0, rotateX: 0, duration: 1 },
        '-=0.75',
      )
      .fromTo('.logo-char', { y: 26, opacity: 0, rotateX: -80 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.06, duration: 0.38 }, '-=0.58')

    cleanups.push(() => intro.kill())

    if (craneArmRef.current) {
      const swing = gsap.to(craneArmRef.current, {
        rotate: 11,
        transformOrigin: 'left center',
        duration: 1.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      cleanups.push(() => swing.kill())
    }

    if (hookRef.current) {
      const lift = gsap.to(hookRef.current, {
        y: -58,
        duration: 1.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      cleanups.push(() => lift.kill())
    }

    blockRefs.current.filter(Boolean).forEach((block, index) => {
      const rise = gsap.fromTo(
        block,
        { y: 48 + index * 8, opacity: 0.1, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          delay: 0.2 + index * 0.13,
          repeat: -1,
          repeatDelay: 1,
          yoyo: true,
          ease: 'power1.inOut',
        },
      )
      cleanups.push(() => rise.kill())
    })

    glowRefs.current.filter(Boolean).forEach((glow, index) => {
      const pulse = gsap.to(glow, {
        scale: index % 2 ? 1.25 : 0.78,
        opacity: index % 2 ? 0.4 : 0.18,
        duration: 2.8 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      cleanups.push(() => pulse.kill())
    })

    beamRefs.current.filter(Boolean).forEach((beam, index) => {
      const scan = gsap.fromTo(
        beam,
        { xPercent: -65, opacity: 0.12 },
        {
          xPercent: 65,
          opacity: 0.28,
          duration: 4.5 + index,
          repeat: -1,
          yoyo: true,
          ease: 'none',
        },
      )
      cleanups.push(() => scan.kill())
    })

    ringRefs.current.filter(Boolean).forEach((ring, index) => {
      const spin = gsap.to(ring, {
        rotate: index % 2 ? -360 : 360,
        duration: 10 + index * 3,
        repeat: -1,
        ease: 'none',
      })
      cleanups.push(() => spin.kill())
    })

    shardRefs.current.filter(Boolean).forEach((shard, index) => {
      const float = gsap.to(shard, {
        y: index % 2 ? -24 : 28,
        x: index % 2 ? 20 : -22,
        rotateY: index % 2 ? -24 : 24,
        rotateX: index % 2 ? 16 : -16,
        rotateZ: index % 2 ? -14 : 14,
        duration: 3 + index * 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      cleanups.push(() => float.kill())
    })

    const onMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5
      const y = event.clientY / window.innerHeight - 0.5

      gsap.to(cardRef.current, {
        x: x * 22,
        y: y * 12,
        rotateY: x * 11,
        rotateX: -y * 8,
        duration: 0.38,
        ease: 'power2.out',
      })

      gsap.to(sceneRef.current, {
        x: -x * 30,
        y: -y * 18,
        rotateY: -x * 13,
        rotateX: y * 10,
        duration: 0.46,
        ease: 'power2.out',
      })
    }

    const onLeave = () => {
      gsap.to([cardRef.current, sceneRef.current], {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.55,
        ease: 'power3.out',
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    cleanups.push(() => window.removeEventListener('mousemove', onMove))
    cleanups.push(() => window.removeEventListener('mouseleave', onLeave))

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (onSignIn) {
      onSignIn()
    }
  }

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_14%_16%,#edf4ff_0%,#f6faff_38%,#ffffff_100%)] text-[#12305a] opacity-0 [perspective:1700px]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_27px,rgba(20,56,105,0.06)_28px),linear-gradient(90deg,transparent_27px,rgba(20,56,105,0.06)_28px)] bg-[size:28px_28px]" />

        <div
          ref={(node) => {
            beamRefs.current[0] = node
          }}
          className="absolute -left-20 top-10 h-40 w-[35rem] rotate-[-14deg] bg-gradient-to-r from-transparent via-[#2f3fa9]/35 to-transparent blur-2xl"
        />
        <div
          ref={(node) => {
            beamRefs.current[1] = node
          }}
          className="absolute right-0 top-[30%] h-44 w-[38rem] rotate-[10deg] bg-gradient-to-r from-transparent via-[#eb7a26]/30 to-transparent blur-2xl"
        />

        <div
          ref={(node) => {
            glowRefs.current[0] = node
          }}
          className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#2f3fa9]/25 blur-3xl"
        />
        <div
          ref={(node) => {
            glowRefs.current[1] = node
          }}
          className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#eb7a26]/22 blur-3xl"
        />
        <div
          ref={(node) => {
            glowRefs.current[2] = node
          }}
          className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#1a79d1]/16 blur-3xl"
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
          className="absolute left-1/2 top-1/2 h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1a79d1]/15"
        />
      </div>

      <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-8 lg:grid-cols-2 lg:px-8">
        <form
          ref={cardRef}
          onSubmit={handleSubmit}
          autoComplete="off"
          className="w-full max-w-xl rounded-[2rem] border border-[#2f3fa9]/18 bg-white/85 p-8 shadow-2xl shadow-[#2f3fa9]/20 backdrop-blur-xl sm:p-10 lg:order-2 lg:justify-self-end"
        >
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#1a79d1]">MP Developers</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#102d57]">Construction Portal</h1>
          <p className="mt-3 max-w-md text-[15px] text-[#425677]">
            Sign in to manage projects, approvals, engineering reports, and partner workflow updates.
          </p>

          <label className="mt-7 block text-sm font-semibold text-[#1f365d]" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="mp_email"
            type="email"
            autoComplete="off"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#a8c2e9] bg-[#f8fbff] px-4 py-3 text-sm outline-none transition placeholder:text-[#8094b2] focus:border-[#1a79d1] focus:ring-2 focus:ring-[#1a79d1]/30"
            placeholder="Email"
            required
          />

          <label className="mt-4 block text-sm font-semibold text-[#1f365d]" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="mp_password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#a8c2e9] bg-[#f8fbff] px-4 py-3 text-sm outline-none transition placeholder:text-[#8094b2] focus:border-[#1a79d1] focus:ring-2 focus:ring-[#1a79d1]/30"
            placeholder="Password"
            required
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-[#4a5d7d]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="h-4 w-4 rounded border-[#a8c2e9] text-[#1a79d1] focus:ring-[#1a79d1]/40"
              />
              Keep me logged in
            </label>
            <a href="#" className="text-sm font-medium text-[#1a79d1] underline underline-offset-2">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#1a79d1] via-[#2f3fa9] to-[#eb7a26] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#2f3fa9]/25 transition hover:brightness-110"
          >
            Sign In
          </button>
        </form>

        <aside ref={sceneRef} className="relative mx-auto w-full max-w-2xl lg:order-1 lg:justify-self-start">
          <div
            ref={(node) => {
              shardRefs.current[0] = node
            }}
            className="absolute -left-8 -top-8 h-16 w-16 rounded-2xl border border-[#2f3fa9]/30 bg-white/60"
          />
          <div
            ref={(node) => {
              shardRefs.current[1] = node
            }}
            className="absolute -right-5 top-8 h-14 w-14 rounded-full border border-[#eb7a26]/40 bg-white/70"
          />
          <div
            ref={(node) => {
              shardRefs.current[2] = node
            }}
            className="absolute left-16 -bottom-6 h-12 w-12 rounded-xl border border-[#1a79d1]/40 bg-white/70"
          />

          <div className="relative rounded-[2.3rem] border border-white/70 bg-white/70 p-8 shadow-2xl shadow-[#2f3fa9]/25 backdrop-blur-lg sm:p-12">
            <div className="flex items-start gap-1 text-[8.2rem] font-black leading-[0.8] sm:text-[10rem]">
              <span className="logo-char text-[#2f3fa9]">m</span>
              <span className="logo-char text-[#2f3fa9]">P</span>
            </div>
            <h2 className="mt-1 text-5xl font-black text-[#2f3fa9] sm:text-6xl">Developers</h2>
            <p className="mt-3 text-lg font-extrabold tracking-[0.32em] text-[#2f3fa9] sm:text-xl">
              TRUST <span className="text-[#eb7a26]">FOREVER</span>
            </p>

            <div className="relative mt-8 h-72 w-full rounded-2xl border border-[#2f3fa9]/15 bg-[linear-gradient(180deg,#ffffff_0%,#eaf1ff_100%)] p-4 [transform-style:preserve-3d]">
              <div className="absolute inset-x-4 bottom-3 h-3 rounded-full bg-[#1a79d1]/15 blur-sm" />

              <div className="absolute left-6 top-8 h-48 w-4 rounded bg-[#2f3fa9] shadow-lg shadow-[#2f3fa9]/30" />
              <div ref={craneArmRef} className="absolute left-8 top-10 h-3 w-44 rounded bg-[#2f3fa9]" />
              <div className="absolute left-[11.7rem] top-[2.7rem] h-28 w-[2px] bg-[#2f3fa9]/70" />
              <div ref={hookRef} className="absolute left-[11.35rem] top-[8.9rem] h-4 w-4 rounded-b-full border-2 border-[#eb7a26] border-t-0" />

              <div
                ref={(node) => {
                  blockRefs.current[0] = node
                }}
                className="absolute bottom-8 right-16 h-14 w-16 rounded-md border border-[#2f3fa9]/20 bg-[#f0f5ff] shadow-md [transform:translateZ(36px)]"
              />
              <div
                ref={(node) => {
                  blockRefs.current[1] = node
                }}
                className="absolute bottom-8 right-34 h-20 w-20 rounded-md border border-[#1a79d1]/20 bg-[#e4efff] shadow-md [transform:translateZ(52px)]"
              />
              <div
                ref={(node) => {
                  blockRefs.current[2] = node
                }}
                className="absolute bottom-8 right-58 h-24 w-16 rounded-md border border-[#2f3fa9]/20 bg-[#dbe9ff] shadow-md [transform:translateZ(28px)]"
              />
              <div
                ref={(node) => {
                  blockRefs.current[3] = node
                }}
                className="absolute bottom-8 right-[3.6rem] h-28 w-14 rounded-md border border-[#eb7a26]/30 bg-[#fff0e2] shadow-md [transform:translateZ(64px)]"
              />
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default Login
