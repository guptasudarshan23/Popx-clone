export default function MobileFrame({ children, title }){
  return (
    <div className="phone-stage">
      {title && <div className="topbar">{title}</div>}
      {children}
    </div>
  )
}