import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MobileFrame from '../components/MobileFrame'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

const API = import.meta.env.PROD ? '' : 'http://localhost:5000';

export default function Signup() {
  const nav = useNavigate()
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', password: '', company: '', isAgency: true })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async () => {
    setError(''); setLoading(true)
    try {
      const { data } = await axios.post(`${API}/api/auth/register`, form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      nav('/profile')
    } catch (e) {
      setError(e.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MobileFrame>
      <div style={{ marginBottom: 10 }}>
        <h2 className="title" style={{ fontSize: 24 }}>Create your<br />PopX account</h2>
      </div>
      <Input label="Full Name*" placeholder="Marry Doe" value={form.fullName} onChange={e => setField('fullName', e.target.value)} />
      <Input label="Phone number*" placeholder="9999999999" value={form.phone} onChange={e => setField('phone', e.target.value)} />
      <Input label="Email address*" placeholder="marry@doe.com" value={form.email} onChange={e => setField('email', e.target.value)} />
      <Input label="Password*" type="password" placeholder="••••••••" value={form.password} onChange={e => setField('password', e.target.value)} />
      <Input label="Company name" placeholder="Acme Inc." value={form.company} onChange={e => setField('company', e.target.value)} />
      <div className="input">
        <label>Are you an Agency?*</label>
        <div className="radio-row">
          <label><input type="radio" checked={form.isAgency === true} onChange={() => setField('isAgency', true)} /> Yes</label>
          <label><input type="radio" checked={form.isAgency === false} onChange={() => setField('isAgency', false)} /> No</label>
        </div>
      </div>
      {error && <p className="sub" style={{ color: 'crimson' }}>{error}</p>}
      <Button onClick={submit} disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</Button>
    </MobileFrame>
  )
}