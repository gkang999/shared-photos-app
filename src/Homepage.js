import React from 'react';
import './Homepage.css';
import Typewriter from "typewriter-effect";

function Homepage() {
  return (
    <div className="Homepage">
        <div id="title">shared<br/>photos</div>
        <div className="verticalLine"></div>
        <Typewriter
        options={{cursorClassName:"cursor", wrapperClassName:"list1", delay:30}}
        onInit={(typewriter)=> {
          typewriter
          .pauseFor(100)
          .typeString("create your own albums")
          .start();
        }}
        />
        <Typewriter
        options={{cursorClassName:"cursor", wrapperClassName:"list2", delay:30}}
        onInit={(typewriter)=> {
          typewriter
          .pauseFor(400)
          .typeString("upload your images")
          .start();
        }}
        />
        <Typewriter
        options={{cursorClassName:"cursor", wrapperClassName:"list3", delay:25}}
        onInit={(typewriter)=> {
          typewriter
          .pauseFor(700)
          .typeString("keep them private")
          .start();
        }}
        />
        <Typewriter
        options={{cursorClassName:"cursor", wrapperClassName:"list4", delay:20}}
        onInit={(typewriter)=> {
          typewriter
          .pauseFor(900)
          .typeString("share it to the public")
          .start();
        }}
        />
    </div>
  );
}

export default Homepage;
