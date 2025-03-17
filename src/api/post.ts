import axios from 'axios';

export const fetchGeneratedPost = () => {
  return axios.get('/next-post').then((res) => res.data);
};