import React, { Component } from 'react';
import userpic from '../../user.png';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export default class SingleUser extends Component {

    constructor(props){
        super(props)

        this.state = {
            user: '',
            selectedFile: null,
            userId: '',
            showValidate: false,
            validateMessage:''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8080/user/'+this.props.match.params.userId)
            .then(res => {
                this.setState({ user: res.data.user})
                this.setState({ userId: res.data.user._id })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleDelete = (e) => {
        axios.delete('http://localhost:8080/delete/'+this.state.userId)
          .then(response => { 
              this.setState({ showValidate: true })
              this.setState({ validateMessage: response.data.message })
            })
            .then(()=>{
                localStorage.removeItem("user")
                window.location = ('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteConfirmed =()=>{
        let answer = window.confirm("Are you sure you want to delete User?")
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
                <Grid container spacing={4} key={this.state.user._id}>
                    <Grid item xs={12}>
                        <h1>User Profile</h1>
                        {this.state.showValidate ? this.ValidateDisplay() : null}
                    </Grid>
                    <Grid item md={4} sm={5} xs={12} >
                        <h1>Image</h1>
                        <br />
                        <CardMedia
                            component="img"
                            alt="User Profile Pic"
                            style={{width: '200px'}}
                            image={userpic}
                            title="User Profile Pic"
                            />
                    </Grid>
                    <Grid item md={8} sm={7} xs={12} >
                        <h1>{this.state.user.Username}</h1>
                        <b>Email : </b>{this.state.user.Email}
                        <br />
                        <b>Created Date : </b>{this.state.user.Date}
                        <br />
                        <br />
                        <h2>About</h2>
                        <p>{ this.state.user.About }</p>
                        {JSON.parse(localStorage.getItem("user")).userId === this.state.userId ? (
                            <div>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    href={`/user/update/${this.state.user._id}`}
                                    >
                                        Update User
                                </Button>
                                <Button 
                                    variant="contained" 
                                    style={{color: 'red', margin: '20px'}} 
                                    onClick={this.deleteConfirmed}
                                    >
                                        Delete Post <DeleteIcon />
                                </Button>
                            </div>
                        ) : null}
                        
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
