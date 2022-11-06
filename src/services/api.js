import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

// axios.defaults.timeout = 2000;

export const api = async (query, page) => {
  const params = {
    q: query,
    page: page,
    per_page: 12,
    key: '30013057-0a5f6d6737818554e28c4e8f5',
    image_type: 'photo',
    orientation: 'horizontal',
  };

  const response = await axios.get(BASE_URL, { params: params });
  // console.log(response);
  return response.data.hits;
};
