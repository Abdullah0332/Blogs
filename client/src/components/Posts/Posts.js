import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import img from '../../images/';
import axios from 'axios';

export default function Post() {

    const [posts, setPosts]=useState([])

    const user = JSON.parse(localStorage.getItem("user"))

    if(user === null){
        window.location = ('/login')
    }

    useEffect(() => {
        axios.get('http://localhost:8080/posts', {
            headers: {
                Authorization : "Bearer " + user.token
            }
        })
        .then(response => {
            // this.setState({ Posts: response.data.map(post => post)})
            setPosts(response.data.map(post => post))
        })
    },[])
        
    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <h1>Posts</h1>
                </Grid>
                {posts.map(post => {
                    return (  
                        <Grid item xs={12} sm={6} md={4} key={post._id}  >
                            <Card style={{ width: '340px'}}>
                                <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={post.Title}
                                    height="170"
                                    image={`http://localhost:8080/${post.ImageURL}`}
                                    title="Post Picture"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                        <b>{post.Title}</b>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                        <b>Description : </b>{post.Description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" href={`/post/${post._id}`}>
                                        View Detail
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
