<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const props = defineProps<{
  sentinelData: {
    title: string;
    node: string;
    renderEngine: string;
    interaction: string;
    fps: string;
    ticks: {
      topLeft: string;
      topRight: string;
      bottomLeft: string;
      bottomRight: string;
    };
    subsystemStatus: string;
    chassis: string;
    telemetry: string;
  };
}>();

const containerRef = ref<HTMLDivElement | null>(null);

let animationFrameId: number | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;

onMounted(() => {
  if (!containerRef.value) return;

  const container = containerRef.value;
  scene = new THREE.Scene();

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || 450;
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0.8, 5.2);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const cyanLight = new THREE.DirectionalLight(0x06b6d4, 2.5);
  cyanLight.position.set(3, 4, 3);
  scene.add(cyanLight);

  const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
  rimLight.position.set(-3, 2, -2);
  scene.add(rimLight);

  const bottomLight = new THREE.PointLight(0x0891b2, 1.5, 8);
  bottomLight.position.set(0, -2, 1);
  scene.add(bottomLight);

  // Character Root Group
  const characterGroup = new THREE.Group();
  scene.add(characterGroup);

  // Materials
  const darkBodyMat = new THREE.MeshPhongMaterial({
    color: 0x181a20,
    specular: 0x334155,
    shininess: 40,
    flatShading: false,
  });

  const slateAccentMat = new THREE.MeshPhongMaterial({
    color: 0x222630,
    specular: 0x06b6d4,
    shininess: 60,
  });

  const cyanGlowMat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
  });

  const wireframeCyanMat = new THREE.MeshBasicMaterial({
    color: 0x0891b2,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });

  // 1. Head
  const headGroup = new THREE.Group();
  headGroup.position.y = 1.05;

  const headGeo = new THREE.BoxGeometry(0.85, 0.7, 0.75);
  const headMesh = new THREE.Mesh(headGeo, darkBodyMat);
  headGroup.add(headMesh);

  // Visor
  const visorGeo = new THREE.BoxGeometry(0.72, 0.18, 0.15);
  const visorMesh = new THREE.Mesh(visorGeo, cyanGlowMat);
  visorMesh.position.set(0, 0.05, 0.35);
  headGroup.add(visorMesh);

  // Visor pupils
  const eyeGeo = new THREE.BoxGeometry(0.12, 0.06, 0.05);
  const leftEye = new THREE.Mesh(eyeGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
  leftEye.position.set(-0.18, 0.05, 0.43);
  const rightEye = new THREE.Mesh(eyeGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
  rightEye.position.set(0.18, 0.05, 0.43);
  headGroup.add(leftEye);
  headGroup.add(rightEye);

  // Antenna
  const antGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
  const antMesh = new THREE.Mesh(antGeo, slateAccentMat);
  antMesh.position.set(0.3, 0.45, 0);
  antMesh.rotation.z = -0.2;
  const antTipGeo = new THREE.SphereGeometry(0.05, 8, 8);
  const antTip = new THREE.Mesh(antTipGeo, cyanGlowMat);
  antTip.position.set(0.35, 0.6, 0);
  headGroup.add(antMesh);
  headGroup.add(antTip);

  // Ears
  const earGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16);
  earGeo.rotateZ(Math.PI / 2);
  const leftEar = new THREE.Mesh(earGeo, slateAccentMat);
  leftEar.position.set(-0.45, 0, 0);
  const rightEar = new THREE.Mesh(earGeo, slateAccentMat);
  rightEar.position.set(0.45, 0, 0);
  headGroup.add(leftEar);
  headGroup.add(rightEar);

  characterGroup.add(headGroup);

  // 2. Neck
  const neckGeo = new THREE.CylinderGeometry(0.16, 0.2, 0.15, 12);
  const neckMesh = new THREE.Mesh(neckGeo, slateAccentMat);
  neckMesh.position.y = 0.62;
  characterGroup.add(neckMesh);

  // 3. Torso
  const torsoGroup = new THREE.Group();
  torsoGroup.position.y = 0.15;

  const torsoGeo = new THREE.BoxGeometry(0.95, 0.85, 0.65);
  const torsoMesh = new THREE.Mesh(torsoGeo, darkBodyMat);
  torsoGroup.add(torsoMesh);

  // Core
  const coreFrameGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 16);
  coreFrameGeo.rotateX(Math.PI / 2);
  const coreFrame = new THREE.Mesh(coreFrameGeo, slateAccentMat);
  coreFrame.position.set(0, 0.1, 0.32);
  torsoGroup.add(coreFrame);

  const coreGlowGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16);
  coreGlowGeo.rotateX(Math.PI / 2);
  const coreGlow = new THREE.Mesh(coreGlowGeo, cyanGlowMat);
  coreGlow.position.set(0, 0.1, 0.33);
  torsoGroup.add(coreGlow);

  // Telemetry slats
  for (let i = 0; i < 3; i++) {
    const slat = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.02, 0.02),
      cyanGlowMat
    );
    slat.position.set(0, -0.15 - i * 0.08, 0.33);
    torsoGroup.add(slat);
  }

  characterGroup.add(torsoGroup);

  // 4. Arms
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.7, 0.25, 0);
  const shoulderGeo = new THREE.SphereGeometry(0.16, 12, 12);
  const leftShoulder = new THREE.Mesh(shoulderGeo, slateAccentMat);
  leftArmGroup.add(leftShoulder);
  const armGeo = new THREE.BoxGeometry(0.18, 0.5, 0.2);
  const leftArm = new THREE.Mesh(armGeo, darkBodyMat);
  leftArm.position.y = -0.32;
  leftArmGroup.add(leftArm);
  const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.12), cyanGlowMat);
  leftHand.position.y = -0.62;
  leftArmGroup.add(leftHand);
  characterGroup.add(leftArmGroup);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.7, 0.25, 0);
  const rightShoulder = new THREE.Mesh(shoulderGeo, slateAccentMat);
  rightArmGroup.add(rightShoulder);
  const rightArm = new THREE.Mesh(armGeo, darkBodyMat);
  rightArm.position.y = -0.32;
  rightArmGroup.add(rightArm);
  const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.12), cyanGlowMat);
  rightHand.position.y = -0.62;
  rightArmGroup.add(rightHand);
  characterGroup.add(rightArmGroup);

  // 5. Thruster Base
  const pelvisGeo = new THREE.BoxGeometry(0.65, 0.25, 0.5);
  const pelvis = new THREE.Mesh(pelvisGeo, slateAccentMat);
  pelvis.position.y = -0.4;
  characterGroup.add(pelvis);

  const thrusterGeo = new THREE.ConeGeometry(0.25, 0.4, 16);
  thrusterGeo.rotateX(Math.PI);
  const thruster = new THREE.Mesh(thrusterGeo, slateAccentMat);
  thruster.position.y = -0.65;
  characterGroup.add(thruster);

  const jetGlowGeo = new THREE.ConeGeometry(0.16, 0.35, 16);
  jetGlowGeo.rotateX(Math.PI);
  const jetGlow = new THREE.Mesh(jetGlowGeo, cyanGlowMat);
  jetGlow.position.y = -0.75;
  characterGroup.add(jetGlow);

  // 6. Orbital Rings
  const ringGeo = new THREE.TorusGeometry(1.6, 0.015, 8, 48);
  const ringMesh = new THREE.Mesh(ringGeo, wireframeCyanMat);
  ringMesh.rotation.x = Math.PI / 2.3;
  characterGroup.add(ringMesh);

  const ring2Geo = new THREE.TorusGeometry(1.2, 0.01, 8, 40);
  const ring2Mesh = new THREE.Mesh(ring2Geo, cyanGlowMat);
  ring2Mesh.rotation.x = Math.PI / 1.8;
  ring2Mesh.rotation.y = 0.3;
  characterGroup.add(ring2Mesh);

  // 7. Particles
  const particlesGeo = new THREE.BufferGeometry();
  const particleCount = 40;
  const posArray = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 4;
    posArray[i + 1] = (Math.random() - 0.5) * 3 + 0.5;
    posArray[i + 2] = (Math.random() - 0.5) * 3;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMat = new THREE.PointsMaterial({
    size: 0.04,
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.7,
  });
  const particleSystem = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particleSystem);

  // Mouse interaction tracking
  let targetRotX = 0;
  let targetRotY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotY = normX * 0.45;
    targetRotX = -normY * 0.25;
  };

  window.addEventListener('mousemove', handleMouseMove);

  // Animation Loop
  const clock = new THREE.Clock();

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Floating hover levitation
    characterGroup.position.y = Math.sin(t * 1.8) * 0.12;

    // Gentle idle breathing / limb movement
    headGroup.rotation.y += (targetRotY * 1.2 - headGroup.rotation.y) * 0.08;
    headGroup.rotation.x += (targetRotX * 1.2 - headGroup.rotation.x) * 0.08;

    characterGroup.rotation.y += (targetRotY * 0.6 - characterGroup.rotation.y) * 0.05;
    characterGroup.rotation.x += (targetRotX * 0.4 - characterGroup.rotation.x) * 0.05;

    leftArmGroup.rotation.x = Math.sin(t * 1.6) * 0.08;
    rightArmGroup.rotation.x = -Math.sin(t * 1.6) * 0.08;

    // Orbital rings rotation
    ringMesh.rotation.z = t * 0.25;
    ring2Mesh.rotation.z = -t * 0.4;

    // Thruster pulse
    const pulse = 0.85 + Math.sin(t * 8) * 0.15;
    jetGlow.scale.set(pulse, pulse * 1.1, pulse);

    // Core pulse
    const corePulse = 0.95 + Math.sin(t * 4) * 0.15;
    coreGlow.scale.set(corePulse, 1, corePulse);

    // Particles drift
    particleSystem.rotation.y = t * 0.05;

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  };

  animate();

  const handleResize = () => {
    if (!container || !renderer || !camera) return;
    const newWidth = container.clientWidth || window.innerWidth;
    const newHeight = container.clientHeight || 450;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  };

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);

    if (renderer && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
      renderer.dispose();
    }
  });
});
</script>

