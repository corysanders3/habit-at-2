import moment from 'moment';
import { NavLink } from 'react-router-dom';

function FlowerDetails({ details, getDetails, loadForm, questionActive, setQuestionActive }) {
    const startDate = moment(`${details.attributes.start_datetime}`).format('MMMM Do, YYYY')
    const endDate = moment(`${details.attributes.end_datetime}`).format('MMMM Do, YYYY')

    return (
        <div className="absolute top-24 ml-10 min-w-fit w-1/5 rounded-xl bg-white text-lg leading-6 shadow-lg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor"
                className="size-8 ml-2 mt-2 hover:fill-lime-200 cursor-pointer"
                onClick={() => getDetails(false)}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
            </svg>
            <div className="group relative gap-x-6 rounded-lg pb-6 pt-2">
                <div className="mt-1 w-fit flex px-10">
                    <h3 className="mr-2 text-gray-800 text-3xl font-bold">{details.attributes.name}</h3>
                    <NavLink to="/calendar" onClick={() => getDetails(false)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5} stroke="currentColor"
                            className="size-10 hover:fill-lime-200 cursor-pointer">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                            />
                        </svg>
                    </NavLink>
                </div>
                <p className="px-10">{details.attributes.description}</p>
                <div className="mt-4 mx-6 text-gray-60 bg-gray-200 p-3 pl-5 rounded-md">
                    <dd className="mt-1"><span className="font-semibold">Frequency: </span> {details.attributes.frequency}</dd>
                    <dd className="mt-1"><span className="font-semibold">Start: </span> {startDate}</dd>
                    <dd className="mt-1"><span className="font-semibold">End: </span> {endDate}</dd>
                </div>
            </div>
            <div className="font-semibold mt-0 mb-5 mx-6 text-gray-60 bg-gray-200 p-3 pl-5 pr-5 rounded-md hover:bg-lime-200 hover:cursor-pointer">
                <button onClick={e => {
                    loadForm(e, questionActive, setQuestionActive)
                }}>Got A Question About This Habit?</button>
            </div>
        </div>
    )
}

export default FlowerDetails;
