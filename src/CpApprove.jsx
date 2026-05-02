import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Navbar from './Navbar.jsx'

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function CpApprove({
  onBackToDashboard,
  onOpenUserAccount,
  onOpenLeadActive,
  onOpenChannelPartners,
  onOpenEmails,
  onOpenSms,
  onOpenReports,
  onSignOut
}) {
  const [approvals, setApprovals] = useState([])

  useEffect(() => {
    // Fetch pending partners from API
    fetch('http://localhost:3000/partners?status=Pending')
      .then(res => res.json())
      .then(data => setApprovals(data))
      .catch(err => {
        console.error('Error fetching approvals:', err)
        // Fallback to local storage if API fails
        const saved = localStorage.getItem('mp_user_accounts_v4')
        if (saved) {
          const accounts = JSON.parse(saved)
          setApprovals(accounts.filter(acc => 
            (acc.role.includes('Channel Partner')) && acc.status === 'Pending'
          ))
        }
      })
  }, [])

  const [toastMessage, setToastMessage] = useState('')
  const pageRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
  }, [])

  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const handleApprove = (id) => {
    fetch(`http://localhost:3000/partners/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Active' })
    })
      .then(res => {
        if (res.ok) {
          setApprovals(prev => prev.filter(acc => acc.id !== id))
          showToast('Partner registration approved successfully.')
        } else {
          showToast('Failed to approve partner.')
        }
      })
      .catch(err => {
        console.error('Approval error:', err)
        showToast('Network error while approving partner.')
      })
  }

  const handleReject = (id) => {
    fetch(`http://localhost:3000/partners/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Rejected' })
    })
      .then(res => {
        if (res.ok) {
          setApprovals(prev => prev.filter(acc => acc.id !== id))
          showToast('Partner registration rejected.')
        } else {
          showToast('Failed to reject partner.')
        }
      })
      .catch(err => {
        console.error('Rejection error:', err)
        showToast('Network error while rejecting partner.')
      })
  }

  return (
    <main ref={pageRef} className="min-h-screen bg-[#f8fafc] font-manrope">
      <Navbar
        activePage="cp-approve"
        onBackToDashboard={onBackToDashboard}
        onOpenUserAccount={onOpenUserAccount}
        onOpenLeadActive={onOpenLeadActive}
        onOpenChannelPartners={onOpenChannelPartners}
        onOpenEmails={onOpenEmails}
        onOpenSms={onOpenSms}
        onOpenReports={onOpenReports}
        onSignOut={onSignOut}
      />

      <section className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="font-sora text-3xl font-black tracking-tight text-slate-900">CP Approval Queue</h1>
            <p className="mt-1 text-sm font-bold text-indigo-500 uppercase tracking-[0.2em]">Partner Compliance & Identity Verification</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
             <span className="text-lg font-black text-indigo-600">{approvals.length}</span>
          </div>
        </header>

        {approvals.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-white/50 py-32 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
               <IconCheck />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No pending approvals</h3>
            <p className="text-sm font-medium text-slate-500 mt-1">All channel partner registrations have been processed.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[2.5rem] border border-white bg-white/70 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Partner Details</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Email & Contact</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Designated Role</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {approvals.map((item) => (
                  <tr key={item.id} className="group transition-colors hover:bg-white">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
                          {item.name ? item.name.charAt(0) : '?'}
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-900">{item.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            ID: {item.id && item.id.includes('-') ? item.id.split('-')[1] : (item.id ? item.id.slice(0, 8) : 'N/A')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-slate-700">{item.email}</div>
                      <div className="text-[10px] font-medium text-slate-400">
                        {item.phonePrefix || item.countryCode || '+91'} {item.phone}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex rounded-lg bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-indigo-600 ring-1 ring-indigo-200">
                        {item.role ? item.role.replace('Add ', '') : 'Channel Partner'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleReject(item.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500 transition-all hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-200"
                          title="Reject"
                        >
                          <IconX />
                        </button>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95"
                        >
                          <IconCheck />
                          <span>Approve Partner</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 z-[1000] -translate-x-1/2 animate-rise rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
               <IconCheck />
            </div>
            {toastMessage}
          </div>
        </div>
      )}
    </main>
  )
}

export default CpApprove
