import { WebGLRenderer } from 'three'
import mapData from '../../map/440000.js'
import lineData from '../../map/china'
import { createMap } from '../createMap.js'

function createRenderer(mapRef, scene) {
    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mapRef.appendChild(renderer.domElement);
    const map = createMap(mapData, lineData);
    scene.add(map);
    return renderer
}

export { createRenderer }
