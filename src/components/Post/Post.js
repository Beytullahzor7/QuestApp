import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Post() {
    const [error, setError] = useState(null); //states
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => { //api-call (componentDidMount)
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div> Error !!! </div>;
    } else if (!isLoaded) {
        return <div> Loading...</div>;
    } else { //loading succesfull
        return (
            <ul>
                {postList.map(post => (
                    <li>
                        {post.title} {post.text}
                    </li>
                ))}
            </ul>
        );
    }
}

export default Post; //dışarıdan post ismi ile erişim sağlanabilir