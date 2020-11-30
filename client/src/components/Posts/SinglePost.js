import React, { Component } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export default class SinglePost extends Component {

    constructor(props){
        super(props)

        this.state = {
            post: '',
            userId: '',
            showValidate: false,
            validateMessage:'',
            postId: '',
            creatorId: ''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8080/post/'+this.props.match.params.postId, {
            headers: {
                Authorization : "Bearer " + JSON.parse(localStorage.getItem("user")).token
            }
        })
            .then(res => {
                this.setState({ creatorId: res.data.post.Creator })
                this.setState({ post: res.data.post })
                this.setState({ postId: res.data.post._id })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleDelete = (e) => {
        axios.delete('http://localhost:8080/delete/'+this.state.postId)
          .then(response => { 
            console.log(response)
              this.setState({ showValidate: true })
              this.setState({ validateMessage: response.data.message })
            })
            // .then(()=>{
            //     window.location = ('/')
            // })
            .catch(err => {
                console.log(err)
            })
    }

    deleteConfirmed =()=>{
        let answer = window.confirm("Are you sure you want to delete your post?")
        if(answer){
            this.handleDelete()
        }
    }

    ValidateDisplay = () => {
        return <Alert variant="filled" severity="success">{this.state.validateMessage}</Alert>              
    }

    render() {
        return (
            <Container>   
                <Grid container spacing={4} key={this.state.post._id}>
                    <Grid item xs={12}>
                        <h1>Post Detail</h1>
                        {this.state.showValidate ? this.ValidateDisplay() : null}
                    </Grid>
                    <Grid item md={8} sm={12} xs={12} >
                        <CardMedia
                            component="img"
                            alt="User Profile Pic"
                            style={{width: '600px'}}
                            image={`http://localhost:8080/${this.state.post.ImageURL}`}
                            title="User Profile Pic"
                            />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12} >
                        <h1>{this.state.post.Title}</h1>
                        <b>Description : </b>{this.state.post.Description}
                        <br />
                        <br />
                        {/* {JSON.parse(localStorage.getItem("user")).userId === this.state.creatorId ? ( */}
                            <div>
                                <Button 
                                    variant="contained" 
                                    style={{color: 'red'}} 
                                    onClick={this.deleteConfirmed}
                                    >
                                        Delete Post <DeleteIcon />
                                </Button>
                                <br />
                                <br />
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    href={`/post/update/${this.state.post._id}`}
                                    >
                                        Update Post
                                </Button>
                            </div>
                        {/* ) : null}                         */}
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
