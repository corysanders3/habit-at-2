import './Flower.css';
// import flowerData from '../mockData/flowerDetails';
import React, { useState, useEffect } from 'react';
import { calculateGrowth } from '../grow/Grow';
import { getFlowers } from '../apiCalls';
import { getProgress } from '../apiCalls';
// import userProgress from '../mockData/userProgress';
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
        getParameters(props.userId, props.habitId)
    }, [props.index])

    // ****** GET request for flower styles *******
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
    // ****** Remove this findFlower() function below once fetch is implemented
    // const findFlower = () => {
    //     const flowerType = flowerData.find(type => {
    //         return type.id === props.flower
    //     })
    //     setType(flowerType)
    // }

    // **** GET request for habit progress ******
    const getParameters = async (userId, habitId) => {
        try {
          const progress = await getProgress(userId, habitId)
          if (progress) {
            scaleFlower(progress.data)
          }
        } catch (error) {
          props.setError(error)
        }
        // **** remove this line below once fetch is implemented
        // scaleFlower(userProgress)
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

    const scaleFlower = (progressLog) => {
        const growth = calculateGrowth(progressLog, props.habit.attributes.frequency)
        setScale(growth)
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
                    scale={scale}
                    castShadow
                    receiveShadow
                    geometry={nodes[type.attributes.style + '_1'].geometry}
                    material={materials[type.attributes.stem]}
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
