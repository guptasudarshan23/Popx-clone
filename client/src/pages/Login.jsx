import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MobileFrame from '../components/MobileFrame'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

const API = import.meta.env.PROD ? '' : 'http://localhost:5000';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()

  const handleLogin = async () => {
    setLoading(true); setError('')
    try {
      const { data } = await axios.post(`${API}/api/auth/login`, { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      nav('/profile')
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MobileFrame>
      <div style={{ marginBottom: 16 }}>
        <h1 className="title">Signin to your<br />PopX account</h1>
        <p className="sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
      </div>
      <Input label="Email Address" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} />
      <Input label="Password" type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
      {error && <p className="sub" style={{ color: 'crimson' }}>{error}</p>}
      <Button onClick={handleLogin} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
    </MobileFrame>
  )
}