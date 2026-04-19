import React, {useState} from 'react';
import PropTypes from 'prop-types' // this is old
function Card(props) {
    const [task, setTask] = useState("Do Something"); // initial value
    const [isCompleted, setIsCompleted] = useState(false);

    const updateTask = () => {
        setTask(task); // uses the function instead of declaring variable directly
    }
    const toggleCompleted = () => {
        setIsCompleted(!isCompleted);
    }

    return( <div>
        <p>task: {task}</p>
        <button onClick={updateTask}>Set Task</button>

        <p>Is employed: {isCompleted}</p>
        <button onClick={toggleCompleted}>Toggle Completed</button>
    </div>);
}
Card.propTypes = {
    id: PropTypes.number,
    task: PropTypes.string,
    isCompleted: PropTypes.bool,
}
export default Card
