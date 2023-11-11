import classes from './header.module.css';
import Link from 'next/link';

function Header(){
    return(
        <div className={classes.header}>
            <div className={classes.col1}>AlphaBI GIF Website</div>
            <div className={classes.col2}>
                <Link className={classes.headerlink} href='/'>Home</Link>
                <Link className={classes.headerlink} href='/about'>Project Creator Details</Link>
            </div>
        </div>
    )
}

export default Header;