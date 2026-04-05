'use client'

import { useTheme } from '../ThemeProvider'
import { useEffect, useRef, startTransition } from 'react'
import {
  AmbientLight,
  DirectionalLight,
  LinearSRGBColorSpace,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  UniformsUtils,
  Vector2,
  WebGLRenderer,
} from 'three'

// Import shaders as raw text
import vertexShader from './displacement-sphere-vertex.glsl'
import fragmentShader from './displacement-sphere-fragment.glsl'

const springConfig = {
  stiffness: 30,
  damping: 20,
  mass: 2,
}

// Utility functions from inspiration3
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  let lastExecTime = 0
  return function (this: any, ...args: any[]) {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

const cleanRenderer = (renderer: WebGLRenderer | null) => {
  if (renderer) {
    renderer.dispose()
  }
}

const cleanScene = (scene: Scene | null) => {
  if (scene) {
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      }
    })
  }
}

const removeLights = (lights: any[]) => {
  lights.forEach(light => {
    if (light.parent) {
      light.parent.remove(light)
    }
  })
}

// Media breakpoints from inspiration3
const media = {
  mobile: 696,
  tablet: 1024,
  laptop: 1200,
  desktop: 1600,
}

export default function DisplacementSphere() {
  const { theme } = useTheme()
  const start = useRef(Date.now())
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef<Vector2>(new Vector2(0.8, 0.5))
  const renderer = useRef<WebGLRenderer | null>(null)
  const camera = useRef<PerspectiveCamera | null>(null)
  const scene = useRef<Scene | null>(null)
  const lights = useRef<any[]>([])
  const uniforms = useRef<any>(null)
  const material = useRef<MeshPhongMaterial | null>(null)
  const geometry = useRef<SphereGeometry | null>(null)
  const sphere = useRef<Mesh | null>(null)
  const rotationXRef = useRef(0)
  const rotationYRef = useRef(0)
  const animationRef = useRef<number | null>(null)

  // Simple spring animation for rotations
  const updateRotation = (target: { x: number; y: number }) => {
    const spring = (current: number, target: number) => {
      const diff = target - current
      return current + diff * 0.05
    }
    
    rotationXRef.current = spring(rotationXRef.current, target.x)
    rotationYRef.current = spring(rotationYRef.current, target.y)
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const { innerWidth, innerHeight } = window
    
    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true,
    })
    renderer.current.setSize(innerWidth, innerHeight)
    renderer.current.setPixelRatio(1)
    renderer.current.outputColorSpace = LinearSRGBColorSpace

    camera.current = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100)
    camera.current.position.z = 52

    scene.current = new Scene()

    material.current = new MeshPhongMaterial()
    material.current.onBeforeCompile = (shader) => {
      uniforms.current = UniformsUtils.merge([
        shader.uniforms,
        { time: { value: 0 } },
      ])

      shader.uniforms = uniforms.current
      shader.vertexShader = vertexShader
      shader.fragmentShader = fragmentShader
    }

    startTransition(() => {
      geometry.current = new SphereGeometry(32, 128, 128)
      sphere.current = new Mesh(geometry.current, material.current!)
      sphere.current.position.z = 0
      // Add modifier as a custom property
      ;(sphere.current as any).modifier = Math.random()
      scene.current!.add(sphere.current)
    })

    return () => {
      cleanScene(scene.current!)
      cleanRenderer(renderer.current!)
    }
  }, [])

  useEffect(() => {
    if (!scene.current) return

    // Remove existing lights
    removeLights(lights.current)

    const dirLight = new DirectionalLight(0xffffff, theme === 'light' ? 1.8 : 2.0)
    const ambientLight = new AmbientLight(0xffffff, theme === 'light' ? 2.7 : 0.4)

    dirLight.position.z = 200
    dirLight.position.x = 100
    dirLight.position.y = 100

    lights.current = [dirLight, ambientLight]
    lights.current.forEach(light => scene.current!.add(light))

    return () => {
      removeLights(lights.current)
    }
  }, [theme])

  useEffect(() => {
    const handleResize = () => {
      if (!renderer.current || !camera.current || !sphere.current) return

      const { innerWidth, innerHeight } = window
      const adjustedHeight = innerHeight + innerHeight * 0.3
      
      renderer.current.setSize(innerWidth, adjustedHeight)
      camera.current.aspect = innerWidth / adjustedHeight
      camera.current.updateProjectionMatrix()

      // Responsive positioning
      if (innerWidth <= media.mobile) {
        sphere.current.position.x = 14
        sphere.current.position.y = 10
      } else if (innerWidth <= media.tablet) {
        sphere.current.position.x = 18
        sphere.current.position.y = 14
      } else {
        sphere.current.position.x = 22
        sphere.current.position.y = 16
      }

      // Render single frame when not animating
      if (renderer.current && scene.current && camera.current) {
        renderer.current.render(scene.current, camera.current)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const onMouseMove = throttle((event: MouseEvent) => {
      const position = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      }

      updateRotation({
        x: position.y / 2,
        y: position.x / 2,
      })
    }, 100)

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  useEffect(() => {
    let animation: number

    const animate = () => {
      animation = requestAnimationFrame(animate)

      if (uniforms.current !== undefined) {
        uniforms.current.time.value = 0.00005 * (Date.now() - start.current)
      }

      if (sphere.current) {
        sphere.current.rotation.z += 0.001
        sphere.current.rotation.x = rotationXRef.current
        sphere.current.rotation.y = rotationYRef.current
      }

      if (renderer.current && scene.current && camera.current) {
        renderer.current.render(scene.current, camera.current)
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animation)
    }
  }, [])

  return (
    <canvas
      aria-hidden
      ref={canvasRef}
      className="absolute inset-0 w-full h-screen opacity-0 transition-opacity duration-[3000ms] ease-[var(--bezierFastoutSlowin)] data-[visible=true]:opacity-100"
      data-visible="true"
      style={{ 
        background: 'transparent',
        pointerEvents: 'none'
      }}
    />
  )
}