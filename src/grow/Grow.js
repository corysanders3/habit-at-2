import moment from 'moment';

function findDates() {
    const today = moment().format("YYYY-MM-DD hh:mm:ss")
    const daily = moment().subtract(10, 'days').format("YYYY-MM-DD hh:mm:ss")
    const weekly = moment().subtract(10, 'weeks').format("YYYY-MM-DD hh:mm:ss")
    const monthly = moment().subtract(10, 'months').format("YYYY-MM-DD hh:mm:ss")
    return {
        today,
        daily,
        weekly,
        monthly
    }
}

function calculateGrowth(progress, frequency) {
    const date = findDates()
    if (frequency === 'daily') {
        return calculateProgress(progress, date.today, date.daily)
    } else if (frequency === 'weekly') {
        return calculateProgress(progress, date.today, date.weekly)
    } else if (frequency === 'monthly') {
        return calculateProgress(progress, date.today, date.monthly)
    }
}

function calculateProgress(progress, todayDate, startDate) {
    const completedDates = progress.filter((day) => {
        return day.datetime >= startDate && day.datetime <= todayDate
    }).filter((log) => {
        return log.status === 'completed'
    })

    if (completedDates.length < 10) {
        return (completedDates.length / 10 * 5)
    } else {
        return 5
    }
}

export {
    calculateGrowth
}


// 10 completed logs will equal max growth - a scale of 5

// if the habit is daily: filter for the past 10 days
// filter again for completed days
// divide completed days by 10
// multiply the max scale (5) by percent completed
// resulting number is the current flower size
// if the habit is weekly: filter for the past 10 weeks
// filter again for completed days
// divide completed days by 10
// multiply the max scale (5) by percent completed (max percent is 100%)
// resulting number is the current flower size
// if the habit is monthly: filter for the past 10 months
// filter again for completed days
// divide completed days by 10
// multiply the max scale (5) by percent completed (max percent is 100%)
// resulting number is the current flower size
