import './Scene.css'
import { useRef } from 'react';
import { useTexture, Plane, useGLTF, useAnimations } from '@react-three/drei';

function Planter(props) {
    const { nodes, materials } = useGLTF('/planter_long/planter_box_02_2k.gltf')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.planter_box_02.geometry}
                material={materials.planter_box_02}
            />
        </group>
    )
}

function Dirt() {
    const textureStyle = useTexture({
        map: 'dirt/brown_mud_leaves_01_diff_2k.jpg',
        displacementMap: 'dirt/brown_mud_leaves_01_disp_2k.jpg',
        aoMap: 'dirt/brown_mud_leaves_01_arm_2k.jpg',
        roughnessMap: 'dirt/brown_mud_leaves_01_arm_2k.jpg',
        metalnessMap: 'dirt/brown_mud_leaves_01_arm_2k.jpg',
        normalMap: 'dirt/brown_mud_leaves_01_nor_gl_2k.jpg'
    })

    return (
        <group>
            <Plane args={[5.9, 3.8, 32, 32]} position={[-2.9, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial {...textureStyle} />
            </Plane>
            <Plane args={[5.9, 3.8, 32, 32]} position={[2.9, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial {...textureStyle} />
            </Plane>
        </group>
    )
}

function Gnome(props) {
    const { nodes, materials } = useGLTF('/gnome/garden_gnome_2k.gltf')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.garden_gnome.geometry}
                material={materials.garden_gnome_01}
            />
        </group>
    )
}

function Compost(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/compost_bags/compost_bags_2k.gltf')
    const { actions } = useAnimations(animations, group)
    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <mesh
                    name="compost_bags_floorstacked"
                    castShadow
                    receiveShadow
                    geometry={nodes.compost_bags_floorstacked.geometry}
                    material={materials.compost_bags}
                    position={[-0.396, 0.07, -0.65]}
                />
                <mesh
                    name="compost_bags_leaning"
                    castShadow
                    receiveShadow
                    geometry={nodes.compost_bags_leaning.geometry}
                    material={materials.compost_bags}
                    position={[0.699, 0, 0.077]}
                    rotation={[1.509, 0.142, -1.16]}
                />
                <mesh
                    name="compost_bags_floor"
                    castShadow
                    receiveShadow
                    geometry={nodes.compost_bags_floor.geometry}
                    material={materials.compost_bags}
                    position={[-0.396, 0, -0.65]}
                    rotation={[0.052, 0, 0]}
                />
                <mesh
                    name="compost_bags_standing"
                    castShadow
                    receiveShadow
                    geometry={nodes.compost_bags_standing.geometry}
                    material={materials.compost_bags}
                    position={[0.245, 0, -0.007]}
                />
            </group>
        </group>
    )
}

function Ground() {
    const textureStyle = useTexture({
        map: 'cobblestone/mossy_cobblestone_diff_2k.jpg',
        displacementMap: 'cobblestone/mossy_cobblestone_disp_2k.jpg',
        aoMap: 'cobblestone/mossy_cobblestone_arm_2k.jpg',
        roughnessMap: 'cobblestone/mossy_cobblestone_arm_2k.jpg',
        metalnessMap: 'cobblestone/mossy_cobblestone_arm_2k.jpg',
        normalMap: 'cobblestone/mossy_cobblestone_nor_gl_2k.jpg'
    })

    return (
        <group>
            <Plane args={[40, 40, 64, 64]} position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial {...textureStyle} />
            </Plane>
            <Plane args={[40, 40, 64, 64]} position={[40, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial {...textureStyle} />
            </Plane>
            <Plane args={[40, 40, 64, 64]} position={[-40, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial {...textureStyle} />
            </Plane>
            <Plane args={[40, 40, 64, 64]} position={[0, -5, -40, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial {...textureStyle} />
            </Plane>
            <Plane args={[40, 40, 64, 64]} position={[40, -5, -40, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial {...textureStyle} />
            </Plane>
            <Plane args={[40, 40, 64, 64]} position={[-40, -5, -40, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial {...textureStyle} />
            </Plane>
        </group>
    )
}

useGLTF.preload('/planter_long/planter_box_02_2k.gltf')
useGLTF.preload('/gnome/garden_gnome_4k.gltf')
useGLTF.preload('/compost_bags/compost_bags_2k.gltf')

export { Planter, Dirt, Gnome, Compost, Ground }