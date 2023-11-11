import { useRef, useState } from 'react';
import  {createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../config/firebase';
import Card from '../ui/Card';
import classes from './regs.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Registration(props) {
  const [isEqual,setIsEqual]=useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
const Router=useRouter();
  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;
    if(enteredConfirmPassword!==enteredPassword)
       {
        setIsEqual(false);
        return;
       }
   createUserWithEmailAndPassword(auth,enteredEmail,enteredPassword).then(
    (userCredential)=>{
        const user=userCredential.user;
        alert('SignUP Successful');
        Router.push('/login');
    }
   ).catch((error)=>{
    const errorCode=error.code;
    const errorMessage=error.message;
    alert(errorMessage);
   })
  }

  return (
    <Card>
        
      <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.registerhead}>Register</div>
        <div className={classes.control}>
          <label htmlFor='email'>Email Id</label>
          <input type='email' required id='email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' required id='password' ref={passwordInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='confirmpassword'>Confirm Password</label>
          <input type='password' required id='confirmpassword' ref={confirmPasswordInputRef} />
        </div>
        {!isEqual && <div className={`${classes.control} ${classes.alert}`} >
            Password do not match &nbsp; &nbsp;  &nbsp; &nbsp; Enter Again
            </div>}
        <div className={classes.actions}>
          <button>Register</button>
        </div>
        <div className={`${classes.control} ${classes.loginpart}`} >
           <div> Already Registered---&nbsp; &nbsp;</div> 
            <Link className={classes.loginbtn} href='/login'>Click here to login</Link>
        </div>
      </form>
      
    </Card>
  );
}

export default Registration;
