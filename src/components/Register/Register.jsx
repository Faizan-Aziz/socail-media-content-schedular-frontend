import React from 'react'
import './Register.css'
import { useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/loader';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = ({ funcSetLogin }) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [inputField, setinputField] = useState({
        name: "",
        email: "", 
        password: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: ""
    });

    const GotoLogin = () => {
        funcSetLogin(true);
    };

    const handleonchange = (event, key) => {
        setinputField(prev => ({
            ...prev,
            [key]: event.target.value
        }));
        
        // Clear error when user starts typing
        if (errors[key]) {
            setErrors(prev => ({
                ...prev,
                [key]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: "",
            email: "",
            password: ""
        };

        let isValid = true;

        // Name validation
        if (!inputField.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        // Email validation
        if (!inputField.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(inputField.email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        // Password validation
        if (!inputField.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (inputField.password.length < 5) {
            newErrors.password = "Password must be at least 5 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async () => {
        if (!validateForm()) {
            toast.error("Please fix the errors before submitting");
            return;
        }

        setLoading(true);
        
        try {
            const response = await axios.post("/api/auth/register", inputField);
            
            // ✅ Show success toast
            toast.success("Registration successful! Please login.");
            
            // ✅ Clear form
            setinputField({
                name: "",
                email: "", 
                password: ""
            });
            
            // ✅ Go to login after short delay
            setTimeout(() => {
                GotoLogin();
            }, 1500);
            
        } catch (err) {
            console.log(err);
            // ✅ Show error toast
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login'>
            {loading && <Loader />}
            
            <div className='Register-card'> 
                <div className='card-name'>Register</div>

                <div className='Login-form'>
                    {/* Name Field */}
                    <div className="input-container">
                        <input 
                            type="text" 
                            value={inputField.name}     
                            onChange={(event) => handleonchange(event, "name")}  
                            className={`inputbox ${errors.name ? 'error' : ''}`}
                            placeholder='Enter Name'
                            required
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    {/* Email Field */}
                    <div className="input-container">
                        <input 
                            type="email" 
                            value={inputField.email}   
                            onChange={(event) => handleonchange(event, "email")}  
                            className={`inputbox ${errors.email ? 'error' : ''}`}
                            placeholder='Enter Email'
                            required
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    {/* Password Field */}
                    <div className="input-container">
                        <div className="password-input-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"}
                                value={inputField.password}   
                                onChange={(event) => handleonchange(event, "password")}  
                                className={`inputbox ${errors.password ? 'error' : ''}`}
                                placeholder='Enter Password (min 5 characters)'
                                required
                            />
                            <span 
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <div 
                        onClick={loading ? null : handleRegister} 
                        className='button'
                        style={{ opacity: loading ? 0.6 : 1 }}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </div>
                    
                    <div className='LinkedLinks' onClick={GotoLogin}>
                        Already have an Account? Login
                    </div>
                </div>
            </div>
        </div> 
    );
};

export default Register;