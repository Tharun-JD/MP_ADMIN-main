import { useEffect, useState } from 'react'
import Navbar from './Navbar.jsx'

// ─── Icons ──────────────────────────────────────────────────────────────────
function IconX() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
function IconEye() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )
}
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}
function IconMap() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

// ─── Field Row helper ────────────────────────────────────────────────────────
function Field({ label, value }) {
  if (!value) return null
  return (
    <div className="space-y-0.5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  )
}

// ─── View Detail Modal ───────────────────────────────────────────────────────
function ViewModal({ entry, onClose }) {
  const cust = entry.cust || {}
  const addr = entry.addr || {}
  const initials = (cust.name || cust.userEmail || '?').charAt(0).toUpperCase()

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 font-black text-lg text-white shadow">
              {initials}
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">{cust.name || 'Customer Details'}</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{cust.userEmail || cust.email || '—'}</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm transition hover:bg-rose-50 hover:text-rose-500">
            <IconX />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">

          {/* Personal Info */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-indigo-600">
              <IconUser />
              <h3 className="text-[11px] font-black uppercase tracking-widest text-indigo-600">Personal Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-3">
              <Field label="Full Name" value={cust.name} />
              <Field label="Title" value={cust.title} />
              <Field label="Occupation" value={cust.occupation} />
              <Field label="Phone" value={cust.phone} />
              <Field label="Alt Phone" value={cust.altPhone} />
              <Field label="Email" value={cust.email || cust.userEmail} />
              <Field label="Aadhaar" value={cust.aadhaar} />
              <Field label="PAN" value={cust.pan} />
            </div>
          </div>

          {/* Compliance */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-emerald-600">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-emerald-600">Compliance & Business</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-3">
              <Field label="RERA ID" value={cust.rera} />
              <Field label="CP Company" value={cust.cpCompany} />
              <Field label="GST Applicable" value={cust.gstApplicable} />
              {cust.gstApplicable === 'yes' && <Field label="GST Number" value={cust.gstNumber} />}
            </div>
          </div>

          {/* Bank */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-cyan-600">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-cyan-600">Bank Settlement</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-3">
              <Field label="Bank Name" value={cust.bankName} />
              <Field label="Account Type" value={cust.accountType} />
              <Field label="Account No." value={cust.accountNumber} />
              <Field label="IFSC" value={cust.ifsc} />
              <Field label="Branch" value={cust.branch} />
              <Field label="Zip" value={cust.bankZip} />
            </div>
          </div>

          {/* Address */}
          {(addr.house || addr.street || addr.city) && (
            <div>
              <div className="mb-3 flex items-center gap-2 text-orange-500">
                <IconMap />
                <h3 className="text-[11px] font-black uppercase tracking-widest text-orange-500">Address Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-3">
                <Field label="House / Flat" value={addr.house} />
                <Field label="Street & Area" value={addr.street} />
                <Field label="City" value={addr.city} />
                <Field label="State" value={addr.state} />
                <Field label="Country" value={addr.country} />
                <Field label="PIN Code" value={addr.zip} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-6 py-3">
          <button onClick={onClose} className="rounded-lg bg-slate-800 px-5 py-2 text-sm font-bold text-white transition hover:bg-slate-900 active:scale-95">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────
function CustDetailsAdmin(props) {
  const [entries, setEntries] = useState([])
  const [search, setSearch] = useState('')
  const [viewEntry, setViewEntry] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from API first, fall back to localStorage
      let custData = []
      let addrData = []

      try {
        const [custRes, addrRes] = await Promise.all([
          fetch('http://localhost:3000/customerDetails').catch(() => null),
          fetch('http://localhost:3000/addressInfo').catch(() => null),
        ])
        custData = custRes?.ok ? await custRes.json() : []
        addrData = addrRes?.ok ? await addrRes.json() : []
      } catch (_) { /* silent */ }

      // Merge with localStorage as fallback
      if (custData.length === 0) {
        custData = JSON.parse(localStorage.getItem('mp_customer_details') || '[]')
      }
      if (addrData.length === 0) {
        addrData = JSON.parse(localStorage.getItem('mp_address_info') || '[]')
      }

      // Build combined list keyed by userEmail, latest entry wins
      const custMap = {}
      for (const c of custData) {
        const key = c.userEmail || c.email || c.id
        if (key) custMap[key] = c
      }

      const addrMap = {}
      for (const a of addrData) {
        const key = a.userEmail || a.id
        if (key) addrMap[key] = a
      }

      // Merge: every cust entry gets its address
      const merged = Object.entries(custMap).map(([email, cust]) => ({
        email,
        cust,
        addr: addrMap[email] || {},
        updatedAt: cust.updatedAt || '',
      }))

      // Add any addr-only entries that have no matching cust
      for (const [email, addr] of Object.entries(addrMap)) {
        if (!custMap[email]) {
          merged.push({ email, cust: {}, addr, updatedAt: addr.updatedAt || '' })
        }
      }

      merged.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      setEntries(merged)
    }
    loadData()
  }, [])

  const filtered = entries.filter((e) => {
    const q = search.toLowerCase()
    return (
      (e.cust.name || '').toLowerCase().includes(q) ||
      (e.email || '').toLowerCase().includes(q) ||
      (e.cust.phone || '').includes(q) ||
      (e.addr.city || '').toLowerCase().includes(q)
    )
  })

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-indigo-50/20 to-white font-sans">
      <Navbar activePage="cust-details" {...props} />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Customer Details</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Submitted from the MP User Portal
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, phone, city…"
                className="h-10 w-72 rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <span className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-black text-white shadow">
              {filtered.length} records
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr_auto] border-b border-slate-100 bg-slate-50 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <span>Name</span>
            <span>Email</span>
            <span>Phone</span>
            <span>City</span>
            <span>Last Updated</span>
            <span>Action</span>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-400">
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-slate-200" fill="currentColor">
                <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.25c-4.28 0-7.75 2.24-7.75 5v.75h15.5v-.75c0-2.76-3.47-5-7.75-5Z"/>
              </svg>
              <p className="text-sm font-semibold">No customer details found</p>
              <p className="text-xs">Records submitted by users from the MP User Portal will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {filtered.map((e, idx) => (
                <div
                  key={e.email + idx}
                  className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr_auto] items-center gap-2 px-5 py-3 text-sm transition-colors hover:bg-indigo-50/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xs font-black text-indigo-600">
                      {(e.cust.name || e.email || '?').charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-slate-800 truncate">{e.cust.name || '—'}</span>
                  </div>
                  <span className="truncate text-slate-500">{e.email || '—'}</span>
                  <span className="text-slate-600">{e.cust.phone || '—'}</span>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    {e.addr.city ? (
                      <>
                        <IconMap />
                        <span className="truncate">{e.addr.city}{e.addr.state ? `, ${e.addr.state}` : ''}</span>
                      </>
                    ) : <span>—</span>}
                  </div>
                  <span className="text-xs text-slate-400">
                    {e.updatedAt ? new Date(e.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                  </span>
                  <button
                    onClick={() => setViewEntry(e)}
                    className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 transition hover:bg-indigo-600 hover:text-white active:scale-95"
                  >
                    <IconEye />
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* View Modal */}
      {viewEntry && <ViewModal entry={viewEntry} onClose={() => setViewEntry(null)} />}
    </div>
  )
}

export default CustDetailsAdmin
