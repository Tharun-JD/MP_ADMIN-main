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
    more: <path d="M5 12a1.75 1.75 0 1 0 0 .01V12Zm7 0a1.75 1.75 0 1 0 0 .01V12Zm7 0a1.75 1.75 0 1 0 0 .01V12Z" fill="currentColor" />,
    chevron: <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    docs: <path d="M7 2.5h8l4 4V21.5H7V2.5Zm8 2v3h3l-3-3Zm-5 7h6v2h-6v-2Zm0 4h6v2h-6v-2Z" fill="currentColor" />,
    reports: <path d="M5 3.5h14a1.5 1.5 0 0 1 1.5 1.5V19A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5Zm2.5 12h2v-5h-2v5Zm3.5 0h2V8h-2v7Zm3.5 0h2v-3h-2v3Z" fill="currentColor" />,
    profile: <path d="M12 12a4.4 4.4 0 1 0-4.4-4.4A4.4 4.4 0 0 0 12 12Zm0 2.2c-4.13 0-7.5 2.18-7.5 4.88V21h15v-1.92c0-2.7-3.37-4.88-7.5-4.88Z" fill="currentColor" />,
    settings: <path d="m12 2.5 1.3 2.2 2.5.5.4 2.5 2 1.5-1 2.3 1 2.3-2 1.5-.4 2.5-2.5.5-1.3 2.2-2.3-1-2.3 1-1.3-2.2-2.5-.5-.4-2.5-2-1.5 1-2.3-1-2.3 2-1.5.4-2.5 2.5-.5L9.7 2.5h2.3Zm0 6.2A3.3 3.3 0 1 0 15.3 12 3.3 3.3 0 0 0 12 8.7Z" fill="currentColor" />,
    signout: <path d="M10 4.5h-4A1.5 1.5 0 0 0 4.5 6v12A1.5 1.5 0 0 0 6 19.5h4v-2H6.5v-11H10v-2Zm4.06 3.44-1.42 1.41L14.8 11.5H8v2h6.8l-2.16 2.15 1.42 1.41L18.6 12l-4.54-4.06Z" fill="currentColor" />,
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

