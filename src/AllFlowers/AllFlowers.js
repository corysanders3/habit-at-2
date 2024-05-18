import './AllFlowers.css';
import { Flower } from '../flower/Flower';
import React, { useState, useEffect } from 'react';

function AllFlowers({ habits, setError }) {
    const [flowers, setFlowers] = useState()

    useEffect(() => {
        makeFlower()
    }, [])

    const makeFlower = () => {
        const inProgress = habits.filter(habit => {
            return habit.attributes.status === 'in_progress'
        })
        const allFlowers = inProgress.map((habit, index) => {
                return (
                    <Flower
                        key={habit.id}
                        userId={habit.attributes.user_id}
                        flower={habit.attributes.plant_id}
                        index={index}
                        habitId={habit.id}
                        habit={habit}
                        setError={setError}
                    />
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