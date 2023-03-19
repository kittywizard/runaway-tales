import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const Register = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const register = (email, password, username) =>
    supabase.auth.signUp({email: email, password: password, options: {data: {username: username}}});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    //check to see the passwords match
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords don't match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value
      );
      if (!error && data) {
        setMsg(
          "Registration Successful. Check your email to confirm your account"
        );
      }
    } catch (error) {
        console.log(error)
      setErrorMsg("Error in Creating Account");
    }
    setLoading(false);
  };

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
                        ref={usernameRef}
                    />
                </div>
                
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input 
                        id="email"
                        className="inputField bg-dark-green text-white rounded-md m-2 p-2"
                        placeholder='email'
                        type="email"
                        ref={emailRef}   
                    />
                 </div>

                 <div>
                    <label htmlFor='password'>Password:</label>
                    <input 
                        id="password"
                        className="inputField bg-dark-green text-white rounded-md m-2 p-2"
                        placeholder='password'
                        type="password"
                        ref={passwordRef}
                    />
                </div>

                <button>Sign up!</button>
            </form>
        </>

    </div>
    )
}

export default Register;