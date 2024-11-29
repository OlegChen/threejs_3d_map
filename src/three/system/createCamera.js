import { PerspectiveCamera } from 'three'

function createCamera() {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 20;
  camera.position.y = 23;
  camera.position.z = 20;
  
  console.log('**************',camera.position)
  return camera;
}

export { createCamera }
