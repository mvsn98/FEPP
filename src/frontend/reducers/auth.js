const authReducer = (state={}, action)=>{
    switch(action.type){
        case 'LOGIN':
            return {
                token: action.jwt,
                name: action.name
            }
        case 'UPDATE_NAME': 
            return {
                token: state.token,
                name: action.name
            }
        case 'LOGOUT':
            return {}
        default: 
            return state;
    }
} 

export default authReducer;