"use client";

import { useEffect, useRef } from "react";

/**
 * Scène WebGL du hero : le visuel du pack en relief (légère inclinaison au
 * pointeur), deux anneaux orbitaux et un champ de particules.
 * - Three.js est chargé à la demande (hors bundle initial).
 * - Repli automatique sur l'image 2D si WebGL est indisponible.
 * - Respecte prefers-reduced-motion (image fixe, pas d'animation).
 * - Pause hors écran et onglet masqué ; pixel ratio plafonné.
 */
export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const hero = host?.parentElement;
    const target = hero?.querySelector<HTMLElement>("[data-hero-visual]");
    if (!host || !hero || !target) return;

    let disposed = false;
    let cleanup: () => void = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoundedBoxGeometry } = await import(
        "three/examples/jsm/geometries/RoundedBoxGeometry.js"
      );
      if (disposed) return;

      const canvas = document.createElement("canvas");
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch {
        return; // WebGL indisponible : l'image 2D reste affichée
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      host.appendChild(canvas);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.z = 9;

      scene.add(new THREE.AmbientLight(0x7fb8ff, 0.9));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(3, 4, 5);
      scene.add(key);
      const glow = new THREE.PointLight(0x55bdff, 30, 14);
      glow.position.set(-3, -1, 3);
      scene.add(glow);

      /* --- Pack : cadre métal + visuel recto/verso --- */
      const anchor = new THREE.Group(); // position/échelle calées sur le DOM
      const card = new THREE.Group(); // animation
      anchor.add(card);
      scene.add(anchor);

      const frameGeo = new RoundedBoxGeometry(1.74, 3.06, 0.16, 5, 0.09);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x0b1a2c, metalness: 0.55, roughness: 0.35 });
      card.add(new THREE.Mesh(frameGeo, frameMat));

      const faceGeo = new THREE.PlaneGeometry(1.6, 2.84);
      const faceMat = new THREE.MeshBasicMaterial({ color: 0x0a1626, toneMapped: false });
      const front = new THREE.Mesh(faceGeo, faceMat);
      front.position.z = 0.082;
      const back = new THREE.Mesh(faceGeo, faceMat);
      back.position.z = -0.082;
      back.rotation.y = Math.PI;
      card.add(front, back);

      /* --- Anneaux orbitaux --- */
      const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x6fd0ff, transparent: true, opacity: 0.55 });
      const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x9be6ff, transparent: true, opacity: 0.25 });
      const ringGeo1 = new THREE.TorusGeometry(2.0, 0.009, 8, 180);
      const ringGeo2 = new THREE.TorusGeometry(2.45, 0.006, 8, 180);
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring1.rotation.set(1.15, 0.2, 0.5);
      ring2.rotation.set(1.35, -0.3, -0.4);
      const orbGeo = new THREE.SphereGeometry(0.055, 16, 16);
      const orb = new THREE.Mesh(orbGeo, new THREE.MeshBasicMaterial({ color: 0xd8f6ff }));
      orb.position.set(2.0, 0, 0);
      ring1.add(orb);
      anchor.add(ring1, ring2);

      /* --- Particules (espace normalisé, calé sur la fenêtre à chaque resize) --- */
      const count = window.innerWidth < 700 ? 420 : 900;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const speed = new Float32Array(count);
      const ice = new THREE.Color(0x9be6ff);
      const electric = new THREE.Color(0x55bdff);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = Math.random() - 0.5;
        pos[i * 3 + 1] = Math.random() - 0.5;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
        speed[i] = 0.004 + Math.random() * 0.012;
        const c = ice.clone().lerp(electric, Math.random());
        col.set([c.r, c.g, c.b], i * 3);
      }
      const ptsGeo = new THREE.BufferGeometry();
      ptsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      ptsGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));

      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 32;
      const sctx = sprite.getContext("2d")!;
      const grad = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.35, "rgba(255,255,255,.55)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 32, 32);
      const spriteTex = new THREE.CanvasTexture(sprite);
      const ptsMat = new THREE.PointsMaterial({
        size: 0.075,
        map: spriteTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(ptsGeo, ptsMat);
      scene.add(points);

      /* --- Texture du visuel --- */
      let faceTex: import("three").Texture | undefined;
      new THREE.TextureLoader().load("/media/hero-portrait.webp", (tex) => {
        if (disposed) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        faceTex = tex;
        faceMat.map = tex;
        faceMat.color.set(0xffffff);
        faceMat.needsUpdate = true;
        hero.classList.add("has-3d");
        renderOnce();
      });

      /* --- Mise en page : la scène suit le bloc visuel du DOM --- */
      const pointer = { x: 0, y: 0 };
      function layout() {
        const hr = host!.getBoundingClientRect();
        const w = Math.max(hr.width, 1);
        const h = Math.max(hr.height, 1);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const vh = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        const vw = vh * camera.aspect;
        const r = target!.getBoundingClientRect();
        const cx = (r.left + r.width / 2 - hr.left) / w;
        const cy = (r.top + r.height / 2 - hr.top) / h;
        anchor.position.set((cx - 0.5) * vw, (0.5 - cy) * vh, 0);
        const s = Math.min(((r.height * 0.74) / h) * vh / 3.06, ((r.width * 0.62) / w) * vw / 1.74);
        anchor.scale.setScalar(Math.max(s, 0.01));
        points.scale.set(vw * 1.2, vh * 1.2, 1);
      }

      function renderOnce() {
        if (reduceMotion) {
          card.rotation.set(0, 0.28, 0);
          ring1.rotation.z = 0.5;
          renderer.render(scene, camera);
        }
      }

      const onMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };

      let raf = 0;
      let visible = true;
      let last = performance.now();
      let t = 0;
      function frame(now: number) {
        raf = 0;
        if (disposed || !visible || document.hidden || reduceMotion) return;
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        t += dt;

        card.rotation.y += (Math.sin(t * 0.55) * 0.32 + pointer.x * 0.35 - card.rotation.y) * 0.06;
        card.rotation.x += (Math.sin(t * 0.4) * 0.05 - pointer.y * 0.18 - card.rotation.x) * 0.06;
        card.position.y = Math.sin(t * 0.9) * 0.07;
        ring1.rotation.z += dt * 0.22;
        ring2.rotation.z -= dt * 0.12;

        const p = ptsGeo.attributes.position as import("three").BufferAttribute;
        for (let i = 0; i < count; i++) {
          let y = p.getY(i) + speed[i] * dt;
          if (y > 0.5) y -= 1;
          p.setY(i, y);
        }
        p.needsUpdate = true;
        points.position.x += (pointer.x * 0.22 - points.position.x) * 0.04;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      }
      function start() {
        if (reduceMotion || raf) return;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      });
      io.observe(hero);
      const ro = new ResizeObserver(() => {
        layout();
        renderOnce();
      });
      ro.observe(hero);
      ro.observe(target);
      const onVisibility = () => !document.hidden && start();
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("pointermove", onMove, { passive: true });
      layout();
      start();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pointermove", onMove);
        hero.classList.remove("has-3d");
        [frameGeo, faceGeo, ringGeo1, ringGeo2, orbGeo, ptsGeo].forEach((g) => g.dispose());
        [frameMat, faceMat, ringMat1, ringMat2, ptsMat].forEach((m) => m.dispose());
        spriteTex.dispose();
        faceTex?.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} className="hero-scene" aria-hidden="true" />;
}
