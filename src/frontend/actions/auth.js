export const login = ({ name, jwt })=>({
    type: 'LOGIN',
    jwt,
    name
});

export const updateName = ({ name })=>({
    type: 'UPDATE_NAME',
    name
})

export const logout = ()=>({
    type: 'LOGOUT'
})