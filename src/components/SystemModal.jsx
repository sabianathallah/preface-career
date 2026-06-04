import { useEffect, useCallback } from 'react'

export default function SystemModal({ isOpen, onClose }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, handleKey])

  if (!isOpen) return null

  return (
    <div className={`sys-overlay ${isOpen ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sys-modal">
        <button className="sys-modal-close" onClick={onClose}>&times;</button>
        <div className="sys-modal-lock">
          <svg viewBox="0 0 24 24" fill="none" stroke="#A0141E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="0"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <div className="sys-modal-eyebrow">Preface System</div>
        <h2 className="sys-modal-title">Access Restricted</h2>
        <p className="sys-modal-body">
          This module is only accessible to Preface team members. Log in to your account to continue.
        </p>
        <a className="sys-modal-btn" href="https://prefacesystem.com">
          Login to Preface System &rarr;
        </a>
        <p className="sys-modal-hint">prefacesystem.com</p>
      </div>
    </div>
  )
}
