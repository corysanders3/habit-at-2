function postHabit(data) {
    return fetch('https://18f66003-e0a9-4a86-82df-017b56517af9.mock.pstmn.io/users/1/habits', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
        if(!res.ok) {
            throw new Error('Unable to create new habit at this time.')
        }
        return res.json()
    })
}

export { postHabit }