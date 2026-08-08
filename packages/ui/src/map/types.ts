export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export type LatLngLike = {
  lat: () => number;
  lng: () => number;
};
