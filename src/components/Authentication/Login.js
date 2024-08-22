import React , { useEffect, useState } from 'react'
import './authentication.css'
import { FaUserAlt } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import signIn from '../../images/signin.png';
import { Link } from 'react-router-dom';
import { IoEye , IoEyeOff  } from "react-icons/io5";
import { useGlobalContext } from '../../Context';
// import { useHistory } from 'react-router-dom';

const Login = () => {
  // track login state 
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  let { loginDispatch } = useGlobalContext();

  // get login form data
  const [loginData, setLoginData] = useState({
    email: '',
    pass: '',
    // mobile: '',
  });

  const [passVisibility, setPassVisibility] = useState(false)

  // state to store register user data.
  const [lsData, setLsData] = useState([]);

  // redirect to home page after right credentials
  // const history = useHistory();

      // update form values on input change 
      const handleLoginData = (e) => {
        const { name, value } = e.target
        setLoginData({
          ...loginData,
          // [name]: value
          [name]: value,
        })
      }

  useEffect(() => {
    const fetchData = localStorage.getItem('userInfo');
    // console.log(fetchData); 
    if (fetchData) {
      const parseData = JSON.parse(fetchData);
      setLsData(parseData);
      console.log(lsData);
    }
  }, []);

  const togglePassVisiblity = () => {
    setPassVisibility(!passVisibility)
  }

  // check login credintials
    const checkLoginCredentials = () => {
    const { email, pass } = loginData;
    let isCredentialMatch = false;
    lsData.forEach((currVal) => {
      if (currVal.email === email && currVal.pass === pass) {
        isCredentialMatch = true;

      }
    });
    console.log(isCredentialMatch);
    if (isCredentialMatch) {
      loginDispatch({ type: "SET_LOGIN_STATE", payload: true });
      alert("Login successful!");
    } else {
      loginDispatch({ type: "SET_LOGIN_STATE", payload: false });
      alert("Email and password do not match. Please try again.");
    }
    isCredentialMatch = false; // reset isCredentialMatch to false
    };

  return (
    <div className='login_page'>
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure><img src={signIn}  alt="sing up image" /></figure>
              <Link to={'/register'} className="signup-image-link">Create an account</Link>
            </div>
            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <form method="POST" className="register-form" id="login-form">

                <div className="form-group set_pos">
                  <label htmlFor="email_mob" className='comm_label'> <FaUserAlt /> </label>
                  <input type="text" name="email" id="email_mob" placeholder="Enter email id or mobile number" className='comm_input' value={loginData.email} onChange={handleLoginData} />
                </div>

                <div className="form-group set_pos">
                  <label htmlFor="your_pass" className='comm_label'> <IoMdLock /> </label>
                  <input type={passVisibility ? 'text' : 'password'} name="pass" id="your_pass" placeholder="Password" className='comm_input' value={loginData.pass} onChange={handleLoginData} />
                  <span onClick={togglePassVisiblity}>
                    {passVisibility ? <IoEye className='password_icon' /> : <IoEyeOff className='password_icon' /> }
                    </span>
                </div>

                {/* <div className="form-group">
                  <input type="checkbox" name="remember-me" id="remember-me" className="agree-term comm_input" onChange={handleCheckBox} checked={isChecked} />
                  <label htmlFor="remember-me" className="label-agree-term comm_label">Remember me</label>
                </div> */}
                <div className='login_btn' onClick={checkLoginCredentials}>
                    <span> Login </span>
                  </div>
              </form>
              <div className="social-login">
                <span className="social-label">Or login with</span>
                <ul className="socials">
                  <li className='facebook_icon'><Link to="#"> <FaFacebookF className='social_icon' /> </Link></li>
                  <li className='twitter_icon'><Link to="#"> <FaTwitter className='social_icon' /> </Link></li>
                  <li className='google_icon'><Link to="#"> <FaGoogle className='social_icon' /> </Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

export default Login
