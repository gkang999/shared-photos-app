import './About.css';
import Typewriter from "typewriter-effect"

function About() {
  return (
    <div className="About">
        <div id="welcome">Welcome!</div>
        <div id="aboutMe">
          Hi, my name is Dustin Khong. In June 2019 I obtained a BS in Mathematics - Computer Science from UCSD and I'm currently 
          seeking a full-time position. I built this application to demonstrate my abilities as a software engineer. Using this application, 
          you should be able to create albums and upload pictures. There is a groups functionality which allows you to invite other users to 
          join a group and then you can share photo albums within the group. In addition, if you feel comfortable, you may share your albums 
          publicly and then anyone can see them on the "Public Albums" page. This was a fun project for me and required me to learn how to use 
          and connect some technologies together such as Spring Boot, Angular2, and MySQL. <br/>
          <br/>
          This web application is written using Angular and is hosted on Google's Firebase platform. HTTP requests sent from the webapp are 
          sent to a Maven-built Spring Web Application I am running on Heroku. The Spring app sends queries to a MySQL Database I'm hosting. 
          Using this information, it can then make requests to a media service API I have written and hosted. That API stores and serves up 
          the photos from a file system.
        </div>
        <Typewriter
        options={{cursorClassName:"cursor", wrapperClassName:"firebase", delay:45}}
        onInit={(typewriter)=> {
          typewriter

          /* .pauseFor(500) */
          .typeString("angular app\t-<br/>")
          /* .changeDelay(50) */
          .typeString("(firebase)")
          .start();
        }}
        />
        <Typewriter
        options={{cursorClassName:"cursor", wrapperClassName:"heroku", delay:30}}
        onInit={(typewriter)=> {
          typewriter

          .pauseFor(300)
          .typeString("spring CRUD app\t[<br/>")
          /* .changeDelay(50) */
          .typeString("(heroku)")
          .start();
        }}
        />
        <Typewriter
        options={{cursorClassName:"cursor", wrapperClassName:"media", delay:35}}
        onInit={(typewriter)=> {
          typewriter

          .pauseFor(450)
          .typeString("media service API")
          .start();
        }}
        />
        <Typewriter
        options={{cursorClassName:"cursor", wrapperClassName:"sql", delay:35}}
        onInit={(typewriter)=> {
          typewriter

          .pauseFor(500)
          .typeString("mySQL database")
          .start();
        }}
        />
    </div>
  );
}

export default About;