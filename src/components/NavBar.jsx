import "./NavBar.css"
import { Link } from 'react-router-dom'

const NavBar = (props) => {

    const { currUser, filterResults } = props;

    if(window.innerWidth - document.body.clientWidth > 0) {
        document.body.style.setProperty('--scrollbar-width', `${window.innerWidth - document.body.clientWidth}px`);
    }
    else {
        document.body.style.setProperty('--scrollbar-width', 0);
    }

    const toggleMode = () => {
        const root = document.querySelector(":root");

        if(getComputedStyle(root).getPropertyValue('--primary') == "#FFF" ) {
            root.style.setProperty('--primary', "#242424");
            root.style.setProperty('--secondary', "#FFF");
        }
        else{
            root.style.setProperty('--primary', "#FFF");
            root.style.setProperty('--secondary', "#242424");
        }
    };

    return(
        <div className="navbar-container">
            <div className="logo-container">
                <img className="logo" src="./full-stack-developer-icon.svg" alt="Devs Central Logo -"></img>
                <h1 className="logo-title">Devs Central</h1>
            </div>
            
            <div className="search-container">
                <input type="text" className="search" placeholder="Search for a Post"/>
                <button type="submit" className="search-button" onClick={filterResults}>🔎</button>
            </div>

            <div className="setting-container">
                <label className="switch">
                    <input type="checkbox" defaultChecked onClick={toggleMode} />
                    <span className="slider round"></span>
                </label>

                <img className="profile-pic" alt="A random person silhouette - profile" src="/user-profile-icon.svg"></img>
                <p className="profile-id">{currUser}</p>

                <nav>
                    <Link className="nav-elt" to="/">Home</Link>
                    <Link className="nav-elt" to="/new-post">Create a Post</Link>
                </nav>
            </div>

        </div>
    );
};

export default NavBar;