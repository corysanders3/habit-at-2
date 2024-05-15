import './AllFlowers.css';
import habits from '../mockData/userHabits';
import { Flower } from '../flower/Flower';
import React, { useState, useEffect } from 'react'

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
       <group>
            {flowers}
       </group>
    )
}

export default AllFlowers;