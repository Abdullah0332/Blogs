import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

export default class ResetPassword extends Component {

    constructor(props){

        super(props)

        this.state = {
            email:'',
            showValidate: false,
            validateStatus:'',
            validateMessage:''
        }
    }

    ResetSubmit = (e) => {
        e.preventDefault();

        const email = {
            email : this.state.email
        }

        axios.post('http://localhost:8080/reset',email)
            .then(res => {
                this.setState({ validateStatus: res.status })
                this.setState({ validateMessage: res.data.message })
                this.setState({ showValidate: true })
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
                <h1>Reset Password</h1>
                <form onSubmit={this.ResetSubmit}>
                {this.state.showValidate ? this.ValidateDisplay() : null}
                    <TextField 
                        label="Email"
                        fullWidth
                        name="email"
                        onChange={e => this.setState({ email: e.target.value})} 
                        />
                    <br />
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Reset Password
                    </Button>
                </form>
            </Container>
        )
    }
}
