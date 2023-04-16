const countLike = (likes) => {
  let numLike = 0;
  let numDislike = 0;
  if (!likes) {
    return;
  }
  try {
    likes.forEach((like) => {
      if (like.positive === true) {
        numLike++;
      } else {
        numDislike++;
      }
    });
  } catch (error) {
    console.error(error);
  }
  return { like: numLike, dislike: numDislike };
};

export default countLike;
