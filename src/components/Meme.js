import { useEffect, useState } from 'react';
import './Meme.css';

function Meme() {
    const [memeData, setMemeData] = useState('');    // all meme data
    const [randomImg, setRandomImg] = useState("https://i.imgflip.com/1ur9b0.jpg");    // just one img of meme       
    const [text, setText] = useState({topMsg: '', botMsg: ''});

    // get meme data once when first time rendered
    useEffect(() => {
        console.log("use effect run");
        fetch('https://api.imgflip.com/get_memes')
        .then((res) => res.json())
        .then((data) => setMemeData(data.data.memes));
    }, []);

    // random 0 to meme data's length so that we can random meme image
    function randomMemeImage() {
        const randomNumber = Math.floor(Math.random()*memeData.length);    // random 0 to 100
        setRandomImg(memeData[randomNumber].url);
    }

    // make input can be changed
    function onInputChange(e) {
        setText(prevText => ( 
            {
                ...prevText,
                [e.target.name]: e.target.value    // [] represent not key
            }
        ));
    }

    return (
        <div className='meme'>
            <div><input type='text' name='topMsg' value={text.topMsg} onChange={onInputChange} /></div> 
            <div><input type='text' name='botMsg' value={text.botMsg} onChange={onInputChange} /></div>
            <div><input type='text' name='oooMsg' value={text.oootMsg} onChange={onInputChange} /></div>
            <button onClick={randomMemeImage}>New meme image</button>
            <div>{text.topMsg}</div>
            <div>{text.botMsg}</div>
            <div>{text.oooMsg}</div>
            <img src={randomImg} />
        </div>
    )
}

export default Meme;