const baseURL = 'https://api.github.com/';


export const fetchUsers = (searchValue, page, userPerPage = 20) => {
    return fetch(`${baseURL}search/users?q=${searchValue}&per_page=${userPerPage}&page=${page}`)
        .then(response => {
            return response.json()
        })

}

export const fetchUserInfo = (user) => {
    const urls = [
        `${baseURL}users/${user}/following`,
        `${baseURL}users/${user}/followers`,
        `${baseURL}users/${user}/repos`,
    ];
    const requests = urls.map(url => fetch(url));
    return Promise.all(requests)
        .then(responses => {
            return Promise.all(responses.map(response => response.json()))
        })
}

