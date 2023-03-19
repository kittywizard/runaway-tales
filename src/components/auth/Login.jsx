import { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg("Please fill in the fields");
        return;
      }
      const {
        data: { user, session },
        error
      } = await login(emailRef.current.value, passwordRef.current.value);
      if (error) setErrorMsg(error.message);
      if (user && session) navigate("/");
    } catch (error) {
      setErrorMsg("Email or Password Incorrect");
    }
    setLoading(false);
  };


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
                        ref={emailRef}
                    />
                    <input 
                        id="password"
                        className="inputField bg-dark-green text-white rounded-md m-2 p-2"
                        placeholder='password'
                        type="password"
                        ref={passwordRef}
                    />
                    <button className='bg-dark-green rounded-md py-2 px-3 text-white font-bold'>
                        Login
                    </button>
                </form>
                <Link to="/register" className='font-bold text-dark-green hover:text-black'>Sign up</Link>
            </>
            }
        </div>
    )
}

export default Login;