import classes from './welcome.module.css';
import Link from 'next/link';
function welcome(){
    return(
    <div className={classes.welcomepage}>
        <div className={classes.welcome}>Welcome to AlphaBI GIF Website</div>
        <div>
            <Link className={classes.loginrefer} href='/login'>Go to login Page</Link>
        </div>
    </div>
    )
}

export default welcome