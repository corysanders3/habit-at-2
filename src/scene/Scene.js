import './Scene.css';
import { PerspectiveCamera, OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import Garden from '../garden/Garden';
import flower1 from '../images/flowers/flowerID_1.png';

function Scene({ habits, setError }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(habits) {
            setTimeout(() => {
                setIsLoading(false)
            }, 4000)
        }
    }, [])

    return (
        <>
        { isLoading ? (
            <>
                <h1 className='loading'>Loading<span className='dot'> . </span><span className='dot'> . </span><span className='dot'> . </span></h1>
                <div className='loading-container'>
                    <img src={flower1} alt='image of a cartoon flower' className='loading-img'/>
                </div>
            </>
          ) : (
        <div style={{ width: '100%', height: '90%' }}>
            <Canvas className='garden-scene'>
                <ambientLight intensity={2} />
                <directionalLight position={[1, 1, 4]} intensity={3} />
                <Garden habits={habits} setError={setError} />
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
          )}
        </>
    )
}

export default Scene;