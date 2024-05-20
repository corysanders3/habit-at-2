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
        return day.attributes.datetime >= startDate && day.attributes.datetime <= todayDate
    }).filter((log) => {
        return log.attributes.status === 'completed'
    })
    
    if (completedDates.length < 1) {
        return 1
    } else if (completedDates.length < 10) {
        return (completedDates.length / 10 * 4)
    } else {
        return 4
    }
    
}

export {
    calculateGrowth
}
