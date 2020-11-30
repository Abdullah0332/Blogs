import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class Signup extends Component {

    constructor(props){
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            date: new Date(),
            showValidate: false,
            validateStatus:'',
            validateMessage:''
        }
    }
    
    Signuphandle = (e) =>{
        e.preventDefault();
        const signup = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            date: this.state.date
        }
        
        axios.post('http://localhost:8080/Signup', signup)
            .then((res) => {
                console.log(res)
                this.setState({ validateStatus: res.status })
                this.setState({ validateMessage: res.data.message })
                this.setState({ showValidate: true })
            })
            .then(() => {
                if (this.state.validateStatus !== 200){
                    window.location = ('/Login')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    onChangeDate = (date) => {
        this.setState({
          date: date
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
                <h1>Sign up</h1>
                <form onSubmit={this.Signuphandle}>
                    {this.state.showValidate ? this.ValidateDisplay() : null}
                    <TextField 
                        label="Username"
                        fullWidth
                        name="username"
                        onChange={e => this.setState({ username: e.target.value})}
                        />
                    <TextField 
                        label="Email"
                        fullWidth
                        name="email"
                        onChange={e => this.setState({ email: e.target.value})} 
                        />
                    <TextField 
                        label="Password"
                        fullWidth
                        name="password"
                        type="password"
                        onChange={e => this.setState({ password: e.target.value})} 
                        />
                    <br />
                    <br />
                    <div className="form-group">
                        <b>Date: </b>
                            <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            />
                    </div>
                    <br />
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Sign In
                    </Button>
                    <br />
                    <br />
                    <Button variant="contained" color="primary" type="submit" href="/login">
                        Login
                    </Button>
                </form>
            </Container>
        )
    }
}
