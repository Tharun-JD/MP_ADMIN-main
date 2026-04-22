import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar.jsx'

gsap.registerPlugin(ScrollTrigger)

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M7.5 11A3.5 3.5 0 1 0 4 7.5 3.5 3.5 0 0 0 7.5 11Zm9 0A3.5 3.5 0 1 0 13 7.5a3.5 3.5 0 0 0 3.5 3.5ZM2 19.5C2 17 4.46 15 7.5 15S13 17 13 19.5V21H2v-1.5Zm9 1.5v-1.5c0-1.09-.34-2.1-.93-2.97.9-.34 1.9-.53 2.93-.53 3.04 0 5.5 2 5.5 4.5V21h-7.5Z" fill="currentColor" />
    </svg>
  )
}

function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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

function DetailField({ label, value }) {
  return (
    <div className="rounded-lg border border-[#d8e6f8] bg-white px-4 py-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#4a6484]">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#1f3655]">{value || '-'}</p>
    </div>
  )
}

const initialFormValues = {
  name: '',
  phone: '',
  email: '',
  alternateNumber: '',
  aadhaar: '',
  pan: '',
  occupation: '',
  rera: '',
  companyName: '',
  bankName: '',
  branch: '',
  accountType: 'Please select',
  ifsc: '',
  accountNumber: '',
  uploadDocuments: [],
  bankZip: '',
  gstApplicable: 'No',
  gstNumber: '',
  house: '',
  street: '',
  country: 'Select country',
  state: '-',
  city: '',
  zip: '',
}

