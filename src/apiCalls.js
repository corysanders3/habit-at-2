async function getHabits(userId) {
  const response = await fetch(
    `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/${userId}/habits`
  );
  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }
  const habits = await response.json();
  return habits;
}

async function deleteHabit(userId, habitId) {
  const response = await fetch(
    `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/${userId}/habits/${habitId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
}

async function updateHabit(userId, habitId, update) {
  const response = await fetch(
    `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/${userId}/habits/${habitId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    }
  );
  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
}

async function completeHabit(userId, habitId, progressId) {
  const response = await fetch(
    `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/${userId}/habits/${habitId}/progresses/${progressId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progress: {
          status: "completed",
        },
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
}

async function getFlowers() {
  const response = await fetch(
    `https://habitat-1873f8f155b9.herokuapp.com/api/v0/plants`
  );
  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }
  const flowers = await response.json();
  return flowers;
}

async function getProgress(userId, habitId) {
  const response = await fetch(
    `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/${userId}/habits/${habitId}/progresses`
  );
  if (!response.ok) {
    throw new Error(`An error has occurred: ${response.status}`);
  }
  const progress = await response.json();
  return progress;
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
  return fetch(
    `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/${userId}/habits`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Unable to create new habit at this time.");
    }
    return res.json();
  });
}

function answerHabitQuestion(userId, habitId, data) {
  return fetch(
    `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/${userId}/habits/${habitId}/questions`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`An error has occurred: ${res.status}`);
    }
    return res.json();
  });
}

export {
  getHabits,
  deleteHabit,
  completeHabit,
  updateHabit,
  getFlowers,
  getProgress,
  postHabit,
  getFlowerScale,
  answerHabitQuestion
};
