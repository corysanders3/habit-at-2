import './Form.css';
import { useState } from 'react';

function Form({ isActive }) {
    const [nameInput, setNameInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')

    return (
        <>
            {isActive && 
                <section className='habit-section'>
                    <h3 className='form-header'>Create a New Habit</h3>
                    <form className='habit-form'>
                        <label htmlFor='name'>Habit Name:</label>
                        <input 
                            minLength={2}
                            required
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
                        <p className='days'>Choose Days:</p>
                        <div>
                            <input 
                                name='monday'
                                id='monday'
                                type='checkbox'
                                value='monday'
                            />
                            <label htmlFor='monday'>Monday</label>
                            &nbsp;&nbsp;
                            <input 
                                name='tuesday'
                                id='tuesday'
                                type='checkbox'
                                value='tuesday'
                            />
                            <label htmlFor='tuesday'>Tuesday</label>
                            &nbsp;&nbsp;
                            <input 
                                name='wednesday'
                                id='wednesday'
                                type='checkbox'
                                value='wednesday'
                            />
                            <label htmlFor='wednesday'>Wednesday</label>
                            &nbsp;&nbsp;
                            <input 
                                name='thursday'
                                id='thursday'
                                type='checkbox'
                                value='thursday'
                            />
                            <label htmlFor='thursday'>Thursday</label>
                            &nbsp;&nbsp;
                            <input 
                                name='friday'
                                id='friday'
                                type='checkbox'
                                value='friday'
                            />
                            <label htmlFor='friday'>Friday</label>
                            &nbsp;&nbsp;
                            <input 
                                name='saturday'
                                id='saturday'
                                type='checkbox'
                                value='saturday'
                            />
                            <label htmlFor='saturday'>Saturday</label>
                            &nbsp;&nbsp;
                            <input 
                                name='sunday'
                                id='sunday'
                                type='checkbox'
                                value='sunday'
                            />
                            <label htmlFor='sunday'>Sunday</label>
                        </div>
                    </form>
                </section>
            }
        </>
    )
}

export default Form;