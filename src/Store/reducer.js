const SET_USERS = 'ADD-USERS';
const SELECT_USER = 'SELECT-USER';
const CHANGE_SEARCH_VALUE = 'CHANGE-SEARCH-VALUE';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_USER_COUNT = 'SET-USER-COUNT';
const TOGGLE_FETCHING = 'TOGGLE-FETCHING'

export const setUsersAC = (users, isUpdate) => ({type: SET_USERS, users, isUpdate});
export const selectUserAC = (user) => ({type: SELECT_USER, user});
export const changeSearchValueAC = (value) => ({type: CHANGE_SEARCH_VALUE, value});
export const setCurrentPageAC = (page) => ({type: SET_CURRENT_PAGE, page});
export const setUsersCountAC = (count) => ({type: SET_USER_COUNT, count});
export const toggleFetchingAC = (isFetching) => ({type: TOGGLE_FETCHING, isFetching});

const initialState = {
    usersList: [],
    selectedUser: {
        avatar: null,
        login: null,
        following: [],
        followers: [],
        repositories: [],
    },
    searchValue: '',
    currentPage: null,
    userIsSelected: false,
    pageSize: 20,
    usersCount: null,
    isFetching: false,
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SEARCH_VALUE: {
            return {
                ...state,
                searchValue: action.value,
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.page,
            }
        }
        case SET_USERS: {
            if (action.isUpdate) {
                return {
                    ...state,
                    usersList: [...action.users]
                }
            } else {
                return {
                    ...state,
                    usersList: [...state.usersList, ...action.users]
                }
            }
            break;
        }
        case SET_USER_COUNT: {
            return {
                ...state,
                usersCount: action.count,
            }
        }
        case SELECT_USER: {
            return {
                ...state,
                selectedUser: {...action.user},
                userIsSelected: true
            }
            break;
        }
        case TOGGLE_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default: {
            return state;
        }
    }
}

export default userReducer;