export async function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-animate]').forEach((el) => {
    const animation = el.getAttribute('data-animate');
    if (animation === 'fade-up') {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el as Element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    } else if (animation === 'fade-in') {
      gsap.fromTo(el, { opacity: 0 }, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el as Element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  });
}
