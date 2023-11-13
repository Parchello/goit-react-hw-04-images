import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const res = await axios.get(
    `/?q=${query}&page=${page}&key=39303751-f85d01d5ec057fa92b3d6d344&image_type=photo&orientation=horizontal&per_page=12`
  );
  return res.data;
};
