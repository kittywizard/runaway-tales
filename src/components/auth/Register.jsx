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

  const handleSignUp = async (e) => {
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
      <>
        <div className=" p-6 mb-3 mx-auto container flex items-center justify-between bg-gray-green-light rounded-b-lg shadow-sm shadow-gray-dark/40">
          <h1 className="text-dark-green text-4xl font-bold font-serif">
                <Link to="/">Runaway Tales</Link>
          </h1>
          <p className="text-gray">A Writing Prompt Generator</p>
      </div>
      <div className='container mx-auto flex-col justify-center p-2'>
        <h3 className='font-bold text-2xl text-dark-green p-2 text-center'>Sign Up</h3>
        <>
            <form onSubmit={handleSignUp} className="mx-auto flex flex-col justify-center items-start">
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

                
                <div>
                    <label htmlFor='password'>Confirm Password:</label>
                    <input 
                        id="confirm_password"
                        className="inputField bg-dark-green text-white rounded-md m-2 p-2"
                        placeholder='password'
                        type="password"
                        ref={confirmPasswordRef}
                    />
                </div>


                <button className='bg-dark-green rounded-md py-2 px-3 mt-4 text-lg text-white font-bold'>Sign up!</button>
            </form>
            {errorMsg && (
              <div
                onClose={() => setErrorMsg("")}>
                {errorMsg}
              </div>
            )}
            {msg && (
              <div  onClose={() => setMsg("")}>
                {msg}
              </div>
            )}
        </>

    </div>
    </>
    )
}

export default Register;