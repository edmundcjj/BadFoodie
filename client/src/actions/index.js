import axios from 'axios';

export function getReviews(limit = 10, start = 0, order = 'asc', list = ''){
  const request = axios.get(`/api/reviews?limit=${limit}&skip=${start}&order=${order}`)
                  .then(response => {
                      if (list){
                        return [...list, ...response.data]
                      }
                      else{
                        return response.data
                      }
                    }
                  )

  return{
    type: 'GET_REVIEWS',
    payload: request
  }
}

export function getReviewWithReviewer(id){
    const request = axios.get(`/api/getReview?id=${id}`)

    return (dispatch)=>{
        request.then(({data})=>{
            let review = data;

            axios.get(`/api/getReviewer?id=${review.ownerId}`)
            .then(({data})=>{
                let response = {
                    review,
                    reviewer:data
                }

                dispatch({
                    type:'GET_REVIEW_W_REVIEWER',
                    payload:response
                })
            })
        })
    }
}

export function clearReviewWithReviewer(){
    return {
        type:'CLEAR_REVIEW_W_REVIEWER',
        payload:{
            review:{},
            reviewer:{}
        }
    }
}
