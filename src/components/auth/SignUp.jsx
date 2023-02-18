import {useState } from "react";
import React from "react";

const SignUp = () => {
    return (
        <div className='container mx-auto flex-col justify-center bg-gray-green-light p-2'>
        <h3 className='font-bold text-2xl text-dark-green p-2 text-center'>Sign Up</h3>
        <>
            <form onSubmit={handleSignUp} className="m-2 flex-col justify-center">
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input 
                        id="username"
                        className="inputField bg-dark-green text-white rounded-md m-2 p-2"
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>
                
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input 
                        id="email"
                        className="inputField bg-dark-green text-white rounded-md m-2 p-2"
                        placeholder='email'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                    />
                 </div>

                 <div>
                    <label htmlFor='password'>Password:</label>
                    <input 
                        id="password"
                        className="inputField bg-dark-green text-white rounded-md m-2 p-2"
                        placeholder='password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button>Sign up!</button>
            </form>
        </>

    </div>
    )

}

export default SignUp;