import { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import Intro from "../Intro";

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
      <>
        <div className=" p-6 mb-3 mx-auto container flex items-center justify-between bg-gray-green-light rounded-b-lg shadow-sm shadow-gray-dark/40">
          <h1 className="text-dark-green text-4xl font-bold font-serif">
                <Link to="/">Runaway Tales</Link>
          </h1>
          <p className="text-gray">A Writing Prompt Generator</p>
        </div>

        <Intro />

        <div className="p-6 mb-3 mx-auto container">
            <h3 className='font-bold text-2xl text-dark-green p-2 text-center'>Sign in</h3>
            <p className="p-2 text-sm text-center">
              Sign in or sign up to create an account to save your RaTs progress, track your goals and more!
            </p>
            {loading ? 
            'Please wait..'
            :
            <>
                <form onSubmit={handleLogin} className="mx-auto container flex flex-col items-center justify-center">
                    <input 
                        id="email"
                        className='inputField bg-dark-green text-white rounded-md m-4 p-2'
                        placeholder='email'
                        ref={emailRef}
                    />
                    <input 
                        id="password"
                        className="inputField bg-dark-green text-white rounded-md m-4 p-2"
                        placeholder='password'
                        type="password"
                        ref={passwordRef}
                    />
                    <button className='bg-dark-green rounded-md py-2 px-3 mt-4 text-lg text-white font-bold'>
                        Login
                    </button>
                <Link to="/register" className='mt-4 font-bold text-lg text-dark-green hover:text-black'>Sign up</Link>
                </form>
            </>
            }
        </div>
      </>
    )
}

export default Login;