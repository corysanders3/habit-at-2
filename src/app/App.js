import './App.css';
import Garden from '../garden/Garden';
import Calendar from '../calendar/Calendar';
import { PerspectiveCamera, OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import AllFlowers from '../flowers/AllFlowers';
function App() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0 }}>
      <Canvas>
        <ambientLight intensity={2} />
        <directionalLight position={[1, 1, 4]} intensity={3} />
        <Garden />
        <AllFlowers />
        <Sky sunPosition={[0.6, 0.1, 0.6]}/>
        <PerspectiveCamera makeDefault position={[0, 5, 15]} />
        <OrbitControls 
          minDistance={5}
          maxDistance={25}
          minPolarAngle={0.5}
          maxPolarAngle={Math.PI / 1.9}
          // minAzimuthAngle={-Math.PI / 4}
          // maxAzimuthAngle={Math.PI / 4}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}

export default App;