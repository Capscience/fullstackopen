import { useState } from 'react'


const Button = ({text, handleClick}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}


const StatisticsLine = ({text, value}) => {
    return (
        <>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </>
    )
}


const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0) {
        return (
            <>
                <h1>Statistics</h1>
                <div>No feedback received yet</div>
            </>
        )
    }
    return (
        <>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <StatisticsLine text='good' value={good} />
                    <StatisticsLine text='neutral' value={neutral} />
                    <StatisticsLine text='bad' value={bad} />
                    <StatisticsLine text='all' value={good + neutral + bad} />
                    <Average good={good} neutral={neutral} bad={bad} />
                    <Positive good={good} neutral={neutral} bad={bad} />
                </tbody>
            </table>
        </>
    )
}


const Average = ({good, neutral, bad}) => {
    const avg = (good - bad) / (good + neutral + bad)
    return (
        <StatisticsLine text='average' value={avg} />
    )
}


const Positive = ({good, neutral, bad}) => {
    const pos = (good) / (good + neutral + bad)
    return (
        <StatisticsLine text='positive' value={pos} />
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give feedback</h1>
            <Button text={'good'} handleClick={() => setGood(good + 1)}/>
            <Button text={'neutral'} handleClick={() => setNeutral(neutral + 1)}/>
            <Button text={'bad'} handleClick={() => setBad(bad + 1)}/>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
}

export default App;
