import './Garden.css';
import { Planter, Dirt, Gnome, Compost, Ground } from '../gardenObjects/GardenObjects';
import { Stars } from '@react-three/drei';
import AllFlowers from '../userFlowers/AllFlowers';

function Garden({ habits, setError }) {

    return (
        <>
            <Stars count={5000} fade />
            <group scale={1.0}>
                <Planter scale={10} position={[0, -5, 0]} />
                <Dirt />
                <AllFlowers habits={habits} setError={setError} />
                <Gnome scale={14} position={[8, -4.9, -4.5]} rotation={[0, -0.5, 0]} />
                <Compost scale={5} position={[-5.75, -4.9, 3.2]} rotation={[0, 0, 0]} />
                <Ground />
            </group>
        </>
    )
}

export default Garden;