import './About.css';
import Typewriter from "typewriter-effect"

function About() {
  return (
    <div className="About">
        <div id="welcome">Welcome!</div>
        <div id="verticalLine"></div>
        <div id="aboutMe">
          Hi, my name is Grace Kang. I'm currently a fourth year Cognitive Science major (B.S.) with a Computer Science minor
          seeking a full-time position as a frontend developer. I built and re-designed the frontend for this web application to 
          demonstrate my abilities. Using this application, you should be able to create albums and upload pictures. In addition, 
          if you feel comfortable, you may share your albums publicly and then anyone can see them on the "Public Albums" page.  <br/>
          <br/>
          This web application was written using React and is hosted on Google's Firebase platform. HTTP requests sent from the webapp are 
          sent to a Maven-built Spring Web Application hosted on Heroku. The Spring app sends queries to a MySQL Database hosted on Google 
          Cloud Platform. Using this information, it can then make requests to a media service API; that API stores and serves up 
          the photos from a file system.<br/>
          <br/>
          The backend ({<a target="_blank" href="https://github.com/DRizere/SharedPhotosCRUD" rel="noreferrer">CRUD</a>} and {<a target="_blank" 
          href="https://github.com/DRizere/SharedPhotosMediaService" rel="noreferrer">Media Service</a>}) 
          was originally written by {<a target="_blank" href="https://www.linkedin.com/in/dustin-khong-21291a70/" rel="noreferrer">Dustin Khong</a>}
        </div>
        <Typewriter
        options={{cursorClassName:"cursor", wrapperClassName:"firebase", delay:45}}
        onInit={(typewriter)=> {
          typewriter

          /* .pauseFor(500) */
          .typeString("reactJS app\t-<br/>")
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
        options={{cursorClassName:"cursor", wrapperClassName:"media", delay:30}}
        onInit={(typewriter)=> {
          typewriter

          .pauseFor(400)
          .typeString("media service API<br/>")
          .changeDelay(20)
          .typeString("(heroku)")
          .start();
        }}
        />
        <Typewriter
        options={{cursorClassName:"cursor", wrapperClassName:"sql", delay:30}}
        onInit={(typewriter)=> {
          typewriter

          .pauseFor(400)
          .typeString("mySQL database<br/>")
          .changeDelay(20)
          .typeString("(cloudSQL)")
          .start();
        }}
        />
    </div>
  );
}

export default About;