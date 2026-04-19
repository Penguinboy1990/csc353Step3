import React, {useState} from 'react';
function Card(props) {
    const [name, setName] = useState("Guest"); // initial value
    const [age, setAge] = useState(0);
    const [isEmployed, setIsEmployed] = useState(false);

    const updateName = () => {
        setName("Spongebob"); // uses the function instead of declaring variable directly
    }
    const incrementAge = () => {
        setAge(age + 1)
    }
    const toggleEmployedStatus = () => {
        setIsEmployed(!isEmployed);
    }

    return( <div>
        <p>Name: {name}</p>
        <button onClick={updateName}>Set Name</button>

        <p>Age: {age}</p>
        <button onClick={incrementAge}>Increment Age</button>

        <p>Is employed: {isEmployed ? "Yes" : "No"}</p>
        <button onClick={toggleEmployedStatus}>Toggle Employment Status</button>
    </div>);
}
export default Card
