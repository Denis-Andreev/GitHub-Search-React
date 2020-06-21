import React from "react";
import {connect} from "react-redux";
import UserItem from "./UserItem";
import {setCurrentPageAC, setUsersAC, toggleFetchingAC} from "../../Store/reducer";
import {fetchUsers} from "../../Api/api";


let UserList = (props) => {

    let listIsEnd = (props.usersCount / props.pageSize) <= props.currentPage;

    let users = props.usersList.map(user => {
        return (
            <UserItem
                key={user.id}
                login={user.login}
                avatar={user.avatar_url}
            />
        )
    })

    const showMoreUsers = () => {
        props.setCurrentPage(props.currentPage + 1);
        props.toggleFetching(true)
        if (!listIsEnd) {
            fetchUsers(props.searchValue, props.currentPage + 1, props.pageSize)
                .then(searchResult => {
                    props.setUsers(searchResult.items, false);
                    props.toggleFetching(false);
                });
        }
    }

    return (
        <div className="user-list">
            {users}
            <div className="w-100"/>
            {
                props.isFetching ?
                    <>
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="w-100"/>
                        <br/>
                    </>
                    : null

            }
            {(!listIsEnd && (props.currentPage != null)) ?
                <button className='btn btn-dark btn-lg' onClick={showMoreUsers}>Show more</button>
                : null
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        usersList: state.usersList,
        currentPage: state.currentPage,
        searchValue: state.searchValue,
        pageSize: state.pageSize,
        usersCount: state.usersCount,
        isFetching: state.isFetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (users, isUpdate) => dispatch(setUsersAC(users, isUpdate)),
        setCurrentPage: (page) => dispatch(setCurrentPageAC(page)),
        toggleFetching: (isFetching) => dispatch(toggleFetchingAC(isFetching)),
    }
}

UserList = connect(mapStateToProps, mapDispatchToProps)(UserList);

export default UserList;