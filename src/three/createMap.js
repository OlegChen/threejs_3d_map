import { Object3D, Color, Box3, Vector3 } from 'three'
import offsetXY from './utils/offsetXY';
import { createLabel } from './createLabel'
import { createIcon } from './createIcon'
import { createMesh } from './createMesh'
import { createLine } from './createLine'
import { createDownLine } from './createDownLine'

import {createBar} from '../three/utils/bar.js';

const createMap = (data, lineData) => {
  const map = new Object3D();
  map.name = "map";
  const center = data.features[0].properties.centroid;
  offsetXY.center(center).translate([0, 0]);

  data.features.forEach((feature) => {
    const unit = new Object3D();
    const { centroid, center, name } = feature.properties;
    const { coordinates, type } = feature.geometry;
    const point = centroid || center || [0, 0];

    const color = '#3EA0FF';
    const depth = Math.random() * 0.3 + 0.3;

    const label = createLabel(name, point, depth);
    const icon = createIcon(point, depth);

    coordinates.forEach((coordinate) => {
      if (type === "MultiPolygon") coordinate.forEach((item) => fn(item));
      if (type === "Polygon") fn(coordinate);

      function fn(coordinate) {
        unit.name = name;
        const mesh = createMesh(coordinate, color, depth);
        const line = createLine(coordinate, depth);
        unit.add(mesh, ...line);
      }
    });
    map.add(unit, label, icon);
  });

  setCenter(map);

  // map.add(group)

  lineData.features.forEach((feature) => {
    const unit = new Object3D();
    const { centroid, center, name } = feature.properties;
    const { coordinates, type } = feature.geometry;

    const depth = Math.random() * 0.1 + 0.4;

    coordinates.forEach((coordinate) => {
      if (type === "MultiPolygon") coordinate.forEach((item) => fn(item));
      if (type === "Polygon") fn(coordinate);

      function fn(coordinate) {
        unit.name = name;
        const line = createDownLine(coordinate, depth);
        unit.add(...line);
      }
    });

    map.add(unit);
  });

  return map;
};

const setCenter = (map) => {
  map.rotation.x = -Math.PI / 2;
  const box = new Box3().setFromObject(map);
  const center = box.getCenter(new Vector3());

  const offset = [0, 0];
  map.position.x = map.position.x - center.x - offset[0];
  map.position.z = map.position.z - center.z - offset[1];
};



export { createMap }