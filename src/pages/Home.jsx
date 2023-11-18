import { useState, useEffect } from "react"
import supabase from "/client.js"
import { Outlet, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { v4 as uuidv4 } from 'uuid';


import "./Home.css";



const Home = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [currUser, setCurrUser] = useState(uuidv4());
    const [topUsers, setTopUsers] = useState([]);
    const [trendingTags, setTrendingTags] = useState([]);
    const [topPosts, setTopPosts] = useState([]);

    const getPosts = async () => {
        const { data, error } = await supabase.from('Posts').select(`*, Users(*)`);
        setPosts([...data]);
        setFilteredPosts([...data]);
    };

    const getUsers = async () => {
        const { data, error } = await supabase.from('Users').select().limit(5);
        setUsers(data);
    };

    const getTopPosts = async () => {
        const { data, error } = await supabase.from('Posts').select().order('upvotes', {ascending: false }).limit(5);
        setTopPosts(data);
    };

    const updateTopUsers = async () => {
        let { data, error } = await supabase.from("Users").select(`user_id, Posts(upvotes)`);
    
        for (let user of data) {
            let total_upvotes = 0;
            for (let upvoteObj of user.Posts) {
                total_upvotes += upvoteObj.upvotes;
            }
            const {data, error} = await supabase.from("Upvotes").upsert({user_id: user.user_id, total_upvotes: total_upvotes}, { ignoreDuplicates : false });
        }
    };

    const getTopUsers = async () => {
        // updateTopUsers();
        const {data, error} = await supabase.from("Upvotes").select().order("total_upvotes", {ascending: false}).limit(5); 
        setTopUsers(data);
    };



    const getTrendingTags = async () => {
        const { data, error } = await supabase.from("Tags").select().order("num_of_appearance", {ascending: false}).limit(5);
        setTrendingTags(data);
    };

    const filterResults = () => {
        const searchBar = document.getElementsByClassName("search")[0];
        
        if(!searchBar.value) {
            setFilteredPosts(posts);
            return;
        }
        const newPosts = filteredPosts.filter((post) => {
            const regEx = new RegExp(searchBar.value, 'i');
            return regEx.test(post.title);
        });
        setFilteredPosts(newPosts);
    }
    
    useEffect(() => {
         getUsers();
         getPosts();
         updateTopUsers();
         getTopUsers();
         getTopPosts();
         getTrendingTags();
    }, []);


    return(
    <div className="home-container">
        <header className="navbar-container">
            <NavBar currUser={currUser} filterResults={filterResults} />
        </header>
        <main className="outlet-container">
            <Outlet context={[posts, filteredPosts, currUser, users, topUsers, topPosts, trendingTags, setPosts, setUsers, setFilteredPosts, filterResults]}  />
        </main>
    </div>
    );
};

export default Home;