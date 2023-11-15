import "./TopUsers.css"

const TopUsers = (props) => {
    const { users } = props;

    return(
        <div className="top-users-container">
            <div className="top-users-title-container">
                <span className="top-users-title">Top Users</span>
            </div>
            <div className="top-users-content-container">
                {users && users.map((user) => (
                <span className="top-user-user-id">
                    {users.indexOf(user) + 1}. {(user.user_id.length > 25) ? user.user_id.substring(0,25) + "..." : user.user_id}
                </span>))}
            </div>
        </div>
    );
};

export default TopUsers;