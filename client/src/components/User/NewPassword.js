import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class NewPassword extends Component {

    constructor(props){

        super(props)

        this.state = {
            password:''
        }
    }

    ResetSubmit = (e) => {
        e.preventDefault();

        const password = {
            password : this.state.password
        }

        axios.post('http://localhost:8080/reset/' + this.props.match.params.token , password)
            .then(response => {
            // Conditional logic here based on response returned
            console.log(response)
            window.location = ('/Login');
            })
            .catch(function (error) {
            console.log(error);
            })
    }

    render() {
        return (
            <Container maxWidth="sm">
                <h1>New Password</h1>
                <form onSubmit={this.ResetSubmit}>
                    <TextField 
                        label="Enter New Password"
                        fullWidth
                        name="reset-password"
                        type="password"
                        onChange={e => this.setState({ password: e.target.value})} 
                        />
                    <br />
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Update Password
                    </Button>
                </form>
            </Container>
        )
    }
}
