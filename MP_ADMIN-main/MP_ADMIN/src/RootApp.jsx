import { useState } from 'react'
import Login from './Login.jsx'
import Dashbord from './Dashbord.jsx'
import UserAccount from './UserAccount.jsx'
import Moreoption from './Moreoption.jsx'
import LeadActive from './LeadActive.jsx'
import EmailPage from './EmailPage.jsx'
import SmsPage from './SmsPage.jsx'

const SIGNED_IN_KEY = 'mp_admin_signed_in'
const ACTIVE_PAGE_KEY = 'mp_admin_active_page'
const DEFAULT_PAGE = 'dashboard'
const VALID_PAGES = new Set(['dashboard', 'user-account', 'lead-active', 'channel-partners', 'emails', 'sms'])

const getInitialPage = () => {
  const storedPage = localStorage.getItem(ACTIVE_PAGE_KEY)
  return VALID_PAGES.has(storedPage) ? storedPage : DEFAULT_PAGE
}

function RootApp() {
  const [isSignedIn, setIsSignedIn] = useState(() => localStorage.getItem(SIGNED_IN_KEY) === 'true')
  const [activePage, setActivePage] = useState(getInitialPage)

  const goToPage = (page) => {
    if (!VALID_PAGES.has(page)) {
      return
    }
    localStorage.setItem(ACTIVE_PAGE_KEY, page)
    setActivePage(page)
  }

  const handleSignIn = () => {
    localStorage.setItem(SIGNED_IN_KEY, 'true')
    setIsSignedIn(true)
    goToPage(DEFAULT_PAGE)
  }

  const handleSignOut = () => {
    localStorage.removeItem(SIGNED_IN_KEY)
    localStorage.removeItem(ACTIVE_PAGE_KEY)
    setIsSignedIn(false)
    setActivePage(DEFAULT_PAGE)
  }

  if (!isSignedIn) {
    return <Login onSignIn={handleSignIn} />
  }

  if (activePage === 'user-account') {
    return (
      <UserAccount
        onBackToDashboard={() => goToPage('dashboard')}
        onOpenUserAccount={() => goToPage('user-account')}
        onOpenLeadActive={() => goToPage('lead-active')}
        onOpenChannelPartners={() => goToPage('channel-partners')}
        onOpenEmails={() => goToPage('emails')}
        onOpenSms={() => goToPage('sms')}
        onSignOut={handleSignOut}
      />
    )
  }

  if (activePage === 'lead-active') {
    return (
      <LeadActive
        onBackToDashboard={() => goToPage('dashboard')}
        onOpenUserAccount={() => goToPage('user-account')}
        onOpenLeadActive={() => goToPage('lead-active')}
        onOpenChannelPartners={() => goToPage('channel-partners')}
        onOpenEmails={() => goToPage('emails')}
        onOpenSms={() => goToPage('sms')}
        onSignOut={handleSignOut}
      />
    )
  }

  if (activePage === 'channel-partners') {
    return (
      <Moreoption
        onBackToDashboard={() => goToPage('dashboard')}
        onOpenUserAccount={() => goToPage('user-account')}
        onOpenLeadActive={() => goToPage('lead-active')}
        onOpenChannelPartners={() => goToPage('channel-partners')}
        onOpenEmails={() => goToPage('emails')}
        onOpenSms={() => goToPage('sms')}
        onSignOut={handleSignOut}
      />
    )
  }

  if (activePage === 'emails') {
    return (
      <EmailPage
        onBackToDashboard={() => goToPage('dashboard')}
        onOpenUserAccount={() => goToPage('user-account')}
        onOpenLeadActive={() => goToPage('lead-active')}
        onOpenChannelPartners={() => goToPage('channel-partners')}
        onOpenEmails={() => goToPage('emails')}
        onOpenSms={() => goToPage('sms')}
        onSignOut={handleSignOut}
      />
    )
  }

  if (activePage === 'sms') {
    return (
      <SmsPage
        onBackToDashboard={() => goToPage('dashboard')}
        onOpenUserAccount={() => goToPage('user-account')}
        onOpenLeadActive={() => goToPage('lead-active')}
        onOpenChannelPartners={() => goToPage('channel-partners')}
        onOpenEmails={() => goToPage('emails')}
        onOpenSms={() => goToPage('sms')}
        onSignOut={handleSignOut}
      />
    )
  }

  return (
    <Dashbord
      onSignOut={handleSignOut}
      onBackToDashboard={() => goToPage('dashboard')}
      onOpenUserAccount={() => goToPage('user-account')}
      onOpenLeadActive={() => goToPage('lead-active')}
      onOpenChannelPartners={() => goToPage('channel-partners')}
      onOpenEmails={() => goToPage('emails')}
      onOpenSms={() => goToPage('sms')}
    />
  )
}

export default RootApp
