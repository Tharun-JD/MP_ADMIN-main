import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const [menuAnchorRect, setMenuAnchorRect] = useState(null)

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
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target) && !event.target.closest('.cp-action-trigger')) {
        setOpenActionIndex(null)
        setMenuAnchorRect(null)
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
          <div className="cp-add-overlay fixed inset-0 z-[300] flex items-center justify-center bg-[#0a1222]/35 p-4 backdrop-blur-sm">
            <div ref={addFormRef} className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] border border-white bg-white shadow-[0_35px_80px_rgba(0,0,0,0.25)]">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e2e8f0] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] px-8 py-6">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-[#0f172a]">
                    {editingPartnerIndex !== null ? 'Update Partner' : 'New Partner'}
                  </h2>
                  <p className="mt-1 text-sm font-bold text-[#6366f1]">Capture registration and business profile details</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddFormOpen(false)}
                  className="ua-clickable flex h-12 w-12 items-center justify-center rounded-full bg-white text-3xl font-bold text-[#94a3b8] shadow-sm transition hover:text-[#0f172a]"
                >
                  &times;
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-8 no-scrollbar">
                <div className="space-y-10">
                  {/* Basic Profile */}
                  <section>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-8 w-1 bg-[#6366f1] rounded-full" />
                      <h3 className="text-lg font-black uppercase tracking-widest text-[#1e293b]">Basic Profile</h3>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      {[
                        { label: 'Name *', field: 'name', placeholder: 'Full Name' },
                        { label: 'Phone *', field: 'phone', placeholder: '+91' },
                        { label: 'Email *', field: 'email', placeholder: 'email@example.com', type: 'email' },
                        { label: 'Alternate Number', field: 'alternateNumber', placeholder: '' },
                        { label: 'Aadhaar *', field: 'aadhaar', placeholder: '12-digit number' },
                        { label: 'PAN Number *', field: 'pan', placeholder: 'ABCDE1234F' },
                        { label: 'Occupation', field: 'occupation', placeholder: 'Professional / Business' },
                        { label: 'RERA Number', field: 'rera', placeholder: 'RERA Registration' },
                        { label: 'CP Company Name', field: 'companyName', placeholder: 'Enter company name' },
                      ].map((item) => (
                        <div key={item.field} className="cp-add-field space-y-1.5">
                          <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-[#64748b]">{item.label}</label>
                          <input
                            type={item.type || 'text'}
                            placeholder={item.placeholder}
                            value={formValues[item.field]}
                            onChange={(e) => setFormField(item.field, e.target.value)}
                            className="w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-3.5 text-base font-semibold text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#6366f1] focus:bg-white focus:ring-4 focus:ring-[#6366f1]/10"
                          />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* GST Configuration */}
                  <section className="rounded-3xl bg-[#f8fafc] p-6 border border-[#f1f5f9]">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="cp-add-field space-y-3">
                        <label className="text-[11px] font-black uppercase tracking-widest text-[#64748b]">Is GST Applicable? *</label>
                        <div className="flex gap-4">
                          {['Yes', 'No'].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setFormField('gstApplicable', val)}
                              className={`flex-1 rounded-xl border-2 py-3 text-sm font-bold transition-all ${
                                formValues.gstApplicable === val 
                                ? 'border-[#6366f1] bg-[#6366f1]/05 text-[#6366f1]' 
                                : 'border-[#e2e8f0] bg-white text-[#94a3b8] hover:border-[#cbd5e1]'
                              }`}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="cp-add-field space-y-1.5">
                        <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-[#64748b]">GST Number</label>
                        <input
                          type="text"
                          disabled={formValues.gstApplicable === 'No'}
                          placeholder="Enter GSTIN"
                          value={formValues.gstNumber}
                          onChange={(e) => setFormField('gstNumber', e.target.value)}
                          className={`w-full rounded-2xl border px-5 py-3.5 text-base font-semibold outline-none transition-all ${
                            formValues.gstApplicable === 'No' 
                            ? 'bg-slate-100 border-transparent text-slate-400 cursor-not-allowed' 
                            : 'border-[#e2e8f0] bg-white text-[#0f172a] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/10'
                          }`}
                        />
                      </div>
                    </div>
                  </section>

                  {/* Bank Details */}
                  <section>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-8 w-1 bg-[#10b981] rounded-full" />
                      <h3 className="text-lg font-black uppercase tracking-widest text-[#1e293b]">Bank Details</h3>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      {[
                        { label: 'Bank Name', field: 'bankName', placeholder: 'e.g. HDFC Bank' },
                        { label: 'Branch Name', field: 'branch', placeholder: 'Branch location' },
                        { label: 'IFSC Code', field: 'ifsc', placeholder: 'HDFC0001234' },
                        { label: 'Account Number', field: 'accountNumber', placeholder: 'Enter Account Number' },
                        { label: 'Bank Pincode', field: 'bankZip', placeholder: 'Pincode' },
                      ].map((item) => (
                        <div key={item.field} className="cp-add-field space-y-1.5">
                          <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-[#64748b]">{item.label}</label>
                          <input
                            type="text"
                            placeholder={item.placeholder}
                            value={formValues[item.field]}
                            onChange={(e) => setFormField(item.field, e.target.value)}
                            className="w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-3.5 text-base font-semibold text-[#0f172a] outline-none transition-all focus:border-[#10b981] focus:bg-white focus:ring-4 focus:ring-[#10b981]/10"
                          />
                        </div>
                      ))}
                      <div className="cp-add-field space-y-1.5">
                        <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-[#64748b]">Account Type</label>
                        <div className="relative">
                          <select
                            value={formValues.accountType}
                            onChange={(e) => setFormField('accountType', e.target.value)}
                            className="w-full appearance-none rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-3.5 text-base font-semibold text-[#0f172a] outline-none transition-all focus:border-[#10b981] focus:bg-white focus:ring-4 focus:ring-[#10b981]/10"
                          >
                            {accountTypeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#94a3b8]"><IconChevron /></span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Documents */}
                  <section>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-8 w-1 bg-[#3b82f6] rounded-full" />
                      <h3 className="text-lg font-black uppercase tracking-widest text-[#1e293b]">Documents</h3>
                    </div>
                    <div className="cp-add-field rounded-3xl border-2 border-dashed border-[#e2e8f0] bg-[#f8fafc] p-8 text-center transition hover:border-[#3b82f6]/50">
                      <input
                        type="file"
                        id="cp-doc-upload"
                        multiple
                        className="hidden"
                        onChange={handleUploadDocs}
                      />
                      <label htmlFor="cp-doc-upload" className="flex cursor-pointer flex-col items-center">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#3b82f6]/10 text-[#3b82f6]">
                          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                        </div>
                        <p className="text-base font-bold text-[#1e293b]">Click to upload documents</p>
                        <p className="mt-1 text-sm text-[#94a3b8]">Aadhaar, PAN, RERA certificate, etc.</p>
                      </label>

                      {formValues.uploadDocuments?.length > 0 && (
                        <div className="mt-6 grid gap-3 text-left">
                          {formValues.uploadDocuments.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between rounded-xl border border-[#e2e8f0] bg-white p-3 shadow-sm">
                              <span className="truncate font-bold text-[#475569]">{doc.name}</span>
                              <div className="flex items-center gap-2">
                                <button type="button" onClick={() => window.open(doc.url)} className="text-[11px] font-bold text-[#6366f1] hover:underline">View</button>
                                <button type="button" onClick={() => handleRemoveUploadedDoc(idx)} className="text-sm font-black text-red-500">&times;</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Address */}
                  <section className="pb-8">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-8 w-1 bg-[#f59e0b] rounded-full" />
                      <h3 className="text-lg font-black uppercase tracking-widest text-[#1e293b]">Address</h3>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      {[
                        { label: 'House/Flat/Company', field: 'house' },
                        { label: 'Street', field: 'street' },
                        { label: 'City', field: 'city' },
                        { label: 'Zip / Pin Code', field: 'zip' },
                        { label: 'State / Region', field: 'state' },
                        { label: 'Country', field: 'country' },
                      ].map((item) => (
                        <div key={item.field} className="cp-add-field space-y-1.5">
                          <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-[#64748b]">{item.label}</label>
                          <input
                            type="text"
                            value={formValues[item.field]}
                            onChange={(e) => setFormField(item.field, e.target.value)}
                            className="w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-3.5 text-base font-semibold text-[#0f172a] outline-none transition-all focus:border-[#f59e0b] focus:bg-white focus:ring-4 focus:ring-[#f59e0b]/10"
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <div className="sticky bottom-0 flex items-center justify-end gap-4 border-t border-[#e2e8f0] bg-white px-8 py-6">
                <button
                  type="button"
                  onClick={() => setIsAddFormOpen(false)}
                  className="rounded-xl px-8 py-3.5 text-base font-bold text-[#94a3b8] transition hover:text-[#0f172a]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePartner}
                  className="rounded-2xl bg-[#6366f1] px-12 py-3.5 text-base font-bold text-white shadow-xl shadow-[#6366f1]/20 transition-all hover:scale-105 hover:bg-[#4f46e5] active:scale-95"
                >
                  {editingPartnerIndex !== null ? 'Update Partner' : 'Register Partner'}
                </button>
              </div>
            </div>
          </div>
        )}

        {isDetailsOpen && selectedPartner && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center bg-[#0f172a]/20 p-4 backdrop-blur-sm">
            <div ref={detailsPanelRef} className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2.5rem] border border-white bg-white shadow-[0_35px_90px_rgba(49,46,129,0.2)]">
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#f1f5f9] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] px-8 py-6">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6366f1] text-white shadow-lg shadow-indigo-100">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-[#0f172a]">{selectedPartner.companyName || selectedPartner.name}</h2>
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#6366f1]">Channel Partner Profile</p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#94a3b8] shadow-sm transition hover:text-[#0f172a]"
                >
                  &times;
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-8 py-8 no-scrollbar">
                <div className="space-y-10">
                  {/* Identification */}
                  <section>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-6 w-1 rounded-full bg-[#6366f1]" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-[#1e293b]">Identification & Contact</h3>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <DetailField label="Owner Name" value={selectedPartner.name} />
                      <DetailField label="Phone" value={selectedPartner.phone} />
                      <DetailField label="Email" value={selectedPartner.email} />
                      <DetailField label="Alt Number" value={selectedPartner.alternateNumber} />
                      <DetailField label="Occupation" value={selectedPartner.occupation} />
                      <DetailField label="Aadhaar" value={selectedPartner.aadhaar} />
                      <DetailField label="PAN Number" value={selectedPartner.pan} />
                      <DetailField label="RERA Number" value={selectedPartner.rera} />
                      <div className="rounded-2xl border border-[#f1f5f9] bg-[#f8fafc] px-4 py-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">Status</p>
                        <div className="mt-1">
                          <span className="inline-block rounded-full bg-[#10b981]/10 px-3 py-1 text-[11px] font-bold text-[#10b981]">
                            {selectedPartner.status || 'Active'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Financial & GST */}
                  <section>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-6 w-1 rounded-full bg-[#10b981]" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-[#1e293b]">Financial & Bank Details</h3>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <DetailField label="GST Applicable" value={selectedPartner.gstApplicable} />
                      <DetailField label="GST Number" value={selectedPartner.gstNumber} />
                      <DetailField label="Bank Name" value={selectedPartner.bankName} />
                      <DetailField label="Branch" value={selectedPartner.branch} />
                      <DetailField label="Account Type" value={selectedPartner.accountType} />
                      <DetailField label="IFSC Code" value={selectedPartner.ifsc} />
                      <DetailField label="Account Number" value={selectedPartner.accountNumber} />
                      <DetailField label="Bank Pincode" value={selectedPartner.bankZip} />
                    </div>
                  </section>

                  {/* Documents */}
                  <section>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-6 w-1 rounded-full bg-[#3b82f6]" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-[#1e293b]">Uploaded Documents</h3>
                    </div>
                    {selectedPartnerDocs.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-[#e2e8f0] bg-[#f8fafc] p-6 text-center text-sm font-bold text-[#94a3b8]">
                        No documents available for this partner.
                      </div>
                    ) : (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {selectedPartnerDocs.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between rounded-2xl border border-[#e2e8f0] bg-white p-4 transition hover:border-[#3b82f6]/30">
                            <div className="flex items-center gap-3 truncate">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3b82f6]/10 text-[#3b82f6]">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                              </div>
                              <span className="truncate text-sm font-bold text-[#475569]">{doc.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => doc.url && window.open(doc.url)}
                              className="rounded-lg bg-[#eff6ff] px-4 py-2 text-[11px] font-black uppercase tracking-widest text-[#3b82f6] transition hover:bg-[#3b82f6] hover:text-white"
                            >
                              View
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>

                  {/* Address */}
                  <section className="pb-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-6 w-1 rounded-full bg-[#f59e0b]" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-[#1e293b]">Registered Address</h3>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <DetailField label="House/Flat" value={selectedPartner.house} />
                      <DetailField label="Street" value={selectedPartner.street} />
                      <DetailField label="City" value={selectedPartner.city} />
                      <DetailField label="State" value={selectedPartner.state} />
                      <DetailField label="Country" value={selectedPartner.country} />
                      <DetailField label="Zip Code" value={selectedPartner.zip} />
                    </div>
                  </section>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 flex items-center justify-end border-t border-[#f1f5f9] bg-white px-8 py-5">
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="rounded-2xl bg-[#0f172a] px-10 py-3 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-slate-200 transition hover:bg-[#1e293b]"
                >
                  Close Profile
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
                <div className="relative px-4 py-4 text-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        if (openActionIndex === index) {
                          setOpenActionIndex(null)
                          setMenuAnchorRect(null)
                        } else {
                          const rect = e.currentTarget.getBoundingClientRect()
                          setMenuAnchorRect({
                            top: rect.bottom + window.scrollY,
                            left: rect.right + window.scrollX
                          })
                          setOpenActionIndex(index)
                        }
                      }}
                      className={`cp-action-trigger cp-clickable flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${openActionIndex === index ? 'bg-[#312e81] text-white shadow-lg' : 'bg-[#eff6ff] text-[#312e81] hover:bg-[#312e81] hover:text-white'}`}
                    >
                      <span className="text-xl font-bold leading-none mb-1">...</span>
                    </button>
                    {openActionIndex === index && menuAnchorRect && createPortal(
                      <div 
                        ref={actionMenuRef}
                        className="fixed z-[999] w-72 overflow-hidden rounded-[2.5rem] border border-white bg-white/90 p-4 shadow-[0_25px_70px_rgba(49,46,129,0.25)] backdrop-blur-3xl animate-elastic-pop"
                        style={{ 
                          top: `${menuAnchorRect.top - window.scrollY + 12}px`, 
                          left: `${menuAnchorRect.left - window.scrollX - 260}px` 
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#312e81]/5 to-transparent opacity-50" />
                        <div className="relative space-y-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionIndex(null)
                              setMenuAnchorRect(null)
                              setViewingPartnerIndex(index)
                              setIsDetailsOpen(true)
                            }}
                            className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all duration-300 hover:bg-[#312e81] hover:text-white hover:shadow-lg hover:shadow-indigo-200"
                          >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff6ff] text-[#312e81] transition-colors group-hover:bg-white/20 group-hover:text-white">
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-base font-bold">View Details</div>
                              <div className="text-[10px] opacity-70 font-medium">Partner profile & history</div>
                            </div>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionIndex(null)
                              setMenuAnchorRect(null)
                              setEditingPartnerIndex(index)
                              setFormValues(partner)
                              setIsAddFormOpen(true)
                            }}
                            className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all duration-300 hover:bg-[#ea580c] hover:text-white hover:shadow-lg hover:shadow-orange-200"
                          >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7ed] text-[#ea580c] transition-colors group-hover:bg-white/20 group-hover:text-white">
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1-1-4 9.5-9.5z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-base font-bold">Edit Partner</div>
                              <div className="text-[10px] opacity-70 font-medium">Update profile details</div>
                            </div>
                          </button>
                        </div>
                      </div>,
                      document.body
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
