import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {auth} from '../../config/firebase';
import classes from './gif.module.css';
import { signOut } from 'firebase/auth';
import Link from 'next/link';


const Gif = () => {
const Router=useRouter();    
function signoutHandler(event) {
        event.preventDefault();
    signOut(auth).then(() => {
        Router.push('/');}
    ).catch((error) => {
        console.log("error");
  });
}

    const [inputvalue,setInputvalue]=useState('');
    const [searchQuery,setSearchQuery]=useState('');
    const API_KEY = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(12);
    const [gifs, setGifs] = useState([]);
    const [firstPage,setFirstPage]=useState(1);
    const [secondPage,setSecondPage]=useState(2);
    const [thirdPage,setThirdPage]=useState(3);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setInputvalue(e.target.value);
        setSearchQuery(e.target.value);
        
        const response = await fetch(`https://api.giphy.com/v1/gifs/search/?api_key=${API_KEY}&q=${searchQuery}`);
        const parsedData = await response.json();
        console.log(parsedData.data);
        setGifs(parsedData.data);
    }

    function addFavourate(gif)
    {
      console.log(gif);
      fetch('https://alphabi-7aa14-default-rtdb.firebaseio.com/favourates.json',
            {method:'POST',
            body:JSON.stringify({
                user:gif.images.fixed_height.url
            })

            }
       )
  alert("Added to Favourates");
    }
           
return(
    <div>
    <div className={classes.header}>
            <div className={classes.col1}>AlphaBI GIF Website</div>
            <div className={classes.leftcol1}>
            <Link className={classes.favlink} href='/favourates' >Favourate</Link>
            <button onClick={signoutHandler} className={classes.col2}>Logout  </button>
            </div>
    </div>        
    <form  className={classes.searcharea}>
        <input type='text' className={classes.searchbox} placeholder='Article Name or keywords...' onChange={handleSubmit} value={inputvalue} />
        <button className={classes.action} onClick={handleSubmit}>Search</button>
    </form>
    <div className={classes.gridgallery}>
     {gifs && gifs.slice(start, end).map((gif) => (
        <div className={classes.griditem}>
        <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
        <div className={classes.griditemdetails}>
           <div>{gif.username}</div>
           <div className={classes.favicon} onClick={()=>{addFavourate(gif)}}> Add to Favourate &#9733;</div>
        </div>
        </div>
    ))}
    </div>
    <div className={classes.paginggif}>
        <button className={classes.pagingbutton} disabled={start === 0} onClick={() => { setStart(start - 12); setEnd(end - 12)
         setFirstPage(firstPage-1); setSecondPage(secondPage-1); setThirdPage(thirdPage-1) }}>&lt; Previous</button>
        <button className={classes.pagingbutton} onClick={() => { setStart(start); setEnd(end)}}>{firstPage}</button>
        <button className={classes.pagingbutton} onClick={() => { setStart(start + 12); setEnd(end + 12) }}>{secondPage}</button>
        <button className={classes.pagingbutton}  onClick={() => { setStart(start + 24); setEnd(end + 24) }}>{thirdPage}</button>
        <button className={classes.pagingbutton} onClick={()=>{ setStart(start + 12); setEnd(end + 12); 
         setFirstPage(firstPage+1); setSecondPage(secondPage+1); setThirdPage(thirdPage+1)}}>Next &gt;</button>
    </div>
</div>
)   
    }
    export default Gif;  
    