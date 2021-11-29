import React, {useState, useEffect} from "react";
import Post from "../Post/Post";

function Home() {
    const [error, setError] = useState(null); //states
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => { //api-call (componentDidMount)
        fetch("/posts")
            .then(res => res.json()) //gelen responsu parse et
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

            <div className="container">
                Home!

                {postList.map(post => (
                    <Post title={post.title} text={post.text}></Post> 

                ))}
            </div>
        );
    }
}

export default Home;