import { Shape, DoubleSide, ExtrudeGeometry, MeshStandardMaterial, Mesh } from 'three'
import { getLineShaderMaterial, getGradientShaderMaterial } from './shaderUtil.js';
import * as THREE from 'three'  
import offsetXY from './offsetXY';
import { createLabel } from '../createLabel'
import { lab } from 'd3';
import { Object3D, Color, Box3, Vector3 } from 'three'

let barGroup = new THREE.Group();
let sizeScale = 0.10;

function createBar(op, idx) {

        const material = getGradientShaderMaterial(
          THREE,
          op.itemStyle.topColor,
          op.itemStyle.bottomColor,
        );
    
        let min = op.data[0].value,
          max = op.data[0].value;
        op.data.forEach((item) => {
          if (item.value < min) {
            min = item.value;
          }
          if (item.value > max) {
            max = item.value;
          }
        });
    
        let len = max - min;
        for (let index = 0; index < op.data.length; index++) {
          let item = op.data[index];
    

          const [x, y] = offsetXY([item.lng, item.lat]);


    
            //柱体高度
            let h =
              (((item.value - min) / len) * op.itemStyle.maxHeight + op.itemStyle.minHeight) *
              sizeScale;
    
            let bar = new THREE.CylinderGeometry(
              op.itemStyle.barWidth * sizeScale,
              op.itemStyle.barWidth * sizeScale,
              h,
              32
            );
    
            let barMesh = new THREE.Mesh(bar, material);
            barMesh.name = 'bar-' + idx + '-' + index;
            barMesh.rotation.x = -Math.PI / 2;
            barMesh.position.set( x,-y,0.5 * h + 0.5);

            const label = createLabel(item.name, [item.lng, item.lat], h + 0.6);

            barGroup.add(barMesh);
            barGroup.add(label);

        }
        setCenter(barGroup)
        return barGroup;
      }
    
      const setCenter = (map) => {
        map.rotation.x = -Math.PI / 2;
        const box = new Box3().setFromObject(map);
        const center = box.getCenter(new Vector3());
      
        const offset = [0, 0];
        map.position.x = map.position.x - center.x - offset[0];
        map.position.z = map.position.z - center.z - offset[1];
      };
      
  
  export { createBar }


