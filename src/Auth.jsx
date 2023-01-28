import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

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
    return (
        <div className='container mx-auto flex-col justify-center bg-gray-green-light p-2 max-w-xs'>
            <h3 className='font-bold text-2xl text-dark-green p-2'>Sign in</h3>
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