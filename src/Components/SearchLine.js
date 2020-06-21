import React, {createRef} from "react";
import {connect} from "react-redux";
import {changeSearchValueAC, setCurrentPageAC, setUsersAC, setUsersCountAC, toggleFetchingAC} from "../Store/reducer";
import {fetchUsers} from "../Api/api";

var debounce = require('debounce-promise')

let SearchLine = (props) => {


    const searchInput = createRef();
    const searchDebounced = debounce(fetchUsers, 500);

    const searchInputChange = () => {
        let searchValue = searchInput.current.value;
        props.changeSearchValue(searchValue);
        props.setCurrentPage(1);
        //todo Transfer to chunks
        if(searchValue) {
            props.toggleFetching(true);
            searchDebounced(searchValue, 1, props.pageSize)
                .then(searchResult => {
                    props.setUsersCount(searchResult.total_count);
                    props.setUsers(searchResult.items, true);
                    props.toggleFetching(false);
                });
        }
    }
    console.log(props.usersCount);
    return (
        <div className='search-line'>
            <input type="text"
                   placeholder="Write user name"
                   ref={searchInput}
                   value={props.searchValue}
                   onChange={searchInputChange}
            />
            <div className="user-count">{props.usersCount ? ("Total user count:" + props.usersCount) : null }</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
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
        changeSearchValue: (value) => dispatch(changeSearchValueAC(value)),
        setCurrentPage: (page) => dispatch(setCurrentPageAC(page)),
        setUsersCount: (count) => dispatch(setUsersCountAC(count)),
        toggleFetching: (isFetching) => dispatch(toggleFetchingAC(isFetching)),
    }
}

SearchLine = connect(mapStateToProps, mapDispatchToProps)(SearchLine);

export  default SearchLine;