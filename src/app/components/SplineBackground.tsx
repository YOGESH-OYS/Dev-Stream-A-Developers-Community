'use client'

// import Spline from '@splinetool/react-spline'

// export default function SplineBackground({ scene }: { scene: string }) {
// 	return (
// 		<div className="w-full h-full">
// 			<Spline scene={scene} />
// 		</div>
// 	)
// }


// import Spline from '@splinetool/react-spline/next';
import Spline from '@splinetool/react-spline';

export default function Home() {
  return (
    <main>
      <Spline
        scene="https://prod.spline.design/POLyxmhsNxwAGQGo/scene.splinecode" 
      />
    </main>
  );
}
