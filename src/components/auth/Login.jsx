import React from "react";

const Login = () => {
    return (
        <div>
            <h3 className='font-bold text-2xl text-dark-green p-2 text-center'>Sign in</h3>
            {loading ? 
            'Please wait blah blah..'
            :
            <>
                <form onSubmit={handleLogin} className="m-2">
                    <input 
                        id="email"
                        className='inputField bg-dark-green text-white rounded-md m-2 p-2'
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        id="password"
                        className="inputField bg-dark-green text-white rounded-md m-2 p-2"
                        placeholder='password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='bg-dark-green rounded-md py-2 px-3 text-white font-bold'>
                        Login
                    </button>
                </form>
                <button className='font-bold text-dark-green hover:text-black'>Sign up</button>
            </>
            }
        </div>
    )
}

export default Login;