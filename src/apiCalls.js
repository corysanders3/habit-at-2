async function getHabits(userId) {
    const response = await fetch(`/users/${userId}/habits`)
    if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
    }
    const habits = await response.json()
    return habits
}

async function getFlowers() {
    const response = await fetch(`/flowers`)
    if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
    }
    const flowers = await response.json()
    return flowers
}

async function getProgress(userId, habitId) {
    const response = await fetch(`/users/${userId}/habits/${habitId}/progresses`)
    if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`)
    }
    const progress = await response.json()
    return progress
}

export {
    getHabits,
    getFlowers,
    getProgress
}