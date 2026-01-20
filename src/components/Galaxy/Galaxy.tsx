import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Color, Geometry } from 'ogl';

interface GalaxyProps {
  particleCount?: number;
  baseColor?: string;
  accentColor?: string;
}

export default function Galaxy({
  particleCount = 1000,
  baseColor = '#ffffff',
  accentColor = '#eb0028'
}: GalaxyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const renderer = new Renderer({
      alpha: true,
      depth: false,
      dpr: Math.min(window.devicePixelRatio, 2)
    });

    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.set(0, 0, 20);

    const scene = new Transform();

    // Resize handling
    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    }
    window.addEventListener('resize', resize);
    resize();

    // Particles
    const numParticles = particleCount;
    const positions = new Float32Array(numParticles * 3);
    const randoms = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    const color1 = new Color(baseColor);
    const color2 = new Color(accentColor);

    for (let i = 0; i < numParticles; i++) {
      // Spiral distribution
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8; // Spread radius
      const spiralOffset = angle + radius * 0.5; // Twist

      // x, y position with some randomness
      const x = Math.cos(spiralOffset) * radius + (Math.random() - 0.5) * 2;
      const y = Math.sin(spiralOffset) * radius * 0.5 + (Math.random() - 0.5) * 1; // Flattened
      const z = (Math.random() - 0.5) * 4; // Depth spread

      positions.set([x, y, z], i * 3);

      // Random attributes for animation
      randoms.set([Math.random(), Math.random(), Math.random()], i * 3);

      // Mixed colors
      const mix = Math.random();
      const r = color1[0] * (1 - mix) + color2[0] * mix;
      const g = color1[1] * (1 - mix) + color2[1] * mix;
      const b = color1[2] * (1 - mix) + color2[2] * mix;

      colors.set([r, g, b], i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 3, data: randoms },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex: `
                attribute vec3 position;
                attribute vec3 random;
                attribute vec3 color;
                
                uniform float uTime;
                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;
                
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    vColor = color;
                    
                    // Animate position
                    vec3 pos = position;
                    
                    // Rotate entire galaxy
                    float angle = uTime * 0.1;
                    float c = cos(angle);
                    float s = sin(angle);
                    
                    float x = pos.x * c - pos.z * s;
                    float z = pos.x * s + pos.z * c;
                    pos.x = x;
                    pos.z = z;

                    // Individual particle float
                    pos.y += sin(uTime * 2.0 + random.x * 10.0) * 0.1;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    
                    gl_PointSize = (4.0 * random.y + 2.0) * (10.0 / gl_Position.w);
                    vAlpha = 0.6 + 0.4 * sin(uTime + random.z * 10.0);
                }
            `,
      fragment: `
                precision highp float;
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    // Circular particle
                    vec2 uv = gl_PointCoord.xy - 0.5;
                    float dist = length(uv);
                    if (dist > 0.5) discard;
                    
                    // Soft edge
                    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
                    
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      depthTest: false,
    });

    const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    mesh.setParent(scene);

    let animationId: number;
    function update(t: number) {
      animationId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene, camera });
    }
    animationId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [particleCount, baseColor, accentColor]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }} />;
}
