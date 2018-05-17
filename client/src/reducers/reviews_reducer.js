export default function(state={}, action){
  switch(action.type){

    case 'GET_REVIEWS':
      return { ...state, list:action.payload }

    case 'GET_REVIEW':
      return { ...state, review:action.payload }

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

    case 'ADD_REVIEW':
      return { ...state, newreview:action.payload }

    case 'CLEAR_NEWREVIEW':
      return {...state, newreview:action.payload}

    case 'UPDATE_REVIEW':
      return {
        ...state,
        updatereview:action.payload.success,
        review: action.payload.doc
      }

    case 'DELETE_REVIEW':
      return {...state, postDeleted:action.payload}

    case 'CLEAR_REVIEW':
      return {
        ...state,
        updatereview:action.payload.updateReview,
        review: action.payload.review,
        postDeleted: action.payload.postDeleted
      }

    default:
      return state;
  }
}
