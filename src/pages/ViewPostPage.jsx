import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../client";
import "./ViewPostPage.css"

const ViewPostPage = () => {
    const [post, setPost] = useState('');
    const params = useParams();
    const [posts, filteredPosts, currUser, users, topUsers, topPosts,trendingTags, setUsers, setPosts, setFilteredPosts, filterResults] = useOutletContext();

    const getPost = async () => {
        const {data, error} = await supabase.from("Posts").select().eq("post_id", params.id);
        setPost(data[0]);
    }

    useEffect(() => {
        getPost();
    }, [])

    const date = new Date(post.created_at)
    const dateFormat = date.toLocaleDateString();
    const dateTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const increaseUpvote = () => {};
    const openComments = () => {};

    return(
        <div className="view-post-container">
            <header className="view-post-header">
                <img className="profile-pic" alt="A random person silhouette - profile" src="/user-profile-icon.svg"></img>
                <span>{post.user_id} - {dateFormat} {dateTime} - Post-ID: {post.post_id} - {post.question? "Question" : "Opinion"}</span>
            </header>

            <div className="view-post-title-container">
                <h2 className="view-post-title">{post.title}</h2>
            </div>

            <div className="view-post-description-container">
                <h2 className="view-post-description">{post.description}</h2>
            </div>

            <div className="view-post-attachment-container">
                <img className="view-post-attachment" src={post.attachments} alt="attachment-photo"></img>
            </div>

            <div className="view-post-tags-container">
                <h2 className="view-post-tags">{post.tags && post.tags.join(" ")}</h2>
            </div>

            <div className="footer-container">
                <div className="upvote-container">
                    <button className="upvote" onClick={increaseUpvote}>{post.upvotes} Upvotes</button>
                    <button className="comments" onClick={openComments}>Comments</button>
                </div>

               
                <div className="edit-delete-container">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ViewPostPage;