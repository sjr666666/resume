import { useCallback, useEffect, useRef, useState } from 'react'

const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y)

const rangeValue = (d, max, min, peak) => Math.max(min, peak - Math.abs((peak * d) / max) + min)

export default function TextPressure({
  text,
  textColor = '#edf2ee',
  minFontSize = 24,
  className = '',
}) {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const spansRef = useRef([])
  const pointer = useRef({ x: 0, y: 0 })
  const cursor = useRef({ x: 0, y: 0 })
  const [fontSize, setFontSize] = useState(minFontSize)

  const chars = text.split('')

  useEffect(() => {
    const move = (event) => {
      cursor.current.x = event.clientX
      cursor.current.y = event.clientY
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const resize = useCallback(() => {
    if (!containerRef.current) return
    const width = containerRef.current.getBoundingClientRect().width
    setFontSize(Math.max(width / (chars.length / 2.05), minFontSize))
  }, [chars.length, minFontSize])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize])

  useEffect(() => {
    let frame
    const animate = () => {
      pointer.current.x += (cursor.current.x - pointer.current.x) / 15
      pointer.current.y += (cursor.current.y - pointer.current.y) / 15
      const title = titleRef.current
      if (title) {
        const rect = title.getBoundingClientRect()
        const maxDistance = Math.max(rect.width / 2, 1)
        spansRef.current.forEach((span) => {
          if (!span) return
          const charRect = span.getBoundingClientRect()
          const d = distance(pointer.current, {
            x: charRect.left + charRect.width / 2,
            y: charRect.top + charRect.height / 2,
          })
          const weight = Math.floor(rangeValue(d, maxDistance, 100, 800))
          const width = Math.floor(rangeValue(d, maxDistance, 60, 105))
          const italic = rangeValue(d, maxDistance, 0, 0.8).toFixed(2)
          span.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}, 'ital' ${italic}`
        })
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div ref={containerRef} className={`text-pressure ${className}`} aria-hidden="true">
      <h2 ref={titleRef} style={{ fontSize, color: textColor }}>
        {chars.map((char, index) => (
          <span key={`${char}-${index}`} ref={(node) => { spansRef.current[index] = node }}>
            {char}
          </span>
        ))}
      </h2>
    </div>
  )
}
