import apisauce from "apisauce";
const create = (baseURL = "https://googlephotos.herokuapp.com/") => {
  const apiUpload = apisauce.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }
  });

  const postUserPhoto = imgBody => apiUpload.post("/image-upload", imgBody);
  const postPhotoToRoute = (photoURL, RouteID) =>
    api.patch(`route/${RouteID}`, {
      photoURL: photoURL
    });
  return {
    postUserPhoto,
    postPhotoToRoute
  };
};

export default {
  create
};
