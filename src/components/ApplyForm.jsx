import { useState, useRef } from 'react'

const ROLES = [
  'Finance Manager','Finance Staff','Operation Staff','Marketing Intern',
  'Admin','Graphic Designer','Production Staff','Warehouse Staff',
]

const EMPTY = { name:'', whatsapp:'', email:'', position:'', location:'', pitch:'' }
const MAX_FILE_MB = 4

export default function ApplyForm({ selectedPosition }) {
  const [form, setForm]       = useState({ ...EMPTY, position: selectedPosition || '' })
  const [cvFile, setCvFile]   = useState(null)
  const [status, setStatus]   = useState('idle')
  const [errMsg, setErrMsg]   = useState('')
  const fileRef               = useRef()

  // sync position from card click
  if (selectedPosition && form.position !== selectedPosition) {
    setForm(f => ({ ...f, position: selectedPosition }))
  }

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setErrMsg(`File too large. Max ${MAX_FILE_MB}MB.`)
      e.target.value = ''
      return
    }
    setErrMsg('')
    setCvFile(file)
  }

  const handleSubmit = async () => {
    const { name, whatsapp, email, position } = form
    if (!name || !whatsapp || !email || !position) {
      setErrMsg('Please fill in all required fields.')
      return
    }
    setErrMsg('')
    setStatus('loading')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (cvFile) fd.append('cv', cvFile, cvFile.name)

      const res = await fetch('/api/apply', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Server error')
      setStatus('success')
    } catch (err) {
      console.error('Submit error:', err)
      setStatus('error')
      setErrMsg(err.message || 'Something went wrong. Try again or email us directly.')
    }
  }

  if (status === 'success') {
    return (
      <section className="apply" id="apply">
        <div className="apply-inner">
          <div className="form-success show">
            <div className="success-icon">
              <svg viewBox="0 0 32 32" fill="none" stroke="#A0141E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="5,17 13,25 27,8"/>
              </svg>
            </div>
            <h3 className="success-heading">NOTED.<br />WE&rsquo;LL BE IN TOUCH.</h3>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="apply" id="apply">
      <div className="apply-inner">
        <h2 className="apply-heading reveal">SLIDE IN.</h2>
        <p className="apply-sub reveal reveal-delay-1">
          Fill in the form below. We&rsquo;ll hit you up if you&rsquo;re the right fit.
        </p>

        <div className="form-wrap">
          <div className="form-grid">

            <div className="form-field">
              <label className="form-label" htmlFor="f-name">Full Name</label>
              <input className="form-input" id="f-name" type="text" placeholder="Your name" value={form.name} onChange={set('name')} />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="f-wa">No. WhatsApp</label>
              <input className="form-input" id="f-wa" type="tel" placeholder="+62 8xx xxxx xxxx" value={form.whatsapp} onChange={set('whatsapp')} />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="f-email">Email</label>
              <input className="form-input" id="f-email" type="email" placeholder="email@lo.com" value={form.email} onChange={set('email')} />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="f-pos">Role You&rsquo;re Going For</label>
              <div className="select-wrap">
                <select className="form-select" id="f-pos" value={form.position} onChange={set('position')}>
                  <option value="">— Pick your spot —</option>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div className="form-field full">
              <label className="form-label" htmlFor="f-loc">Where You&rsquo;re Based</label>
              <input className="form-input" id="f-loc" type="text" placeholder="City / Area" value={form.location} onChange={set('location')} />
            </div>

            <div className="form-field full">
              <label className="form-label" htmlFor="f-pitch">Quick pitch &mdash; why you tho?</label>
              <textarea
                className="form-textarea" id="f-pitch"
                maxLength={500} placeholder="Keep it real..."
                value={form.pitch} onChange={set('pitch')}
              />
              <div className="field-footer">
                <span className={`char-counter${form.pitch.length > 440 ? ' warn' : ''}`}>
                  {form.pitch.length} / 500
                </span>
              </div>
            </div>

            <div className="form-field full">
              <label className="form-label" htmlFor="f-cv">Portfolio / CV</label>
              <div className="file-wrap" onClick={() => fileRef.current.click()}>
                <span className={`file-label${cvFile ? ' has-file' : ''}`}>
                  {cvFile ? cvFile.name : 'Upload PDF, DOCX, or image — max 4MB'}
                </span>
                <span className="file-btn">BROWSE</span>
              </div>
              <input
                ref={fileRef}
                id="f-cv"
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                style={{ display: 'none' }}
                onChange={handleFile}
              />
            </div>

          </div>

          {errMsg && <p className="form-error">{errMsg}</p>}

          <button className="submit-btn" onClick={handleSubmit} disabled={status === 'loading'}>
            {status === 'loading' ? 'SENDING...' : 'SEND IT →'}
          </button>
          <p className="form-note">Your info stays safe. We&rsquo;ll hit back via WhatsApp.</p>
          <p className="form-email">
            Or reach out directly &mdash;{' '}
            <a href="mailto:career@prefacewearhouse.com">career@prefacewearhouse.com</a>
          </p>
        </div>
      </div>
    </section>
  )
}
