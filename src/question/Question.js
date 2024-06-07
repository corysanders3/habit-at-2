import './Question.css';
import { answerHabitQuestion } from '../apiCalls';
import { useState } from 'react';

function Question({ details, setQuestionActive, closeForm, userId }) {
    const [question, setQuestion] = useState('');
    const [formError, setFormError] = useState('');
    const [result, setResult] = useState('');

    function checkForm(e) {
        e.preventDefault()
        setFormError('')
        setResult('')
        
        if(question.trim().length < 6) {
            setFormError('Question must be at least 5 characters long.')
        } else {
            answerHabitQuestion(userId, details.id, { "question": question })
                .then(data => {
                    setResult(data.response)
                })
                .catch(err => console.log(err.message))
        }
    }

    function closeSteps(e) {
        e.preventDefault()
        setFormError('')
        setQuestion('')
        setResult('')
        closeForm(e, setQuestionActive)
    }

    return (
        <section className='question-section'>
            <form className='question-form'>
                <label htmlFor='question' className='question-prompt'>Ask A Question
                <br />ex: What is the completion rate of my habit?
                </label>
                <input 
                    name='question'
                    id='question'
                    type='text'
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                />
            </form>
            { formError && <h4 className='question-error'>{formError}</h4> }
            { result && <h4 className='question-result'>{result}</h4> }
            <div className='button-container'>
                <button className='submit' onClick={e => checkForm(e)}>Submit</button>
                <button className='close' onClick={e => closeSteps(e)}>Close</button>
            </div>
        </section>
    )
}

export default Question;