"use client";

import Spline from "@splinetool/react-spline";

type SplineProps = {
  scene: string;
};

export default function SplineBackground({ scene }: SplineProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <Spline scene={scene} />
    </div>
  );
}