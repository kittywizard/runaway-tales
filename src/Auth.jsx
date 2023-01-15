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
        <div>
            Sign in
            {loading ? ( 'Sending a link.. ')
            :
            (
                <form onSubmit={handleLogin}>
                    <input 
                        id="email"
                        className='inputField'
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button>
                        Send link
                    </button>
                </form>
            )}
        </div>
    )
}