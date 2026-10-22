"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageSize;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uReveal;
  uniform float uVelocity;
  uniform float uScroll;
  varying vec2 vUv;

  float noise(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

  void main() {
    float viewAspect = uResolution.x / uResolution.y;
    float imageAspect = uImageSize.x / uImageSize.y;
    vec2 ratio = vec2(min(viewAspect / imageAspect, 1.0), min(imageAspect / viewAspect, 1.0));
    vec2 uv = (vUv - 0.5) * ratio + 0.5;
    vec2 relative = (vUv - uPointer) * vec2(viewAspect, 1.0);
    float distance = length(relative);
    float influence = exp(-distance * distance * 8.0);
    float intro = 1.0 - uReveal;
    vec2 center = vUv - 0.5;
    float radius = length(center);
    float spiral = sin(radius * 23.0 - uTime * 2.5);
    uv += center * intro * spiral * 0.22;
    uv += vec2(sin(vUv.y * 12.0 + uTime), cos(vUv.x * 10.0 + uTime)) * intro * 0.035;
    vec2 ripple = normalize(relative + 0.0001) * sin(distance * 32.0 - uTime * 3.0);
    const float hoverStrength = 0.85;
    uv += ripple * influence * uVelocity * 0.022 * hoverStrength;
    uv += (uPointer - 0.5) * 0.007 * hoverStrength;
    uv.y += uScroll * 0.018;
    uv.x += sin(vUv.y * 9.0 + uTime * 0.4) * uScroll * 0.014;
    float split = influence * (uVelocity * 0.006 * hoverStrength + intro * 0.009) + uScroll * 0.003;
    uv = clamp(uv, 0.001, 0.999);
    vec3 color;
    color.r = texture2D(uTexture, uv + vec2(split, 0.0)).r;
    color.g = texture2D(uTexture, uv).g;
    color.b = texture2D(uTexture, uv - vec2(split, 0.0)).b;
    color += (noise(gl_FragCoord.xy + mod(uTime, 100.0)) - 0.5) * 0.008;
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

export default function HeroCanvas() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    const mouseInteraction = window.matchMedia(
      "(min-width: 768px) and (any-hover: hover) and (any-pointer: fine)",
    );
    let disposed = false;
    let visible = true;
    let dialogOpen = Boolean(document.querySelector("dialog[open]"));
    let elapsedTime = 0;
    let frameDelta = 0;
    let dirty = true;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return; // La lipsa WebGL, fotografia HTML rămâne vizibilă.
    }
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 1.75),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.opacity = "0";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
    camera.position.z = 1;
    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageSize: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uVelocity: { value: 0 },
      uScroll: { value: 0 },
    };
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    scene.add(new THREE.Mesh(geometry, material));
    const loader = new THREE.TextureLoader();
    const photograph = container
      .closest(".hero-visual")
      ?.querySelector<HTMLImageElement>("picture img");
    const pointerTarget = new THREE.Vector2(0.5, 0.5);
    let previousX = 0.5;
    let previousY = 0.5;
    let velocity = 0;
    let textureReady = false;
    let source = "";
    let loadGeneration = 0;
    const animations: gsap.core.Tween[] = [];

    function resize() {
      if (disposed) return;
      // Render at the layout size. The parent is scaled by scroll animation;
      // measuring that transformed rectangle would apply the zoom twice.
      const width = container!.clientWidth;
      const height = container!.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
      dirty = true;
      // Share the browser's responsive, optimized photograph with WebGL.
      // Fetching the original separately wastes bandwidth and texture memory.
      const nextSource = photograph?.currentSrc || photograph?.src;
      if (!nextSource || source === nextSource) return;
      source = nextSource;
      const generation = ++loadGeneration;
      loader.load(
        nextSource,
        async (texture) => {
          if (disposed || generation !== loadGeneration) {
            texture.dispose();
            return;
          }
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          uniforms.uTexture.value?.dispose();
          uniforms.uTexture.value = texture;
          uniforms.uImageSize.value.set(
            texture.image.width,
            texture.image.height,
          );
          renderer.initTexture(texture);
          try {
            await renderer.compileAsync(scene, camera);
          } catch {
            if (!disposed) renderer.domElement.style.opacity = "0";
            return;
          }
          if (disposed || generation !== loadGeneration) return;
          textureReady = true;
          dirty = true;
          animations.push(
            gsap.to(renderer.domElement, {
              opacity: 1,
              duration: 0.6,
              paused: dialogOpen,
            }),
          );
          animations.push(
            gsap.to(uniforms.uReveal, {
              value: 1,
              duration: 2.4,
              ease: "power3.out",
              paused: dialogOpen,
            }),
          );
        },
        undefined,
        () => {
          renderer.domElement.style.opacity = "0";
        },
      );
    }

    function canInteract(event: PointerEvent) {
      return (
        mouseInteraction.matches &&
        event.pointerType === "mouse" &&
        event.buttons === 0 &&
        !reducedMotion.matches
      );
    }
    function move(event: PointerEvent) {
      if (!canInteract(event)) return;
      const bounds = container!.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = 1 - (event.clientY - bounds.top) / bounds.height;
      velocity = Math.min(Math.hypot(x - previousX, y - previousY) * 35, 1.5);
      previousX = x;
      previousY = y;
      pointerTarget.set(x, y);
    }
    function leave(event: PointerEvent) {
      if (!canInteract(event)) return;
      pointerTarget.set(0.5, 0.5);
      velocity = 0;
    }
    const hero = container.closest("section")!;
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    function resetInteraction() {
      if (mouseInteraction.matches) return;
      pointerTarget.set(0.5, 0.5);
      uniforms.uPointer.value.set(0.5, 0.5);
      uniforms.uVelocity.value = 0;
      previousX = 0.5;
      previousY = 0.5;
      velocity = 0;
      dirty = true;
    }
    mouseInteraction.addEventListener("change", resetInteraction);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    photograph?.addEventListener("load", resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(container);
    function render(_time: number, delta: number) {
      if (
        !visible ||
        !textureReady ||
        document.hidden ||
        reducedMotion.matches ||
        dialogOpen
      )
        return;
      const scroll = Math.min(window.scrollY / window.innerHeight, 1);
      const changing =
        dirty ||
        uniforms.uReveal.value < 0.99999 ||
        velocity > 0.0001 ||
        uniforms.uVelocity.value > 0.0001 ||
        uniforms.uPointer.value.distanceToSquared(pointerTarget) > 0.00000001 ||
        Math.abs(scroll - uniforms.uScroll.value) > 0.00001;
      if (!changing) {
        frameDelta = 0;
        return;
      }
      frameDelta += delta;
      const frameInterval = mouseInteraction.matches ? 1000 / 60 : 1000 / 30;
      if (frameDelta < frameInterval - 1) return;
      const elapsed = Math.min(frameDelta, 64);
      frameDelta = 0;
      elapsedTime += elapsed / 1000;
      const smoothing = 1 - Math.exp(-elapsed / 65);
      uniforms.uPointer.value.lerp(pointerTarget, smoothing);
      uniforms.uVelocity.value +=
        (velocity - uniforms.uVelocity.value) * smoothing;
      velocity *= Math.pow(0.9, elapsed / (1000 / 60));
      uniforms.uTime.value = elapsedTime;
      uniforms.uScroll.value = scroll;
      renderer.render(scene, camera);
      dirty = false;
    }
    gsap.ticker.add(render);
    const modalListener = (event: Event) => {
      dialogOpen = (event as CustomEvent<{ open: boolean }>).detail.open;
      animations.forEach((animation) => {
        if (dialogOpen) animation.pause();
        else animation.resume();
      });
    };
    window.addEventListener("fason:dialog", modalListener);
    const motionChange = () => {
      renderer.domElement.style.opacity = reducedMotion.matches ? "0" : "1";
      dirty = true;
    };
    reducedMotion.addEventListener("change", motionChange);

    return () => {
      disposed = true;
      gsap.ticker.remove(render);
      window.removeEventListener("fason:dialog", modalListener);
      animations.forEach((animation) => animation.kill());
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      mouseInteraction.removeEventListener("change", resetInteraction);
      reducedMotion.removeEventListener("change", motionChange);
      resizeObserver.disconnect();
      photograph?.removeEventListener("load", resize);
      intersectionObserver.disconnect();
      uniforms.uTexture.value?.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={host}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  );
}
