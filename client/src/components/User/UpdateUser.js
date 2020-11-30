import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class UpdateUser extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            email: '',
            about: ''
        }
    }

    Updatehandle = (e) => {
        e.preventDefault();
        const update = {
            username: this.state.username,
            email: this.state.email,
            about: this.state.about
        }

        axios.post('http://localhost:8080/user/update/'+this.props.match.params.userId, update)
            .then(res => {
                window.location = (`/user/${this.props.match.params.userId}`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <Container maxWidth="sm">
                <h1>Update User</h1>
                <form onSubmit={this.Updatehandle}>
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
                        label="About"
                        fullWidth
                        name="about"
                        onChange={e => this.setState({ about: e.target.value})} 
                        />
                    <br />
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Update User
                    </Button>
                </form>
            </Container>
        )
    }
}
