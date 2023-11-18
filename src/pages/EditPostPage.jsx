import { useState, useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../client";
import "./EditPostPage.css"

const EditPostPage = () => {
    const [post, setPost] = useState('');
    const params = useParams();
    const history = useNavigate();

    const getPost = async () => {
        const {data, error} = await supabase.from("Posts").select().eq("post_id", params.id);
        setPost(data[0]);
    }

    useEffect(() => {
        getPost();
    }, []);

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
      
        const aSorted = a.toSorted();
        const bSorted = b.toSorted();

        for (var i = 0; i < aSorted.length; ++i) {
          if (aSorted[i] !== bSorted[i]) return false;
        }
        return true;
      }

    const updatePost = async (e) => {
        e.preventDefault();

        const enteredPassword = prompt("Enter Password");
        if(enteredPassword !== post.password) {
            alert("Update Failed!")
            return;
        }

        getPost();
        
        const titleInput = document.getElementById("title-input").value;
        const descriptionInput = document.getElementById("description-input").value;
        const tagsInput = document.getElementById("tags-input").value;
        const questionInput = document.querySelector('input[name="question-or-opinion"]:checked').value;
        const attachmentsInput = document.getElementById("edit-attachments-input").value;
        const tags = (tagsInput != "") ? tagsInput.split(",") : null;

        if(!arraysEqual(post.tags, tags)) {
            if(post.tags) {
                for (let postTag of post.tags){
                    const { data, findTagError} = await supabase.from("Tags").select("*").eq("tag_name", postTag);
                    const {appearanceError} = await supabase.from("Tags").update({num_of_appearance: data[0].num_of_appearance - 1 }).eq("tag_name", postTag);
                }
            }
            if(tags) {
                for (let tag of tags) {   
                    const { data, findTagError} = await supabase.from("Tags").select("*").eq("tag_name", tag);
                    
                    if(data.length == 0) {
                        const { newTagError} = await supabase.from("Tags").insert({tag_name: tag, num_of_appearance: 1});
                        continue;
                    }
        
                    const {appearanceError} = await supabase.from("Tags").update({num_of_appearance: data[0].num_of_appearance + 1 }).eq("tag_name", tag);
                }
            }
        }

        const data = { 
            title: titleInput, 
            description: descriptionInput, 
            tags: (tags) ? tags : null,
            attachments: (attachmentsInput) ? attachmentsInput : null,
            question: questionInput
        };
 
        const { postError} = await supabase.from("Posts").update(data).eq("post_id", params.id);
        history("/view-post/" + params.id);
    }

    return(
    <form className="edit-post-container">
        <span className="edit-post-header">Post Update</span>
                <fieldset className="edit-post-title-container">
                    <h2 className="edit-post-title">Title</h2>
                    <input required id="title-input" type="text" placeholder="Enter a Title"></input>
                </fieldset>
                <fieldset className="edit-post-description-container">
                    <h2 className="edit-post-description">Description</h2>
                    <textarea required id="description-input" placeholder="Enter Your Post"></textarea>
                </fieldset>
                <fieldset className="edit-post-tags-container">
                    <h2 className="edit-post-tags"> Tags</h2>
                    <input required id="tags-input" type="text" placeholder="Enter Your #Tag(s) (comma-separated)"></input>
                </fieldset>

                <fieldset className="edit-question-ref-id">
                    <div className="edit-post-question-or-opinion-container">
                        <h2 className="edit-post-question-or-opinion">Question/Opinion?</h2>
                        <fieldset>
                            <label for="edit-question">Question</label>
                            <input type="radio" id="edit-question" name="question-or-opinion" defaultChecked value="true"></input>
                        </fieldset>
                        <fieldset>
                            <label for="edit-opinion">Opinion</label>
                            <input type="radio" id="edit-opinion" name="question-or-opinion" value="false"></input>
                        </fieldset>
                    </div>

                </fieldset>

                <fieldset className="edit-attachments-password">
                    <fieldset className="edit-post-attachments-container">
                        <h2 className="edit-post-attachments">Attachment(s)</h2>
                        <input placeholder = "Enter Attachment URL" id="edit-attachments-input" type="text"></input>
                    </fieldset>
                </fieldset>
                
                <button type="submit" className="post-button" onClick={updatePost}>Update</button>
            </form>
    );
};

export default EditPostPage;