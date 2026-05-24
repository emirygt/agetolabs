'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { useLanguage } from '@/components/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
 * REFS
 * ============================================================ */

type MeteorState = {
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
};

type ThreeRefs = {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  earth: THREE.Group | null;
  meteorMesh: THREE.LineSegments | null;
  meteorStates: MeteorState[];
  scrollProgressVal: number;
  animationId: number | null;
  targetCameraX?: number;
  targetCameraY?: number;
  targetCameraZ?: number;
};

const METEOR_COUNT = 60;
const EARTH_POS = new THREE.Vector3(0, 5, -1100);

/* ============================================================
 * COMPONENT
 * ============================================================ */

export const Component: React.FC = () => {
  const { t } = useLanguage();

  const SECTIONS = [
    {
      title: t('horizon_s0_title'),
      line1: t('horizon_s0_line1'),
      line2: t('horizon_s0_line2'),
    },
    {
      title: t('horizon_s1_title'),
      line1: t('horizon_s1_line1'),
      line2: t('horizon_s1_line2'),
    },
    {
      title: t('horizon_s2_title'),
      line1: t('horizon_s2_line1'),
      line2: t('horizon_s2_line2'),
    },
    {
      title: t('horizon_s3_title'),
      line1: t('horizon_s3_line1'),
      line2: t('horizon_s3_line2'),
    },
    {
      title: t('horizon_s4_title'),
      line1: t('horizon_s4_line1'),
      line2: t('horizon_s4_line2'),
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const brandIntroRef = useRef<HTMLDivElement | null>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 200 });

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [brandIntroDone, setBrandIntroDone] = useState<boolean>(false);
  // total transitions between sections = SECTIONS.length - 1
  const totalSections = SECTIONS.length - 1;

  const threeRefs = useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    earth: null,
    meteorMesh: null,
    meteorStates: [],
    scrollProgressVal: 0,
    animationId: null,
  });

  useEffect(() => {
    const initThree = () => {
      const refs = threeRefs.current;

      refs.scene = new THREE.Scene();
      // pure black space — brand palette
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.0002);

      refs.camera = new THREE.PerspectiveCamera(
        72,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
      );
      refs.camera.position.set(0, 30, 200);

      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true,
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.55;

      refs.composer = new EffectComposer(refs.renderer);
      refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
      refs.composer.addPass(
        new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          1.0,
          0.5,
          0.78
        )
      );

      createStarField();
      createNebula();
      createMeteors();
      createEarth();
      animate();
      setIsReady(true);
    };

    /* ----- STARS ----- */
    const createStarField = () => {
      const refs = threeRefs.current;
      const starCount = 4500;

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 300 + Math.random() * 1100;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          // brand palette — white stars only, varying brightness, occasional mint accent
          const c = new THREE.Color();
          const ch = Math.random();
          if (ch < 0.94) {
            const lum = 0.7 + Math.random() * 0.3;
            c.setRGB(lum, lum, lum);
          } else {
            // rare mint accent star
            c.setHSL(0.38, 0.45, 0.78);
          }
          colors[j * 3] = c.r;
          colors[j * 3 + 1] = c.g;
          colors[j * 3 + 2] = c.b;

          sizes[j] = 0.6 + Math.random() * 2.2;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: { time: { value: 0 }, depth: { value: i } },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            void main() {
              vColor = color;
              vec3 pos = position;
              float angle = time * 0.04 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              vec4 mv = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mv.z);
              gl_Position = projectionMatrix * mv;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            void main() {
              float d = length(gl_PointCoord - vec2(0.5));
              if (d > 0.5) discard;
              float a = 1.0 - smoothstep(0.0, 0.5, d);
              gl_FragColor = vec4(vColor, a);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene!.add(stars);
        refs.stars.push(stars);
      }
    };

    /* ----- NEBULA (subtle backdrop) ----- */
    const createNebula = () => {
      const refs = threeRefs.current;
      const geometry = new THREE.PlaneGeometry(8000, 4000, 80, 80);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          // brand palette — deep black → mint, no blue/purple
          color1: { value: new THREE.Color('#000000') },
          color2: { value: new THREE.Color('#1f6b4a') },
          opacity: { value: 0.28 },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 15.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          void main() {
            float m = sin(vUv.x * 9.0 + time * 0.4) * cos(vUv.y * 9.0 + time * 0.4);
            vec3 col = mix(color1, color2, m * 0.5 + 0.5);
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            gl_FragColor = vec4(col, max(alpha, 0.0));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1500;
      refs.scene!.add(nebula);
      refs.nebula = nebula;
    };

    /* ----- METEORS — streaking line segments ----- */
    const spawnMeteor = (i: number, positions: Float32Array, colors: Float32Array, states: MeteorState[]) => {
      // spawn far away, mostly off-screen, moving diagonally through view
      const sx = (Math.random() - 0.5) * 1600 - 200; // bias toward left side
      const sy = (Math.random() - 0.2) * 700;
      const sz = -400 + Math.random() * 350; // somewhere between camera and earth
      // velocity: mostly rightward and slightly forward
      const vx = 4 + Math.random() * 6;
      const vy = -0.5 - Math.random() * 0.8;
      const vz = 1.5 + Math.random() * 2.5;
      const trail = 14 + Math.random() * 18;

      positions[i * 6 + 0] = sx;
      positions[i * 6 + 1] = sy;
      positions[i * 6 + 2] = sz;
      positions[i * 6 + 3] = sx - vx * trail;
      positions[i * 6 + 4] = sy - vy * trail;
      positions[i * 6 + 5] = sz - vz * trail;

      // head: hot white-yellow, tail: fades to transparent
      colors[i * 6 + 0] = 1.0;
      colors[i * 6 + 1] = 0.95;
      colors[i * 6 + 2] = 0.85;
      colors[i * 6 + 3] = 1.0;
      colors[i * 6 + 4] = 0.6;
      colors[i * 6 + 5] = 0.3;

      states[i] = {
        vx,
        vy,
        vz,
        life: 0,
        maxLife: 1.0 + Math.random() * 1.5,
      };
    };

    const createMeteors = () => {
      const refs = threeRefs.current;
      const positions = new Float32Array(METEOR_COUNT * 6);
      const colors = new Float32Array(METEOR_COUNT * 6);
      const states: MeteorState[] = [];

      for (let i = 0; i < METEOR_COUNT; i++) {
        spawnMeteor(i, positions, colors, states);
        // randomize initial life so they're spread in time
        states[i].life = Math.random() * states[i].maxLife;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
      );
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        linewidth: 1,
      });

      const mesh = new THREE.LineSegments(geometry, material);
      refs.scene!.add(mesh);
      refs.meteorMesh = mesh;
      refs.meteorStates = states;
    };

    /* ----- EARTH — procedural blue/green sphere with atmosphere ----- */
    const createEarth = () => {
      const refs = threeRefs.current;
      const group = new THREE.Group();

      // surface
      const surfaceGeom = new THREE.SphereGeometry(85, 96, 96);
      const surfaceMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec3 vPos;
          varying vec3 vNormal;
          void main() {
            vPos = position;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vPos;
          varying vec3 vNormal;
          uniform float uTime;

          float hash(vec3 p) {
            return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
          }
          float noise(vec3 p) {
            vec3 i = floor(p);
            vec3 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                  mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
              mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                  mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
              f.z);
          }
          float fbm(vec3 p) {
            float v = 0.0;
            float amp = 0.55;
            for (int i = 0; i < 5; i++) {
              v += amp * noise(p);
              p *= 2.05;
              amp *= 0.5;
            }
            return v;
          }
          void main() {
            // realistic Earth — varied continents over deep blue oceans
            float n = fbm(vPos * 0.018);

            // deep oceans (abyssal → shallow shelves)
            vec3 oceanDeep    = vec3(0.012, 0.035, 0.10);
            vec3 oceanShallow = vec3(0.06,  0.22,  0.45);
            vec3 ocean = mix(oceanDeep, oceanShallow, n);

            // land — green forests blending into warm sand/rock at high elevation
            vec3 forest = vec3(0.10, 0.30, 0.14);
            vec3 arid   = vec3(0.45, 0.38, 0.20);
            float elev  = fbm(vPos * 0.05 + 0.5);
            vec3 land   = mix(forest, arid, smoothstep(0.42, 0.68, elev));

            // polar ice caps
            float polar = smoothstep(0.55, 0.85, abs(vPos.y) / 85.0);
            land  = mix(land,  vec3(0.92, 0.95, 0.98), polar * 0.85);
            ocean = mix(ocean, vec3(0.85, 0.92, 0.96), polar * 0.6);

            float landMask = smoothstep(0.50, 0.56, n);
            vec3 col = mix(ocean, land, landMask);

            // clouds — soft, slowly drifting
            float clouds = smoothstep(0.55, 0.78,
              fbm(vPos * 0.04 + vec3(uTime * 0.005, 0.0, uTime * 0.003))
            );
            col = mix(col, vec3(0.96, 0.97, 1.0), clouds * 0.55);

            // sun direction (top-right)
            vec3 sunDir = normalize(vec3(0.8, 0.4, 0.6));
            float lit = max(dot(vNormal, sunDir), 0.0);
            float night = pow(1.0 - lit, 2.5);
            col *= lit * 0.95 + 0.06;

            // warm city lights on night side (real Earth at night)
            float city = smoothstep(0.6, 0.78, fbm(vPos * 0.07)) * night;
            col += vec3(1.0, 0.78, 0.42) * city * 0.65;

            gl_FragColor = vec4(col, 1.0);
          }
        `,
      });
      const surface = new THREE.Mesh(surfaceGeom, surfaceMat);
      group.add(surface);

      // inner atmosphere haze
      const atmInnerGeom = new THREE.SphereGeometry(89, 64, 64);
      const atmInnerMat = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.62 - dot(vNormal, vec3(0,0,1)), 2.5);
            // realistic blue-white limb (Earth from orbit)
            vec3 col = mix(vec3(0.20, 0.45, 0.85), vec3(0.85, 0.95, 1.0), intensity);
            gl_FragColor = vec4(col * intensity, intensity * 0.85);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });
      group.add(new THREE.Mesh(atmInnerGeom, atmInnerMat));

      // outer atmosphere glow — cool cyan-blue, realistic Rayleigh scattering
      const atmOuterGeom = new THREE.SphereGeometry(100, 48, 48);
      const atmOuterMat = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.6 - dot(vNormal, vec3(0,0,1)), 3.0);
            gl_FragColor = vec4(vec3(0.35, 0.60, 1.0) * intensity, intensity * 0.45);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });
      group.add(new THREE.Mesh(atmOuterGeom, atmOuterMat));

      group.position.copy(EARTH_POS);
      group.rotation.z = -0.18; // axial tilt
      refs.scene!.add(group);
      refs.earth = group;
    };

    /* ----- ANIMATE LOOP ----- */
    let lastTime = performance.now();
    const animate = () => {
      const refs = threeRefs.current;
      refs.animationId = requestAnimationFrame(animate);

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05); // clamp to avoid jumps
      lastTime = now;
      const time = now * 0.001;

      refs.stars.forEach((s) => {
        const mat = s.material as THREE.ShaderMaterial;
        if (mat.uniforms) mat.uniforms.time.value = time;
      });

      if (refs.nebula) {
        const mat = refs.nebula.material as THREE.ShaderMaterial;
        if (mat.uniforms) mat.uniforms.time.value = time * 0.4;
      }

      // Earth rotation around its own axis + shader time
      if (refs.earth) {
        refs.earth.rotation.y += dt * 0.18;
        const surfaceMesh = refs.earth.children[0] as THREE.Mesh;
        const surfMat = surfaceMesh.material as THREE.ShaderMaterial;
        if (surfMat.uniforms) surfMat.uniforms.uTime.value = time;
      }

      // Meteors — update positions, recycle expired ones
      if (refs.meteorMesh) {
        const posAttr = refs.meteorMesh.geometry.getAttribute(
          'position'
        ) as THREE.BufferAttribute;
        const colAttr = refs.meteorMesh.geometry.getAttribute(
          'color'
        ) as THREE.BufferAttribute;
        const posArr = posAttr.array as Float32Array;
        const colArr = colAttr.array as Float32Array;

        // meteor density curve across the 5-section journey:
        // sparse in deep space → peak in meteor field → fades as Earth approaches
        const p = refs.scrollProgressVal;
        const density =
          p < 0.5
            ? Math.min(1, p / 0.3)
            : Math.max(0.08, 1.0 - (p - 0.5) / 0.35);

        for (let i = 0; i < METEOR_COUNT; i++) {
          const st = refs.meteorStates[i];
          st.life += dt;

          // hide low-density meteors by making them transparent
          const visible = i / METEOR_COUNT < density;

          if (st.life > st.maxLife || !visible) {
            if (visible) {
              spawnMeteor(i, posArr, colArr, refs.meteorStates);
              st.life = 0;
            } else {
              // park off-screen
              for (let k = 0; k < 6; k++) posArr[i * 6 + k] = 100000;
            }
            continue;
          }

          // advance head
          posArr[i * 6 + 0] += st.vx;
          posArr[i * 6 + 1] += st.vy;
          posArr[i * 6 + 2] += st.vz;
          // trail = head - velocity * trailLen
          const trail = 14;
          posArr[i * 6 + 3] = posArr[i * 6 + 0] - st.vx * trail;
          posArr[i * 6 + 4] = posArr[i * 6 + 1] - st.vy * trail;
          posArr[i * 6 + 5] = posArr[i * 6 + 2] - st.vz * trail;
        }
        posAttr.needsUpdate = true;
      }

      // Camera with smoothing + subtle float
      if (refs.camera && refs.targetCameraX !== undefined) {
        const k = 0.05;
        smoothCameraPos.current.x +=
          (refs.targetCameraX! - smoothCameraPos.current.x) * k;
        smoothCameraPos.current.y +=
          (refs.targetCameraY! - smoothCameraPos.current.y) * k;
        smoothCameraPos.current.z +=
          (refs.targetCameraZ! - smoothCameraPos.current.z) * k;

        const fx = Math.sin(time * 0.1) * 2;
        const fy = Math.cos(time * 0.13) * 1;
        refs.camera.position.x = smoothCameraPos.current.x + fx;
        refs.camera.position.y = smoothCameraPos.current.y + fy;
        refs.camera.position.z = smoothCameraPos.current.z;

        // look at Earth as we approach — fully locked on by progress ~0.85
        const lookBlend = Math.min(
          1,
          Math.max(0, (refs.scrollProgressVal - 0.55) / 0.30)
        );
        const lookTarget = new THREE.Vector3().lerpVectors(
          new THREE.Vector3(0, 15, -600),
          EARTH_POS,
          lookBlend
        );
        refs.camera.lookAt(lookTarget);
      }

      if (refs.composer) refs.composer.render();
    };

    initThree();

    const handleResize = () => {
      const refs = threeRefs.current;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      const refs = threeRefs.current;
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);

      refs.stars.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
      }
      if (refs.meteorMesh) {
        refs.meteorMesh.geometry.dispose();
        (refs.meteorMesh.material as THREE.Material).dispose();
      }
      if (refs.earth) {
        refs.earth.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const m = obj as THREE.Mesh;
            m.geometry.dispose();
            (m.material as THREE.Material).dispose();
          }
        });
      }
      if (refs.renderer) refs.renderer.dispose();
    };
  }, []);

  /* ----- BRAND INTRO — AGETOLABS TEKNOLOJİ splash before everything else ----- */
  useEffect(() => {
    const wrap = brandIntroRef.current;
    if (!wrap) {
      setBrandIntroDone(true);
      return;
    }

    const logo = wrap.querySelector('.brand-intro-logo');
    const tag = wrap.querySelector('.brand-intro-tag');

    const tl = gsap.timeline({
      onComplete: () => setBrandIntroDone(true),
    });

    tl.from(logo, {
        y: 40,
        duration: 0.55,
        ease: 'power3.out',
      })
      .from(
        tag,
        { y: 18, duration: 0.4, ease: 'power3.out' },
        '-=0.3'
      )
      .to({}, { duration: 0.5 })
      .to(wrap, {
        autoAlpha: 0,
        duration: 0.45,
        ease: 'power2.in',
      });

    return () => {
      tl.kill();
    };
  }, []);

  /* ----- GSAP intro ----- */
  useEffect(() => {
    if (!brandIntroDone) return;
    gsap.set(
      [menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current],
      { visibility: 'visible' }
    );
    const tl = gsap.timeline();
    if (menuRef.current) {
      tl.from(menuRef.current, { x: -100, opacity: 0, duration: 1, ease: 'power3.out' });
    }
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.title-char');
      tl.from(
        chars,
        { y: 200, opacity: 0, duration: 1.5, stagger: 0.05, ease: 'power4.out' },
        '-=0.5'
      );
    }
    if (subtitleRef.current) {
      const lines = subtitleRef.current.querySelectorAll('.subtitle-line');
      tl.from(
        lines,
        { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
        '-=0.8'
      );
    }
    if (scrollProgressRef.current) {
      tl.from(
        scrollProgressRef.current,
        { opacity: 0, y: 50, duration: 1, ease: 'power2.out' },
        '-=0.5'
      );
    }
    return () => {
      tl.kill();
    };
  }, [isReady]);

  /* ----- LETTER SCATTER ON SCROLL — each char drifts in a random direction ----- */
  useEffect(() => {
    if (!brandIntroDone) return;
    const hero = containerRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const sectionEls = hero.querySelectorAll('.hero-content, .content-section');
      sectionEls.forEach((sectionEl) => {
        const chars = sectionEl.querySelectorAll('.title-char');
        const lines = sectionEl.querySelectorAll('.subtitle-line');

        chars.forEach((char) => {
          // pre-computed random vector per char — wide spread in every direction
          const angle = Math.random() * Math.PI * 2;
          const dist = 500 + Math.random() * 800;
          const tx = Math.cos(angle) * dist;
          const ty = Math.sin(angle) * dist;
          const rot = (Math.random() - 0.5) * 360;
          const scale = 0.3 + Math.random() * 0.6;

          gsap.set(char, { willChange: 'transform, opacity' });
          gsap.to(char, {
            x: tx,
            y: ty,
            rotation: rot,
            scale,
            opacity: 0,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

        lines.forEach((line) => {
          gsap.set(line, { willChange: 'transform, opacity' });
          gsap.to(line, {
            y: -160,
            opacity: 0,
            ease: 'power1.in',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      });

      // Refresh once layout is complete so triggers compute their pixel positions correctly
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [brandIntroDone]);

  /* ----- SCROLL — measured against hero's own height, NOT the full page ----- */
  useEffect(() => {
    const handleScroll = () => {
      const refs = threeRefs.current;
      const heroEl = containerRef.current;

      let progress = 0;
      if (heroEl) {
        const heroHeight = heroEl.offsetHeight;
        const heroTop = heroEl.offsetTop;
        const wh = window.innerHeight;
        const scrollY = window.scrollY;
        const heroScroll = scrollY - heroTop;
        // hero "completes" when its bottom touches the viewport bottom
        const heroMaxScroll = Math.max(1, heroHeight - wh);
        progress = Math.max(0, Math.min(heroScroll / heroMaxScroll, 1));
      }

      setScrollProgress(progress);
      const newSection = Math.min(
        Math.floor(progress * totalSections),
        totalSections
      );
      setCurrentSection(newSection);

      refs.scrollProgressVal = progress;

      const totalProgress = progress * totalSections;
      const sectionProgress = totalProgress % 1;

      // Camera flight path — 5 keyframes, ending tight on Earth so it fills the view
      const cameraPositions = [
        { x: 0, y: 30, z: 200 },    // S0 — deep space, anchored
        { x: 6, y: 28, z: 50 },     // S1 — entering meteor field
        { x: 12, y: 24, z: -250 },  // S2 — through meteor field
        { x: 6, y: 16, z: -650 },   // S3 — Earth visible, closing in
        { x: 0, y: 8, z: -995 },    // S4 — pressed against Earth, fills view
      ];
      const cur = cameraPositions[newSection] || cameraPositions[0];
      const next = cameraPositions[newSection + 1] || cur;
      refs.targetCameraX = cur.x + (next.x - cur.x) * sectionProgress;
      refs.targetCameraY = cur.y + (next.y - cur.y) * sectionProgress;
      refs.targetCameraZ = cur.z + (next.z - cur.z) * sectionProgress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections]);

  const splitTitle = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="title-char">
        {char === ' ' ? ' ' : char}
      </span>
    ));

  return (
    <div ref={containerRef} className="hero-container cosmos-style">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div ref={menuRef} className="side-menu" style={{ visibility: 'hidden' }}>
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="vertical-text">AGETOLABS</div>
      </div>

      <div className="hero-content cosmos-content">
        <div className="hero-tagline">{t('horizon_tagline')}</div>
        <h1 ref={titleRef} className="hero-title">
          {splitTitle(SECTIONS[0].title)}
        </h1>
        <div ref={subtitleRef} className="hero-subtitle cosmos-subtitle">
          <p className="subtitle-line">{SECTIONS[0].line1}</p>
          <p className="subtitle-line">{SECTIONS[0].line2}</p>
        </div>
      </div>

      <div
        ref={scrollProgressRef}
        className="scroll-progress"
        style={{ visibility: 'hidden' }}
      >
        <div className="scroll-text">SCROLL</div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="section-counter">
          {String(currentSection).padStart(2, '0')} /{' '}
          {String(totalSections).padStart(2, '0')}
        </div>
      </div>

      <div className="scroll-sections">
        {SECTIONS.slice(1).map((section, i) => (
          <section key={i} className="content-section">
            <h1 className="hero-title">{splitTitle(section.title)}</h1>
            <div className="hero-subtitle cosmos-subtitle">
              <p className="subtitle-line">{section.line1}</p>
              <p className="subtitle-line">{section.line2}</p>
            </div>
          </section>
        ))}
      </div>

      {/* Brand intro splash — covers the whole hero on first paint, fades out */}
      <div
        ref={brandIntroRef}
        className="brand-intro"
      >
        <div className="brand-intro-logo">AGETOLABS</div>
        <div className="brand-intro-tag">{t('brandIntroTag')}</div>
      </div>
    </div>
  );
};

export default Component;
