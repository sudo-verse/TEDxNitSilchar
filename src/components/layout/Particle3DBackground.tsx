import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Particle3D {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    mass: number;
    originalOpacity: number;
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
    const cameraTargetRef = useRef(new THREE.Vector3());

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

        try {
            // Scene setup
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x0f172a);
            sceneRef.current = scene;

            const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
            camera.position.z = 80;
            cameraRef.current = camera;

            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance'
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x0f172a, 1);
            containerRef.current.appendChild(renderer.domElement);
            rendererRef.current = renderer;

            // Create particles - more particles, better distribution
            const particleCount = Math.min(
                200,
                Math.max(120, Math.floor((window.innerWidth * window.innerHeight) / 5000))
            );
            const particles: Particle3D[] = [];

            for (let i = 0; i < particleCount; i++) {
                const phi = Math.acos(-1 + (2 * i) / particleCount);
                const theta = Math.sqrt(particleCount * Math.PI) * phi;

                const radius = 40 + Math.random() * 30;

                particles.push({
                    position: new THREE.Vector3(
                        radius * Math.cos(theta) * Math.sin(phi),
                        radius * Math.sin(theta) * Math.sin(phi),
                        radius * Math.cos(phi)
                    ),
                    velocity: new THREE.Vector3(
                        (Math.random() - 0.5) * 0.3,
                        (Math.random() - 0.5) * 0.3,
                        (Math.random() - 0.5) * 0.3
                    ),
                    mass: Math.random() * 0.6 + 0.6,
                    originalOpacity: Math.random() * 0.4 + 0.6
                });
            }
            particlesRef.current = particles;

            // Create point cloud geometry
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particles.length * 3);
            const colors = new Float32Array(particles.length * 3);
            const sizes = new Float32Array(particles.length);

            particles.forEach((particle, i) => {
                positions[i * 3] = particle.position.x;
                positions[i * 3 + 1] = particle.position.y;
                positions[i * 3 + 2] = particle.position.z;

                colors[i * 3] = 1;
                colors[i * 3 + 1] = 1;
                colors[i * 3 + 2] = 1;

                sizes[i] = Math.random() * 2 + 1.5;
            });

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const material = new THREE.PointsMaterial({
                size: 2,
                sizeAttenuation: true,
                vertexColors: true,
                transparent: true,
                opacity: 0.95,
                toneMapped: true
            });

            const points = new THREE.Points(geometry, material);
            scene.add(points);
            pointsRef.current = points;

            // Create lines
            const lineGeometry = new THREE.BufferGeometry();
            const maxLineSegments = particleCount * 15;
            const linePos = new Float32Array(maxLineSegments * 6);
            const lineCols = new Float32Array(maxLineSegments * 6);

            lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
            lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineCols, 3));

            const lineMaterial = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: 0.6,
                linewidth: 1
            });

            const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
            scene.add(lines);
            linesRef.current = lines;

            // Animation loop
            const animate = () => {
                const connectionDistance = 35;
                const mouseInfluenceDistance = isMoving && !prefersReducedMotion ? 30 : 0;

                // Update mouse influence
                if (isMoving && !prefersReducedMotion) {
                    mouseVectorRef.current.x = (mousePosition.x / window.innerWidth) * 80 - 40;
                    mouseVectorRef.current.y = -(mousePosition.y / window.innerHeight) * 80 + 40;
                    mouseVectorRef.current.z = 0;
                }

                // Update particles
                particles.forEach(particle => {
                    // Gentle gravity
                    particle.velocity.y -= 0.02 * particle.mass;

                    // Mouse repulsion
                    if (mouseInfluenceDistance > 0) {
                        const direction = new THREE.Vector3()
                            .subVectors(particle.position, mouseVectorRef.current)
                            .normalize();
                        const distance = particle.position.distanceTo(mouseVectorRef.current);

                        if (distance < mouseInfluenceDistance) {
                            const force = (1 - distance / mouseInfluenceDistance) * 0.25;
                            particle.velocity.addScaledVector(direction, force);
                        }
                    }

                    // Damping
                    particle.velocity.multiplyScalar(0.985);

                    // Update position
                    particle.position.add(particle.velocity);

                    // Soft boundary constraints
                    const boundary = 70;
                    if (Math.abs(particle.position.x) > boundary) {
                        particle.position.x = Math.sign(particle.position.x) * (boundary - Math.random() * 5);
                        particle.velocity.x *= -0.6;
                    }
                    if (Math.abs(particle.position.y) > boundary) {
                        particle.position.y = Math.sign(particle.position.y) * (boundary - Math.random() * 5);
                        particle.velocity.y *= -0.6;
                    }
                    if (Math.abs(particle.position.z) > boundary) {
                        particle.position.z = Math.sign(particle.position.z) * (boundary - Math.random() * 5);
                        particle.velocity.z *= -0.6;
                    }
                });

                // Update geometry
                const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
                const positions = posAttr.array as Float32Array;

                particles.forEach((particle, i) => {
                    positions[i * 3] = particle.position.x;
                    positions[i * 3 + 1] = particle.position.y;
                    positions[i * 3 + 2] = particle.position.z;
                });
                posAttr.needsUpdate = true;

                // Update lines
                const linePositions = linesRef.current!.geometry.getAttribute('position') as THREE.BufferAttribute;
                const lineColors = linesRef.current!.geometry.getAttribute('color') as THREE.BufferAttribute;
                const linePosArray = linePositions.array as Float32Array;
                const lineColArray = lineColors.array as Float32Array;

                let lineIndex = 0;

                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const distance = particles[i].position.distanceTo(particles[j].position);

                        if (distance < connectionDistance && lineIndex < maxLineSegments) {
                            const p1 = particles[i].position;
                            const p2 = particles[j].position;

                            linePosArray[lineIndex * 6] = p1.x;
                            linePosArray[lineIndex * 6 + 1] = p1.y;
                            linePosArray[lineIndex * 6 + 2] = p1.z;
                            linePosArray[lineIndex * 6 + 3] = p2.x;
                            linePosArray[lineIndex * 6 + 4] = p2.y;
                            linePosArray[lineIndex * 6 + 5] = p2.z;

                            const opacity = (1 - distance / connectionDistance) * 0.7;
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

                // Smooth camera movement
                cameraTargetRef.current.x = mouseVectorRef.current.x * 0.3 * 0.1;
                cameraTargetRef.current.y = mouseVectorRef.current.y * 0.3 * 0.1;

                camera.position.x += (cameraTargetRef.current.x - camera.position.x) * 0.02;
                camera.position.y += (cameraTargetRef.current.y - camera.position.y) * 0.02;
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
        } catch (error) {
            console.error('Three.js initialization error:', error);
        }
    }, []);

    // Update mouse position
    useEffect(() => {
        if (!sceneRef.current || prefersReducedMotion) return;

        if (isMoving) {
            mouseVectorRef.current.x = (mousePosition.x / window.innerWidth) * 80 - 40;
            mouseVectorRef.current.y = -(mousePosition.y / window.innerHeight) * 80 + 40;
        }
    }, [mousePosition, isMoving, prefersReducedMotion]);

    return (
        <div
            ref={containerRef}
            className='fixed inset-0 -z-10 overflow-hidden'
            style={{
                background:
                    'linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 1) 50%, rgba(15, 23, 42, 1) 100%)'
            }}
        />
    );
};
