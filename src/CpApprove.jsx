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

function IconEye() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.452 5 12 5s8.601 3.049 9.964 6.678c.07.185.07.392 0 .577C20.601 15.951 16.548 19 12 19s-8.601-3.049-9.964-6.678z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
  onOpenCpApprove,
  onSignOut
}) {
  const [approvals, setApprovals] = useState([])

  useEffect(() => {
    // Fetch partners from API and filter for pending status
    fetch('http://localhost:3000/partners')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter for status: Pending (case-insensitive to be safe)
          const pending = data.filter(p => 
            p.status && p.status.toLowerCase() === 'pending'
          )
          setApprovals(pending)
        }
      })
      .catch(err => {
        console.error('Error fetching approvals:', err)
        // Fallback to local storage
        const saved = localStorage.getItem('mp_user_accounts_v4')
        if (saved) {
          try {
            const accounts = JSON.parse(saved)
            setApprovals(accounts.filter(acc => 
              acc.status === 'Pending' && (acc.role ? acc.role.includes('Channel Partner') : true)
            ))
          } catch (e) {
            console.error('Error parsing local accounts:', e)
          }
        }
      })
  }, [])

  const [toastMessage, setToastMessage] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
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
        onOpenCpApprove={onOpenCpApprove}
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
                          onClick={() => {
                            setSelectedItem(item)
                            setIsDetailsOpen(true)
                          }}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-900"
                          title="View Details"
                        >
                          <IconEye />
                        </button>
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
      {/* High-Fidelity Details View (Redesigned based on UI Reference) */}
      {isDetailsOpen && selectedItem && (
        <div className="fixed inset-0 z-[1100] flex flex-col bg-[#f8fafc] overflow-y-auto no-scrollbar animate-fade-in">
          <Navbar
            activePage="cp-approve"
            onBackToDashboard={onBackToDashboard}
            onOpenUserAccount={onOpenUserAccount}
            onOpenLeadActive={onOpenLeadActive}
            onOpenChannelPartners={onOpenChannelPartners}
            onOpenEmails={onOpenEmails}
            onOpenSms={onOpenSms}
            onOpenReports={onOpenReports}
            onOpenCpApprove={onOpenCpApprove}
            onSignOut={onSignOut}
          />

          {/* Top Header Section */}
          <div className="mx-auto w-full max-w-[1440px] px-6 pt-8">
            <div className="flex h-24 items-center justify-between rounded-3xl border border-white bg-white/80 px-8 shadow-sm backdrop-blur-xl">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /></svg>
                </div>
                <div>
                  <h2 className="font-sora text-2xl font-black text-slate-900">{selectedItem.name}</h2>
                  <div className="mt-0.5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span>PARTNER ID: #{selectedItem.id ? selectedItem.id.slice(-8).toUpperCase() : 'N/A'}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="text-indigo-500">{selectedItem.companyName || 'INDIVIDUAL PARTNER'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-slate-600 transition-all hover:bg-slate-50 hover:shadow-md"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  Back to CP
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-3">
            {/* Left Column: 2/3 Width */}
            <div className="lg:col-span-2 space-y-8">
              {/* Identity Records Card */}
              <div className="rounded-[2.5rem] border border-white bg-white p-10 shadow-sm">
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Identity Records</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Comprehensive Partner Intelligence</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 ring-1 ring-emerald-100">
                    NEW APPLICATION
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                       <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                       Full Name
                    </p>
                    <p className="text-lg font-black text-slate-900">{selectedItem.name}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                       <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                       Email Address
                    </p>
                    <p className="text-lg font-black text-slate-900">{selectedItem.email}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                       <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                       Primary Phone
                    </p>
                    <p className="text-lg font-black text-slate-900">{selectedItem.phonePrefix || '+91'} {selectedItem.phone}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                       <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                       Aadhaar Number
                    </p>
                    <p className="text-lg font-black text-slate-900 uppercase">{selectedItem.aadhaar || 'N/A'}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                       <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                       Occupation
                    </p>
                    <p className="text-lg font-black text-slate-900">{selectedItem.occupation || 'N/A'}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                       <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                       Company Name
                    </p>
                    <p className="text-lg font-black text-slate-900 truncate pr-4">{selectedItem.companyName || 'N/A'}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                       <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                       RERA Number
                    </p>
                    <p className="text-lg font-black text-slate-900 uppercase">{selectedItem.rera || 'N/A'}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                       <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                       Business Pan
                    </p>
                    <p className="text-lg font-black text-slate-900 uppercase">{selectedItem.pan || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Business Location Card */}
              <div className="rounded-[2.5rem] border border-white bg-white p-10 shadow-sm">
                <div className="mb-10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Business Address</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Registered Operational Base</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                  <div className="space-y-1.5 md:col-span-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Office / House & Street</p>
                    <p className="text-lg font-black text-slate-900 leading-tight">
                      {selectedItem.house ? `${selectedItem.house}, ` : ''}{selectedItem.street || 'Address not provided'}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">City & State</p>
                    <p className="text-lg font-black text-slate-900">{selectedItem.city || 'N/A'}, {selectedItem.state || '-'}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Country & Pincode</p>
                    <p className="text-lg font-black text-slate-900">{selectedItem.country || 'N/A'} - {selectedItem.zip || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Financial Profile Card */}
              <div className="rounded-[2.5rem] border border-white bg-white p-10 shadow-sm">
                <div className="mb-10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Financial Profile</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Payout & Settlement Records</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bank Name</p>
                    <p className="text-lg font-black text-slate-900">{selectedItem.bankName || 'N/A'}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Branch Name</p>
                    <p className="text-lg font-black text-slate-900">{selectedItem.branch || 'N/A'}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">IFSC Code</p>
                    <p className="text-lg font-black text-slate-900 uppercase">{selectedItem.ifsc || 'N/A'}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Type</p>
                    <p className="text-lg font-black text-slate-900">{selectedItem.accountType || 'N/A'}</p>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account Number</p>
                    <p className="text-2xl font-black tracking-tighter text-slate-900 font-mono">{selectedItem.accountNumber || 'N/A'}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">GST Registration</p>
                    <span className={`inline-flex rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-wider ring-1 ${selectedItem.gstApplicable === 'Yes' ? 'bg-indigo-50 text-indigo-600 ring-indigo-200' : 'bg-slate-50 text-slate-400 ring-slate-200'}`}>
                      {selectedItem.gstApplicable === 'Yes' ? 'REGISTERED' : 'NOT APPLICABLE'}
                    </span>
                  </div>
                  {selectedItem.gstApplicable === 'Yes' && (
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">GST Number</p>
                      <p className="text-lg font-black text-slate-900 uppercase">{selectedItem.gstNumber}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Compliance Documents Card */}
              <div className="rounded-[2.5rem] border border-white bg-white p-10 shadow-sm">
                <div className="mb-10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Compliance Documents</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">KYC & Business Verification Files</p>
                  </div>
                </div>

                {selectedItem.uploadDocuments && selectedItem.uploadDocuments.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {selectedItem.uploadDocuments.map((doc, idx) => (
                      <div key={idx} className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-white hover:shadow-md">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-500 shadow-sm">
                             <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          </div>
                          <div className="overflow-hidden">
                            <p className="truncate text-sm font-bold text-slate-700">{doc.name || `Document_${idx + 1}`}</p>
                            <p className="text-[10px] font-medium text-slate-400">
                              {doc.size ? `${(doc.size / 1024 / 1024).toFixed(2)} MB` : 'Size Unknown'} • {doc.type || 'PDF'}
                            </p>
                          </div>
                        </div>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
                          title="View Document"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.452 5 12 5s8.601 3.049 9.964 6.678c.07.185.07.392 0 .577C20.601 15.951 16.548 19 12 19s-8.601-3.049-9.964-6.678z" /></svg>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/30 py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                       <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <p className="text-sm font-bold text-slate-500">No documents uploaded</p>
                    <p className="mt-1 text-[11px] font-medium text-slate-400">The partner has not submitted any KYC or business files yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sidebar Width */}
            <div className="space-y-8">
              {/* Site Engagement Card */}
              <div className="rounded-[2.5rem] border border-white bg-white p-8 shadow-sm">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Application Review</h3>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Review Date</p>
                    <p className="mt-1 text-sm font-black text-slate-800">Not scheduled</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Approval Status</p>
                    <div className="mt-2">
                       <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-600 ring-1 ring-amber-100">
                          Pending Review
                       </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assigned Executive</p>
                    <p className="mt-1 text-sm font-black text-slate-800">Unassigned</p>
                  </div>
                </div>
              </div>

              {/* Approval Actions Card */}
              <div className="rounded-[2.5rem] bg-white p-8 shadow-xl ring-2 ring-indigo-500/10">
                <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-slate-900">Compliance Action</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      handleApprove(selectedItem.id)
                      setIsDetailsOpen(false)
                    }}
                    className="w-full rounded-2xl bg-indigo-600 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Approve Partner
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedItem.id)
                      setIsDetailsOpen(false)
                    }}
                    className="w-full rounded-2xl border border-rose-100 bg-rose-50/50 py-4 text-sm font-black uppercase tracking-widest text-rose-500 transition-all hover:bg-rose-500 hover:text-white"
                  >
                    Reject Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default CpApprove
