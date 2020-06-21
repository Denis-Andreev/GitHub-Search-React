import React from "react";
import {connect} from "react-redux";


let UserInfo = (props) => {
    debugger;
    let following;
    let followers;
    let repositories;

    if (props.userIsSelected) {
        following = props.userInfo.following.map((user) => {
            return (
                <span key={user.id} className="info-item"><a href={user.html_url}>{user.login}</a></span>
            )
        });
        followers = props.userInfo.followers.map((user) => {
            return (
                <span key={user.id} className="info-item"><a href={user.html_url}>{user.login}</a></span>
            )
        });
        repositories = props.userInfo.repositories.map((repos) => {
            return (
                <span key={repos.id} className="info-item"><a href={repos.owner.html_url}>{repos.name}</a></span>
            )
        });
    }

    return (
        props.userIsSelected &&
        (<div className="user-info">
            <img src={props.userInfo.avatar} alt={props.userInfo.login} className={"img-fluid img"}/>
            <h2>{props.userInfo.login}</h2>
            <div className="following">
                <h4>Following</h4>
                {following}
            </div>
            <div className="followers">
                <h4>Followers</h4>
                {followers}
            </div>
            <div className="repositories">
                <h4>Repositories</h4>
                {repositories}
            </div>
        </div>)
    )
}

let mapStateToProps = (state) => {
    return {
        userInfo: state.selectedUser,
        userIsSelected: state.userIsSelected,
    }
}

UserInfo = connect(mapStateToProps, null)(UserInfo);

export default UserInfo;