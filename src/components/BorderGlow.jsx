import { useCallback, useRef } from 'react'
import './BorderGlow.css'

const BorderGlow = ({ children, className = '', colors = ['#a7e8cf', '#38bdf8', '#f4a261'] }) => {
  const ref = useRef(null)
  const updateGlow = useCallback((event) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const edge = Math.min(x, y, rect.width - x, rect.height - y)
    const proximity = Math.max(0, Math.min(100, 100 - (edge / 72) * 100))
    const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180 / Math.PI + 90
    node.style.setProperty('--edge-proximity', proximity.toFixed(2))
    node.style.setProperty('--cursor-angle', `${angle}deg`)
  }, [])

  return (
    <div
      ref={ref}
      className={`border-glow-card ${className}`}
      style={{ '--glow-a': colors[0], '--glow-b': colors[1], '--glow-c': colors[2] }}
      onPointerMove={updateGlow}
      onPointerLeave={() => ref.current?.style.setProperty('--edge-proximity', '0')}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}

export default BorderGlow
