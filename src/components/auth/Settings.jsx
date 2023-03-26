import { useRef, useState } from "react";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";

export default function Settings() {
    const {passwordReset} = useAuth();
    const emailRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
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
    return (
        <section>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address:</label>
                <input type="email" ref={emailRef} required/>
                <button type="submit">Reset</button>
            </form>
        </section>
    )
}