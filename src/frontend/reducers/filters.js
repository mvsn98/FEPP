export default (state={ name: '' }, action) => {
    switch(action.type) {
        case 'SET_SEARCH_TERM':
            return {
                name: action.name
            }
        default:
            return state;
    }
}