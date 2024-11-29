import { Vector2, Raycaster } from 'three'
import isAlpha from '../utils/isAlpha';
import * as THREE from 'three'  
import { tag } from '../createTag'

function createLoop(scene, camera, renderer, controls, labelRenderer) {
  const animate = () => {
    renderer.setAnimationLoop(animate);
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);

  };
  animate()
  
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  let intersect = null;
  window.addEventListener("pointerdown", (event) => {
    const mouse = new Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    const raycaster = new Raycaster();
    raycaster.setFromCamera(mouse, camera);
  
    const intersects = raycaster.intersectObjects(scene.children).filter((item) => item.object.type !== "Line");
  
    if (intersects.length > 0) {
      if (intersects[0].object.type === "Mesh") {
        if (intersect) isAlpha(intersect, 0.6);
        intersect = intersects[0].object.parent;
        isAlpha(intersect, 0.8);

        console.log('-------------',intersect)
      }
      if (intersects[0].object.type === "Sprite") {
        console.log(intersects[0].object);


                // 弹窗
                if(intersects[0].object.name == 'icon'){
                  const tagDiv = tag('tag' , intersects[0].object.position.x , intersects[0].object.position.y , intersects[0].object.position.z  )
                  
                  console.log('-------------',tagDiv)
        
                  scene.getObjectByName('map').add(tagDiv)
                }

      }
    } else {
      if (intersect) isAlpha(intersect, 1);
    }

  });


  // 光线投射Raycaster  
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let activeIntersects = []; //鼠标滑过数据

  window.addEventListener('pointermove', (event) => {

    // scene.getObjectByName('map').remove(scene.getObjectByName('tag'))

    let info = document.querySelector('#info')
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
  
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera);
  
    // 判断数组是否有数据，有数据全部设置为原始数据
    if (activeIntersects.length) {
        for (let i = 0; i < activeIntersects.length; i++) {
            activeIntersects[i].object.material.color.set('#3EA0FF');
        }
    }
    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(scene.children);
  
    // 数组数据清空
    activeIntersects = []
  
    // 滑过的当前这个高亮
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.type === 'Mesh' && intersects[i].object.name == '') {

            intersects[i].object.material.color.set(0x358DB9);
            activeIntersects.push(intersects[i])
        }
    }

  });


}

export { createLoop }
