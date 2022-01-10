import { makeStyles } from "@material-ui/core";
import React from "react";
import {useParams} from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";

const useStyles = makeStyles({
    root: {
        display: "flex",
    },
});

function User() {
    const {userId} = useParams();
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Avatar avatarId={0}/>
            <UserActivity userId={userId}/>
        </div>
    )
}

export default User;