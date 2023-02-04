import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUser] = useState('');
    const [session, setSession] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            //grab username and password from form
            const {data, error} = await supabase.auth.signInWithPassword({
                email: '',
                password: ''
                //replace with variables
            })

        } catch (error) {  
            alert(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    
    const handleSignUp = async (e) => {
        e.preventDefault();

        console.log('do the sign up thing');
    }

    return (
        <section className='container mx-auto flex-col justify-center bg-gray-green-light p-2 max-w-xs'>
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
                    </form>
                </>

            </div>
        </section>
    )
}