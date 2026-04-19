import { gsap } from 'gsap'

export function animateQuestionIn(container: Element | null) {
  if (!container) return
  gsap.fromTo(container,
    { x: 120, opacity: 0, scale: 0.97 },
    { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
  )
}

export function animateQuestionOut(
  container: Element | null, 
  onComplete: () => void
) {
  if (!container) return
  gsap.to(container, {
    x: -120, opacity: 0, scale: 0.97,
    duration: 0.35, ease: 'power3.in',
    onComplete,
  })
}

export function animateCorrectAnswer(el: Element | null) {
  if (!el) return
  
  const ripple = document.createElement('div')
  ripple.style.cssText = `
    position: absolute; inset: 0; border-radius: 12px;
    background: rgba(34,197,94,0.3); pointer-events: none;
  `
  ;(el as HTMLElement).style.position = 'relative'
  el.appendChild(ripple)

  gsap.timeline()
    .to(el, { 
      borderColor: '#22C55E', 
      backgroundColor: 'rgba(34,197,94,0.08)',
      duration: 0.2 
    })
    .fromTo(ripple,
      { scale: 0.5, opacity: 1 },
      { scale: 2.5, opacity: 0, duration: 0.7, ease: 'power2.out',
        onComplete: () => ripple.remove() },
      '<'
    )
    .to(el, { scale: 1.02, duration: 0.1 }, '<0.1')
    .to(el, { scale: 1, duration: 0.4, ease: 'elastic.out(1,0.4)' })
}

export function animateWrongAnswer(el: Element | null) {
  if (!el) return
  gsap.timeline()
    .to(el, { 
      borderColor: '#EF4444',
      backgroundColor: 'rgba(239,68,68,0.08)',
      duration: 0.15 
    })
    .to(el, { x: -10, duration: 0.05, ease: 'power2.inOut' })
    .to(el, { x: 10,  duration: 0.05, ease: 'power2.inOut' })
    .to(el, { x: -8,  duration: 0.05, ease: 'power2.inOut' })
    .to(el, { x: 8,   duration: 0.05, ease: 'power2.inOut' })
    .to(el, { x: -4,  duration: 0.05, ease: 'power2.inOut' })
    .to(el, { x: 4,   duration: 0.05, ease: 'power2.inOut' })
    .to(el, { x: 0,   duration: 0.08, ease: 'power2.out' })
}

export function animateTimerUrgency(timerEl: Element | null) {
  if (!timerEl) return
  gsap.to(timerEl, { color: '#EF4444', duration: 0.4 })
  gsap.to(timerEl, {
    scale: 1.05, duration: 0.15,
    ease: 'power2.inOut',
    repeat: -1, yoyo: true,
  })
}

export function animateTimerCritical(timerEl: Element | null) {
  if (!timerEl) return
  gsap.to(timerEl, {
    x: 3, duration: 0.06,
    ease: 'power2.inOut',
    repeat: -1, yoyo: true,
  })
}

export function animateRankUp(rank: string) {
  const overlay = document.createElement('div')
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: rgba(8,8,12,0.92);
    pointer-events: none;
  `
  overlay.innerHTML = `
    <div id="rankup-text" style="
      font-size: 4rem; font-weight: 900; 
      background: linear-gradient(135deg, #0EA5E9, #8B5CF6);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      text-align: center; line-height: 1.1;
    ">
      RANK UP!<br/>
      <span style="font-size: 2rem;">${rank}</span>
    </div>
    <div id="rankup-sub" style="
      color: #9CA3AF; font-size: 1rem; margin-top: 1rem;
    ">You've leveled up your academic identity</div>
  `
  document.body.appendChild(overlay)

  gsap.timeline({
    onComplete: () => {
      gsap.to(overlay, { 
        opacity: 0, duration: 0.5, 
        onComplete: () => overlay.remove() 
      })
    }
  })
    .from(overlay, { opacity: 0, duration: 0.4 })
    .from('#rankup-text', { 
      scale: 0.3, opacity: 0, 
      duration: 0.8, ease: 'back.out(2)' 
    }, '-=0.2')
    .from('#rankup-sub', { 
      opacity: 0, y: 20, duration: 0.5 
    }, '-=0.3')
    .to({}, { duration: 2.5 })
}

export function animateStreakMilestone(el: Element | null) {
  if (!el) return
  gsap.timeline()
    .to(el, { scale: 1.3, duration: 0.15, ease: 'power2.out' })
    .to(el, { scale: 0.95, duration: 0.1 })
    .to(el, { scale: 1.1, duration: 0.1 })
    .to(el, { scale: 1, duration: 0.4, ease: 'elastic.out(1,0.4)' })
    .to(el, { color: '#F59E0B', duration: 0.2 }, '<')
}
