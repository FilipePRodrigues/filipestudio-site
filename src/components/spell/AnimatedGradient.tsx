import { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * Spell UI — Animated Gradient (adapted).
 * WebGL gradient da marca. Modo `mouseReactive` muda rotação e swirl
 * conforme o ponteiro. Pixel ratio 1, pausa fora da tela, sem reduced-motion.
 */

type PatternShape = 'Checks' | 'Stripes' | 'Edge'

const PatternShapes: Record<PatternShape, number> = {
  Checks: 0,
  Stripes: 1,
  Edge: 2,
}

interface PresetParams {
  color1: string
  color2: string
  color3: string
  rotation: number
  proportion: number
  scale: number
  speed: number
  distortion: number
  swirl: number
  swirlIterations: number
  softness: number
  offset: number
  shape: PatternShape
  shapeSize: number
}

/** Preset Filipe — fumaça suave noite + roxo + ciano. */
const FILIPE_PRESET: PresetParams = {
  color1: '#0B0B1F',
  color2: '#1E1B4B',
  color3: '#134E4A',
  rotation: -20,
  proportion: 55,
  scale: 0.08,
  speed: 3,
  distortion: 1,
  swirl: 16,
  swirlIterations: 3,
  softness: 100,
  offset: -10,
  shape: 'Edge',
  shapeSize: 14,
}

interface AnimatedGradientProps {
  speed?: number
  radius?: string
  className?: string
  style?: CSSProperties
  /** Muda direção e intensidade com o mouse */
  mouseReactive?: boolean
}

export function AnimatedGradient({
  speed = 16,
  radius = '0px',
  className,
  style,
  mouseReactive = false,
}: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const frameIdRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef(0)
  const liveRef = useRef<PresetParams>({ ...FILIPE_PRESET, speed })
  const [isMounted, setIsMounted] = useState(false)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEnabled(false)
      return
    }
    if (window.matchMedia('(max-width: 760px)').matches) {
      setEnabled(false)
      return
    }
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Pausa o rAF quando sai da tela
  useEffect(() => {
    const el = containerRef.current
    if (!el || !isMounted) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setEnabled(entry.isIntersecting)
      },
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [isMounted])

  // Base do preset + speed
  useEffect(() => {
    liveRef.current = { ...FILIPE_PRESET, speed }
  }, [speed])

  // Mouse: rotação e swirl mudam de direção/comportamento
  useEffect(() => {
    if (!mouseReactive || !isMounted) return
    let scheduled = false
    let mx = 0.5
    let my = 0.5

    const apply = () => {
      scheduled = false
      const dx = mx - 0.5
      const dy = my - 0.5
      const energy = Math.min(1, Math.hypot(dx, dy) * 2)
      liveRef.current = {
        ...liveRef.current,
        rotation: -25 + dx * 40,
        swirl: 18 + my * 22,
        speed: speed * (0.7 + energy * 0.45),
        distortion: 1.5 + energy * 3,
        swirlIterations: 3 + Math.round(my * 2),
      }
    }

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth
      my = e.clientY / window.innerHeight
      if (!scheduled) {
        scheduled = true
        requestAnimationFrame(apply)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mouseReactive, isMounted, speed])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container || !isMounted || !enabled) return

    const gl = canvas.getContext('webgl2', {
      premultipliedAlpha: true,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    })
    if (!gl) return

    const vertexShaderSource = `#version 300 es
    in vec4 a_position;
    void main() { gl_Position = a_position; }`

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fragmentShader, FRAGMENT_SHADER)
    gl.compileShader(fragmentShader)

    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const uniforms = {
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_pixelRatio: gl.getUniformLocation(program, 'u_pixelRatio'),
      u_scale: gl.getUniformLocation(program, 'u_scale'),
      u_rotation: gl.getUniformLocation(program, 'u_rotation'),
      u_color1: gl.getUniformLocation(program, 'u_color1'),
      u_color2: gl.getUniformLocation(program, 'u_color2'),
      u_color3: gl.getUniformLocation(program, 'u_color3'),
      u_proportion: gl.getUniformLocation(program, 'u_proportion'),
      u_softness: gl.getUniformLocation(program, 'u_softness'),
      u_shape: gl.getUniformLocation(program, 'u_shape'),
      u_shapeScale: gl.getUniformLocation(program, 'u_shapeScale'),
      u_distortion: gl.getUniformLocation(program, 'u_distortion'),
      u_swirl: gl.getUniformLocation(program, 'u_swirl'),
      u_swirlIterations: gl.getUniformLocation(program, 'u_swirlIterations'),
    }

    const resize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      canvas.width = Math.max(1, width)
      canvas.height = Math.max(1, height)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    startTimeRef.current = performance.now()

    const animate = (time: number) => {
      const p = liveRef.current
      const elapsed = (time - startTimeRef.current) / 1000
      // tempo bem lento: fumaça sutil, sem giro rápido
      const speedFactor = (p.speed / 100) * 2.2

      gl.uniform1f(uniforms.u_time, elapsed * speedFactor + p.offset * 0.01)
      gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height)
      gl.uniform1f(uniforms.u_pixelRatio, 1)
      gl.uniform1f(uniforms.u_scale, p.scale)
      gl.uniform1f(uniforms.u_rotation, (p.rotation * Math.PI) / 180)

      const c1 = hexToRgba(p.color1)
      const c2 = hexToRgba(p.color2)
      const c3 = hexToRgba(p.color3)
      gl.uniform4f(uniforms.u_color1, c1[0], c1[1], c1[2], c1[3])
      gl.uniform4f(uniforms.u_color2, c2[0], c2[1], c2[2], c2[3])
      gl.uniform4f(uniforms.u_color3, c3[0], c3[1], c3[2], c3[3])

      gl.uniform1f(uniforms.u_proportion, p.proportion / 100)
      gl.uniform1f(uniforms.u_softness, p.softness / 100)
      gl.uniform1f(uniforms.u_shape, PatternShapes[p.shape])
      gl.uniform1f(uniforms.u_shapeScale, p.shapeSize / 100)
      gl.uniform1f(uniforms.u_distortion, p.distortion / 50)
      gl.uniform1f(uniforms.u_swirl, p.swirl / 100)
      gl.uniform1f(uniforms.u_swirlIterations, p.swirl === 0 ? 0 : p.swirlIterations)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      frameIdRef.current = requestAnimationFrame(animate)
    }

    frameIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameIdRef.current !== undefined) cancelAnimationFrame(frameIdRef.current)
      resizeObserver.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteBuffer(positionBuffer)
    }
  }, [isMounted, enabled])

  if (!enabled) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      onPointerMove={mouseReactive ? undefined : undefined}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        borderRadius: radius,
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}

