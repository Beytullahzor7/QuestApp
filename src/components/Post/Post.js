import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import Comment from "../Comment/Comment";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        textAlign: "left",
        margin: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white"
    }
}));

function Post(props) {
    const { title, text, userId, userName, postId } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const isInitialMount = useRef(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList)
    };

    const handleLike = () => {
        setLiked(!liked)
    }

    const refreshComments = () => {
        fetch("/comments?postId="+postId)
        .then(res => res.json()) //gelen responsu parse et
        .then(
            (result) => {
                setIsLoaded(true);
                setCommentList(result);
            },
            (error) => {
                console.log(error)
                setIsLoaded(true);
                setError(error);
            }
        )   
    }

    useEffect(() => {
        if(isInitialMount.current)
            isInitialMount.current = false;
        else
            refreshComments();
    }, [commentList])

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Link className={classes.link} to={{ pathname: '/users/' + userId}}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                }
                title={title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                onClick={handleLike}
                aria-label="add to favorites">
                    <FavoriteIcon style={liked? { color: "yellow" } : null} />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <CommentIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Container fixed className = {classes.container}>
                {error? "error" :
                isLoaded? commentList.map(comment => (
                    <Comment userId = {1} userName = {"USER"} text = {comment.text}></Comment>
                )) : "Loading"}
                </Container>
            </Collapse>
        </Card>
    )
}

export default Post; //dışarıdan post ismi ile erişim sağlanabilir