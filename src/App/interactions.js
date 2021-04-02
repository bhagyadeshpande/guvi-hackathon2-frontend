import axios from 'axios';

//const BASE_URL = 'http://localhost:5000';

const BASE_URL = 'https://movie-ticket-booking-backend.herokuapp.com/';

export const login = (email,password)=>{
    return axios
    .post(`${BASE_URL}/login`,{email,password})
    .then((res)=>res.data)
}

export const fetchMovies =(token)=>{
    return axios
    .get(`${BASE_URL}/all-movies`,{
        headers:{
            authorization:token
        }
    })
    .then((res)=>res.data)
}

export const addMovie=(token, movie_id,movie_name,language,genre,duration,release_date)=>{
    return axios
    .post(`${BASE_URL}/add-movie`,
    {movie_id,movie_name,language,genre,duration,release_date},
    {
        headers:{
            authorization:token
        }
    }
    )
    .then((res)=>res.data)
}