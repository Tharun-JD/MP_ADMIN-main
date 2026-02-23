import Navbar from './Navbar.jsx'

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

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fbff_0%,#edf4ff_100%)] text-[#19324f]">
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

      <section className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#cfe0fb] bg-white px-4 py-3 shadow-[0_14px_30px_rgba(24,73,138,0.08)]">
          <h1 className="flex items-center gap-2 text-3xl font-semibold text-[#1e3655]">
            <span className="text-[#2f5ea8]"><IconMail /></span>
            Email
          </h1>
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-lg border border-[#7ea4e2] bg-white px-8 py-2 text-3xl font-semibold text-[#6a62db]">
              Total : {emailRows.length}
            </button>
            <button type="button" className="rounded-lg border border-[#7ea4e2] bg-white p-2.5 text-[#6a62db]">
              <IconFilter />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#c9d9f2] bg-white shadow-[0_20px_40px_rgba(24,73,138,0.08)]">
          <div className="grid min-w-[980px] grid-cols-[1.6fr_1.4fr_0.7fr_0.8fr_0.7fr] bg-[linear-gradient(90deg,#2f7fcb_0%,#3ea89f_50%,#e58f45_100%)] text-sm font-semibold tracking-wide text-white lg:text-base">
            <div className="px-5 py-4">To</div>
            <div className="px-5 py-4">Subject</div>
            <div className="px-5 py-4">Status</div>
            <div className="px-5 py-4">Sent On</div>
            <div className="px-5 py-4">Actions</div>
          </div>

          {emailRows.length === 0 ? (
            <div className="grid min-w-[980px] grid-cols-[1.6fr_1.4fr_0.7fr_0.8fr_0.7fr] border-t border-[#e4ecfb]">
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">No email records available.</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
            </div>
          ) : (
            emailRows.map((row) => (
              <div key={row.id} className="grid min-w-[980px] grid-cols-[1.6fr_1.4fr_0.7fr_0.8fr_0.7fr] border-t border-[#e4ecfb]">
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
