async function getHabits(userId) {
    const response = await fetch(`https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/${userId}/habits`)
    if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
    }
    const habits = await response.json()
    return habits
}

async function getFlowers() {
    const response = await fetch(`https://habitat-1873f8f155b9.herokuapp.com/api/v0/plants`)
    if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
    }
    const flowers = await response.json()
    return flowers
}

async function getProgress(userId, habitId) {
    const response = await fetch(`https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/${userId}/habits/${habitId}/progresses`)
    if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
    }
    const progress = await response.json()
    return progress
}

async function getFlowerScale(userId, habitId) {
    const response = await fetch(`https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/${userId}/habits/${habitId}/habit_plant`)
    if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
    }
    const scale = await response.json()
    return scale
}

function postHabit(data, userId) {
    return fetch(`https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/${userId}/habits`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Unable to create new habit at this time.')
        }
        return res.json()
    })
}

export {
    getHabits,
    getFlowers,
    getProgress,
    postHabit,
    getFlowerScale
}