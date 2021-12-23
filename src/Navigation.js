import { Link } from "react-router-dom";
import './Navigation.css';
import React from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import axios from "axios";

const API_URL = "http://localhost:3308/accounts/";

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

class NavigationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginView: false,
            loginFail: false,
            logoutButton: LoggedInCheck(),
            regView: false,
            username: "",
            name: "",
            email: "",
            password: "",
            loading: false
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.resetFields = this.resetFields.bind(this);
        this.handleLoginView = this.handleLoginView.bind(this);
        this.handleRegView = this.handleRegView.bind(this);
        this.handleBothView = this.handleBothView.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegSubmit = this.handleRegSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    resetFields() {
        this.setState({username: ""});
        this.setState({password: ""});
        this.setState({name: ""});
        this.setState({email: ""});
    }

    handleLoginView() {
        this.setState({loginView: !this.state.loginView});
        this.setState({loginFail: false});
        this.resetFields();
    };

    handleLogout() {
        localStorage.removeItem('currentAccount');
        localStorage.removeItem('SPDKSessionKey');
        this.setState({logoutButton: false});
    }

    handleRegView() {
        this.setState({regView: !this.state.regView});
        this.resetFields();
    };

    handleBothView() {
        this.setState({loginView: !this.state.loginView});
        this.setState({regView: !this.state.regView});
        this.setState({loginFail: false});
        this.resetFields();
    };

    handleChange({target}) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        this.setState({loading: !this.state.loading});
        const reqBody = 
        JSON.stringify({
            accountName : this.state.username,
            accountPass : this.state.password
        });
        axios.post(API_URL + "login", reqBody,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.data !== "" && response.data[0] !== "") {
                localStorage.setItem('currentAccount', this.state.username);
                localStorage.setItem('SPDKSessionKey', response.data[0]);
                this.setState({loginFail: false});
                this.setState({logoutButton: true});
                this.setState({loginButton: false});
                this.handleLoginView();
            }
            else {
                this.setState({loginFail: true});
                this.resetFields();
            }
            this.setState({loading: !this.state.loading});
            console.log(response);
        },
        (error) => {
            console.log(error);
            this.setState({loading: !this.state.loading});
        });
    };

    handleRegSubmit(e) {
        e.preventDefault();
        this.setState({loading: !this.state.loading});
        const reqBody = JSON.stringify({
            accountName: this.state.username,
            accountPass: this.state.password,
            accountOwner: this.state.name,
            email: this.state.email,
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
            this.setState({loading: !this.state.loading});
        },
        (error) => {
            console.log(error);
            this.setState({loading: !this.state.loading});
        });
    };

    render(props) {
        return(
            <div className="Navigation">
                <div className="navLink" id="menu">
                    sharedphotos 
                    <br/>-<br/><br/>
                    <Link to="/">home</Link> <br/>
                    <Link to="/albums">albums</Link> <br/>
                    <Link to="/about">about</Link> <br/>
                    <br/>-<br/>
                    {!this.state.logoutButton ? <Button id="button" variant="primary" onClick={this.handleLoginView}>
                        login
                    </Button> : null}
                    {this.state.logoutButton ? <Button id="button" variant="primary" onClick={this.handleLogout}>
                        logout
                    </Button> : null}
                </div>
                {this.state.logoutButton ?
                <div className="logMsg">
                    Successfully logged in.
                </div> : null}
                <Modal show={this.state.loginView} onHide={this.handleLoginView} backdropClassName="backdrop" centered {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
                    <form className="login" onSubmit={this.handleLoginSubmit}>
                        <div className="login">login</div><br/>
                        <LoginFail trigger={this.state.loginFail}/>
                        <label id="user" htmlFor="username">username</label><br/>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required/><br/>
                        <label id="pass" htmlFor="password">password</label><br/>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/><br/>

                        <input type="submit" value="login"/>
                        <Button className="secondary" show={this.state.loginView} onClick={this.handleBothView}>register</Button>
                    </form>
                </Modal>

                <Modal show={this.state.regView} onHide={this.handleRegView} backdropClassName="backdrop" centered {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
                    <form className="register" onSubmit={this.handleRegSubmit}>
                        <div className="register">register</div><br/>
                        <label id="user" htmlFor="username">username</label><br/>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required/><br/>
                        <label id="pass" htmlFor="password">password</label><br/>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/><br/>
                        <label id="name" htmlFor="name">name</label><br/>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required/><br/>
                        <label id="email" htmlFor="email">email</label><br/>
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/><br/>

                        <input type="submit" value="register"/>
                        <Button className="secondary" show={this.state.regView} onClick={this.handleBothView}>back to login</Button>
                    </form>
                </Modal>

                <div className="navLink" id="links">
                    <a href="mailto:dhkhong@gmail.com">email</a> <br/>
                    <a target="_blank" href="https://www.linkedin.com/in/dustin-khong-21291a70/" rel="noreferrer">linkedin</a>
                </div>
            </div>
        );
    };
}

export default Navigation;