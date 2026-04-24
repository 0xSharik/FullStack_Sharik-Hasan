import React, { useState } from "react";

function ContactForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);

        console.log({
            name: name,
            email: email,
            age: age
        });
    }

    if (submitted) {
        return (
            <div>
                <h1>(thumbs up emjoji)</h1>
                <p>done</p>
                <button onClick={() => setSubmitted(false)}>Reset</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label>Name:</label>
                <input
                    placeholder="name "
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Submit</button>

        </form>
    );
}

export default ContactForm;