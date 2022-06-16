import { useEffect, useState } from 'react';
import './Meme.css';
import domtoimage from 'dom-to-image';   // make dom to image
import { saveAs } from 'file-saver';    // save file as .png

function Meme() {
    const [memeData, setMemeData] = useState('');    // all meme data
    const [randomImg, setRandomImg] = useState("https://i.imgflip.com/1ur9b0.jpg");    // just one img of meme       
    const [text, setText] = useState({
        topMsg: '',
        topMidMsg: '',
        midBotMsg: '',
        botMsg: ''
    });    // if we initial text as a '' or other value, the warning will occur about uncontrolled input

    // get meme data once when first time rendered
    // useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
        .then((res) => res.json())
        .then((data) => setMemeData(data.data.memes));
    // }, []);  

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
                [e.target.name]: e.target.value    // [] represented that is not a key, it's a attribute specifies the name of an <input> element
            }
        ));
    }
    
    // make dom to image and save that image as a png file
    function capture() {
        domtoimage.toBlob(document.getElementById('my-node'))    // domtoimage => from package
        .then(function (blob) {
            window.saveAs(blob, 'my-meme');    // saveAs was imoported from file-saver package 
        });
    }

    return (
        <div className='meme'>
            <div className='meme-container'>
                <div id='my-node'>
                    <div className='meme-msg'>
                        <div className='top-msg'>{text.topMsg}</div>
                        <div className='top-mid-msg'>{text.topMidMsg}</div>
                        <div className='mid-bot-msg'>{text.midBotMsg}</div>
                        <div className='bot-msg'>{text.botMsg}</div>
                    </div>
                    <img className='meme-img' src={randomImg} />
                </div>
            </div>
            <div className='input-container'>
                <div><input className='input-1' type='text' placeholder='message 1' name='topMsg' value={text.topMsg} onChange={onInputChange} /></div> 
                <div><input className='input-2' type='text' placeholder='message 2' name='topMidMsg' value={text.topMidMsg} onChange={onInputChange} /></div>
                <div><input className='input-3' type='text' placeholder='message 3' name='midBotMsg' value={text.midBotMsg} onChange={onInputChange} /></div>
                <div><input className='input-4' type='text' placeholder='message 4' name='botMsg' value={text.botMsg} onChange={onInputChange} /></div>
                <div><button className='getmeme-btn' onClick={randomMemeImage}>Get new image</button></div>
                <div><button className='download-btn' onClick={capture}>DOWNLOAD &nabla;</button></div>
            </div>
        </div>
    )
}

export default Meme;