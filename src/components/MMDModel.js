import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
import Stats from 'three/examples/jsm/libs/stats.module';
import { default as Ammo } from 'ammo.js/builds/ammo';

function MMDModel() {
  const containerRef = useRef();

  let stats;

  let camera, scene, renderer, effect;
  let helper, ikHelper, physicsHelper;

  const clock = new THREE.Clock();

  useEffect(() => {
    Ammo().then((AmmoLib) => {
      Ammo = AmmoLib;

      // 렌더러 크기
      const container = document.querySelector('.preview');
      const style = getComputedStyle(container);
      const scrollbarWidth = container.offsetWidth - container.clientWidth - parseFloat(style.getPropertyValue('border-left-width')) - parseFloat(style.getPropertyValue('border-right-width'));
      const width = container.clientWidth - scrollbarWidth;
      const height = width * 1.7;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(120, width/height, 0.1, 2000);
      renderer = new THREE.WebGLRenderer();
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

      // 아웃라인
      effect = new OutlineEffect(renderer);

      // 웹 성능 모니터링
      stats = new Stats();
      document.body.appendChild(stats.dom);

      helper = new MMDAnimationHelper( {
        afterglow: 2.0,
        physics: true,
        ammo: Ammo,
      } );

      let mesh;

      // MMD 로드
      const loader = new MMDLoader();
      loader.loadWithAnimation(
        'mmd/Model/Miku_Hatsune.pmd', // MMD 모델링
        'mmd/Motion/OnegaiDarling.vmd', // MMD 모션
        (mmd) => {
        mesh = mmd.mesh;
        // scene.add(mmd.mesh);
        scene.add(mesh);

        // helper.add(mmd.mesh, {
        //   animation: mmd.animation
        // });
        helper.add(mesh, {
          animation: mmd.animation
        });

        // ikHelper = helper.objects.get(mmd.mesh).ikSolver.createHelper();
        ikHelper = helper.objects.get(mesh).ikSolver.createHelper();
        ikHelper.visible = false;
        scene.add(ikHelper);

        // physicsHelper = helper.objects.get(mmd.mesh).physics.createHelper();
        physicsHelper = helper.objects.get(mesh).physics.createHelper();
        physicsHelper.visible = false;
        scene.add(physicsHelper);

        initGui();
      });

      // 사용자 입력 처리
      document.addEventListener('keydown', event => {
        if (event.key === 'ArrowUp') {
          mesh.skeleton.bones[2].position.z -= 1;
        } else if (event.key === 'ArrowDown') {
          mesh.skeleton.bones[2].position.z += 1;
        } else if (event.key === 'ArrowLeft') {
          mesh.skeleton.bones[2].position.x -= 1;
        } else if (event.key === 'ArrowRight') {
          mesh.skeleton.bones[2].position.x += 1;
        }
      });

      // 체크박스 GUI 초기화
      function initGui() {
        const api = {
          'animation': true,
          'ik': true,
          'outline': true,
          'physics': true,
          'show IK bones': false,
          'show rigid bodies': false
        };

        const gui = new GUI();

        gui.add(api, 'animation').onChange(function() {
          helper.enable('animation', api['animation']);
        });

        gui.add(api, 'ik').onChange(function() {
          helper.enable('ik', api['ik']);
        });

        gui.add(api, 'outline').onChange(function() {
          effect.enabled = api['outline'];
        });

        gui.add(api, 'physics').onChange(function() {
          helper.enable('physics', api['physics']);
        });

        gui.add(api, 'show IK bones').onChange(function() {
          ikHelper.visible = api['show IK bones'];
        });

        gui.add(api, 'show rigid bodies').onChange(function() {
          if (physicsHelper !== undefined) physicsHelper.visible = api['show rigid bodies'];
        });

      }

      const animate = () => {
        requestAnimationFrame(animate);
        stats.begin();
        helper.update(clock.getDelta());
        // renderer.render(scene, camera);
        effect.render(scene, camera);
        stats.end();
      };
      animate();
    });
  }, []);

  return <div ref={containerRef} />;
}

export default MMDModel;