/** Fundo fixo na página inteira, reagindo ao mouse. */
export function SiteAnimatedGradient() {
  return (
    <AnimatedGradient
      mouseReactive
      speed={4}
      className="site-animated-gradient"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export default AnimatedGradient

function hexToRgba(hex: string): [number, number, number, number] {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16) / 255
  const g = parseInt(c.slice(2, 4), 16) / 255
  const b = parseInt(c.slice(4, 6), 16) / 255
  return [r, g, b, 1]
}

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;
uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
  vec3 color1 = c1.rgb * c1.a;
  vec3 color2 = c2.rgb * c2.a;
  vec3 color3 = c3.rgb * c3.a;
  float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
  float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);
  vec3 blended_color_2 = mix(color1, color2, r1);
  float blended_opacity_2 = mix(c1.a, c2.a, r1);
  vec3 c = mix(blended_color_2, color3, r2);
  float o = mix(blended_opacity_2, c3.a, r2);
  return vec4(c, o);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = .5 * u_time;
  float noise_scale = .0005 + .006 * u_scale;
  uv -= .5;
  uv *= (noise_scale * u_resolution);
  uv = rotate(uv, u_rotation * .5 * PI);
  uv /= u_pixelRatio;
  uv += .5;

  float n1 = noise(uv * 1. + t);
  float n2 = noise(uv * 2. - t);
  float angle = n1 * TWO_PI;
  uv.x += 4. * u_distortion * n2 * cos(angle);
  uv.y += 4. * u_distortion * n2 * sin(angle);

  float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
  for (float i = 1.; i <= iterations_number; i++) {
    uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
    uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
  }

  float proportion = clamp(u_proportion, 0., 1.);
  float shape = 0.;
  float mixer = 0.;
  if (u_shape < .5) {
    vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
    shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
    mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else if (u_shape < 1.5) {
    vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
    float f = fract(stripes_shape_uv.y);
    shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
    mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else {
    float sh = 1. - uv.y;
    sh -= .5;
    sh /= (noise_scale * u_resolution.y);
    sh += .5;
    float shape_scaling = .2 * (1. - u_shapeScale);
    shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
    mixer = shape;
  }

  vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);
  fragColor = vec4(color_mix.rgb, color_mix.a);
}
`
