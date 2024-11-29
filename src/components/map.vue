<template>
  <div id="info"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import * as d3 from "d3";  //莫开托坐标 矫正地图坐标
import map from '../map/440000'
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 文本缓冲几何体
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
// 一个用于加载JSON格式的字体的类
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { createLabel } from '../three/createLabel'
import { createIcon } from '../three/createIcon'
import { createMesh } from '../three/createMesh'
import { createLine } from '../three/createLine'

import { createScene } from '../three/system/createScene.js'
import { createCamera } from '../three/system/createCamera.js'
import { createRenderer } from '../three/system/createRenderer.js'
import { createLoop } from '../three/system/createLoop.js'
import { createControl } from '../three/system/createControl.js'
import { createLabelRenderer } from '../three/system/createLabelRenderer'

import offsetXY from '../three/utils/offsetXY.js';
import { Object3D, Color, Box3, Vector3 } from 'three'
import { Easing, Tween } from '@tweenjs/tween.js';

import { createBar } from '../three/utils/bar.js';

// 4.获取dom实例
onMounted(() => {

  const mapRef = document.getElementById('info')
  const scene = createScene()
  const camera = createCamera()
  const renderer = createRenderer(mapRef, scene)
  const controls = createControl(camera, renderer)
  const labelRenderer = createLabelRenderer(mapRef)


  // bar
  let barOp = {
    name: 'bar3D',
    type: 'bar3D',
    formatter: '{name}:{value}',
    data: map.features.map((item) => ({
      name: item.properties.name,
      code: item.properties.adcode,
      lat: item.properties.centroid[1],
      lng: item.properties.centroid[0],
      value: parseInt(Math.random() * 20)
    })),
    itemStyle: {
      //
      maxHeight: 20, //柱体最大高度
      minHeight: 1, //柱体最小高度
      barWidth: 1, //柱体宽度
      topColor: 'rgb(205, 199, 5)', //上方颜色
      bottomColor: 'rgb(255, 255, 204)' //下方颜色
    }
  }
  scene.add(createBar(barOp, 'bar'))




  // 动画
  // 创建 tween 动画
const endPosition = { x: 0, y: 9, z: 8 };
camera.position.set(3, 8, 5);
const tween = new Tween(camera.position)
  .to({ x: endPosition.x, y: endPosition.y, z: endPosition.z }, 1000)
  .easing(Easing.Quadratic.InOut)
  .onUpdate(() => {
    camera.lookAt(0, 0, 0)
    console.log("我执行了", camera.position)
  })
  tween.start();
  const animate = (time) => {
    tween.update(time);
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);


  const loop = createLoop(scene, camera, renderer, controls, labelRenderer)



})


</script>

<style>
#info {
  background-color: #12496E;
}
</style>
