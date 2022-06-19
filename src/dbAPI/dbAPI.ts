let users = [];

export const getUsers = () => {
    return [...users];
}

export const postNewUser = user => {
    users = [...users, user];
    return users;
}

export const getUserById = (id) => {
    const user = users.slice().find(item => item.id === id);
    return user ? user : null;
}

export const deleteUser = id => {
    const user = users.find(item => item.id === id);
    users = users.filter(item => item.id !== id);
    return user ? [...users] : null;
}

export const updateUser = obj => {
    const index = users.findIndex(item => item.id === obj.id);
    const user = users[index];
    users[index] = {...user, ...obj};
    return index >= 0 ? users : null;
}