function Moreoption({ onBackToDashboard, onOpenUserAccount, onOpenLeadActive, onOpenChannelPartners, onOpenEmails, onOpenSms, onSignOut }) {
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [channelPartners, setChannelPartners] = useState(() => {
    const saved = localStorage.getItem('mp_channel_partners')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error loading partners from localStorage', e)
      }
    }
    return []
  })
  const [editingPartnerIndex, setEditingPartnerIndex] = useState(null)
  const [viewingPartnerIndex, setViewingPartnerIndex] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [filterValues, setFilterValues] = useState({
    nameEmailPhone: '',
    reraRegistrationNumber: '',
    status: 'Select',
  })
  const [formValues, setFormValues] = useState(() => {
    const saved = localStorage.getItem('mp_cp_form_draft')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error loading form draft from localStorage', e)
      }
    }
    return initialFormValues
  })
  const exportOptions = ['All Export', 'Active Filter Export']
  const statusOptions = ['Active', 'Inactive', 'Pending', 'Rejected']
  const accountTypeOptions = ['Please select', 'Savings', 'Current']
  const actionOptions = ['Show', 'Add Follow']
  const exportMenuRef = useRef(null)
  const filterPanelRef = useRef(null)
  const statusMenuRef = useRef(null)
  const addFormRef = useRef(null)
  const detailsPanelRef = useRef(null)
  const actionMenuRef = useRef(null)
  const pageRef = useRef(null)
  const headerRef = useRef(null)
  const controlsRef = useRef(null)
  const tableRef = useRef(null)
  const bgGlowRefs = useRef([])
  const [openActionIndex, setOpenActionIndex] = useState(null)

  // Persistent storage for channel partners and form drafts
  useEffect(() => {
    localStorage.setItem('mp_channel_partners', JSON.stringify(channelPartners))
  }, [channelPartners])

  useEffect(() => {
    localStorage.setItem('mp_cp_form_draft', JSON.stringify(formValues))
  }, [formValues])

  useEffect(() => {
    const onPointerDown = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setIsExportOpen(false)
      }
      if (statusMenuRef.current && !statusMenuRef.current.contains(event.target)) {
        setIsStatusOpen(false)
      }
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
        setIsFilterOpen(false)
        setIsStatusOpen(false)
      }
      if (addFormRef.current && !addFormRef.current.contains(event.target)) {
        setIsAddFormOpen(false)
      }
      if (detailsPanelRef.current && !detailsPanelRef.current.contains(event.target)) {
        setIsDetailsOpen(false)
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setOpenActionIndex(null)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    if (!isFilterOpen || !filterPanelRef.current) {
      return
    }

    const panel = filterPanelRef.current
    const fields = panel.querySelectorAll('.cp-filter-field')
    const actions = panel.querySelectorAll('.cp-filter-action')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .fromTo('.cp-filter-overlay', { opacity: 0 }, { opacity: 1, duration: 0.2 })
      .fromTo(panel, { y: 16, opacity: 0, scale: 0.985 }, { y: 0, opacity: 1, scale: 1, duration: 0.3 }, '-=0.02')
      .fromTo(fields, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.2 }, '-=0.17')
      .fromTo(actions, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.2 }, '-=0.1')

    return () => tl.kill()
  }, [isFilterOpen])

  useEffect(() => {
    if (!isAddFormOpen || !addFormRef.current) {
      return
    }

    const panel = addFormRef.current
    const fields = panel.querySelectorAll('.cp-add-field')
    const footerBtns = panel.querySelectorAll('.cp-add-action')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .fromTo('.cp-add-overlay', { opacity: 0 }, { opacity: 1, duration: 0.2 })
      .fromTo(panel, { y: 18, opacity: 0, scale: 0.985 }, { y: 0, opacity: 1, scale: 1, duration: 0.3 }, '-=0.02')
      .fromTo(fields, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.025, duration: 0.17 }, '-=0.18')
      .fromTo(footerBtns, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.18 }, '-=0.1')

    return () => tl.kill()
  }, [isAddFormOpen])

  useEffect(() => {
    if (!isDetailsOpen || !detailsPanelRef.current) {
      return
    }

    const panel = detailsPanelRef.current
    const blocks = panel.querySelectorAll('.cp-detail-block')
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .fromTo(panel, { y: 22, opacity: 0, scale: 0.985 }, { y: 0, opacity: 1, scale: 1, duration: 0.3 })
      .fromTo(blocks, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, stagger: 0.04 }, '-=0.16')

    return () => tl.kill()
  }, [isDetailsOpen])

  useEffect(() => {
    if (!pageRef.current) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups = []
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power2.out' } })
      intro
        .fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28 })
        .fromTo(headerRef.current, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.1')
        .fromTo('.cp-control', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.26 }, '-=0.25')
        .fromTo(tableRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, '-=0.14')
      cleanups.push(() => intro.kill())

      if (!prefersReducedMotion) {
        bgGlowRefs.current.filter(Boolean).forEach((node, index) => {
          const anim = gsap.to(node, {
            x: index % 2 ? -16 : 16,
            y: index % 2 ? 12 : -12,
            duration: 6 + index * 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
          cleanups.push(() => anim.kill())
        })

        if (tableRef.current) {
          const reveal = gsap.fromTo(
            tableRef.current,
            { y: 14, autoAlpha: 0.94 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.38,
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

      const controls = gsap.utils.toArray('.cp-control')
      controls.forEach((button) => {
        const onEnter = () => {
          gsap.to(button, {
            y: -2,
            scale: 1.01,
            boxShadow: '0 10px 18px rgba(106,102,255,0.2)',
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

      const clickButtons = gsap.utils.toArray('.cp-clickable')
      clickButtons.forEach((button) => {
        const onClick = () => {
          gsap.fromTo(
            button,
            { boxShadow: '0 0 0 0 rgba(106,102,255,0.2)' },
            { boxShadow: '0 0 0 8px rgba(106,102,255,0)', duration: 0.26, ease: 'power2.out' },
          )
          gsap.fromTo(button, { scale: 1 }, { scale: 0.986, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.out' })
        }
        button.addEventListener('click', onClick)
        cleanups.push(() => button.removeEventListener('click', onClick))
      })

      const tableRows = gsap.utils.toArray('.cp-table-row')
      tableRows.forEach((row, index) => {
        const onEnter = () => {
          gsap.to(row, {
            y: -3,
            scale: 1.003,
            boxShadow: '0 14px 24px rgba(106,102,255,0.18)',
            duration: 0.24,
            ease: 'power2.out',
          })
        }
        const onLeave = () => {
          gsap.to(row, {
            y: 0,
            scale: 1,
            boxShadow: '0 0 0 rgba(0,0,0,0)',
            duration: 0.2,
            ease: 'power2.out',
          })
        }
        const onMove = (event) => {
          const rect = row.getBoundingClientRect()
          const x = (event.clientX - rect.left) / rect.width - 0.5
          gsap.to(row, {
            x: x * 6 * (index % 2 ? -1 : 1),
            duration: 0.2,
            ease: 'power1.out',
          })
        }
        row.addEventListener('mouseenter', onEnter)
        row.addEventListener('mouseleave', onLeave)
        row.addEventListener('mousemove', onMove)
        cleanups.push(() => row.removeEventListener('mouseenter', onEnter))
        cleanups.push(() => row.removeEventListener('mouseleave', onLeave))
        cleanups.push(() => row.removeEventListener('mousemove', onMove))
      })
    }, pageRef)

    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  const setFilterField = (field, value) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }))
  }

  const setFormField = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleUploadDocs = (event) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) {
      return
    }

    const nextDocs = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }))

    setFormValues((prev) => ({
      ...prev,
      uploadDocuments: [...(prev.uploadDocuments || []), ...nextDocs],
    }))
    event.target.value = ''
  }

  const handleRemoveUploadedDoc = (docIndexToRemove) => {
    setFormValues((prev) => ({
      ...prev,
      uploadDocuments: (prev.uploadDocuments || []).filter((_, index) => index !== docIndexToRemove),
    }))
  }

  const resetFilter = () => {
    setFilterValues({
      nameEmailPhone: '',
      reraRegistrationNumber: '',
      status: 'Select',
    })
    setIsStatusOpen(false)
    setIsFilterOpen(false)
  }

  const handleSavePartner = () => {
    const requiredFields = ['name', 'phone', 'email', 'aadhaar', 'pan']
    const missingRequired = requiredFields.some((field) => !String(formValues[field] || '').trim())
    const isGstMissing = formValues.gstApplicable === 'Yes' && !String(formValues.gstNumber || '').trim()

    if (missingRequired || isGstMissing) {
      window.alert('Please fill all required fields before saving.')
      return
    }

    if (editingPartnerIndex !== null) {
      setChannelPartners((prev) =>
        prev.map((partner, index) =>
          index === editingPartnerIndex
            ? {
              ...partner,
              ...formValues,
            }
            : partner,
        ),
      )
    } else {
      setChannelPartners((prev) => [
        {
          ...formValues,
          status: 'Active',
          createdAt: Date.now(),
        },
        ...prev,
      ])
    }
    setFormValues(initialFormValues)
    setEditingPartnerIndex(null)
    setIsAddFormOpen(false)
  }

  const selectedPartner = viewingPartnerIndex !== null ? channelPartners[viewingPartnerIndex] : null
  const selectedPartnerDocs = Array.isArray(selectedPartner?.uploadDocuments)
    ? selectedPartner.uploadDocuments
    : selectedPartner?.uploadDocument
      ? [{ name: selectedPartner.uploadDocument, url: '' }]
      : []

  return (
    <main ref={pageRef} className="relative min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <div className="pointer-events-none absolute inset-0">
        <div ref={(n) => (bgGlowRefs.current[0] = n)} className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-[#6366f1]/05 blur-3xl" />
        <div ref={(n) => (bgGlowRefs.current[1] = n)} className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#3b82f6]/05 blur-3xl" />
      </div>
      <Navbar
        activePage="channel-partners"
        onBackToDashboard={onBackToDashboard}
        onOpenUserAccount={onOpenUserAccount}
        onOpenLeadActive={onOpenLeadActive}
        onOpenChannelPartners={onOpenChannelPartners}
        onOpenEmails={onOpenEmails}
        onOpenSms={onOpenSms}
        onSignOut={onSignOut}
      />

      <section className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-4">
          {/* <button
            type="button"
            onClick={onBackToDashboard}
            className="rounded-md border border-[#8a86ff] bg-white px-4 py-2 text-sm font-semibold text-[#6b66ff]"
          >
            Back
          </button> */}
        </div>

        <div ref={headerRef} className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-[#0f172a] lg:text-3xl">
            <span className="text-[#6366f1]"><IconUsers /></span>
            Channel Partners
          </h1>

          <div ref={controlsRef} className="flex flex-wrap items-center gap-3">
            <button type="button" className="cp-control cp-clickable rounded-lg border border-[#e2e8f0] bg-white px-5 py-2 text-base font-semibold text-[#475569] shadow-sm">
              Total : {channelPartners.length}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsExportOpen(false)
                setIsFilterOpen(false)
                setEditingPartnerIndex(null)
                setFormValues(initialFormValues)
                setIsAddFormOpen(true)
              }}
              className="cp-control cp-clickable rounded-lg bg-[#6366f1] px-6 py-2 text-base font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-[#4f46e5]"
            >
              Add New
            </button>
            <div ref={exportMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsExportOpen((prev) => !prev)}
                className="cp-control cp-clickable flex items-center gap-1 rounded-md border border-[#8a86ff] bg-white px-5 py-2 text-base font-semibold text-[#6b66ff]"
              >
                Exports <IconChevron />
              </button>
              {isExportOpen && (
                <div className="absolute left-0 top-12 z-[70] w-64 rounded-xl border border-[#d4e3f8] bg-[#f8fbff] p-2 shadow-2xl shadow-[#1e78c8]/25">
                  {exportOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setIsExportOpen(false)}
                      className="cp-clickable block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#2f3e57] transition hover:bg-[#e8f1ff] hover:text-[#124785]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setIsExportOpen(false)
                setIsFilterOpen(true)
              }}
              className="cp-control cp-clickable rounded-md border border-[#8a86ff] bg-white p-2.5 text-[#6b66ff]"
            >
              <IconFilter />
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="cp-filter-overlay fixed inset-0 z-[280] flex items-center justify-center bg-[#0f2244]/22 px-4 py-6 backdrop-blur-[2px]">
            <div ref={filterPanelRef} className="w-full max-w-4xl rounded-xl border border-[#c9d3e8] bg-[#f7f9fd] shadow-2xl shadow-[#1f365d]/15">
              <div className="flex items-center justify-between border-b border-[#d5dcfb] px-6 py-4">
                <h2 className="text-2xl font-semibold text-[#20385f]">Filter</h2>
              </div>

              <div className="grid gap-6 px-6 py-6 md:grid-cols-2">
                <div className="cp-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Name/Email/Phone</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={filterValues.nameEmailPhone}
                      onChange={(event) => setFilterField('nameEmailPhone', event.target.value)}
                      className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a879a]">
                      <IconChevron />
                    </span>
                  </div>
                </div>

                <div className="cp-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">RERA Registration Number</label>
                  <input
                    type="text"
                    value={filterValues.reraRegistrationNumber}
                    onChange={(event) => setFilterField('reraRegistrationNumber', event.target.value)}
                    className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                  />
                </div>

                <div ref={statusMenuRef} className="cp-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Status</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsStatusOpen((prev) => !prev)}
                      className="cp-clickable flex w-full items-center justify-between rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-left text-base text-[#1f2f45] transition hover:border-[#9fb0cc]"
                    >
                      <span className={filterValues.status === 'Select' ? 'text-[#6c7890]' : ''}>{filterValues.status}</span>
                      <span className={`transition ${isStatusOpen ? 'rotate-180' : ''}`}>
                        <IconChevron />
                      </span>
                    </button>
                    {isStatusOpen && (
                      <div className="absolute left-0 top-[calc(100%+0.2rem)] z-[300] w-full rounded-md border border-[#c7d0df] bg-white shadow-lg">
                        {statusOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setFilterField('status', option)
                              setIsStatusOpen(false)
                            }}
                            className="cp-clickable block w-full px-4 py-2 text-left text-base text-[#1f2f45] hover:bg-[#e7edf5]"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-[#d5dcfb] px-6 py-4">
                <button
                  type="button"
                  onClick={resetFilter}
                  className="cp-clickable cp-filter-action rounded-lg border border-[#6f73ff] bg-white px-6 py-2 text-xl font-semibold text-[#6f73ff] transition hover:bg-[#eef0ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsStatusOpen(false)
                    setIsFilterOpen(false)
                  }}
                  className="cp-clickable cp-filter-action rounded-lg bg-gradient-to-r from-[#6f73ff] to-[#6a6eea] px-7 py-2 text-xl font-semibold text-white transition hover:brightness-105"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {isAddFormOpen && (
          <div className="cp-add-overlay fixed inset-0 z-[320] bg-white overflow-hidden">
            <div ref={addFormRef} className="h-full w-full overflow-y-auto bg-[#f8fafc]">
              <div className="sticky top-0 z-10 border-b border-[#e2e8f0] bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] px-8 py-6 backdrop-blur-md">
                <h2 className="text-3xl font-bold tracking-tight text-[#0f172a]">
                  {editingPartnerIndex !== null ? 'Edit Channel Partner' : 'Create Channel Partner'}
                </h2>
                <p className="mt-1 text-base font-medium text-[#475569]">Capture partner profile and address details</p>
              </div>

              <div className="px-6 py-6">
                <div className="grid gap-5 rounded-2xl border border-[#d2e6ff] bg-white/70 p-5 backdrop-blur md:grid-cols-2">
                  <div className="cp-add-field space-y-1.5">
                    <label className="text-sm font-bold uppercase tracking-wider text-[#475569]">Name *</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={formValues.name}
                      onChange={(event) => setFormField('name', event.target.value)}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3.5 text-base text-[#1e293b] outline-none placeholder:text-[#94a3b8] transition focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/10"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Phone *</label>
                    <input
                      type="text"
                      value={formValues.phone}
                      onChange={(event) => setFormField('phone', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Email *</label>
                    <input
                      type="email"
                      placeholder="eg. abc@gmail.com"
                      value={formValues.email}
                      onChange={(event) => setFormField('email', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Alternate Number</label>
                    <input
                      type="text"
                      value={formValues.alternateNumber}
                      onChange={(event) => setFormField('alternateNumber', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Aadhaar *</label>
                    <input
                      type="text"
                      placeholder=""
                      value={formValues.aadhaar}
                      onChange={(event) => setFormField('aadhaar', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">PAN Number *</label>
                    <input
                      type="text"
                      placeholder=""
                      value={formValues.pan}
                      onChange={(event) => setFormField('pan', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Occupation</label>
                    <input
                      type="text"
                      value={formValues.occupation}
                      onChange={(event) => setFormField('occupation', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">RERA Registration Number</label>
                    <input
                      type="text"
                      placeholder="Enter the RERA N0"
                      value={formValues.rera}
                      onChange={(event) => setFormField('rera', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">CP Company Name / CP Name</label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={formValues.companyName}
                      onChange={(event) => setFormField('companyName', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-5 rounded-2xl border border-[#d2e6ff] bg-white/75 p-5 md:grid-cols-2">
                  <div className="cp-add-field space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Is GST Applicable? *</label>
                    <div className="flex items-center gap-5 pt-1 text-sm font-semibold text-[#153256]">
                      <label className="inline-flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="gstApplicable"
                          value="Yes"
                          checked={formValues.gstApplicable === 'Yes'}
                          onChange={(event) => setFormField('gstApplicable', event.target.value)}
                          className="h-4 w-4 accent-[#1a79d1]"
                        />
                        Yes
                      </label>
                      <label className="inline-flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="gstApplicable"
                          value="No"
                          checked={formValues.gstApplicable === 'No'}
                          onChange={(event) => setFormField('gstApplicable', event.target.value)}
                          className="h-4 w-4 accent-[#1a79d1]"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">GST Number</label>
                    <input
                      type="text"
                      placeholder="GSTIN Number"
                      value={formValues.gstNumber}
                      onChange={(event) => setFormField('gstNumber', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>
                </div>

                <div className="relative mt-6 rounded-t-2xl bg-[linear-gradient(95deg,#0d3fa7_0%,#1168d3_35%,#00a8d0_70%,#3de4b8_100%)] px-6 py-3 shadow-[0_10px_22px_rgba(13,63,167,0.24)]">
                  <h3 className="text-xl font-semibold tracking-wide text-white">Bank Details</h3>
                  <div className="pointer-events-none absolute left-5 top-2 h-6 w-6 rounded-full bg-[#89e8ff]/45 blur-md" />
                  <div className="pointer-events-none absolute right-8 top-2 h-6 w-6 rounded-full bg-[#79ffc9]/40 blur-md" />
                </div>

                <div className="grid gap-5 rounded-b-2xl border border-t-0 border-[#d2e6ff] bg-white/75 p-5 md:grid-cols-2">
                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Bank Name</label>
                    <input
                      type="text"
                      placeholder="Bank Name"
                      value={formValues.bankName}
                      onChange={(event) => setFormField('bankName', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Branch</label>
                    <input
                      type="text"
                      value={formValues.branch}
                      onChange={(event) => setFormField('branch', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Account Type</label>
                    <div className="relative">
                      <select
                        value={formValues.accountType}
                        onChange={(event) => setFormField('accountType', event.target.value)}
                        className="w-full appearance-none rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 pr-10 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                      >
                        {accountTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b84a5]"><IconChevron /></span>
                    </div>
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">IFSC Code</label>
                    <input
                      type="text"
                      placeholder="eg. ICIC00000"
                      value={formValues.ifsc}
                      onChange={(event) => setFormField('ifsc', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Account Number</label>
                    <input
                      type="text"
                      placeholder="eg. 00000000"
                      value={formValues.accountNumber}
                      onChange={(event) => setFormField('accountNumber', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Zip / Pin Code</label>
                    <input
                      type="text"
                      placeholder="eg. 411045"
                      value={formValues.bankZip}
                      onChange={(event) => setFormField('bankZip', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>
                </div>

                <div className="relative mt-6 rounded-t-2xl bg-[linear-gradient(95deg,#0d3fa7_0%,#1168d3_35%,#00a8d0_70%,#3de4b8_100%)] px-6 py-3 shadow-[0_10px_22px_rgba(13,63,167,0.24)]">
                  <h3 className="text-xl font-semibold tracking-wide text-white">Upload Docs</h3>
                  <div className="pointer-events-none absolute left-5 top-2 h-6 w-6 rounded-full bg-[#89e8ff]/45 blur-md" />
                  <div className="pointer-events-none absolute right-8 top-2 h-6 w-6 rounded-full bg-[#79ffc9]/40 blur-md" />
                </div>

                <div className="grid gap-5 rounded-b-2xl border border-t-0 border-[#d2e6ff] bg-white/75 p-5 md:grid-cols-2">
                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Upload Document</label>
                    <input
                      type="file"
                      multiple
                      onChange={handleUploadDocs}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-3 py-2.5 text-sm text-[#153256] outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-[#e6f2ff] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#1a5ea8] hover:file:bg-[#dcecff]"
                    />
                    {(formValues.uploadDocuments || []).length === 0 ? (
                      <p className="text-xs text-[#5b7393]">No file selected</p>
                    ) : (
                      <div className="space-y-2">
                        {formValues.uploadDocuments.map((doc, docIndex) => (
                          <div key={`${doc.name}-${docIndex}`} className="flex items-center justify-between rounded-lg border border-[#d6e4f7] bg-white px-3 py-2 text-xs text-[#324c70]">
                            <span className="truncate pr-3">{doc.name}</span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => window.open(doc.url, '_blank', 'noopener,noreferrer')}
                                className="rounded-md border border-[#9fc1e9] bg-[#eef6ff] px-2 py-1 text-[11px] font-semibold text-[#1b5ea5] hover:bg-[#e2f0ff]"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                aria-label="Remove document"
                                onClick={() => handleRemoveUploadedDoc(docIndex)}
                                className="text-sm font-bold leading-none text-[#d11a2a] hover:text-[#a3121f]"
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative mt-6 rounded-t-2xl bg-[linear-gradient(95deg,#0d3fa7_0%,#1168d3_35%,#00a8d0_70%,#3de4b8_100%)] px-6 py-3 shadow-[0_10px_22px_rgba(13,63,167,0.24)]">
                  <h3 className="text-xl font-semibold tracking-wide text-white">Address</h3>
                  <div className="pointer-events-none absolute left-5 top-2 h-6 w-6 rounded-full bg-[#89e8ff]/45 blur-md" />
                  <div className="pointer-events-none absolute right-8 top-2 h-6 w-6 rounded-full bg-[#79ffc9]/40 blur-md" />
                </div>

                <div className="grid gap-5 rounded-b-2xl border border-t-0 border-[#d2e6ff] bg-white/75 p-5 md:grid-cols-2">
                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">House/Flat/Company</label>
                    <input
                      type="text"
                      value={formValues.house}
                      onChange={(event) => setFormField('house', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Street</label>
                    <input
                      type="text"
                      value={formValues.street}
                      onChange={(event) => setFormField('street', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Country</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formValues.country}
                        onChange={(event) => setFormField('country', event.target.value)}
                        className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b84a5]"><IconChevron /></span>
                    </div>
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">State / Region</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formValues.state}
                        onChange={(event) => setFormField('state', event.target.value)}
                        className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b84a5]"><IconChevron /></span>
                    </div>
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">City</label>
                    <input
                      type="text"
                      placeholder=""
                      value={formValues.city}
                      onChange={(event) => setFormField('city', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Zip / Pin Code</label>
                    <input
                      type="text"
                      placeholder=""
                      value={formValues.zip}
                      onChange={(event) => setFormField('zip', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>
                </div>

              </div>

              <div className="sticky bottom-0 flex items-center justify-end gap-4 border-t border-[#e2e8f0] bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] px-8 py-5 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => {
                    setEditingPartnerIndex(null)
                    setFormValues(initialFormValues)
                    setIsAddFormOpen(false)
                  }}
                  className="cp-clickable cp-add-action rounded-xl border border-[#e2e8f0] bg-white px-6 py-2.5 text-base font-bold text-[#475569] transition hover:bg-[#f8fafc]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePartner}
                  className="cp-clickable cp-add-action rounded-xl bg-[#6366f1] px-8 py-2.5 text-base font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-[#4f46e5]"
                >
                  {editingPartnerIndex !== null ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}

        {isDetailsOpen && selectedPartner && (
          <div className="fixed inset-0 z-[330] flex items-center justify-center bg-[#071525]/55 px-4 py-6 backdrop-blur-[3px]">
            <div ref={detailsPanelRef} className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-[#0f2c4d]/25 bg-[#f6fbff] shadow-2xl shadow-[#031021]/35">
              <div className="sticky top-0 z-10 border-b border-[#7de4ff]/45 bg-[linear-gradient(115deg,#07307c_0%,#0f5ecf_32%,#00a7cf_66%,#4ee9c5_100%)] px-8 py-5">
                <h2 className="text-2xl font-semibold tracking-wide text-white">View partner Details</h2>
              </div>

              <div className="space-y-5 px-6 py-6">
                <div className="cp-detail-block grid gap-4 md:grid-cols-2">
                  <DetailField label="Name" value={selectedPartner.name} />
                  <DetailField label="CP Company Name / CP Name" value={selectedPartner.companyName} />
                  <DetailField label="Phone" value={selectedPartner.phone} />
                  <DetailField label="Email" value={selectedPartner.email} />
                  <DetailField label="Alternate Number" value={selectedPartner.alternateNumber} />
                  <DetailField label="Occupation" value={selectedPartner.occupation} />
                  <DetailField label="Aadhaar" value={selectedPartner.aadhaar} />
                  <DetailField label="PAN Number" value={selectedPartner.pan} />
                  <DetailField label="RERA Registration Number" value={selectedPartner.rera} />
                  <DetailField label="Status" value={selectedPartner.status} />
                  <DetailField label="Is GST Applicable?" value={selectedPartner.gstApplicable} />
                  <DetailField label="GST Number" value={selectedPartner.gstNumber} />
                </div>

                <div className="cp-detail-block rounded-xl border border-[#cfe5ff] bg-[#eff7ff] p-4">
                  <h3 className="mb-3 text-lg font-semibold text-[#124172]">Bank Details</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <DetailField label="Bank Name" value={selectedPartner.bankName} />
                    <DetailField label="Branch" value={selectedPartner.branch} />
                    <DetailField label="Account Type" value={selectedPartner.accountType} />
                    <DetailField label="IFSC Code" value={selectedPartner.ifsc} />
                    <DetailField label="Account Number" value={selectedPartner.accountNumber} />
                    <DetailField label="Zip / Pin Code" value={selectedPartner.bankZip} />
                  </div>
                </div>

                <div className="cp-detail-block rounded-xl border border-[#cfe5ff] bg-[#eff7ff] p-4">
                  <h3 className="mb-3 text-lg font-semibold text-[#124172]">Upload Docs</h3>
                  {selectedPartnerDocs.length === 0 ? (
                    <p className="rounded-lg border border-[#d8e6f8] bg-white px-4 py-3 text-sm text-[#4c6484]">No uploaded documents.</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedPartnerDocs.map((doc, docIndex) => (
                        <div key={`${doc.name}-${docIndex}`} className="flex items-center justify-between rounded-lg border border-[#d8e6f8] bg-white px-4 py-3">
                          <span className="truncate pr-4 text-sm font-medium text-[#1f3655]">{doc.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              if (doc.url) {
                                window.open(doc.url, '_blank', 'noopener,noreferrer')
                              }
                            }}
                            disabled={!doc.url}
                            className="cp-clickable rounded-md border border-[#9fc1e9] bg-[#eef6ff] px-3 py-1.5 text-xs font-semibold text-[#1b5ea5] hover:bg-[#e2f0ff] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="cp-detail-block rounded-xl border border-[#cfe5ff] bg-[#eff7ff] p-4">
                  <h3 className="mb-3 text-lg font-semibold text-[#124172]">Address</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <DetailField label="House/Flat/Company" value={selectedPartner.house} />
                    <DetailField label="Street" value={selectedPartner.street} />
                    <DetailField label="Country" value={selectedPartner.country} />
                    <DetailField label="State / Region" value={selectedPartner.state} />
                    <DetailField label="City" value={selectedPartner.city} />
                    <DetailField label="Zip / Pin Code" value={selectedPartner.zip} />
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 flex items-center justify-end border-t border-[#cfe5ff] bg-[#f4f9ff] px-6 py-4">
                <button
                  type="button"
                  onClick={() => {
                    setViewingPartnerIndex(null)
                    setIsDetailsOpen(false)
                  }}
                  className="cp-clickable rounded-xl border border-[#0f69c9] bg-white px-6 py-2 text-sm font-semibold text-[#0f69c9] transition hover:bg-[#ecf5ff]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div ref={tableRef} className="relative z-10 mt-6 overflow-x-auto overflow-y-visible no-scrollbar rounded-sm border border-[#877ef4]/30 bg-white">
          <div className="grid min-w-[980px] grid-cols-[1.6fr_1.3fr_1.1fr_0.8fr_1.4fr_0.8fr] bg-[linear-gradient(90deg,#6878f5_0%,#a265dc_100%)] text-sm font-semibold tracking-wide text-white lg:text-base">
            <div className="px-5 py-4">Name</div>
            <div className="px-5 py-4">Details</div>
            <div className="px-5 py-4">RERA Registration Number</div>
            <div className="px-5 py-4">Status</div>
            <div className="px-5 py-4">Associated User</div>
            <div className="px-5 py-4">Actions</div>
          </div>
          {channelPartners.length === 0 ? (
            <div className="cp-table-row grid min-w-[980px] grid-cols-[1.6fr_1.3fr_1.1fr_0.8fr_1.4fr_0.8fr] items-center border-t border-[#eef2ff] px-1 py-2">
              <div className="px-4 py-3 text-sm text-[#6b7280]">No data available.</div>
              <div className="px-4 py-3 text-sm text-[#6b7280]">-</div>
              <div className="px-4 py-3 text-sm text-[#6b7280]">-</div>
              <div className="px-4 py-3 text-sm text-[#6b7280]">-</div>
              <div className="px-4 py-3 text-sm text-[#6b7280]">-</div>
              <div className="px-4 py-3 text-sm text-[#6b7280]">-</div>
            </div>
          ) : (
            channelPartners.map((partner, index) => (
              <div
                key={`${partner.createdAt}-${index}`}
                className="cp-table-row grid min-w-[980px] grid-cols-[1.6fr_1.3fr_1.1fr_0.8fr_1.4fr_0.8fr] items-center border-t border-[#eef2ff] px-1 py-2"
              >
                <div className="flex items-center gap-4 px-4 py-5 text-sm font-medium text-[#2d4568]">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-lg font-bold text-[#3b82f6]">
                    {(partner.companyName || partner.name).charAt(0).toLowerCase()}
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#0f172a]">{partner.companyName || partner.name}</div>
                    <div className="text-[11px] text-[#64748b]">
                      <span className="font-semibold uppercase text-[#94a3b8] mr-1">ph:</span>{partner.phone}
                    </div>
                    <div className="text-[11px] text-[#64748b]">
                      <span className="font-semibold uppercase text-[#94a3b8] mr-1">en:</span>{partner.email}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-sm font-semibold text-[#425774]">{partner.rera || '-'}</div>
                <div className="px-4 py-4">
                  <span className="inline-block rounded bg-[#eff6ff] px-2 py-0.5 text-[11px] font-bold text-[#4f46e5] border border-[#e0e7ff]">
                    {partner.rera || 'No ID'}
                  </span>
                </div>
                <div className="px-4 py-4">
                  <span className="inline-block rounded bg-[#f1f5f9] px-3 py-1 text-[11px] font-bold text-[#475569] border border-[#e2e8f0]">
                    {partner.status}
                  </span>
                </div>
                <div className="px-4 py-4 text-sm font-semibold text-[#475569]">{partner.name}</div>
                <div ref={openActionIndex === index ? actionMenuRef : null} className="relative px-4 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => setOpenActionIndex((prev) => (prev === index ? null : index))}
                    className="cp-clickable flex h-9 w-9 items-center justify-center rounded-full bg-[#312e81] text-white transition hover:bg-[#1e1b4b] shadow-lg shadow-indigo-100"
                  >
                    <span className="text-xl leading-none mb-1">...</span>
                  </button>
                  {openActionIndex === index && (
                    <div className="absolute top-full right-4 z-[240] mt-3 w-72 rounded-[2rem] border border-[#f1f5f9] bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenActionIndex(null)
                          setViewingPartnerIndex(index)
                          setIsDetailsOpen(true)
                        }}
                        className="cp-clickable flex w-full items-center gap-4 rounded-2xl p-3 transition hover:bg-[#f8faff]"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff6ff] text-[#4f46e5]">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </div>
                        <span className="text-base font-bold text-[#1e293b]">View Details</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setOpenActionIndex(null)
                          setEditingPartnerIndex(index)
                          setFormValues(partner)
                          setIsAddFormOpen(true)
                        }}
                        className="cp-clickable flex w-full items-center gap-4 rounded-2xl p-3 transition hover:bg-[#fffcf9]"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff7ed] text-[#ea580c]">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1-1-4 9.5-9.5z" />
                          </svg>
                        </div>
                        <span className="text-base font-bold text-[#1e293b]">Edit Partner</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}

export default Moreoption
