import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Particle3D {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    mass: number;
}

export const Particle3DBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const particlesRef = useRef<Particle3D[]>([]);
    const pointsRef = useRef<THREE.Points | null>(null);
    const linesRef = useRef<THREE.LineSegments | null>(null);
    const animationFrameRef = useRef<number>();
    const { mousePosition, isMoving } = useMousePosition();
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const mouseVectorRef = useRef(new THREE.Vector3());

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

    // Initialize Three.js scene and particles
    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 30;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x0f172a, 1);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create particles
        const particleCount = Math.min(150, Math.max(100, Math.floor((window.innerWidth * window.innerHeight) / 6000)));
        const particles: Particle3D[] = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 80,
                    (Math.random() - 0.5) * 80,
                    (Math.random() - 0.5) * 80
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.4,
                    (Math.random() - 0.5) * 0.4,
                    (Math.random() - 0.5) * 0.4
                ),
                mass: Math.random() * 0.8 + 0.4,
            });
        }
        particlesRef.current = particles;

        // Create geometry for particles
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particles.length * 3);
        const colors = new Float32Array(particles.length * 3);

        particles.forEach((particle, i) => {
            positions[i * 3] = particle.position.x;
            positions[i * 3 + 1] = particle.position.y;
            positions[i * 3 + 2] = particle.position.z;

            // White color for particles
            colors[i * 3] = 1;
            colors[i * 3 + 1] = 1;
            colors[i * 3 + 2] = 1;
        });

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 1.2,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 1,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);
        pointsRef.current = points;

        // Create lines between particles
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions: number[] = [];
        const lineColors: number[] = [];

        // Pre-allocate for potential line segments
        const maxLines = particleCount * 10;
        const linePos = new Float32Array(maxLines * 6);
        const lineCols = new Float32Array(maxLines * 6);

        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
        lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineCols, 3));

        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
            linewidth: 2,
        });

        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);
        linesRef.current = lines;

        // Animation loop
        const animate = () => {
            const connectionDistance = 25;
            const mouseInfluenceDistance = isMoving ? 25 : 0;

            // Update mouse vector
            if (isMoving) {
                mouseVectorRef.current.x = (mousePosition.x / window.innerWidth) * 50 - 25;
                mouseVectorRef.current.y = -(mousePosition.y / window.innerHeight) * 50 + 25;
                mouseVectorRef.current.z = 0;
            }

            // Update particles
            particles.forEach((particle) => {
                // Apply gravity (slight downward force)
                particle.velocity.y -= 0.05 * particle.mass;

                // Mouse repulsion
                if (mouseInfluenceDistance > 0) {
                    const direction = new THREE.Vector3()
                        .subVectors(particle.position, mouseVectorRef.current)
                        .normalize();
                    const distance = particle.position.distanceTo(mouseVectorRef.current);

                    if (distance < mouseInfluenceDistance) {
                        const force = (1 - distance / mouseInfluenceDistance) * 0.3;
                        particle.velocity.addScaledVector(direction, force);
                    }
                }

                // Apply damping
                particle.velocity.multiplyScalar(0.98);

                // Update position
                particle.position.add(particle.velocity);

                // Boundary constraints
                const boundary = 50;
                if (particle.position.x > boundary) {
                    particle.position.x = -boundary;
                }
                if (particle.position.x < -boundary) {
                    particle.position.x = boundary;
                }
                if (particle.position.y > boundary) {
                    particle.position.y = -boundary;
                    particle.velocity.y *= -0.8;
                }
                if (particle.position.y < -boundary) {
                    particle.position.y = boundary;
                    particle.velocity.y *= -0.8;
                }
                if (particle.position.z > boundary) {
                    particle.position.z = -boundary;
                }
                if (particle.position.z < -boundary) {
                    particle.position.z = boundary;
                }
            });

            // Update particle positions in geometry
            const posAttr = (geometry.getAttribute('position') as THREE.BufferAttribute);
            const positions = posAttr.array as Float32Array;

            particles.forEach((particle, i) => {
                positions[i * 3] = particle.position.x;
                positions[i * 3 + 1] = particle.position.y;
                positions[i * 3 + 2] = particle.position.z;
            });
            posAttr.needsUpdate = true;

            // Update connecting lines
            const linePositions = linesRef.current!.geometry.getAttribute('position') as THREE.BufferAttribute;
            const lineColors = linesRef.current!.geometry.getAttribute('color') as THREE.BufferAttribute;
            const linePosArray = linePositions.array as Float32Array;
            const lineColArray = lineColors.array as Float32Array;

            let lineIndex = 0;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const distance = particles[i].position.distanceTo(particles[j].position);

                    if (distance < connectionDistance && lineIndex < (linePosArray.length / 6)) {
                        const p1 = particles[i].position;
                        const p2 = particles[j].position;

                        linePosArray[lineIndex * 6] = p1.x;
                        linePosArray[lineIndex * 6 + 1] = p1.y;
                        linePosArray[lineIndex * 6 + 2] = p1.z;
                        linePosArray[lineIndex * 6 + 3] = p2.x;
                        linePosArray[lineIndex * 6 + 4] = p2.y;
                        linePosArray[lineIndex * 6 + 5] = p2.z;

                        // Red color for lines with opacity based on distance
                        const opacity = (1 - distance / connectionDistance) * 0.6;
                        const red = 239 / 255;
                        const green = 68 / 255;
                        const blue = 68 / 255;

                        lineColArray[lineIndex * 6] = red;
                        lineColArray[lineIndex * 6 + 1] = green;
                        lineColArray[lineIndex * 6 + 2] = blue;
                        lineColArray[lineIndex * 6 + 3] = red;
                        lineColArray[lineIndex * 6 + 4] = green;
                        lineColArray[lineIndex * 6 + 5] = blue;

                        lineIndex++;
                    }
                }
            }

            linePositions.needsUpdate = true;
            lineColors.needsUpdate = true;
            (linesRef.current!.geometry as THREE.BufferGeometry).setDrawRange(0, lineIndex * 2);

            // Gentle camera rotation
            camera.position.x += (mouseVectorRef.current.x * 0.5 - camera.position.x) * 0.02;
            camera.position.y += (mouseVectorRef.current.y * 0.5 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            lineGeometry.dispose();
            material.dispose();
            lineMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    // Update animation based on mouse position
    useEffect(() => {
        if (!sceneRef.current) return;

        if (isMoving && !prefersReducedMotion) {
            mouseVectorRef.current.x = (mousePosition.x / window.innerWidth) * 50 - 25;
            mouseVectorRef.current.y = -(mousePosition.y / window.innerHeight) * 50 + 25;
        }
    }, [mousePosition, isMoving, prefersReducedMotion]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-10 overflow-hidden bg-slate-950"
            style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 1) 50%, rgba(15, 23, 42, 1) 100%)',
            }}
        />
    );
};
