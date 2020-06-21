import React from "react";
import {connect} from "react-redux";
import {selectUserAC} from "../../Store/reducer";
import {fetchUserInfo} from "../../Api/api";


let UserItem = (props) => {

    const showUserInfo = () => {
        fetchUserInfo(props.login).then(response => {
            props.selectUser( {
                avatar: props.avatar,
                login: props.login,
                following: response[0],
                followers: response[1],
                repositories: response[2],
            })
        })
    }

    return (
        <div className="user-item" onClick={showUserInfo}>
            <div className="card" style={{width: '18rem',}}>
                <img src={props.avatar} className="card-img-top" alt={props.login}/>
                    <div className="card-body">
                        <p className="card-text">{props.login}</p>
                    </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectUser: (user) => dispatch(selectUserAC(user)),
    }
}

UserItem = connect(null, mapDispatchToProps)(UserItem);

export default UserItem;