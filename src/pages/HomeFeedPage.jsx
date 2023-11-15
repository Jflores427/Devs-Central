import { useOutletContext} from "react-router-dom"
import supabase from "/client.js"
import "./HomeFeedPage.css"

import Feed from "../components/Feed";
import TopPosts from "../components/TopPosts";
import TopUsers from "../components/TopUsers";
import TrendingTags from "../components/TrendingTags";

const HomeFeedPage = () => {
    const [posts, filteredPosts, currUser, users, topUsers, topPosts,trendingTags, setUsers, setPosts, setFilteredPosts, filterResults] = useOutletContext();

    const cycleNode = () => {
        const nextNode = document.getElementsByClassName("next-node")[0];
        const currNode = document.getElementsByClassName("current-node")[0];
        const prevNode = document.getElementsByClassName("previous-node")[0];
        
        const nextNodeChild = nextNode.firstElementChild;
        const currNodeChild = currNode.firstElementChild;
        const prevNodeChild = prevNode.firstElementChild;

        nextNode.removeChild(nextNodeChild);
        currNode.removeChild(currNodeChild);
        prevNode.removeChild(prevNodeChild);

        nextNode.appendChild(prevNodeChild);
        currNode.appendChild(nextNodeChild);
        prevNode.appendChild(currNodeChild);
    };

    
    return(
        <main className="home-feed-container">
          <div className="feed-component-container">
              <Feed 
              filteredPosts={filteredPosts} 
              setFilteredPosts={setFilteredPosts} 
              filterResults={filterResults}
              />
          </div>

          <div className="widget-container" onClick={cycleNode}>
                <div className="next-node">
                    <TopUsers users={topUsers} />
                </div>

                <div className="current-node">
                     <TopPosts posts={topPosts} />
                    
                </div>

                <div className="previous-node">
                    <TrendingTags tags={trendingTags} />
                </div>
          </div>
            

        </main>
    );
};

export default HomeFeedPage;