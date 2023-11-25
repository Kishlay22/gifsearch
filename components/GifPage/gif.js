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
    const [isLoading,setIsLoading]=useState(false);
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
        setIsLoading(true);
        setInputvalue(e.target.value);
        setSearchQuery(e.target.value);
        
        const response = await fetch(`https://api.giphy.com/v1/gifs/search/?api_key=${API_KEY}&q=${searchQuery}`);
        const parsedData = await response.json();
        console.log(parsedData.data);
        setGifs(parsedData.data);
        setTimeout(() => {  setIsLoading(false); }, 1000);
        
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
    <>
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
    {isLoading && <img src='https://media.tenor.com/hlKEXPvlX48AAAAi/loading-loader.gif' width="200" height="200" style={{margin:'2rem 0 0 40rem'}} className="giphy-embed" allowFullScreen></img>}
    {!isLoading && <div className={classes.gridgallery}>
     {gifs && gifs.slice(start, end).map((gif) => (
        <div className={classes.griditem}>
        <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
        <div className={classes.griditemdetails}>
           <div>{gif.username}</div>
           <div className={classes.favicon} onClick={()=>{addFavourate(gif)}}> Add to Favourate &#9733;</div>
        </div>
        </div>
    ))}
    </div>}
    {!isLoading && <div className={classes.paginggif}>
        <button className={classes.pagingbutton} disabled={firstPage === 1} onClick={() => { setStart(start - 12); setEnd(end - 12)
         setFirstPage(firstPage-3); setSecondPage(secondPage-3); setThirdPage(thirdPage-3) }}>&lt; Previous</button>
        <button className={classes.pagingbutton} onClick={() => { setStart(start); setEnd(end)}}>{firstPage}</button>
        <button className={classes.pagingbutton} onClick={() => { setStart(start + 12); setEnd(end + 12) }}>{secondPage}</button>
        <button className={classes.pagingbutton}  onClick={() => { setStart(start + 24); setEnd(end + 24) }}>{thirdPage}</button>
        <button className={classes.pagingbutton} onClick={()=>{ setStart(start + 12); setEnd(end + 12); 
         setFirstPage(firstPage+3); setSecondPage(secondPage+3); setThirdPage(thirdPage+3)}}>Next &gt;</button>
    </div>}
</>
)   
    }
    export default Gif;  
    