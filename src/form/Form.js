import './Form.css';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { postHabit } from '../apiCalls';
import flowerOne from '../images/flowers/flowerID_1.png';
import flowerTwo from '../images/flowers/flowerID_2.png';
import flowerThree from '../images/flowers/flowerID_3.png'
import flowerFour from '../images/flowers/flowerID_4.png';

function Form({ isActive, closeForm }) {
    const [nameInput, setNameInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [frequencyInput, setFrequencyInput] = useState('')
    const [days, setDays] = useState({ "monday": false, "tuesday": false, "wednesday": false, "thursday": false, "friday": false, "saturday": false, "sunday": false })
    const [initialDays, setInitialDays] = useState({ "monday": false, "tuesday": false, "wednesday": false, "thursday": false, "friday": false, "saturday": false, "sunday": false })
    const [daysDaily, setDaysDaily] = useState({ "monday": true, "tuesday": true, "wednesday": true, "thursday": true, "friday": true, "saturday": true, "sunday": true })
    const [flowerId, setFlowerId] = useState('')
    const [startDateInput, setStartDateInput] = useState('')
    const [startTimeInput, setStartTimeInput] = useState('')
    const [endDateInput, setEndDateInput] = useState('')
    const [endTimeInput, setEndTimeInput] = useState('')
    const [formError, setFormError] = useState('')

    function checkForm(e) {
        e.preventDefault()
        setFormError('')

        if(nameInput.trim().length < 1 || descriptionInput.trim().length < 1 || !frequencyInput || !startDateInput || !endDateInput || !startTimeInput || !endTimeInput) {
            setFormError('Please fill out all fields.')
        } else if((frequencyInput === 'weekly' || frequencyInput === 'monthly') && JSON.stringify(days) === JSON.stringify(initialDays)){
            setFormError('Please fill out all fields.')
        } else {
            prepareHabit(e)
        }
    }

    function prepareHabit(e) {
        let postData;
        if(frequencyInput === 'daily') {
            postData = {
                "name": `${nameInput}`,
                "description": `${descriptionInput}`,
                "frequency": `${frequencyInput}`,
                "custom_frequency": {
                    "monday": `${daysDaily.monday}`,
                    "tuesday": `${daysDaily.tuesday}`,
                    "wednesday": `${daysDaily.wednesday}`,
                    "thursday": `${daysDaily.thursday}`,
                    "friday": `${daysDaily.friday}`,
                    "saturday": `${daysDaily.saturday}`,
                    "sunday": `${daysDaily.sunday}`,
                },
                "start_datetime": `${startDateInput} ${startTimeInput}:00`,
                "end_datetime": `${endDateInput} ${endTimeInput}:00`
            }
        } else {
            postData = {
                "name": `${nameInput}`,
                "description": `${descriptionInput}`,
                "frequency": `${frequencyInput}`,
                "custom_frequency": {
                    "monday": `${days.monday}`,
                    "tuesday": `${days.tuesday}`,
                    "wednesday": `${days.wednesday}`,
                    "thursday": `${days.thursday}`,
                    "friday": `${days.friday}`,
                    "saturday": `${days.saturday}`,
                    "sunday": `${days.sunday}`,
                },
                "start_datetime": `${startDateInput} ${startTimeInput}:00`,
                "end_datetime": `${endDateInput} ${endTimeInput}:00`
            }
        }
        
        postHabit(postData)
            .then(data => console.log(data))
            .catch(err => console.log(err.message))
        closeForm(e)
        clearForm()
    }
    console.log(days)
    function clearForm() {
        setNameInput('')
        setDescriptionInput('')
        setFrequencyInput('')
        setDays({ "monday": false, "tuesday": false, "wednesday": false, "thursday": false, "friday": false, "saturday": false, "sunday": false })
        setStartDateInput('')
        setStartTimeInput('')
        setEndDateInput('')
        setEndTimeInput('')
    }

    function updateDays(e) {
        if(!days[e.target.value]) {
            setDays(prevDays => ({
                ...prevDays, [e.target.value]: true
            }))
        } else {
            setDays(prevDays => ({
                ...prevDays, [e.target.value]: false
            }))
        }
    }

    function closeSteps(e) {
        e.preventDefault()
        setFormError('')
        closeForm(e)
        clearForm()
    }

    return (
        <>
            {isActive && 
                <section className='habit-section'>
                    <h3 className='form-header'>Create a New Habit</h3>
                    <form className='habit-form'>
                        <label htmlFor='name'>Habit Name:</label>
                        <input 
                            name='name'
                            id='name'
                            type='text'
                            value={nameInput}
                            onChange={e => setNameInput(e.target.value)}
                        />
                        <br></br>
                        <label htmlFor='description'>Habit Description:</label>
                        <input 
                            name='description'
                            id='description'
                            type='text'
                            value={descriptionInput}
                            onChange={e => setDescriptionInput(e.target.value)}
                        />
                        <br></br>
                        <p className='checkbox-p'>Frequency:</p>
                        <div className='frequency-container'>
                            <input 
                                name='frequency'
                                id='daily'
                                type='radio'
                                value='daily'
                                onChange={e => setFrequencyInput(e.target.value)}
                            />
                            <label htmlFor='daily'>Daily</label>
                            &nbsp;&nbsp;
                            <input 
                                name='frequency'
                                id='weekly'
                                type='radio'
                                value='weekly'
                                onChange={e => setFrequencyInput(e.target.value)}
                            />
                            <label htmlFor='weekly'>Weekly</label>
                            &nbsp;&nbsp;
                            <input 
                                name='frequency'
                                id='monthly'
                                type='radio'
                                value='monthly'
                                onChange={e => setFrequencyInput(e.target.value)}
                            />
                            <label htmlFor='monthly'>Monthly</label>
                        </div>
                        { (frequencyInput === 'weekly' || frequencyInput === 'monthly') && (
                            <>
                                <br></br>
                                <p className='checkbox-p'>Choose Days:</p>
                                <div className='days-container'>
                                    <div>
                                        <input 
                                            name='monday'
                                            id='monday'
                                            type='checkbox'
                                            value='monday'
                                            onChange={(e) => updateDays(e)}
                                        />
                                        <label htmlFor='monday'>Monday</label>
                                    </div>
                                    <div>
                                        <input 
                                            name='tuesday'
                                            id='tuesday'
                                            type='checkbox'
                                            value='tuesday'
                                            onChange={(e) => updateDays(e)}
                                        />
                                        <label htmlFor='tuesday'>Tuesday</label>
                                    </div>
                                    <div>
                                        <input 
                                            name='wednesday'
                                            id='wednesday'
                                            type='checkbox'
                                            value='wednesday'
                                            onChange={(e) => updateDays(e)}
                                        />
                                        <label htmlFor='wednesday'>Wednesday</label>
                                    </div>
                                    <div>
                                        <input 
                                            name='thursday'
                                            id='thursday'
                                            type='checkbox'
                                            value='thursday'
                                            onChange={(e) => updateDays(e)}
                                        />
                                        <label htmlFor='thursday'>Thursday</label>
                                    </div>
                                    <div>
                                        <input 
                                            name='friday'
                                            id='friday'
                                            type='checkbox'
                                            value='friday'
                                            onChange={(e) => updateDays(e)}
                                        />
                                        <label htmlFor='friday'>Friday</label>
                                    </div>
                                    <div>
                                        <input 
                                            name='saturday'
                                            id='saturday'
                                            type='checkbox'
                                            value='saturday'
                                            onChange={(e) => updateDays(e)}
                                        />
                                        <label htmlFor='saturday'>Saturday</label>
                                    </div>
                                    <div>
                                        <input 
                                            name='sunday'
                                            id='sunday'
                                            type='checkbox'
                                            value='sunday'
                                            onChange={(e) => updateDays(e)}
                                        />
                                        <label htmlFor='sunday'>Sunday</label>
                                    </div>
                                </div>
                            </>
                        )}
                        <br></br>
                        <p className='checkbox-p'>Pick Your Flower:</p>
                        <div className='flowers-container'>
                                <div className='single-container'>
                                <input 
                                    name='flower'
                                    id='1'
                                    type='radio'
                                    value='1'
                                    onChange={e => setFlowerId(e.target.value)}
                                />
                                <label htmlFor='1'><img src={flowerOne} className='flower-pic'/></label>
                            </div>
                            <div className='single-container'>
                                <input 
                                    name='flower'
                                    id='2'
                                    type='radio'
                                    value='2'
                                    onChange={e => setFlowerId(e.target.value)}
                                />
                                <label htmlFor='2'><img src={flowerTwo} className='flower-pic'/></label>
                            </div>
                            <div className='single-container'>
                                <input 
                                    name='flower'
                                    id='3'
                                    type='radio'
                                    value='3'
                                    onChange={e => setFlowerId(e.target.value)}
                                />
                                <label htmlFor='3'><img src={flowerThree} className='flower-pic'/></label>
                            </div>
                            <div className='single-container'>
                                <input 
                                    name='flower'
                                    id='4'
                                    type='radio'
                                    value='4'
                                    onChange={e => setFlowerId(e.target.value)}
                                />
                                <label htmlFor='4'><img src={flowerFour} className='flower-pic flower-four'/></label>
                            </div>
                        </div>
                        <br></br>
                        <div className='date-container'>
                            <div>
                                <label htmlFor='startDate'>Start Date:</label>
                                <input 
                                    name='startDate'
                                    id='startDate'
                                    type='date'
                                    value={startDateInput}
                                    onChange={e => setStartDateInput(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Start Time:</label>
                                <input 
                                    name='startTime'
                                    id='startTime'
                                    type='time'
                                    value={startTimeInput}
                                    onChange={e => setStartTimeInput(e.target.value)}
                                />
                            </div>
                        </div>
                        <br></br>
                        <div className='date-container'>
                            <div>
                            <label htmlFor='endDate'>End Date:</label>
                        <input 
                            name='endDate'
                            id='endDate'
                            type='date'
                            value={endDateInput}
                            onChange={e => setEndDateInput(e.target.value)}
                        />
                            </div>
                            <div>
                                <label>End Time:</label>
                                <input 
                                    name='endTime'
                                    id='endTime'
                                    type='time'
                                    value={endTimeInput}
                                    onChange={e => setEndTimeInput(e.target.value)}
                                />
                            </div>
                        </div>
                        { formError && <h4 className='error'>{formError}</h4>}
                        <div className='button-container'>
                            <button className='submit' onClick={e => checkForm(e)}>Submit</button>
                            <button className='close' onClick={e => closeSteps(e)}>Close</button>
                        </div>
                    </form>
                </section>
            }
        </>
    )
}

export default Form;