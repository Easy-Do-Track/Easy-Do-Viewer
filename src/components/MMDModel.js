import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function MMDModel() {
  const containerRef = useRef();

  useEffect(() => {
    // 렌더러 크기
    const container = document.querySelector('.preview');
    const style = getComputedStyle(container);
    const scrollbarWidth = container.offsetWidth - container.clientWidth - parseFloat(style.getPropertyValue('border-left-width')) - parseFloat(style.getPropertyValue('border-right-width'));
    const width = container.clientWidth - scrollbarWidth;
    const height = width * 1.7;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(120, width/height, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // 배경색
    scene.background = new THREE.Color(0xffffff);

    // 마우스 제어
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 15, 18);
    controls.target.set(0, 15, 0);
    controls.update();
    
    // 주변광 추가
    const light = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(light);

    // MMD 로드
    /*
      mmd/Model/Miku_Hatsune.pmd
      mmd/Holo/Ame/Amelia Watson.pmx
      mmd/Holo/Gura/Gawr Gura.pmx
      mmd/Holo/Kiara/Takanashi Kiara.pmx
    */
    const loader = new MMDLoader();
    loader.load('mmd/Holo/Kiara/Takanashi Kiara.pmx', (object) => {
      scene.add(object);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <div ref={containerRef} />;
}

export default MMDModel;