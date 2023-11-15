import "./TrendingTags.css"

const TrendingTags = (props) => {
    const { tags } = props;

    return(
        <div className="trending-tags-container">
            <div className="trending-tags-title-container">
                <span className="trending-tags-title"> Trending Tags </span>
            </div>
            <div className="trending-tags-name-container">
                {tags && tags.map((tag) => (
                    (<span className="trending-tags-name">
                        {tags.indexOf(tag) + 1}. {(tag.tag_name.length > 25) ? tag.tag_name.substring(0,25) + "..." : tag.tag_name}
                    </span>)
                ))}
            </div>
        </div>

    );
};

export default TrendingTags;