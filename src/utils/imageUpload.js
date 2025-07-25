// src/utils/imageUpload.js

export const imageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const imgbbApiKey = import.meta.env.VITE_image_upload_key; // Use your .env key
  const url = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (data.success) {
    return data.data.url;
  } else {
    throw new Error('Image upload failed');
  }
};
