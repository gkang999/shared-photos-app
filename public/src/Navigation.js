import { Link } from "react-router-dom";
import './Navigation.css';
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import axios from "axios";

const API_URL = "https://shared-photos.herokuapp.com/accounts/";

function Navigation() {
    return(
        <NavigationPage/>
    );
};

function LoginFail(props) {
    if (!props.trigger) {
        return null;
    }

    return (
        <div className="logMsg" id="loginFail">
            Login Failed
        </div>
    );
}

function LoggedInCheck() {
    if (localStorage.getItem('currentAccount') != null && localStorage.getItem('SPDKSessionKey') != null) {
        return 0;
    }
    return 1;
}

function NavigationPage() {
    const [loginView, setLoginView] = useState(false);
    const [loginFail, setLoginFail] = useState(false);
    const [logoutButton, setLogoutButton] = useState(LoggedInCheck() === 0);
    const [regView, setRegView] = useState(false);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const resetFields = () => {
        setUsername("");
        setName("");
        setEmail("");
        setPassword("");
    }

    const handleLoginView = () => {
        setLoginView(!loginView);
        setLoginFail(false);
        resetFields();
    };

    const handleLogout = () => {
        localStorage.removeItem('currentAccount');
        localStorage.removeItem('SPDKSessionKey');
        setLogoutButton(false);
    }

    const handleRegView = () => {
        setRegView(!regView);
        resetFields();
    };

    const handleBothView = () => {
        setLoginView(!loginView);
        setRegView(!regView);
        setLoginFail(false);
        resetFields();
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const reqBody = 
        JSON.stringify({
            accountName : username,
            accountPass : password
        });
        axios.post(API_URL + "login", reqBody,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.data !== "" && response.data[0] !== "") {
                localStorage.setItem('currentAccount', username);
                localStorage.setItem('SPDKSessionKey', response.data[0]);
                setLoginFail(false);
                setLogoutButton(true);
                handleLoginView();
            }
            else {
                setLoginFail(true);
                resetFields();
            }
            console.log(response);
        },
        (error) => {
            console.log(error);
        });
    };

    const handleRegSubmit = (e) => {
        e.preventDefault();
        const reqBody = JSON.stringify({
            accountName: username,
            accountPass: password,
            accountOwner: name,
            email: email,
            roleType: "user"
        })
        axios.post(API_URL + "create", reqBody, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response);
        },
        (error) => {
            console.log(error);
        });
    };

    return(
        <div className="Navigation">
            <div className="navLink" id="menu">
                sharedphotos 
                <br/>-<br/><br/>
                <Link to="/">home</Link> <br/>
                <Link to="/albums">albums</Link> <br/>
                <Link to="/about">about</Link> <br/>
                <br/>-<br/>
                {!logoutButton ? <Button className="button" variant="primary" onClick={handleLoginView}>
                    login
                </Button> : null}
                {logoutButton ? <Button className="button" id="logoutButton" variant="primary" onClick={handleLogout}>
                    logout
                </Button> : null}
            </div>
            {logoutButton ?
            <div className="logMsg">
                Successfully logged in.
            </div> : null}
            <Modal show={loginView} onHide={handleLoginView} animation={false} backdropClassName="backdrop" centered dialogClassName="loginModal">
                <form className="login" onSubmit={handleLoginSubmit}>
                    <div className="login">login</div><br/>
                    <LoginFail trigger={loginFail}/>
                    <label id="user" htmlFor="username">username</label><br/>
                    <input type="text" name="username" onChange={e => setUsername(e.target.value)} required/><br/>
                    <label id="pass" htmlFor="password">password</label><br/>
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)} required/><br/>

                    <input type="submit" value="login"/>
                    <Button className="secondary" show={loginView} onClick={handleBothView}>register</Button>
                </form>
            </Modal>

            <Modal show={regView} onHide={handleRegView} animation={false} backdropClassName="backdrop" centered dialogClassName="regModal">
                <form className="register" onSubmit={handleRegSubmit}>
                    <div className="register">register</div><br/>
                    <label id="user" htmlFor="username">username</label><br/>
                    <input type="text" name="username" onChange={e => setUsername(e.target.value)} required/><br/>
                    <label id="pass" htmlFor="password">password</label><br/>
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)} required/><br/>
                    <label id="name" htmlFor="name">name</label><br/>
                    <input type="text" name="name" onChange={e => setName(e.target.value)} required/><br/>
                    <label id="email" htmlFor="email">email</label><br/>
                    <input type="text" name="email" onChange={e => setEmail(e.target.value)}/><br/>

                    <input type="submit" value="register"/>
                    <Button className="secondary" show={regView} onClick={handleBothView}>back to login</Button>
                </form>
            </Modal>

            <div className="navLink" id="links">
                <a href="mailto:gkang999@gmail.com">email</a> <br/>
                <a target="_blank" href="https://www.linkedin.com/in/gkang999/" rel="noreferrer">linkedin</a>
            </div>
        </div>
    );
}

export default Navigation;