const navItems = [
  { label: 'Dashbord', icon: 'dashboard' },
  { label: 'UserAccount', icon: 'user' },
  { label: 'Lead Activity', icon: 'lead' },
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

function Navbar({
  activePage,
  onBackToDashboard,
  onOpenUserAccount,
  onOpenLeadActive,
  onOpenChannelPartners,
  onOpenEmails,
  onOpenSms,
  onSignOut,
  className = '',
}) {
  const [openMenu, setOpenMenu] = useState(null)
  const [openWelcome, setOpenWelcome] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [profileValues, setProfileValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    timeZone: '(GMT+05:30) Mumbai',
  })
  const [passwordValues, setPasswordValues] = useState({
    Newpassword: '',
    confirmPassword: '',
  })
  const welcomeMenuRef = useRef(null)
  const profilePanelRef = useRef(null)
  const passwordPanelRef = useRef(null)

  useEffect(() => {
    const onPointerDown = (event) => {
      if (welcomeMenuRef.current && !welcomeMenuRef.current.contains(event.target)) {
        setOpenWelcome(false)
      }
      if (profilePanelRef.current && !profilePanelRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
      if (passwordPanelRef.current && !passwordPanelRef.current.contains(event.target)) {
        setIsPasswordOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    if (!window.gsap || !isProfileOpen || !profilePanelRef.current) {
      return
    }

    const gsap = window.gsap
    const panel = profilePanelRef.current
    const fields = panel.querySelectorAll('.cmp-field')
    const accents = panel.querySelectorAll('.cmp-accent')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .fromTo('.cmp-overlay', { opacity: 0 }, { opacity: 1, duration: 0.24 })
      .fromTo(
        panel,
        { y: 36, opacity: 0, scale: 1.08, rotateX: -8, transformOrigin: '50% 0%' },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.42 },
        '-=0.06',
      )
      .fromTo(fields, { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.035, duration: 0.22 }, '-=0.24')
      .fromTo(accents, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 0.55, stagger: 0.06, duration: 0.32 }, '-=0.35')

    return () => tl.kill()
  }, [isProfileOpen])

  useEffect(() => {
    if (!window.gsap || !isPasswordOpen || !passwordPanelRef.current) {
      return
    }

    const gsap = window.gsap
    const panel = passwordPanelRef.current
    const fields = panel.querySelectorAll('.cpp-field')
    const accents = panel.querySelectorAll('.cpp-accent')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .fromTo('.cpp-overlay', { opacity: 0 }, { opacity: 1, duration: 0.24 })
      .fromTo(
        panel,
        { y: 34, opacity: 0, scale: 1.06, rotateX: -7, transformOrigin: '50% 0%' },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.42 },
        '-=0.06',
      )
      .fromTo(fields, { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.22 }, '-=0.24')
      .fromTo(accents, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 0.55, stagger: 0.06, duration: 0.3 }, '-=0.35')

    return () => tl.kill()
  }, [isPasswordOpen])

  const setProfileField = (field, value) => {
    setProfileValues((prev) => ({ ...prev, [field]: value }))
  }

  const setPasswordField = (field, value) => {
    setPasswordValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleChangePassword = () => {
    if (!passwordValues.password || !passwordValues.confirmPassword) {
      window.alert('Please fill both password fields.')
      return
    }
    if (passwordValues.password !== passwordValues.confirmPassword) {
      window.alert('Password and confirmation do not match.')
      return
    }
    setPasswordValues({ password: '', confirmPassword: '' })
    setIsPasswordOpen(false)
  }

  return (
    <>
      <header className={`${className} sticky top-0 z-[200] border-b border-[#2f3fa9]/10 bg-white/85 backdrop-blur overflow-visible`}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-16 top-0 h-full w-[26rem] rotate-[4deg] bg-gradient-to-r from-transparent via-[#2f3fa9]/18 to-transparent blur-xl" />
          <div className="absolute right-0 top-0 h-full w-[22rem] rotate-[-3deg] bg-gradient-to-r from-transparent via-[#1a79d1]/14 to-transparent blur-xl" />
        </div>
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 overflow-visible px-4 py-4 lg:px-6">
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
                      return
                    }
                    setOpenMenu(null)
                    if (item.label === 'Dashbord') onBackToDashboard?.()
                    if (item.label === 'UserAccount') onOpenUserAccount?.()
                    if (item.label === 'Lead Activity') onOpenLeadActive?.()
                  }}
                  className={`nav-btn flex items-center gap-1.5 rounded-lg border border-[#2f3fa9]/15 bg-white px-3 py-2 text-sm font-semibold transition hover:border-[#1a79d1]/50 hover:text-[#1a79d1] ${
                    (activePage === 'dashboard' && item.label === 'Dashbord') ||
                    (activePage === 'user-account' && item.label === 'UserAccount') ||
                    (activePage === 'lead-active' && item.label === 'Lead Activity') ||
                    ((activePage === 'channel-partners' || activePage === 'emails' || activePage === 'sms') && item.label === 'More')
                      ? 'text-[#1a79d1]'
                      : 'text-[#1a3c6b]'
                  }`}
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.label}
                  {item.label === 'More' && <Icon name="chevron" className="h-3 w-3" />}
                </button>

                {item.label === 'More' && openMenu === item.label && (
                  <div className="absolute left-0 top-12 z-[260] min-w-44 rounded-xl border border-[#d5e3f7] bg-white p-2 shadow-xl">
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

          <div ref={welcomeMenuRef} className="relative">
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
              <div className="absolute right-0 top-12 z-[260] min-w-48 rounded-xl border border-[#d5e3f7] bg-white p-2 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    setOpenWelcome(false)
                    setIsProfileOpen(true)
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#274873] hover:bg-[#eef5ff]"
                >
                  <Icon name="profile" className="h-4 w-4 text-[#1a79d1]" />
                  Channel Manager Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenWelcome(false)
                    setIsPasswordOpen(true)
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#274873] hover:bg-[#eef5ff]"
                >
                  <Icon name="settings" className="h-4 w-4 text-[#1a79d1]" />
                  Change Password
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

      {isProfileOpen && (
        <div className="cmp-overlay fixed inset-0 z-[360] flex items-center justify-center bg-[#0a1222]/45 p-3 backdrop-blur-[2px]">
          <div ref={profilePanelRef} className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl border border-[#8f7bf6]/40 bg-[#f4f6fb] shadow-2xl shadow-[#1a1f5f]/35">
            <div className="cmp-accent pointer-events-none absolute -left-6 top-6 h-12 w-12 rounded-full bg-[#89a0ff]/40 blur-md" />
            <div className="cmp-accent pointer-events-none absolute right-10 top-10 h-14 w-14 rounded-full bg-[#e18dff]/35 blur-md" />
            <div className="flex items-center justify-between bg-[linear-gradient(90deg,#6f7df3_0%,#9d67df_100%)] px-5 py-3.5">
              <h2 className="cmp-field text-2xl font-semibold text-white">Edit Channel Partner Manager</h2>
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="cmp-field text-3xl font-bold leading-none text-white/80 transition hover:text-white"
              >
                X
              </button>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2">
              <div className="cmp-field space-y-2">
                <label className="text-base font-semibold text-[#1f3557]">First name <span className="text-[#e54848]">*</span></label>
                <input
                  type="text"
                  value={profileValues.firstName}
                  onChange={(event) => setProfileField('firstName', event.target.value)}
                  className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2.5 text-xl text-[#2d4568] outline-none transition focus:border-[#7d88ff] focus:ring-2 focus:ring-[#7d88ff]/25"
                />
              </div>

              <div className="cmp-field space-y-2">
                <label className="text-base font-semibold text-[#1f3557]">Last name <span className="text-[#e54848]">*</span></label>
                <input
                  type="text"
                  value={profileValues.lastName}
                  onChange={(event) => setProfileField('lastName', event.target.value)}
                  className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2.5 text-xl text-[#2d4568] outline-none transition focus:border-[#7d88ff] focus:ring-2 focus:ring-[#7d88ff]/25"
                />
              </div>

              <div className="cmp-field space-y-2">
                <label className="text-base font-semibold text-[#1f3557]">Email <span className="text-[#e54848]">*</span></label>
                <input
                  type="email"
                  value={profileValues.email}
                  onChange={(event) => setProfileField('email', event.target.value)}
                  className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2.5 text-xl text-[#2d4568] outline-none transition focus:border-[#7d88ff] focus:ring-2 focus:ring-[#7d88ff]/25"
                />
              </div>

              <div className="cmp-field space-y-2">
                <label className="text-base font-semibold text-[#1f3557]">Phone <span className="text-[#e54848]">*</span></label>
                <div className="flex items-center rounded-md border border-[#c6d4ea] bg-white px-3 py-3">
                  <span className="text-lg">🇮🇳</span>
                  <span className="mx-2 text-[#61708a]">▼</span>
                  <input
                    type="text"
                    placeholder="+91"
                    value={profileValues.phone}
                    onChange={(event) => setProfileField('phone', event.target.value)}
                    className="w-full border-0 bg-transparent text-xl text-[#2d4568] outline-none"
                  />
                </div>
              </div>

              <div className="cmp-field space-y-2 md:col-span-1">
                <label className="text-base font-semibold text-[#1f3557]">User&apos;s Time Zone</label>
                <select
                  value={profileValues.timeZone}
                  onChange={(event) => setProfileField('timeZone', event.target.value)}
                  className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2.5 text-xl text-[#2d4568] outline-none transition focus:border-[#7d88ff] focus:ring-2 focus:ring-[#7d88ff]/25"
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
                onClick={() => setIsProfileOpen(false)}
                className="cmp-field rounded-md bg-[#1d73ce] px-5 py-2 text-lg font-semibold text-white transition hover:brightness-110"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isPasswordOpen && (
        <div className="cpp-overlay fixed inset-0 z-[365] flex items-center justify-center bg-[#0a1222]/45 p-3 backdrop-blur-[2px]">
          <div ref={passwordPanelRef} className="relative max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-xl border border-[#8f7bf6]/40 bg-[#f4f6fb] shadow-2xl shadow-[#1a1f5f]/35">
            <div className="cpp-accent pointer-events-none absolute -left-6 top-6 h-12 w-12 rounded-full bg-[#89a0ff]/40 blur-md" />
            <div className="cpp-accent pointer-events-none absolute right-10 top-10 h-14 w-14 rounded-full bg-[#e18dff]/35 blur-md" />
            <div className="flex items-center justify-between bg-[linear-gradient(90deg,#6f7df3_0%,#9d67df_100%)] px-5 py-3.5">
              <h2 className="cpp-field text-2xl font-semibold text-white">Change Password</h2>
              <button
                type="button"
                onClick={() => setIsPasswordOpen(false)}
                className="cpp-field text-3xl font-bold leading-none text-white/80 transition hover:text-white"
              >
                X
              </button>
            </div>

            <div className="grid gap-4 p-5">
              <div className="cpp-field space-y-2">
                <label className="text-base font-semibold text-[#1f3557]">Password <span className="text-[#e54848]">*</span></label>
                <input
                  type="password"
                  value={passwordValues.password}
                  onChange={(event) => setPasswordField('password', event.target.value)}
                  className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2.5 text-xl text-[#2d4568] outline-none transition focus:border-[#7d88ff] focus:ring-2 focus:ring-[#7d88ff]/25"
                />
              </div>

              <div className="cpp-field space-y-2">
                <label className="text-base font-semibold text-[#1f3557]">Password Confirmation <span className="text-[#e54848]">*</span></label>
                <input
                  type="password"
                  value={passwordValues.confirmPassword}
                  onChange={(event) => setPasswordField('confirmPassword', event.target.value)}
                  className="w-full rounded-md border border-[#c6d4ea] bg-white px-4 py-2.5 text-xl text-[#2d4568] outline-none transition focus:border-[#7d88ff] focus:ring-2 focus:ring-[#7d88ff]/25"
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-[#d2dbee] bg-white/75 px-5 py-4">
              <button
                type="button"
                onClick={handleChangePassword}
                className="cpp-field rounded-md bg-[#1d73ce] px-5 py-2 text-lg font-semibold text-white transition hover:brightness-110"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
