import * as turf from '@turf/turf';

export default function(from, to) {
  return turf.distance(turf.point(from), turf.point(to)) < 0.5;
}
