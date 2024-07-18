import { toast } from 'react-toastify';
import './login.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';


const Login = () => {
    const handleLogin =async (e) =>{
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const {email,password} = Object.fromEntries(formData)

        try {
            await signInWithEmailAndPassword(auth,email,password)
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }
    const [loading, setLoading] = useState(false)

    return (
        <div className='login'>
            <div className="item">
                <h2><center>Welcome !</center></h2>
                <form onSubmit={handleLogin}>
                   <input type="text" placeholder='Email' name="email" /> 
                   <input type="password" placeholder='Password' name="password" /> 
                   <button disabled={loading} > {loading ? "Loading" : "Sign In"}</button>
                </form>
              
            </div>
        </div>
    );
};

export default Login;