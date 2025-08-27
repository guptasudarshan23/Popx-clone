export function Input({ label, type='text', ...props }){
  return (
    <div className="input">
      <label>{label}</label>
      <input type={type} {...props} />
    </div>
  )
}