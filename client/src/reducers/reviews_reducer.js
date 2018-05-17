export default function(state={}, action){
  switch(action.type){

    case 'GET_REVIEWS':
      return { ...state, list:action.payload }

    case 'GET_REVIEW_W_REVIEWER':
      return {
        ...state,
        review:action.payload.review,
        reviewer: action.payload.reviewer
      }

    case 'CLEAR_REVIEW_W_REVIEWER':
      return {
        ...state,
        review:action.payload.review,
        reviewer: action.payload.reviewer
      }

    default:
      return state;
  }
}
