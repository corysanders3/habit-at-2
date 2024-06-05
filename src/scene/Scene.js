import './Scene.css';
import { PerspectiveCamera, OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Garden from '../garden/Garden';

function Scene({ habits, setError, getDetails }) {
    return (
        <div style={{ width: '100%', height: '90%' }}>
            <Canvas className='garden-scene'>
                <ambientLight intensity={2} />
                <directionalLight position={[1, 1, 4]} intensity={3} />
                <Garden habits={habits} setError={setError} getDetails={getDetails}/>
                <Sky sunPosition={[0.6, 0.1, 0.6]} />
                <PerspectiveCamera makeDefault position={[0, 5, 15]} />
                <OrbitControls
                minDistance={5}
                maxDistance={25}
                minPolarAngle={0.5}
                maxPolarAngle={Math.PI / 1.9}
                minAzimuthAngle={-Math.PI / 2}
                maxAzimuthAngle={Math.PI / 2}
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
                />
            </Canvas>
        </div>
    )
}

export default Scene;