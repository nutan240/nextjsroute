"use client"
import { useState } from 'react';

const DashboardPage = () => {
    const [email, setEmail] = useState("");
    const [submittedEmail, setSubmittedEmail] = useState("");

    const handleSubmit = (event:any) => {
        event.preventDefault();
        setSubmittedEmail(email);
        setEmail('')
    };
    
    const handleChange = (event:any) => {
        setEmail(event.target.value);
    };

    return (
        <div className="px-10 py-10">
            <h1 className="text-blue-500 text-2xl font-sans font-bold">Dashboard page</h1>
            <form className="px-4 py-6" onSubmit={handleSubmit}>
                <input
                    className="bg-gray-200 px-1 py-2 mr-4"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />
                <button className="px-4 bg-orange-900 py-2 text-white" type="submit">Submit</button>
            </form>
            {submittedEmail && (
                <div className="mt-4">
                    <p className="text-gray-700"> Email : {submittedEmail}</p>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
