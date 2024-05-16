import './Flower.css'
import flowerData from '../mockData/flowerDetails'
import React, { useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'


function Flower(props) {
    const { nodes, materials } = useGLTF('/flowers/Habitat.gltf')
    const [type, setType] = useState()
    const [active, setActive] = useState(false)
    const [flowerScale, setScale] = useState()
    const [position, setPosition] = useState([])

    const { scale } = useSpring({
        scale: active ? 1.5 : 1,
        config: config.wobbly
    })

    useEffect(() => {
        findFlower()
        findPosition()
    }, [props.flower])

    const findFlower = () => {
        const flowerType = flowerData.find(type => {
            return type.id === props.flower
        })
        setType(flowerType)
    }

    const findPosition = () => {
        let x = -4
        x += (props.index * 2)
        setPosition([x, -0.75, 1])
    }

    const findScale = () => {
    //   const growth = <Grow />
    }

    if (!type) {
        return (
            <group></group>
        )
    }
    return (
        <group {...props} dispose={null}>
            <group position={position} scale={type.scale}>
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
