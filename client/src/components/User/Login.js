import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

export default class Login extends Component {

    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: '',
            showValidate: false,
            validateStatus:'',
            validateMessage:'',
            userId: ''
        }
    }

    Loginhandle = (e) =>{
        e.preventDefault();
        const login = {
            email: this.state.email,
            password: this.state.password
        }
        
        axios.post('http://localhost:8080/Login',login)
            .then(res => {
                localStorage.setItem("user",JSON.stringify(res.data))
                this.setState({ auth: res.data.userId})
                this.setState({ validateStatus: res.status })
                this.setState({ validateMessage: res.data.message })
                this.setState({ showValidate: true })
            })
            .then(() => {
                if (this.state.validateStatus === 201){
                    window.location = ("/")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    ValidateDisplay = () => {
        if (this.state.validateStatus !== 201){
            return <Alert variant="filled" severity="warning">{this.state.validateMessage}</Alert>
        } else {
            return <Alert variant="filled" severity="success">{this.state.validateMessage}</Alert> 
        }                
    }

    render() {
        return (
            <Container maxWidth="sm">
                <h1>Login</h1>
                <form onSubmit={this.Loginhandle}>
                {this.state.showValidate ? this.ValidateDisplay() : null}
                    <TextField
                        label="Email"
                        fullWidth
                        name="email"
                        onChange={e => this.setState({ email: e.target.value})} 
                        />
                    <TextField 
                        type="password"
                        label="Password"
                        fullWidth
                        name="password"
                        onChange={e => this.setState({ password: e.target.value})} 
                        />
                    <br />
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Log in
                    </Button>
                    <br />
                    <br />
                    <Button variant="contained" type="submit" href="/reset">
                        Forget Password
                    </Button>
                </form>
            </Container>
        )
    }
}
