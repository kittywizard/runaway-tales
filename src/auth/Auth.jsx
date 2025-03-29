import { useState, createContext } from 'react';
import { supabase } from '../supabaseClient';
import SignUp from "../components/auth/Register";
import Login from "../components/auth/Login";

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
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password
            })
        } catch (error) {  
            alert(error.message);
            console.log(error);
        } finally {
            setLoading(false);
            console.log('login successful');
            setSession(data.session);
            setUser(data.user);
        }
    }
    
    const handleSignUp = async (e) => {
        e.preventDefault();

        const {data, error} = await supabase.auth.signUp({
            email,
            password
        },
        {
            data: {
                username
            }
        })
        if(error) {
            alert(error.message);
        } else {
            setUser(data.user)
            console.log('user created successfully')
            
        }
    }

    return (
        <section className='container mx-auto flex-col justify-center bg-gray-green-light p-2 max-w-xs'>
           <Login />

            <SignUp />
        </section>
    )
}