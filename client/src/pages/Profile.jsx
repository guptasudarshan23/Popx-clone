import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MobileFrame from '../components/MobileFrame'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Profile(){
  const nav = useNavigate()
  const [me, setMe] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token) return nav('/login')
    axios.get(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMe(res.data))
      .catch(()=> nav('/login'))
  }, [])

  if(!me) return <MobileFrame title="Account Settings"><p className="sub">Loading...</p></MobileFrame>

  return (
    <MobileFrame title="Account Settings">
      <div className="profile-card">
        <img className="avatar" src={me.avatarUrl} alt={me.fullName} />
        <div>
          <div style={{fontWeight:600}}>{me.fullName}</div>
          <div className="muted">{me.email}</div>
          <p className="sub" style={{marginTop:8, maxWidth:260}}>Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam</p>
        </div>
      </div>
      <div className="divider"></div>
      <button className="btn secondary" onClick={()=>{ localStorage.clear(); nav('/login') }}>Logout</button>
    </MobileFrame>
  )
}