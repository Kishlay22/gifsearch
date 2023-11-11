import Layout from "../components/Layout/Layout";
import LoginForm from '../components/Forms/loginform';
  function LoginHandlers(userinput){
        console.log(userinput);
    }
function Login(){
    return (
    <Layout>
           <LoginForm />
    </Layout>)
}

export default Login;