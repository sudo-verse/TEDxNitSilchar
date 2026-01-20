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
    const containerRef = useRef<HTMLDivElement>(null);
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

    // Initialize canvas and animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set initial canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Initialize particles
        const initializeParticles = () => {
            const particleCount = Math.min(100, Math.max(60, Math.floor((canvas.width * canvas.height) / 10000)));
            particlesRef.current = [];

            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    radius: Math.random() * 2.8 + 1.3,
                    opacity: Math.random() * 0.5 + 0.5,
                });
            }
        };

        initializeParticles();

        // Main animation loop
        const animate = () => {
            // Draw base background color
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;
            const connectionDistance = 150;
            const mouseInfluenceDistance = isMoving && !prefersReducedMotion ? 200 : 0;

            // Update mouse influence
            if (isMoving && !prefersReducedMotion) {
                mouseInfluenceRef.current.x += (mousePosition.x - mouseInfluenceRef.current.x) * 0.1;
                mouseInfluenceRef.current.y += (mousePosition.y - mouseInfluenceRef.current.y) * 0.1;
            }

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];

                // Apply motion
                if (!prefersReducedMotion) {
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    // Mouse attraction
                    if (mouseInfluenceDistance > 0) {
                        const dx = mouseInfluenceRef.current.x - particle.x;
                        const dy = mouseInfluenceRef.current.y - particle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < mouseInfluenceDistance) {
                            const angle = Math.atan2(dy, dx);
                            const force = (1 - distance / mouseInfluenceDistance) * 0.1;
                            particle.vx += Math.cos(angle) * force;
                            particle.vy += Math.sin(angle) * force;
                        }
                    }

                    // Friction
                    particle.vx *= 0.98;
                    particle.vy *= 0.98;
                }

                // Wrap around edges
                if (particle.x < -20) particle.x = canvas.width + 20;
                if (particle.x > canvas.width + 20) particle.x = -20;
                if (particle.y < -20) particle.y = canvas.height + 20;
                if (particle.y > canvas.height + 20) particle.y = -20;

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
                        const opacity = (1 - distance / connectionDistance) * 0.5;
                        ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
                        ctx.lineWidth = 1.3;
                        ctx.lineCap = 'round';
                        ctx.lineJoin = 'round';
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
            window.removeEventListener('resize', setCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isMoving, prefersReducedMotion, mousePosition]);

    return (
        <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
            {/* Particle canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 block"
            />

            {/* TEDx red gradient overlay - subtle */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black/40 via-red-950/5 to-black/40" />
        </div>
    );
};
