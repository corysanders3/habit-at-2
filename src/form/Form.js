import './Form.css';
import { useState } from 'react';

function Form({ isActive, closeForm }) {
    const [nameInput, setNameInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [frequency, setFrequency] = useState('')
    const [days, setDays] = useState({ 'monday': false, 'tuesday': false, 'wednesday': false, 'thursday': false, 'friday': false, 'saturday': false, 'sunday': false })
    const [initialDays, setInitialDays] = useState({ 'monday': false, 'tuesday': false, 'wednesday': false, 'thursday': false, 'friday': false, 'saturday': false, 'sunday': false })
    const [startInput, setStartInput] = useState('')
    const [endInput, setEndInput] = useState('')
    const [formError, setFormError] = useState('')

    console.log(days)

    function checkForm(e) {
        e.preventDefault()
        setFormError('')

        if(nameInput.trim().length < 1 || descriptionInput.trim().length < 1 || !frequency || !startInput || !endInput) {
            setFormError('Please fill out all fields.')
        } else if(frequency === 'weekly' && JSON.stringify(days) === JSON.stringify(initialDays)){
            setFormError('Please fill out all fields.')
        } else {
            postHabit()
            closeForm(e)
        }
    }

    function postHabit() {
        let postData = {}
        
        clearForm()
    }

    function clearForm() {
        setNameInput('')
        setDescriptionInput('')
        setFrequency('')
        setDays({ 'monday': false, 'tuesday': false, 'wednesday': false, 'thursday': false, 'friday': false, 'saturday': false, 'sunday': false })
        setStartInput('')
        setEndInput('')
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
                                onChange={e => setFrequency(e.target.value)}
                            />
                            <label htmlFor='daily'>Daily</label>
                            &nbsp;&nbsp;
                            <input 
                                name='frequency'
                                id='weekly'
                                type='radio'
                                value='weekly'
                                onChange={e => setFrequency(e.target.value)}
                            />
                            <label htmlFor='weekly'>Weekly</label>
                            &nbsp;&nbsp;
                            <input 
                                name='frequency'
                                id='monthly'
                                type='radio'
                                value='monthly'
                                onChange={e => setFrequency(e.target.value)}
                            />
                            <label htmlFor='monthly'>Monthly</label>
                        </div>
                        { frequency === 'weekly' && (
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
                        <label htmlFor='start'>Start Date:</label>
                        <input 
                            name='start'
                            id='start'
                            type='date'
                            value={startInput}
                            onChange={e => setStartInput(e.target.value)}
                        />
                        <br></br>
                        <label htmlFor='end'>End Date:</label>
                        <input 
                            name='end'
                            id='end'
                            type='date'
                            value={endInput}
                            onChange={e => setEndInput(e.target.value)}
                        />
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