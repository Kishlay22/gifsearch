import classes from './loginform.module.css';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Card from '../ui/Card';
import {auth} from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
function Loginform(props){
    const router=useRouter();
    const passwordInputRef = useRef();
  const emailInputRef = useRef();


    function submitHandler(event) {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        signInWithEmailAndPassword(auth,enteredEmail,enteredPassword).then(
            (userCredential)=>{
                // const user=userCredential.user;
                // console.log(user);
                router.push('/gifhome');
            }).catch((error)=>{
                alert("User ID or Password is wrong")
            });
    }
      
    return(
      <Card>
        <form className={classes.loginform} onSubmit={submitHandler}>
          <div className={classes.loginhead}>Login</div>
          <div className={classes.control}>
              <label htmlFor='email'>Email Id</label>
              <input type='email' required id='email' ref={emailInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='password'>Password</label>
              <input type='password' required id='password' ref={passwordInputRef} />
            </div>
            <div className={classes.actions}>
              <button>Login</button>
            </div>
            <div className={classes.registerpart} >
              <div> Not Registered---&nbsp; &nbsp;</div> 
                <Link className={classes.registerbtn} href='/signup'>Click here to Register</Link>
            </div>
        </form>
        </Card>
    )
}

export default Loginform;