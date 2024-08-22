  import React, { useEffect, useState } from 'react'
  import './authentication.css'
  import { FaUserAlt } from "react-icons/fa";
  import { IoMdLock } from "react-icons/io";
  import { MdEmail } from "react-icons/md";
  import { FaPhone } from "react-icons/fa6";
  import signUp from '../../images/signin.png';
  import { Link } from 'react-router-dom';
  import { IoEye , IoEyeOff  } from "react-icons/io5";
  import errorObj from './ErrorMsg';
  // import 'errorObj' from ''

  const Register = () => {
    // track ragistration state 
    const [isRegister, setIsRegister] = useState(false);
    // State to store form data
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      pass: '',
      cpass: '',
      mobile: '',
    });
    // state for store error messages
    const [error, setError] = useState({})
    // password show hide icon state 
    const [passVisibility , setPassVisibility] = useState(false)
    const [confirmpassVisibility , setConfirmPassVisibility] = useState(false)

    const {emptyName , invalidName , emptyEmail , invalidEmail , emptyPassword , invalidPassword , emptyConfirmPassword , passNotMatch , emptyMob , invalidMob} = errorObj

    // update form values on input change 
    const handleFormValue = (e) => {
      const { name, value } = e.target
      setFormData({
        ...formData,
        // [name]: value
        [name]: value,
      })
      // Update the error state for the current field to an empty string
    setError({
      ...error,
      [name]: '',
    });
    }
    // form submit function 
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const { username, pass, cpass, mobile, email , agreeTerm } = formData;
      const newError = {};
      // validation conditions start
      const nameReg = /^[a-zA-Z\s]*$/;
      const emailReg = /^\S+@\S+\.\S+$/;
      const mobReg = /^[6-9]\d{9}$/;
      const passwReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
      if (username.trim() === '') {
        setIsRegister(false);
        newError.username = emptyName;
      }if(!nameReg.test(username)){
        setIsRegister(false);
        newError.username = invalidName;
      }if (email.trim() === '') {
        setIsRegister(false);
        newError.email = emptyEmail;
      } if (!emailReg.test(email)) {
        setIsRegister(false);
        newError.email = invalidEmail;
      } if (pass.trim() === '') {
        setIsRegister(false);
        newError.pass = emptyPassword;
      } if (!passwReg.test(pass)) {
        setIsRegister(false);
        newError.pass = invalidPassword;
      } if (cpass.trim() === '') {
        setIsRegister(false);
        newError.cpass = emptyConfirmPassword;
      } if (pass !== cpass) {
        setIsRegister(false);
        newError.cpass = passNotMatch;
      } if (mobile.trim() === '') {
        setIsRegister(false);
        newError.mobile = emptyMob;
      } if (!mobReg.test(mobile)) {
        setIsRegister(false);
        newError.mobile = invalidMob;
      }else {
        const storedUserData = JSON.parse(localStorage.getItem('userInfo')) || [];
        console.log(storedUserData);
        const existEmailid = storedUserData.find((userinfo) => userinfo.email === email)
        if (existEmailid) {
          setIsRegister(false);
          alert('Email Id Already Exist')
        } else {
          setIsRegister(true);
          localStorage.setItem('userInfo', JSON.stringify([...storedUserData, formData]))
          alert('Form Submit successfully')
          
        }
      }
      setError(newError)
    }

    const togglePassVisiblity = () => {
      setPassVisibility(!passVisibility)
    }
    const toggleConfirmPassVisiblity = () => {
      setConfirmPassVisibility(!confirmpassVisibility)
    }

    useEffect(() => {
      // fetchLoginData();
    }, []);

    // const handleDelete = () => {
    //   localStorage.clear();
    //   alert("LocalStorage data cleared!");
    // }

    return (
      <div className='register_page'>
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form className="register-form" id="register-form">
                  <div className={`form-group set_pos ${error.username ? 'errors' : ''}`}>
                    <label htmlFor="name" className='comm_label'> <FaUserAlt /> </label>
                    <input type="text" name="username" id="name" placeholder="Your Name" className='comm_input' value={formData.username} onChange={handleFormValue} />
                    <p className='error-msg'> {error.username} </p>
                  </div>
                  <div className={`form-group set_pos ${error.email ? 'errors' : ''}`}>
                    <label htmlFor="email" className='comm_label'> <MdEmail /> </label>
                    <input type="text" name="email" id="email" placeholder="Your Email" className='comm_input' value={formData.email} onChange={handleFormValue} />
                    <p className='error-msg'> {error.email} </p>
                  </div>
                  <div className={`form-group set_pos ${error.pass ? 'errors' : ''}`}>
                    <label htmlFor="pass" className='comm_label'> <IoMdLock /> </label>
                    <input type={passVisibility ? 'text' :'password'} name="pass" id="pass" placeholder="Password" className='comm_input' value={formData.pass} onChange={handleFormValue} />
                    <span onClick={togglePassVisiblity}>
                    {passVisibility ? <IoEye className='password_icon' /> : <IoEyeOff className='password_icon' /> }
                    </span>
                    <p className='error-msg'> {error.pass} </p>
                  </div>
                  <div className={`form-group set_pos ${error.cpass ? 'errors' : ''}`}>
                    <label htmlFor="re-pass" className='comm_label'> <IoMdLock /> </label>
                    <input type= {confirmpassVisibility ? 'text' :'password'} name="cpass" id="cpass" placeholder="Repeat your password" className='comm_input' value={formData.cpass} onChange={handleFormValue} />
                    <span onClick={toggleConfirmPassVisiblity}>
                    {confirmpassVisibility ? <IoEye className='password_icon' /> : <IoEyeOff className='password_icon' /> }
                    </span>
                    <p className='error-msg'> {error.cpass} </p>
                  </div>
                  <div className={`form-group set_pos ${error.mobile ? 'errors' : ''}`}>
                    <label htmlFor="mob" className='comm_label'> <FaPhone /> </label>
                    <input type="text" name="mobile" id="mobile" placeholder="Enter Mobile Number" className='comm_input' value={formData.mobile} onChange={handleFormValue} maxLength={10} />
                    <p className='error-msg'> {error.mobile} </p>
                  </div>
                  {/* <div className="form-group">
                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term comm_input" value={formData.agreeTerm} onChange={handleFormValue} />
                    <label htmlFor="agree-term" className="label-agree-term comm_label">I agree all statements in <Link to="#" className="term-service">Terms of service</Link></label>
                    <p className='error-msg'> {error.agreeTerm} </p>
                  </div> */}
                  {/* <div className="form-group form-button">
                    <input type="submit" name="signup" id="signup" className="form-submit comm_input" defaultValue="Register" />
                  </div> */}
                  <div className='submit_btn' onClick={handleFormSubmit}>
                    <span> Register </span>
                  </div>
                </form>
                {/* <button onClick={handleDelete}> Delete </button> */}
              </div>
              <div className="signup-image">
                <figure><img src={signUp} /></figure>
                <Link to={'/login'} className="signup-image-link">I am already member</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  export default Register
