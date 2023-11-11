import Header from './header';
import classes from './Layout.module.css';

function Layout(props) {
  return (
    <div className={classes.main}>
      <Header></Header>
      <main >{props.children}</main>
    </div>
  );
}

export default Layout;