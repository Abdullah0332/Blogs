import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class UpdatePost extends Component {

    constructor(props){
        super(props);

        this.state = {
            image: '',
            title: '',
            description: '',
            post: ''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8080/post/'+this.props.match.params.postId, {
            headers: {
                Authorization : "Bearer " + JSON.parse(localStorage.getItem("user")).token
            }
        })
            .then(res => {
                this.setState({ post: res.data.post})
            })
            .catch(err => {
                console.log(err)
            })
    }

    fileUploadHandler = () =>{

        const updatedata = new FormData() 
        updatedata.append('file', this.state.image)
        updatedata.append('title', this.state.title)
        updatedata.append('description', this.state.description)
        console.log(updatedata)
        axios.post('http://localhost:8080/post/update/'+this.props.match.params.postId, updatedata, {
            headers: {
                Authorization : "Bearer " + JSON.parse(localStorage.getItem("user")).token
            }
        })
            .then(res => {
                // console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <Container maxWidth="sm">
                    <h1>Update Post</h1>
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
                            Update Post
                        </Button>
                    </div>
                </Container>
            </div>
        )
    }
}
