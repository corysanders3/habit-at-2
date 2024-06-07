import './Question.css'
import { useState } from 'react';

function Question() {
    const [question, setQuestion] = useState('');
    const [formError, setFormError] = useState('');
    const [result, setResult] = useState('');

    function checkForm(e) {
        e.preventDefault()
        setFormError('')
        
        if(question.trim().length < 6) {
            setFormError('Question must be at least 5 characters long.')
        } else {

        }
    }

    function closeSteps(e) {
        e.preventDefault()
    }

    return (
        <section>
            <h3>Ask Us A Question</h3>
            <h4>ex: How can I stay on track with my habit to walk every day?</h4>
            <form>
                <label htmlFor='question'>What Can We Help With?</label>
                <input 
                    name='question'
                    id='question'
                    type='text'
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                />
            </form>
            { formError && <h4 className='error'>{formError}</h4> }
            { result && <h4>{result}</h4> }
            <div className='button-container'>
                <button className='submit' onClick={e => checkForm(e)}>Submit</button>
                <button className='close' onClick={e => closeSteps(e)}>Close</button>
            </div>
        </section>
    )
}

export default Question;