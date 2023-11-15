import "./TopPosts.css"

const TopPosts = (props) => {

    const { posts } = props;

    return(
        <div className="top-posts-container">
            <div className="top-posts-title-container">
                <span className="top-posts-title">Top Posts</span>
            </div>
            <div className="top-posts-content-container">
                {posts && posts.map((post) => (
                <span className="top-post-title">
                    {posts.indexOf(post) + 1}. {(post.title.length > 25) ? post.title.substring(0,25) + "..." : post.title}
                </span>))}
            </div>
        </div>
    );

};

export default TopPosts;