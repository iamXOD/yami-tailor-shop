//Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//UI Imports
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

//App Imports
import { userLogin, userLogout } from "../../store/actions/user"
import config from "../../config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit.bind(this);
        this.onChange.bind(this);
        this.state = {
            username: "",
            password: "",
            error: "",
            isAuthenticated: false
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        login(this.state.username, this.state.password)
            .then(token => {
                console.log(token);
                if (token && token !== 'undefined' && token !== '') {
                    localStorage.setItem("token", token);
                    this.setState({ isAuthenticated: true });
                    this.props.userLogin(this.state.username);
                } else {
                    throw new Error("Invalid Token");
                }
            }).catch(error => {
                this.setState({ error: error.toString() })
                console.log(error);

            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return <section>
            <h2>Login</h2>
            <p>{this.state.error}</p>
            <form action="/login" method="post">
                <TextField
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    floatingLabelText="Username"
                    fullWidth={true}
                />
                <TextField
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    floatingLabelText="Password"
                    fullWidth={true}
                />
                <RaisedButton
                    label="Submit"
                    type="submit"
                    onClick={this.onSubmit}
                />
            </form>
            {this.state.isAuthenticated ? <Redirect to="/about" /> : ""}
        </section>
    }
}

const login = function (username, password) {
    return fetch(`${config.url.api}login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    })
}

const mapStateToProps = (state) => ({ isAuthenticated: state.isAuthenticated });

export default connect(mapStateToProps, { userLogin, userLogout })(Login);