import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

export default class CreatePost extends Component {

    constructor(props){
        super(props)

        this.state = {
            image: '',
            title: '',
            description: '',
            showValidate: false,
            validateStatus:'',
            validateMessage:''
        }
    }

    fileUploadHandler = () =>{

        const data = new FormData() 
        data.append('file', this.state.image)
        data.append('title', this.state.title)
        data.append('description', this.state.description)

        const user = JSON.parse(localStorage.getItem("user"))

        axios.post('http://localhost:8080/createpost', data, {
            headers: {
                Authorization : "Bearer " + user.token
            }
        })
            .then(res => {
                this.setState({ validateStatus: res.status })
                this.setState({ validateMessage: res.data.message })
                this.setState({ showValidate: true })
            })
            .then(() => {
                if (this.state.validateStatus === 200){
                    window.location = ('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    ValidateDisplay = () => {
        if (this.state.validateStatus === 200){
            return <Alert variant="filled" severity="success">{this.state.validateMessage}</Alert> 
        } else {
            return <Alert variant="filled" severity="warning">{this.state.validateMessage}</Alert>
        }                
    }

    render() {
        return (
            <div>
                <Container maxWidth="sm">
                    <h1>Create Post</h1>
                    {this.state.showValidate ? this.ValidateDisplay() : null}
                    <TextField 
                        label="Title"
                        fullWidth
                        name="title"
                        onChange={e => this.setState({ title: e.target.value})}
                        />
                    <TextField 
                        label="Description"
                        fullWidth
                        name="description"
                        onChange={e => this.setState({ description: e.target.value})}
                        />
                    <br />
                    <br />
                    <input 
                        type="file"
                        name="file"
                        onChange={e => this.setState({ image: e.target.files[0]})}
                    />
                    <br />
                    <br />
                    <div>
                        <Button variant="contained" color="primary" type="submit" onClick={this.fileUploadHandler}>
                            Create Post
                        </Button>
                    </div>
                </Container>
            </div>
        )
    }
}