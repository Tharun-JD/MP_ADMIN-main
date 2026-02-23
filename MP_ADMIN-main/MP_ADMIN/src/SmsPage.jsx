import Navbar from './Navbar.jsx'

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

  return (
    <main className="min-h-screen bg-[#f4f7fd] text-[#19324f]">
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

      <section className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#cfdcf3] bg-white px-4 py-3 shadow-[0_12px_26px_rgba(33,74,131,0.08)]">
          <h1 className="flex items-center gap-2 text-3xl font-semibold text-[#1f3550]">
            <span className="text-[#2c4f8f]"><IconSms /></span>
            SMSs
          </h1>
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-lg border border-[#7b9ef0] bg-white px-8 py-2 text-3xl font-semibold text-[#6a62db]">
              Total : {smsRows.length}
            </button>
            <button type="button" className="rounded-lg border border-[#7b9ef0] bg-white p-2.5 text-[#6a62db]">
              <IconFilter />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#cad6f1] bg-white shadow-[0_18px_34px_rgba(28,61,112,0.08)]">
          <div className="grid min-w-[980px] grid-cols-[1.1fr_2fr_0.9fr_1fr_0.8fr] bg-[linear-gradient(90deg,#5e90db_0%,#7f6fde_50%,#a86ddb_100%)] text-sm font-semibold tracking-wide text-white lg:text-base">
            <div className="px-5 py-4">To</div>
            <div className="px-5 py-4">Content</div>
            <div className="px-5 py-4">Status</div>
            <div className="px-5 py-4">Sent On</div>
            <div className="px-5 py-4">Actions</div>
          </div>

          {smsRows.length === 0 ? (
            <div className="grid min-w-[980px] grid-cols-[1.1fr_2fr_0.9fr_1fr_0.8fr] border-t border-[#e4ecfb]">
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">No SMS records available.</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
              <div className="px-5 py-4 text-sm text-[#6b7f9a]">-</div>
            </div>
          ) : (
            smsRows.map((row) => (
              <div key={row.id} className="grid min-w-[980px] grid-cols-[1.1fr_2fr_0.9fr_1fr_0.8fr] border-t border-[#e4ecfb]">
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
