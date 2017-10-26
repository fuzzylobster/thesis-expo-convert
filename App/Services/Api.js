import apisauce from "apisauce";
const create = (baseURL = "http://889062c7.ngrok.io/") => {
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
  const postUserData = user => api.post("/users", user);
  const findUserData = query =>
    api.get(`/users?googleId=${query}`).then(response => {
      console.log(response);
      return response.data;
    });
  const saveRoute = route => api.post("/route", route); 
  const addBadge = (badges, userID) => api.patch(`users/1`, {
    badges: badges
  });

  const endRoute = (newAdvCount, userID) => api.patch(`users/1`, {
    advCounter: newAdvCount
  });

  const saveCities = newCities => api.patch(`users/1`, {
    cities: newCities
  });

  const updateMiles = newMiles => api.patch('users/1', {
    miles: newMiles
  });

  const downloadAdventures = () => api.get('route').then(response => {
    // console.log(response);
    return response.data.data;
  })
  return {
    postUserData,
    findUserData,
    postUserPhoto,
    saveRoute,
    addBadge,
    endRoute,
    saveCities,
    updateMiles,
    downloadAdventures
  };

};

export default {
  create
};
