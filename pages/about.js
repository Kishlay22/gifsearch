import Layout from '@/components/Layout/Layout';
import classes from './about.module.css';

function about(){
    return(
        <Layout>
        <div className={classes.aboutme }>
            <div className={classes.myname}>Kishlay Kumar</div>
                <ul className={classes.mydetails}>
                <li>kishlay455@gmail.com</li>
                <li>+91-9060050455</li> 
                <li>National Institute of Science and Technology</li>
                </ul>
           
        </div>
        </Layout>
    )
}
export default about;