import { useRef, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";

export default function Settings() {
    const {passwordReset, updatePassword} = useAuth();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const { data, error } = await passwordReset(emailRef.current.value);
          console.log(error);
          console.log(data);
          setMsg("Password reset has been sent to your email");
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
      };

      const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!passwordRef.current?.value || !confirmPasswordRef.current?.value) {
          setErrorMsg("Please fill all the fields");
          return;
        }
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
          setErrorMsg("Passwords don't match. Try again");
          return;
        }
        try {
          setErrorMsg("");
          setLoading(true);
          const { data, error } = await updatePassword(passwordRef.current.value);
          if (!error) {
            navigate("/");
          }
        } catch (error) {
          setErrorMsg("Error in Updating Password. Please try again");
        }
        setLoading(false);
      };
    
    return (
        <section>
            <div>
                <h2 className="font-bold text-2xl text-dark-green p-2 text-center">Reset Password</h2>
                <form onSubmit={handleResetSubmit}>
                    <label htmlFor="email">Email Address:</label>
                    <input className='inputField bg-dark-green text-white rounded-md m-2 p-2' type="email" ref={emailRef} required />
                    <button type="submit" className='bg-dark-green rounded-md py-2 px-3 text-white font-bold'>Reset</button>
                </form>
            </div>
            <div>
                <h2 className="font-bold text-2xl text-dark-green p-2 text-center">Update Password</h2>
                <form onSubmit={handleUpdateSubmit}>
                    <label htmlFor="password">New Password:</label>
                    <input  className='inputField bg-dark-green text-white rounded-md m-2 p-2' type="password" ref={passwordRef} required/>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input  className='inputField bg-dark-green text-white rounded-md m-2 p-2' type="password" ref={confirmPasswordRef} required />
                    <button type="submit" className='bg-dark-green rounded-md py-2 px-3 text-white font-bold'>Reset</button>
                </form>
            </div>
        </section>
    )
}