import axios from 'axios';

/*====================REVIEWS================================*/
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

export function addReview(review){
    console.log(review)
    const request = axios.post('/api/review',review)
        .then(response => response.data);

    return {
        type:'ADD_REVIEW',
        payload:request
    }
}

export function clearNewReview() {
    return {
        type:'CLEAR_NEWREVIEW',
        payload:{}
    }
}

export function getUserPosts(userId){
    const request = axios.get(`/api/user_posts?user=${userId}`)
                    .then(response => response.data);

    return {
        type:'GET_USER_POSTS',
        payload:request
    }
}

export function getReview(reviewId){
    const request = axios.get(`/api/getReview?id=${reviewId}`)
                    .then(response => response.data);

    return {
        type:'GET_REVIEW',
        payload:request
    }
}

export function updateReview(data){
    const request = axios.post(`/api/update_review`, data)
                    .then(response => response.data);

    return {
        type:'UPDATE_REVIEW',
        payload:request
    }
}

export function deleteReview(reviewId){
    const request = axios.delete(`/api/delete_review?id=${reviewId}`)
                    .then(response => response.data);

    return {
        type:'DELETE_REVIEW',
        payload:request
    }
}

export function clearReview(){
    return {
        type:'CLEAR_REVIEW',
        payload:{
          review:null,
          updateReview: false,
          postDeleted: false
        }
    }
}

/*====================USER================================*/
export function loginUser({email,password}){
    const request = axios.post('/api/login',{email,password})
                .then(response => response.data);

    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/auth')
                .then(response => response.data);

    return {
        type:'USER_AUTH',
        payload:request
    }

}
