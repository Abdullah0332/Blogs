import React, { Component } from 'react';
import userpic from '../../user.png';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

export default class Users extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            Users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8080/users')
        .then(response => {
            this.setState({ Users: response.data.map(user => user)})
        })
    }
    
    render() {
        return (
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <h1>Users</h1>
                    </Grid>
                    {this.state.Users.map(user => {
                        return (  
                            <Grid item xs={12} sm={6} md={4} key={user._id}  >
                                <Card style={{ width: '340px'}}>
                                    <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="User Profile Pic"
                                        height="170"
                                        style={{ width: "50%", margin: 'auto'}}
                                        image={userpic}
                                        title="User Profile Pic"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                            <b>{user.Username}</b>
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            <b>Email : </b>{user.Email}
                                            <br />
                                            <b>Date : </b>{user.Date.split('T')[0]}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" href={`/user/${user._id}`}>
                                        View Profile
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid> 
                        )
                    })}
                </Grid>                 
            </Container>
        )
    }
}
