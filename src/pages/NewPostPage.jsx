import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import supabase from "../../client"
import "./NewPostPage.css"

const NewPostPage = () => {

    const [posts, filteredPosts, currUser, users, topUsers, topPosts,trendingTags, setUsers, setPosts, setFilteredPosts, filterResults] = useOutletContext();
    const history = useNavigate();

    const processPost = async (e) => {
        e.preventDefault();
        const titleInput = document.getElementById("title-input").value;
        const descriptionInput = document.getElementById("description-input").value;
        const tagsInput = document.getElementById("tags-input").value;
        const questionInput = document.querySelector('input[name="question-or-opinion"]:checked').value;
        const refPostIDInput = document.getElementById("reference-post-id-input").value;
        const attachmentsInput = document.getElementById("attachments-input").value;
        const passwordInput = document.getElementById("password-input").value;

        let tags = tagsInput.split(",");

        for (let tag of tags) {     
            const { data, findTagError} = await supabase.from("Tags").select("*").eq("tag_name", tag);
            
            if(data.length == 0) {
                const { newTagError} = await supabase.from("Tags").insert({tag_name: tag, num_of_appearance: 1});
                console.log(newTagError);
                continue;
            }

            const {appearanceError} = await supabase.from("Tags").update({num_of_appearance: data[0].num_of_appearance + 1 }).eq("tag_name", tag);
        }

        if(tags.length == 1 && tags[0] == "") {
            tags = null;
        }
        const data = { 
            user_id : currUser,
            title: titleInput, 
            description: descriptionInput, 
            tags: (tags) ? tags : null,
            ref_post_id : (refPostIDInput) ? refPostIDInput: null,
            attachments: (attachmentsInput) ? attachmentsInput : null,
            password: passwordInput,
            question: questionInput
        };

        const { userError } = await supabase.from('Users').upsert({ user_id: currUser, user_name: "New-User-" + currUser.toString().substring(0,4)}); 
        const { postError} = await supabase.from("Posts").insert(data);

        history("/");
        
    };

    return(
        <form className="new-post-container">
            <span className="new-post-header">Create a New Post</span>
            <fieldset className="new-post-title-container">
                <h2 className="new-post-title">Title</h2>
                <input required name="title" id="title-input" type="text" placeholder="Enter a Title"></input>
            </fieldset>
            <fieldset className="new-post-description-container">
                <h2 className="new-post-description">Description</h2>
                <textarea required id="description-input" placeholder="Enter Your Post"></textarea>
            </fieldset>
            <fieldset className="new-post-tags-container">
                <h2 className="new-post-tags"> Tags</h2>
                <input id="tags-input" type="text" placeholder="Enter Your #Tag(s) (comma-separated)"></input>
            </fieldset>

            <fieldset className="question-ref-id">
                <div className="new-post-question-or-opinion-container">
                    <h2 className="new-post-question-or-opinion">Question/Opinion?</h2>
                    <fieldset>
                        <label for="question">Question</label>
                        <input type="radio" id="question" name="question-or-opinion" defaultChecked value="true"></input>
                    </fieldset>
                    <fieldset>
                        <label for="opinion">Opinion</label>
                        <input type="radio" id="opinion" name="question-or-opinion" value="false"></input>
                    </fieldset>
                </div>

                <fieldset className="new-post-reference-post-id-container">
                    <h2 className="new-post-reference-post-id">Reference-Post-ID</h2>
                    <input placeholder="Enter Reference Post ID" id="reference-post-id-input" type="text"></input>
                </fieldset>
            </fieldset>

            <fieldset className="attachments-password">
                <fieldset className="new-post-attachments-container">
                    <h2 className="new-post-attachments">Attachment(s)</h2>
                    <input placeholder = "Enter Attachment URL" id="attachments-input" type="text"></input>
                </fieldset>
                <fieldset className="new-post-password-container">
                    <h2 className="new-post-password">Password</h2>
                    <input placeholder = "Enter Post Password" id="password-input" type="text"></input>
                </fieldset>
            </fieldset>
            
            <button type="submit" className="post-button" onClick={processPost}>Post</button>
        </form>
    );
};

export default NewPostPage;