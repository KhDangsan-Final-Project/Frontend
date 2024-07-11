import React, { useState } from 'react';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        id: '',
        grantNo: '',
        password: '',
        email: '',
        name: '',
        nickname: '',
        profile: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8090/ms3/user/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.msg);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    };

    return (
        <div>
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:
                    <input type="text" name="id" value={formData.id} onChange={handleChange} />
                </label><br /><br />

                <label>
                    Grant No:
                    <input type="number" name="grantNo" value={formData.grantNo} onChange={handleChange} />
                </label><br /><br />

                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label><br /><br />

                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label><br /><br />

                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label><br /><br />

                <label>
                    Nickname:
                    <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
                </label><br /><br />

                <label>
                    Profile:
                    <input type="text" name="profile" value={formData.profile} onChange={handleChange} />
                </label><br /><br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default UserRegistration;
