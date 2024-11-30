import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import mapIcon1 from '../assets/icon.png'
import mapIcon2 from '../assets/icon.png'
import { lab } from 'd3';

let tooltip = null; // 创建一个tooltip变量用来存储信息窗口
tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.padding = '10px';
tooltip.style.borderRadius = '4px';
tooltip.style.color = '#fff';
tooltip.style.background = 'rgba(0, 0, 0, 0)';
tooltip.style.display = 'none';  // 初始设为不可见
tooltip.style.pointerEvents = 'none';  // 阻止鼠标事件触发
tooltip.style.zIndex = '999';  // 设置一个较高的z-index以确保其在最顶层
document.body.appendChild(tooltip);  // 将tooltip添加到body

// 创建一个HTML标签
const tag = (name, x, y, z) => {
    const div = document.createElement('div');

    Object.assign(div.style, {
        position: 'absolute'
    });
    div.style.zIndex = '9999999999'; 
    div.innerHTML = `<div class="popWin" style="background-color: red;">
    <div class="popWins">
      <div class="titleInfos">
        <p class="cityName">${name}办案中心</p>
      </div>
      <div class="popWins2">
        <div class="listItem">
          <div class="icon"></div>
          <div class="listItemr">
            <p>子机构名称1</p>
            <span>地址：宜阳县中心大街111号</span>
          </div>
        </div>
        <div class="listItem">
          <div class="icon"></div>
          <div class="listItemr">
            <p>子机构名称1</p>
            <span>地址：宜阳县中心大街111号</span>
          </div>
        </div>
        <div class="listItem">
          <div class="icon"></div>
          <div class="listItemr">
            <p>子机构名称1</p>
            <span>地址：宜阳县中心大街111号</span>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    const label = new CSS2DObject(div); //div元素包装为CSS2模型对象CSS2DObject
    label.name = 'tag'
    // label.element.style.zIndex = 9999999999; // 设置为10
    // 设置HTML元素标签在three.js世界坐标中位置
    label.position.set(x, y, z);

    // 更新点击事件处理函数
    // div.addEventListener('click', (e) => {
    //     // 设置 tooltip 的内容为标签的名字
    //     // tooltip.innerHTML = name;
    //     console.log(e)
    //     console.log('=====================')
    //     tooltip.innerHTML = `<div class="popWin">
    //   <div class="popWins">
    //     <div class="titleInfos">
    //       <p class="cityName">${name}办案中心</p>
    //     </div>
    //     <div class="popWins2">
    //       <div class="listItem">
    //         <div class="icon"></div>
    //         <div class="listItemr">
    //           <p>子机构名称1</p>
    //           <span>地址：宜阳县中心大街111号</span>
    //         </div>
    //       </div>
    //       <div class="listItem">
    //         <div class="icon"></div>
    //         <div class="listItemr">
    //           <p>子机构名称1</p>
    //           <span>地址：宜阳县中心大街111号</span>
    //         </div>
    //       </div>
    //       <div class="listItem">
    //         <div class="icon"></div>
    //         <div class="listItemr">
    //           <p>子机构名称1</p>
    //           <span>地址：宜阳县中心大街111号</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>`;
    //     tooltip.style.display = 'block';  // 设置信息窗口为可见
    //     // 设置 tooltip 的位置与被点击元素的位置相同
    //     tooltip.style.left = `${e.pageX}px`;
    //     tooltip.style.top = `${e.pageY}px`;

    //     // 将 tooltip 显示出来
    //     tooltip.style.display = 'block';
    // });
    // div.addEventListener('mouseleave', () => {
        // 隐藏 tooltip
        // tooltip.style.display = 'none';
    // });
    label.renderOrder = 999;
    return label; //返回CSS2模型标签
};

// 创建一个CSS2渲染器CSS2DRenderer
const labelRenderer = (width, height) => {
    const renderer = new CSS2DRenderer();

    renderer.setSize(width, height);

    Object.assign(renderer.domElement.style, {
        position: 'absolute',
        top: '0px',
        left: '0px',
        pointerEvents: 'none' // 避免模型标签HTML元素遮挡鼠标选择场景模型
    });

    return renderer;
};

export {tag, labelRenderer};

