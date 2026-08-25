/**
 * Three.js Interactive 3D Background Scene for ElYefris Portfolio
 * Features: Undulating particle field, glowing amber/cyan constellation nodes,
 * and mouse-driven parallax interaction.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 75;
  camera.position.y = 20;
  camera.rotation.x = -0.25;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particle Wave Grid Parameters
  const countX = 90;
  const countY = 60;
  const numParticles = countX * countY;
  const separation = 2.4;

  const positions = new Float32Array(numParticles * 3);
  const colors = new Float32Array(numParticles * 3);

  // Palette: Warm Amber, Golden Yellow, and Subtle Cyan Highlights
  const colorAmber = new THREE.Color(0xf59e0b); // #f59e0b
  const colorGold = new THREE.Color(0xfbbf24);  // #fbbf24
  const colorCyan = new THREE.Color(0x38bdf8);  // #38bdf8
  const colorDark = new THREE.Color(0x78350f);  // #78350f

  let i = 0;
  let i3 = 0;
  for (let ix = 0; ix < countX; ix++) {
    for (let iy = 0; iy < countY; iy++) {
      // Centered grid
      positions[i3] = (ix - countX / 2) * separation;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = (iy - countY / 2) * separation;

      // Distance from center for radial color gradient
      const distX = (ix - countX / 2) / (countX / 2);
      const distY = (iy - countY / 2) / (countY / 2);
      const dist = Math.sqrt(distX * distX + distY * distY);

      let particleColor = new THREE.Color();
      if (dist < 0.35) {
        particleColor.lerpColors(colorGold, colorAmber, Math.random());
      } else if (dist < 0.7) {
        particleColor.lerpColors(colorAmber, colorDark, Math.random());
      } else {
        particleColor.lerpColors(colorDark, colorCyan, Math.random() * 0.4);
      }

      colors[i3] = particleColor.r;
      colors[i3 + 1] = particleColor.g;
      colors[i3 + 2] = particleColor.b;

      i++;
      i3 += 3;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Custom circular soft glow texture for particles
  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(251, 191, 36, 0.9)');
    gradient.addColorStop(0.7, 'rgba(245, 158, 11, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  const material = new THREE.PointsMaterial({
    size: 1.4,
    vertexColors: true,
    map: createParticleTexture(),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Floating ambient cyber constellation nodes
  const starCount = 120;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  const starCols = new Float32Array(starCount * 3);

  for (let s = 0; s < starCount * 3; s += 3) {
    starPos[s] = (Math.random() - 0.5) * 220;
    starPos[s + 1] = Math.random() * 80 - 10;
    starPos[s + 2] = (Math.random() - 0.5) * 160;

    const starColor = Math.random() > 0.3 ? colorGold : colorCyan;
    starCols[s] = starColor.r;
    starCols[s + 1] = starColor.g;
    starCols[s + 2] = starColor.b;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));

  const starMat = new THREE.PointsMaterial({
    size: 1.8,
    vertexColors: true,
    map: createParticleTexture(),
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
  });

  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // Mouse Interactivity
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', function (event) {
    mouseX = (event.clientX - windowHalfX) * 0.04;
    mouseY = (event.clientY - windowHalfY) * 0.04;
  }, { passive: true });

  // Touch Support
  document.addEventListener('touchmove', function (event) {
    if (event.touches.length > 0) {
      mouseX = (event.touches[0].clientX - windowHalfX) * 0.04;
      mouseY = (event.touches[0].clientY - windowHalfY) * 0.04;
    }
  }, { passive: true });

  // Resize Listener
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Animation Loop
  let step = 0;
  let isVisible = true;

  document.addEventListener('visibilitychange', function () {
    isVisible = !document.hidden;
  });

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    step += 0.035;

    // Smooth camera mouse follow
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    camera.position.x = targetX * 0.4;
    camera.position.y = 20 - targetY * 0.2;
    camera.lookAt(scene.position);

    // Wave computation for particle surface
    const pos = geometry.attributes.position.array;
    let index = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iy = 0; iy < countY; iy++) {
        pos[index + 1] =
          Math.sin((ix + step) * 0.3) * 3 +
          Math.sin((iy + step) * 0.4) * 3 +
          Math.sin((ix + iy + step) * 0.2) * 2;
        index += 3;
      }
    }
    geometry.attributes.position.needsUpdate = true;

    // Slowly rotate floating constellation
    stars.rotation.y = step * 0.03;

    renderer.render(scene, camera);
  }

  animate();
})();
