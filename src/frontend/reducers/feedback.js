const feedbackReducer = (state = [], action)=>{
    switch(action.type){
        case 'SET_FEEDBACKS':
            return action.feedbacks;
        default: 
            return state;
    }
}

export default feedbackReducer;