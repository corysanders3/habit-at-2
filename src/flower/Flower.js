import './Flower.css'
import flowerData from '../mockData/flowerDetails'
import React, { useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'


function Flower(props, { flower }) {
    const { nodes, materials } = useGLTF('/flowers/Habitat.gltf')
    const [type, setType] = useState()
    const [active, setActive] = useState(false)
    const { scale } = useSpring({
        scale: active ? 1.5 : 1,
        config: config.wobbly
    })
    console.log('flower', flower)
    console.log('props', props)
    useEffect(() => {
        findFlower()
    }, [flower])
    
    const findFlower = () => {
        const flowerType = flowerData.find(type => {
            console.log('type', flower)
            return type.id === flower
        })
        setType(flowerType)
    }
    
    if (!type) {
        return (
            <group></group>
        )
    }
    return (
        <group {...props} dispose={null}>
            <group position={[1.25, -1, 1]} scale={10}>
                <animated.mesh
                    scale={scale}
                    onClick={() => setActive(!active)}
                    castShadow
                    receiveShadow
                    geometry={nodes[type.style + '_1'].geometry}
                    material={materials[type.stem]}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes[type.style + '_2'].geometry}
                        material={materials[type.seed]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes[type.style + '_3'].geometry}
                        material={materials[type.petal]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes[type.style + '_4'].geometry}
                        material={materials[type.leaf]}
                    />
                </animated.mesh>
            </group>
        </group>
    )
}

useGLTF.preload('/flowers/Habitat.gltf')

export { Flower }
