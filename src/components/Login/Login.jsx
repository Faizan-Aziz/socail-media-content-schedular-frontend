import { useState, useEffect } from 'react'
import './Login.css'
import axios from "axios"
import Loader from '../Loader/loader.jsx'
import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // ✅ Import eye icons

const Login = ({ funcSetLogin, setLoginFunc }) => {
  const [Loading, setLoading] = useState(false)
  const [inputfield, setinputfield] = useState({ email: "", password: "" })
  const [shouldNavigate, setShouldNavigate] = useState(false)
  const [showPassword, setShowPassword] = useState(false) // ✅ Password visibility state

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/dashboard')
      setShouldNavigate(false)
    }
  }, [shouldNavigate, navigate])

  const handleClickNotRegister = () => {
    funcSetLogin(false)
  }

  const handleonchnage = (event, key) => {
    setinputfield((prev) => ({
      ...prev, [key]: event.target.value
    }))
  }

  // ✅ Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = async () => {
    try {
      setLoading(true);
    
      const response = await axios.post("/api/auth/login", inputfield, {
        withCredentials: true   //to accept the cookie from the server auto set in brower cokkie
      })

      // const token = response.data.token;
      // const decoded = jwtDecode(token);
      // console.log(decoded);

      let userInfo = response.data.user
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("islogin", true)
      setLoginFunc(true)     //this true the value islogin and we will then always go to the home page if login true beacuse i saved in the cookie so if cookie true back to login not worked 
      setShouldNavigate(true)
      toast.success(response.data.message);

    } catch (err) {
      let error = err.response.data.message;
      toast.error(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='login'>
      {Loading && <Loader />}
      
      <div className='Register-card'>
        <div className='card-name'>
          Login
        </div>

        <div className='Login-form'>
          <input 
            value={inputfield.email} 
            onChange={(event) => handleonchnage(event, "email")} 
            type="email"
            className='inputbox' 
            placeholder='Enter Email'
          />
          
          {/* ✅ Password field with visibility toggle */}
          <div className="password-input-wrapper">
            <input 
              value={inputfield.password} 
              onChange={(event) => handleonchnage(event, "password")} 
              type={showPassword ? "text" : "password"} // ✅ Toggle type
              className='inputbox' 
              placeholder='Enter Password' 
            />
            <span 
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div onClick={handleLogin} className='button'>Login</div>
          <div className='LinkedLinks' onClick={handleClickNotRegister}>Not Register Yet</div>
        </div>
      </div>
    </div>
  )
}

export default Login