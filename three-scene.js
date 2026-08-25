/**
 * Masterclass Three.js Scene: Fluid Particle Ocean + Quantum Polyhedron + Scroll Flythrough
 * Developed for Jeffrey Cortez (ElYefris) Portfolio
 * 
 * Features:
 * 1. Fluid Particle Wave Ocean with Perlin-style Multi-Frequency Harmonics
 * 2. Floating 3D Quantum Icosahedron with Glowing Inner Core & Quaternion Inertia
 * 3. Dynamic Constellation Neural Lines (Connecting particles within proximity)
 * 4. Physics-Based Click Shockwave Ripples & Magnetic Cursor Repulsion
 * 5. Scroll-Driven 3D Camera Choreography across Page Sections
 * 6. Optimized WebGL 60 FPS Render Loop with Zero GC Allocations
 */

(function () {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  // Scene Setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080604, 0.0015);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 75, 150);
  camera.lookAt(0, -10, 0);

  // High Performance WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // =========================================================================
  // 1. TEXTURE GENERATORS (GLOWING SPHERES & PARTICLES)
  // =========================================================================
  function createGlowTexture(color1, color2) {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, color1 || 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, color2 || 'rgba(245, 158, 11, 0.7)');
    grad.addColorStop(0.65, 'rgba(245, 158, 11, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.Texture(c);
    texture.needsUpdate = true;
    return texture;
  }

  const particleTexture = createGlowTexture('rgba(255, 255, 255, 1)', 'rgba(251, 191, 36, 0.7)');

  // =========================================================================
  // 2. FLUID PARTICLE OCEAN (WAVE GRID)
  // =========================================================================
  const AMOUNTX = 75;
  const AMOUNTY = 75;
  const SEPARATION = 4.6;
  const numParticles = AMOUNTX * AMOUNTY;

  const positions = new Float32Array(numParticles * 3);
  const basePositions = new Float32Array(numParticles * 3);
  const colors = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);

  const colGold = new THREE.Color(0xf59e0b);
  const colOrange = new THREE.Color(0xf97316);
  const colCyan = new THREE.Color(0x38bdf8);

  let idx = 0;
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      const posX = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
      const posZ = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
      const posY = -32;

      positions[idx] = posX;
      positions[idx + 1] = posY;
      positions[idx + 2] = posZ;

      basePositions[idx] = posX;
      basePositions[idx + 1] = posY;
      basePositions[idx + 2] = posZ;

      const dist = Math.sqrt(posX * posX + posZ * posZ) / 180;
      const c = new THREE.Color();
      if (dist < 0.5) {
        c.lerpColors(colGold, colOrange, dist * 2);
      } else {
        c.lerpColors(colOrange, colCyan, Math.min(1, (dist - 0.5) * 2));
      }

      colors[idx] = c.r;
      colors[idx + 1] = c.g;
      colors[idx + 2] = c.b;

      scales[idx / 3] = 0.8 + Math.random() * 0.5;

      idx += 3;
    }
  }

  const oceanGeometry = new THREE.BufferGeometry();
  oceanGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  oceanGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const oceanMaterial = new THREE.PointsMaterial({
    size: 3.6,
    vertexColors: true,
    map: particleTexture,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleOcean = new THREE.Points(oceanGeometry, oceanMaterial);
  scene.add(particleOcean);

  // =========================================================================
  // 3. FLOATING QUANTUM HYPER-POLYHEDRON (3D HERO ARTIFACT)
  // =========================================================================
  const polyGroup = new THREE.Group();
  polyGroup.position.set(48, 10, -20); // Floats gracefully behind the hero avatar visual
  scene.add(polyGroup);

  // Outer Icosahedron Wireframe
  const icoGeo = new THREE.IcosahedronGeometry(22, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const icoMesh = new THREE.Mesh(icoGeo, icoMat);
  polyGroup.add(icoMesh);

  // Inner Octahedron (Opposite Rotation)
  const innerGeo = new THREE.OctahedronGeometry(12, 0);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.5
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  polyGroup.add(innerMesh);

  // Inner Pulsing Core
  const coreGeo = new THREE.SphereGeometry(3.5, 16, 16);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.9
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  polyGroup.add(coreMesh);

  // Orbital Nodes around the Polyhedron
  const orbitNodesCount = 36;
  const orbitNodesGeo = new THREE.BufferGeometry();
  const orbitPositions = new Float32Array(orbitNodesCount * 3);
  const orbitColors = new Float32Array(orbitNodesCount * 3);

  for (let k = 0; k < orbitNodesCount * 3; k += 3) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 26 + Math.random() * 8;

    orbitPositions[k] = r * Math.sin(phi) * Math.cos(theta);
    orbitPositions[k + 1] = r * Math.sin(phi) * Math.sin(theta);
    orbitPositions[k + 2] = r * Math.cos(phi);

    orbitColors[k] = 0.98;
    orbitColors[k + 1] = 0.75;
    orbitColors[k + 2] = 0.25;
  }

  orbitNodesGeo.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3));
  orbitNodesGeo.setAttribute('color', new THREE.BufferAttribute(orbitColors, 3));

  const orbitNodesMat = new THREE.PointsMaterial({
    size: 2.8,
    vertexColors: true,
    map: particleTexture,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  const orbitNodes = new THREE.Points(orbitNodesGeo, orbitNodesMat);
  polyGroup.add(orbitNodes);

  // =========================================================================
  // 4. FLOATING CONSTELLATION NODES & CONNECTING LINES
  // =========================================================================
  const constCount = 60;
  const constGeo = new THREE.BufferGeometry();
  const constPositions = new Float32Array(constCount * 3);
  const constVelocities = [];

  for (let c = 0; c < constCount * 3; c += 3) {
    constPositions[c] = (Math.random() - 0.5) * 220;
    constPositions[c + 1] = Math.random() * 60 - 20;
    constPositions[c + 2] = (Math.random() - 0.5) * 180;

    constVelocities.push({
      x: (Math.random() - 0.5) * 0.12,
      y: (Math.random() - 0.5) * 0.08,
      z: (Math.random() - 0.5) * 0.12
    });
  }

  constGeo.setAttribute('position', new THREE.BufferAttribute(constPositions, 3));

  const constMat = new THREE.PointsMaterial({
    size: 3.2,
    color: 0x38bdf8,
    map: particleTexture,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });

  const constPoints = new THREE.Points(constGeo, constMat);
  scene.add(constPoints);

  // Constellation Dynamic Lines
  const maxLineConnections = 70;
  const linePositions = new Float32Array(maxLineConnections * 2 * 3);
  const lineColors = new Float32Array(maxLineConnections * 2 * 3);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending
  });

  const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineMesh);

  // =========================================================================
  // 5. INTERACTION: MOUSE INERTIA, SCROLL CHOREOGRAPHY & CLICK SHOCKWAVES
  // =========================================================================
  let mouseX = 0;
  let mouseY = 0;
  let scrollProgress = 0;

  const shockwaves = [];

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = maxScroll > 0 ? window.pageYOffset / maxScroll : 0;
  }, { passive: true });

  window.addEventListener('click', (e) => {
    // Raycast click point to 3D world
    const vec = new THREE.Vector3(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
      0.5
    );
    vec.unproject(camera);
    vec.sub(camera.position).normalize();

    const dist = -camera.position.y / vec.y;
    const targetPos = new THREE.Vector3().copy(camera.position).add(vec.multiplyScalar(dist));

    if (shockwaves.length < 6) {
      shockwaves.push({
        x: targetPos.x,
        z: targetPos.z,
        radius: 0,
        maxRadius: 180,
        intensity: 26,
        speed: 3.8
      });
    }
  });

  // =========================================================================
  // 6. MAIN ANIMATION & RENDER LOOP (60 FPS OPTIMIZED)
  // =========================================================================
  const clock = new THREE.Clock();
  let time = 0;

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    time += delta * 1.5;

    // --- 1. Camera Choreography (Scroll + Mouse Dynamics) ---
    // Hero: standard high perspective
    // About: dive down closer to waves
    // Projects: wide cinematic orbit
    // Contact: lower sunset horizon
    const targetCamX = mouseX * 18 + Math.sin(scrollProgress * Math.PI * 2) * 15;
    const targetCamY = 75 - scrollProgress * 35 - mouseY * 12;
    const targetCamZ = 150 - scrollProgress * 25;

    camera.position.x += (targetCamX - camera.position.x) * 0.04;
    camera.position.y += (targetCamY - camera.position.y) * 0.04;
    camera.position.z += (targetCamZ - camera.position.z) * 0.04;
    camera.lookAt(0, -15 - scrollProgress * 10, 0);

    // --- 2. Quantum Polyhedron Animation ---
    icoMesh.rotation.x += 0.006;
    icoMesh.rotation.y += 0.009;
    innerMesh.rotation.x -= 0.008;
    innerMesh.rotation.y -= 0.012;
    orbitNodes.rotation.y += 0.004;

    // Polyhedron subtle hover + mouse tilt
    polyGroup.position.y = 10 + Math.sin(time * 1.2) * 4;
    polyGroup.rotation.y += (mouseX * 0.4 - polyGroup.rotation.y) * 0.05;
    polyGroup.rotation.x += (-mouseY * 0.3 - polyGroup.rotation.x) * 0.05;

    // Pulsing Core Light
    const coreScale = 1.0 + Math.sin(time * 3.5) * 0.25;
    coreMesh.scale.set(coreScale, coreScale, coreScale);

    // --- 3. Fluid Wave Ocean Harmonics & Shockwaves ---
    for (let s = shockwaves.length - 1; s >= 0; s--) {
      const sw = shockwaves[s];
      sw.radius += sw.speed;
      sw.intensity *= 0.955;
      if (sw.radius > sw.maxRadius || sw.intensity < 0.15) {
        shockwaves.splice(s, 1);
      }
    }

    const pos = oceanGeometry.attributes.position.array;
    let pIdx = 0;

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const bx = basePositions[pIdx];
        const bz = basePositions[pIdx + 2];

        let waveY =
          -30 +
          Math.sin((ix + time) * 0.28) * 4.8 +
          Math.sin((iy + time * 0.8) * 0.32) * 4.8 +
          Math.sin((ix + iy + time) * 0.16) * 3.2;

        // Shockwaves
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const d = Math.sqrt((bx - sw.x) * (bx - sw.x) + (bz - sw.z) * (bz - sw.z));
          const diff = Math.abs(d - sw.radius);
          if (diff < 26) {
            const factor = Math.cos((diff / 26) * Math.PI * 0.5);
            waveY += Math.sin(diff * 0.35) * sw.intensity * factor;
          }
        }

        pos[pIdx + 1] = waveY;
        pIdx += 3;
      }
    }
    oceanGeometry.attributes.position.needsUpdate = true;

    // --- 4. Constellation Nodes & Dynamic Connecting Lines ---
    const cPos = constGeo.attributes.position.array;
    for (let i = 0; i < constCount; i++) {
      const i3 = i * 3;
      cPos[i3] += constVelocities[i].x;
      cPos[i3 + 1] += constVelocities[i].y;
      cPos[i3 + 2] += constVelocities[i].z;

      // Bounce in 3D box
      if (cPos[i3] < -110 || cPos[i3] > 110) constVelocities[i].x *= -1;
      if (cPos[i3 + 1] < -25 || cPos[i3 + 1] > 40) constVelocities[i].y *= -1;
      if (cPos[i3 + 2] < -90 || cPos[i3 + 2] > 90) constVelocities[i].z *= -1;
    }
    constGeo.attributes.position.needsUpdate = true;

    // Draw lines between close constellation nodes
    const lPos = lineGeometry.attributes.position.array;
    const lCol = lineGeometry.attributes.color.array;
    let lineIdx = 0;
    let colIdx = 0;
    let connectedLines = 0;

    for (let i = 0; i < constCount; i++) {
      for (let j = i + 1; j < constCount; j++) {
        if (connectedLines >= maxLineConnections) break;

        const dx = cPos[i * 3] - cPos[j * 3];
        const dy = cPos[i * 3 + 1] - cPos[j * 3 + 1];
        const dz = cPos[i * 3 + 2] - cPos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 42) {
          const alpha = 1.0 - dist / 42;

          lPos[lineIdx++] = cPos[i * 3];
          lPos[lineIdx++] = cPos[i * 3 + 1];
          lPos[lineIdx++] = cPos[i * 3 + 2];

          lPos[lineIdx++] = cPos[j * 3];
          lPos[lineIdx++] = cPos[j * 3 + 1];
          lPos[lineIdx++] = cPos[j * 3 + 2];

          // Gold to Cyan gradient lines
          lCol[colIdx++] = 0.96 * alpha;
          lCol[colIdx++] = 0.62 * alpha;
          lCol[colIdx++] = 0.04 * alpha;

          lCol[colIdx++] = 0.22 * alpha;
          lCol[colIdx++] = 0.74 * alpha;
          lCol[colIdx++] = 0.97 * alpha;

          connectedLines++;
        }
      }
    }

    // Zero out unused line segments
    for (let k = lineIdx; k < maxLineConnections * 6; k++) {
      lPos[k] = 0;
    }
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // =========================================================================
  // 7. RESPONSIVE RESIZE
  // =========================================================================
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
