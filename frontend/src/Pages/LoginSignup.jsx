import React, { useContext, useState } from 'react'
import './CSS/LoginSignup.css'
import { ShopContext } from '../Context/ShopContext';
const LoginSignup = () => {

const [state,setState]=useState("Login");
const[formData,setFormData]= useState({
  username:"",
  password:"",
  email:""
})
const {backendUrl} = useContext(ShopContext)

const login = async()=>{
  console.log("Login function executed",formData);
   let responseData;
  await fetch(backendUrl+'/login',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData),
  }).then((response)=>response.json()).then((data)=>responseData=data)

  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }else{
    alert(responseData.errors)
  }

}

const signUp = async()=>{
  console.log("SignUp function executed",formData);
  let responseData;
  await fetch(backendUrl+'/signup',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData),
  }).then((response)=>response.json()).then((data)=>responseData=data)

  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }else{
    alert(responseData.errors)
  }
}

const changeHandler = (e)=>{
 setFormData({...formData,[e.target.name]:e.target.value})
}


  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
            <h1>{state}</h1>
            <div className="loginsignup-fields">
                {state==="Sign Up"?<input type='text' name='username' value={formData.username} onChange={changeHandler} placeholder='Your Name' />:<></>}
                <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
                <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
            </div>
            <button onClick={()=>{state==="Login"?login():signUp()}}>Continue</button>
            {
              state==="Sign Up"?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login Here</span></p>:<p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>
}
            
            <div className="loginsignup-agree">
                <input type='checkbox' name='' id=''/>
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
        </div>
    </div>
  )
}

export default LoginSignup