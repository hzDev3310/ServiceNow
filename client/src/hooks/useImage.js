import usePost from "../apis/usePost";

const useImage = (img, userId, attribute) => {
  const { error, loading, postData, responseData } = usePost();

  const postImg = async () => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: img,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      await postData(`/image/${userId}/${attribute}`, formData, {
        'Content-Type': 'multipart/form-data',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return { responseData, error, postImg, loading };
};

export default useImage;
