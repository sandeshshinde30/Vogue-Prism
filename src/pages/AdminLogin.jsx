import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLoginCSS from '../css/AdminLoginCSS.css';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Static values for validation
        const validUsername = 'director@vogueprism.com'; // replace with your static username
        const validPassword = 'vogueprism'; // replace with your static password

        // Check credentials --------------------------
        if (username === validUsername && password === validPassword) {
            // Navigate to AdminMain page
            navigate('/admin');
        } else {
            alert('Invalid credentials, please try again.');
        }
    };   
        

    return (
        <>
            {/* <div className="backgroundd">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>   */    }

            <div className='main-div flex'>
                <form onSubmit={handleSubmit}>
                    <h3>Login Here</h3>

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Email or Phone"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />

                    <button className="submitbutton" type="submit">Log In</button>
                </form>
                <div className='md:hidden lg:flex flex-col justify-center p-12 hidden'>
                    <img src="../signup-image.jpg   " alt="" className='block w-70 min-w-52'/>
                </div> 
            </div>
            
        </>
    );
}

export default AdminLogin;
