import "./Feed.css"
import { Link } from "react-router-dom";
import supabase from "../../client.js"
import postTimeElapsed from "../functions/postTimeElapsed.js";

const Feed = (props) => {
    const { filteredPosts, setFilteredPosts, filterResults } = props;

    const sortByNewest = async () => {
        const { data, error } = await supabase.from("Posts").select(`*, Users(*)`).order('created_at', { ascending: false});
        // setPosts(data);
        setFilteredPosts(data);
        // filterResults();

    }
    const sortByUpvotes = async () => {
        const { data, error } = await supabase.from("Posts").select(`*, Users(*)`).order('upvotes', { ascending: false});
        // setPosts(data);
        setFilteredPosts(data);
        // filterResults();
    }
    const sortByQuestion = async () => {
        const { data, error } = await supabase.from("Posts").select(`*, Users(*)`).order('question', { ascending: false});
        setFilteredPosts(data);
        // filterResults();
    }
    const sortByOpinion = async () => {
        const { data, error } = await supabase.from("Posts").select(`*, Users(*)`).order('question', { ascending: true});
        setFilteredPosts(data);
        // filterResults();
    }
    
    
    return (
        <div className="feed-container">
            <div className="button-container">
            <span id="sort-by">Sort By:</span>
                <button className="sort-button" id="newest" onClick={sortByNewest}>Newest</button>
                <button className="sort-button" id="most-popular" onClick={sortByUpvotes}>Most Popular</button>
                <button className="sort-button" id="question" onClick={sortByQuestion}>Question</button>
                <button className="sort-button" id="opinion" onClick={sortByOpinion}>Opinion</button>
            </div> 

            <div className="posts-container">
                {filteredPosts && filteredPosts.map((post) => (
                    <div className="post-container">
                        <div className="post-header">
                            <img src="/user-profile-icon.svg" className="post-image"></img>
                            <span className="post-user">{post.user_id} - <span className="post-user-name">{post.Users.user_name} - {(post.question) ? "Question" : "Opinion"}</span></span>
                        </div>

                        <h3> <Link className="post-title"to={"/view-post/" + post.post_id}>{post.title}</Link></h3>
                       
                        <div className ="post-footer">
                            <div className="post-upvotes-container">
                                <span className="post-upvotes">{post.upvotes} Upvotes</span>
                            </div>
                            <div className="post-time-container">
                                <span className="post-time"> Posted { postTimeElapsed(post.created_at, Date.now())} Ago </span> 
                            </div>
                        </div>   
                    </div>
                ))} 
            </div>
        </div> 
    );

};

export default Feed;