import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export const api = async (query, page) => {
  if (query.trim() === '') {
    throw new Error('Empty query :(. Please, type something in search bar.');
  }

  const params = {
    q: query.trim(),
    page: page,
    per_page: 12,
    key: '30013057-0a5f6d6737818554e28c4e8f5',
    image_type: 'photo',
    orientation: 'horizontal',
  };

  const response = await axios.get(BASE_URL, { params });
  console.log('api full response', response);
  return response.data;
};
