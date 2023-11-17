import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../client";
import postTimeElapsed from "../functions/postTimeElapsed.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import "./ViewPostPage.css"

const ViewPostPage = () => {
    const [post, setPost] = useState('');
    const [comments, setComments] = useState([]);
    const params = useParams();
    const [posts, filteredPosts, currUser, users, topUsers, topPosts,trendingTags, setUsers, setPosts, setFilteredPosts, filterResults] = useOutletContext();

    const getPost = async () => {
        const {data, error} = await supabase.from("Posts").select().eq("post_id", params.id);
        setPost(data[0]);
    }
    const getComments = async () => {
        const {data, error} = await supabase.from("Posts").select("*, Comments(*)").eq("post_id", params.id);
        setComments(data[0].Comments);
    }

    const increaseUpvote = async () => {
        const { error } = await supabase.from("Posts").update({upvotes : ++post.upvotes}).eq("post_id", params.id);
    };

    const newComment = async (event) => {
        if(event.key === "Enter" && event.target.value !== "") {
            const { userError } = await supabase.from('Users').upsert({ user_id: currUser, user_name: "New-User - " + currUser.toString().substring(0,4)}, {ignoreDuplicates: true}); 
            const { commentsError } = await supabase.from("Comments").insert({post_id: params.id, user_id: currUser, description: event.target.value});
        }
    };

    useEffect(() => {
        getPost();
        getComments();
    }, [increaseUpvote])

    const date = new Date(post.created_at)
    const dateFormat = date.toLocaleDateString();
    const dateTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


    const toggleComments = () => {
        const commentsElt = document.getElementsByClassName("comments-container")[0];
        if(commentsElt.style.visibility !== "hidden") {
            commentsElt.style.visibility = "hidden";
            commentsElt.style.position = "absolute";
        }
        else {
            commentsElt.style.visibility = "visible";
            commentsElt.style.position = "relative";
        }
    };
    const editPost = () => {
        location.assign("/view-post/" + params.id + "/edit");
    };
    const deletePost = async () => {
        const deletePassword = prompt("Enter Delete Password");
        if(deletePassword == post.password) {
            const { error } = await supabase.from("Posts").delete().eq("post_id", params.id);
            location.href= "/";
            alert(`Delete Successful, Post ${post.title} was deleted`);
            return;
        }
        alert("Incorrect Password... THE POST SHALL REMAIN!");
    };

    return(
        <div className="view-post-container">
            <header className="view-post-header">
                <img className="profile-pic" alt="A random person silhouette - profile" src="/user-profile-icon.svg"></img>
                <span className="view-post-info">{post.user_id} -</span>
                {(post.question) ? 
                <span className="view-post-info underline"> Question </span> : 
                <span className="view-post-info underline"> Opinion </span>} 
                <span className="view-post-info"> - Post_ID: {post.post_id} - </span> 
                <div className="view-post-info tooltip">Posted {postTimeElapsed(post.created_at, Date.now())} Ago
                <span className="tooltiptext">({dateFormat + " " + dateTime})</span>
                </div>
            </header>

            <div className="view-post-title-container">
                <h2 className="view-post-title">{post.title}</h2>
            </div>

            <div className="view-post-body">
                <span className="view-post-description">{post.description}</span>
                

                <img className="view-post-attachment" src={post.attachments} alt="attachment-photo"></img>

            </div>

            <div className="view-post-tags-container">
                <h2 className="view-post-tags">{post.tags && post.tags.join(" ")}</h2>
            </div>
            
            <div className="comments-container">
                <h2 className="comments-title">Comments</h2>
                {comments && comments.map((comment) => (<div className="comment-container">
                    <div className="comment-info-container">
                        <img className="profile-pic" alt="A random person silhouette - profile" src="/user-profile-icon.svg"></img>
                        <span className="comment-info">{comment.user_id} - <span className="comment-info"> Posted {postTimeElapsed(comment.created_at, Date.now())} Ago</span> </span>
                        
                    </div>
                    <span className="comment">{comment.description}</span>
                </div>))}
                <input className="comment-input" type="text" placeHolder="Leave a Comment" onKeyUp={newComment}></input>
            </div>

            <div className="footer-container">
                <div className="upvote-container">
                    <button className="upvote" onClick={increaseUpvote}><FontAwesomeIcon icon={ faThumbsUp} style={{color: getComputedStyle(document.documentElement).getPropertyValue("--tertiary")}} />{post.upvotes}</button>
                    <button className="comments" onClick={toggleComments}><FontAwesomeIcon icon={ faComments} style={{color: getComputedStyle(document.documentElement).getPropertyValue("--tertiary")}} />Comments</button>
                </div>

               
                <div className="edit-delete-container">
                    <button className="edit" onClick={editPost}><FontAwesomeIcon icon={faPenToSquare} style={{color: getComputedStyle(document.documentElement).getPropertyValue("--tertiary")}} />Edit</button>
                    <button className="delete" onClick={deletePost}><FontAwesomeIcon icon={faEraser} style={{color: getComputedStyle(document.documentElement).getPropertyValue("--tertiary")}} />Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ViewPostPage;