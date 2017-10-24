import apisauce from "apisauce";
const create = (baseURL = "http://270a5296.ngrok.io/") => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache"
    },
    timeout: 10000
  });

  const apiAuth = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache"
    },
    timeout: 10000
  });

  const apiUpload = apisauce.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }
  });

  const postUserPhoto = imgBody => apiUpload.post("/image-upload", imgBody);
  const postUserData = user => api.post("/authentication", user);
  const findUserData = query =>
    api.get(`/users?googleId=${query}`).then(response => {
      console.log(response);
      return response.data;
    });
  const saveRoute = route => api.post("/route", route); 
  const addBadge = (badges, userID) => api.patch(`users/${userID}`, {
    badges: badges
  });
  const endRoute = (newAdvCount, userID) => api.patch(`users/${userID}`, {
    advCounter: newAdvCount
  }
  )
  return {
    postUserData,
    findUserData,
    postUserPhoto,
    saveRoute,
    addBadge,
    endRoute
  };

};

export default {
  create
};
