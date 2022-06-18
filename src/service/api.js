const baseUrl = 'https://pixabay.com/api/';

export const searchImages = async (search) => {
  const parameters = new URLSearchParams({
    key: '26236897-1332e9e9dbdbc4080cdf2cc84',
    q: search,
    image_type: 'photo',
    per_page: 12,
    page: 1,
  });

  try {
    const response = await fetch(`${baseUrl}?${parameters}`);
    const images = await response.json();

    return images;
  } catch (error) {
    console.log(error);
  }
};

export const loadMoreImages = async (search, page) => {
  const parameters = new URLSearchParams({
    key: '26236897-1332e9e9dbdbc4080cdf2cc84',
    q: search,
    image_type: 'photo',
    per_page: 12,
    page: page,
  });

  try {
    const response = await fetch(`${baseUrl}?${parameters}`);
    const images = await response.json();

    return images;
  } catch (error) {
    console.log(error);
  }
};
