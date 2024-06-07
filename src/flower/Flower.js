import './Flower.css';
import React, { useState, useEffect } from 'react';
import { getFlowers, getFlowerScale } from '../apiCalls';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated, config } from '@react-spring/three';

function Flower(props) {
    const { nodes, materials } = useGLTF('/flowers/Habitat.gltf')
    const [type, setType] = useState()
    const [flowerScale, setScale] = useState(null)
    const [position, setPosition] = useState([])

    const { scale } = useSpring({
        scale: flowerScale,
        config: config.wobbly
    })

    useEffect(() => {
        findFlower()
        findPosition()
        getFlowerSize(props.userId, props.habitId)
    }, [props.index])

    const findFlower = async () => {
        try {
            const flowers = await getFlowers()
            if (flowers) {
                const flowerType = flowers.data.find(type => {
                    return Number(type.id) === props.flower
                })
                setType(flowerType)
            }
        } catch (error) {
            props.setError(error)
        }
    }

    const getFlowerSize = async (userId, habitId) => {
        try {
            const size = await getFlowerScale(userId, habitId)
            if (size) {
                setScale(size.data.attributes.scale)
            }
        } catch (error) {
            props.setError(error)
        }
    }

    const findPosition = () => {
        let x = -4
        if (props.index < 5) {
            x += (props.index * 2)
            setPosition([x, -0.75, 1])
        } else if (props.index < 10) {
            x += ((props.index - 5) * 2)
            setPosition([x, -0.75, -1])
        }
    }

    const handlePointerOver = (e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
    }

    const handlePointerOut = (e) => {
        e.stopPropagation()
        document.body.style.cursor = 'auto'
    }

    if (!type) {
        return (
            <group></group>
        )
    }
    return (
        <group {...props} dispose={null}>
            <group position={position} scale={type.attributes.scale}>
                <animated.mesh
                    onClick={() => { props.getDetails(props.habit) }}
                    scale={scale}
                    castShadow
                    receiveShadow
                    geometry={nodes[type.attributes.style + '_1'].geometry}
                    material={materials[type.attributes.stem]}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes[type.attributes.style + '_2'].geometry}
                        material={materials[type.attributes.seed]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes[type.attributes.style + '_3'].geometry}
                        material={materials[type.attributes.petal]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes[type.attributes.style + '_4'].geometry}
                        material={materials[type.attributes.leaf]}
                    />
                </animated.mesh>
            </group>
        </group>
    )
};

useGLTF.preload('/flowers/Habitat.gltf')

export { Flower };
