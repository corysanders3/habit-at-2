import './App.css';
import Garden from '../garden/Garden';
import Calendar from '../calendar/Calendar';
import { PerspectiveCamera, OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { getHabits } from '../apiCalls';
// import habits from '../mockData/userHabits';
import React, { useState, useEffect } from 'react'

function App() {
  const [error, setError] = useState()
  const [userHabits, setHabits] = useState([])
  const [userId, setUserId] = useState(1)

  useEffect(() => {
    showUser(userId)
  }, [])

  const showUser = async (userId) => {
    try {
      const habits = await getHabits(userId)
      if (habits) {
        setHabits(habits.data)
      }
    } catch (error) {
      setError(error)
    }
    // **** removed this line below once fetch is implemented
    // setHabits(habits)
  }
  
  return (
    <div style={{ width: '100%', height: '90%' }}>
      <Canvas className='garden-scene'>
        <ambientLight intensity={2} />
        <directionalLight position={[1, 1, 4]} intensity={3} />
        <Garden habits={userHabits} setError={setError} />
        <Sky sunPosition={[0.6, 0.1, 0.6]} />
        <PerspectiveCamera makeDefault position={[0, 5, 15]} />
        <OrbitControls
          minDistance={5}
          maxDistance={25}
          minPolarAngle={0.5}
          maxPolarAngle={Math.PI / 1.9}
          // minAzimuthAngle={-Math.PI / 4}
          // maxAzimuthAngle={Math.PI / 4}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          />
      </Canvas>
          {error && <h2 className="fetch-error">{error.message}</h2>}
    </div>
  );
}

export default App;