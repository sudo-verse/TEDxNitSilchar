import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

export const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { mousePosition, isMoving } = useMousePosition();
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>();
    const mouseInfluenceRef = useRef({ x: 0, y: 0 });

    // Check for prefers-reduced-motion
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Initialize canvas and particles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initializeParticles();
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles based on screen size
        function initializeParticles() {
            const particleCount = Math.min(80, Math.max(40, Math.floor((canvas.width * canvas.height) / 15000)));
            particlesRef.current = [];

            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.5 + 0.3,
                });
            }
        }

        // Animation loop
        const animate = () => {
            // Clear canvas with semi-transparent background
            ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;
            const connectionDistance = 150;
            const mouseInfluenceDistance = isMoving && !prefersReducedMotion ? 200 : 0;

            // Update mouse influence position smoothly
            if (isMoving && !prefersReducedMotion) {
                mouseInfluenceRef.current.x += (mousePosition.x - mouseInfluenceRef.current.x) * 0.1;
                mouseInfluenceRef.current.y += (mousePosition.y - mouseInfluenceRef.current.y) * 0.1;
            }

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];

                // Apply slow drift motion
                if (!prefersReducedMotion) {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                }

                // Gentle mouse attraction (only if not reduced motion)
                if (mouseInfluenceDistance > 0) {
                    const dx = mouseInfluenceRef.current.x - particle.x;
                    const dy = mouseInfluenceRef.current.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseInfluenceDistance) {
                        const angle = Math.atan2(dy, dx);
                        const force = (1 - distance / mouseInfluenceDistance) * 0.08;
                        particle.vx += Math.cos(angle) * force;
                        particle.vy += Math.sin(angle) * force;
                    }
                }

                // Apply friction
                particle.vx *= 0.98;
                particle.vy *= 0.98;

                // Wrap around edges
                if (particle.x < -10) particle.x = canvas.width + 10;
                if (particle.x > canvas.width + 10) particle.x = -10;
                if (particle.y < -10) particle.y = canvas.height + 10;
                if (particle.y > canvas.height + 10) particle.y = -10;

                // Draw particle
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.15;
                        ctx.strokeStyle = `rgba(230, 43, 30, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [mousePosition, isMoving, prefersReducedMotion]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10"
            style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 1) 50%, rgba(15, 23, 42, 1) 100%)',
            }}
        />
    );
};
