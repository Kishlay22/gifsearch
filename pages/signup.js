import Layout from '@/components/Layout/Layout';
import Register from '../components/Forms/registration';
import  {createUserWithEmailandPassword} from 'firebase/auth';
import { auth } from '../config/firebase';
function SendToDatabase(userinput){
    console.log(userinput);
}

function Signup(){
    return (
        <Layout>
            <Register onRegister={SendToDatabase}></Register>
        </Layout>
    )
}

export default Signup;