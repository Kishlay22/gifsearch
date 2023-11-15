const { useState,useEffect } = require("react");
import classes from './FavourateList.module.css';
import {useRouter} from 'next/router';
import {auth} from '../../config/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';

function FavourateList(){
    const [favourate,setFavourates]=useState([]);

    async function fetchfavourate()
    {
        try{
    const response=await fetch('https://alphabi-7aa14-default-rtdb.firebaseio.com/favourates.json');
    if(!response)
      throw new Error('Something Went Wrong');
    const data=await response.json();
    console.log("favourates",data);
    const loadedFavourates=[];
    for (const key in data){
      loadedFavourates.push({
        id:key,
        name:data[key].user
      });}
    setFavourates(loadedFavourates);

  }
  catch(error){
    console.log(error.message);  
    }
}

console.log(favourate);

const Router=useRouter();    
function signoutHandler(event) {
        event.preventDefault();
    signOut(auth).then(() => {
        Router.push('/');}
    ).catch((error) => {
        console.log("error");
  });
}

useEffect(()=>{
    fetchfavourate();
},[])
  return(
    <div>
         <div className={classes.header}>
            <div className={classes.title}>AlphaBI GIF Website</div>
            <div className={classes.leftportion}>
                <Link className={classes.reverselink}href='./gifhome'>Back</Link>
            <button onClick={signoutHandler} className={classes.col2part}>Logout  </button>
            </div>
        </div>
    
    <div className={classes.gridgallery}>
        
     {!favourate && <h1>No Favourates Added</h1>}   
     {favourate && favourate.map((gif) => (
        <div className={classes.griditem}>
        <img src={gif.name} alt={gif.title} />
        </div>))}
        </div>
    </div>
  )
}

export default FavourateList;