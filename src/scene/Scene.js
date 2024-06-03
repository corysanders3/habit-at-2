import './Scene.css';
import { PerspectiveCamera, OrbitControls, Sky } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import Garden from '../garden/Garden';
import flower1 from '../images/flowers/flowerID_1.png';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Scene({ habits, setError }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 4000)
    }, [])

    const modelUrls = [
        '/planter_long/planter_box_02_2k.gltf',
        '/gnome/garden_gnome_2k.gltf',
        '/compost_bags/compost_bags_2k.gltf'
    ];

    const textureUrls = [
        'dirt/brown_mud_leaves_01_diff_2k.jpg',
        'dirt/brown_mud_leaves_01_disp_2k.jpg',
        'dirt/brown_mud_leaves_01_arm_2k.jpg',
        'dirt/brown_mud_leaves_01_nor_gl_2k.jpg',
        'cobblestone/mossy_cobblestone_diff_2k.jpg',
        'cobblestone/mossy_cobblestone_disp_2k.jpg',
        'cobblestone/mossy_cobblestone_arm_2k.jpg',
        'cobblestone/mossy_cobblestone_nor_gl_2k.jpg'
    ];

    useLoader(GLTFLoader, modelUrls);
    useLoader(TextureLoader, textureUrls);

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