<template>
  <section class="w-full px-4 lg:px-10 py-5 bg-[#0c0e11] border-b border-[#282a2d]/60">
    <div class="max-w-7xl mx-auto">
      <div class="relative w-full rounded-lg border border-[#3d494c]/60 bg-[#1a1c1f]/70 overflow-hidden shadow-2xl backdrop-blur-sm">
        <!-- Telemetry Header HUD Bar -->
        <div class="px-3 py-2.5 bg-[#1e2023] border-b border-[#3d494c]/40 flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
            <span class="font-mono text-[11px] text-[#4cd7f6] font-semibold tracking-wider">
              {{ sentinelData.title }}
            </span>
            <span class="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#282a2d] font-mono text-[10px] text-[#869397] border border-[#3d494c]/30">
              {{ sentinelData.node }}
            </span>
          </div>
          <div class="flex items-center gap-3 font-mono text-[10px] text-[#869397]">
            <span class="flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
              {{ sentinelData.renderEngine }}
            </span>
            <span class="hidden md:inline text-[#4cd7f6]">{{ sentinelData.interaction }}</span>
            <span class="hidden lg:inline text-[#3d494c]">|</span>
            <span class="hidden lg:inline text-[#869397] font-mono">{{ sentinelData.fps }}</span>
          </div>
        </div>

        <!-- 3D WebGL Canvas Viewport -->
        <div class="relative w-full overflow-hidden bg-gradient-to-b from-[#0c0e11] via-[#1a1c1f] to-[#0c0e11]">
          <!-- Corner grid ticks -->
          <div class="absolute top-3 left-3 font-mono text-[10px] text-[#869397]/50 pointer-events-none z-10 select-none">
            {{ sentinelData.ticks.topLeft }}
          </div>
          <div class="absolute top-3 right-3 font-mono text-[10px] text-[#869397]/50 pointer-events-none z-10 select-none">
            {{ sentinelData.ticks.topRight }}
          </div>
          <div class="absolute bottom-3 left-3 font-mono text-[10px] text-[#869397]/50 pointer-events-none z-10 select-none">
            {{ sentinelData.ticks.bottomLeft }}
          </div>
          <div class="absolute bottom-3 right-3 font-mono text-[10px] text-[#4cd7f6]/70 pointer-events-none z-10 select-none">
            {{ sentinelData.ticks.bottomRight }}
          </div>

          <div ref="containerRef" class="w-full h-[460px] md:h-[500px]" style="display: block;"></div>
        </div>

        <!-- Bottom Telemetry HUD Status Footer -->
        <div class="px-3 py-2 bg-[#0c0e11] border-t border-[#3d494c]/40 flex flex-wrap items-center justify-between text-[#bcc9cd] font-mono text-[10px]">
          <div class="flex items-center gap-3">
            <span class="text-[#4edea3] flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">sensors</span>
              {{ sentinelData.subsystemStatus }}
            </span>
            <span class="text-[#869397] hidden sm:inline">{{ sentinelData.chassis }}</span>
          </div>
          <div class="flex items-center gap-2 text-[#869397] font-mono">
            <span>{{ sentinelData.telemetry }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
