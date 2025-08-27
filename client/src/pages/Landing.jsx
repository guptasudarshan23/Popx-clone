import { useNavigate } from 'react-router-dom'
import MobileFrame from '../components/MobileFrame'
import { Button } from '../components/Button'

export default function Landing(){
  const nav = useNavigate()
  return (
    <MobileFrame>
      <div style={{marginTop:'auto'}}>
        <h1 className="title">Welcome to PopX</h1>
        <p className="sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
      </div>
      <div className="spacer"></div>
      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        <Button onClick={()=>nav('/signup')}>Create Account</Button>
        <Button variant="secondary" onClick={()=>nav('/login')}>Already Registered? Login</Button>
      </div>
    </MobileFrame>
  )
}