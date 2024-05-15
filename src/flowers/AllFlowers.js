import './AllFlowers.css';
import habits from '../mockData/userHabits';
import { Flower } from '../flower/Flower';
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

function AllFlowers() {
    const [flowers, setFlowers] = useState()

    useEffect(() => {
        makeFlower()
    }, [])

    const makeFlower = () => {
        const allFlowers = habits.map((habit) => {
            return (
                <Flower key={habit.id} flower={habit.attributes.plant_id} />
            )
        })
        setFlowers(allFlowers)
    }

    return (
        <React.Fragment>
            {flowers}
        </React.Fragment>
    )
}

export default AllFlowers;