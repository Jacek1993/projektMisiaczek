import axios from 'axios'

const create = (user) => {
    return fetch('/api/users/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            return response.json()
        }).catch((err) => console.log(err))
}

const list = () => {
    return fetch('/api/users/', {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}
//credentials to jest nasz token jwt
const read = (params, credentials) => {
    return fetch('/api/users/' + params.userId, {                               //caly ten obiket zawierajacy method, headers, wysylamy do servera
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}

// const update = (params, credentials, user) => {
//   return fetch('/api/users/' + params.userId, {
//     method: 'PUT',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + credentials.t
//     },
//     body: JSON.stringify(user)
//   }).then((response) => {
//     return response.json()
//   }).catch((err) => console.log(err))
// }

const remove = (params, credentials) => {
    return fetch('/api/users/' + params.userId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}

const search = (query) => {
    return fetch(`/api/users/list?${query}`, {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch((err) => console.log(err))
}

const sendForm = (params, credentials, data) => {
    let config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }
    const url = '/api/users/' + params.userId;
    console.log(data);
    axios.put(url, data, config).then(r => console.log(r.status)).catch(e => console.log(e));
}

export {
    create,
    list,
    read,
    remove,
    search,
    sendForm
}

/*
The Fetch API is a newer standard to make network requests similar to XMLHttpRequest (XHR) but using promises instead,
enabling a simpler and cleaner API. To learn more about the Fetch API, visit
 */
