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
  const postPhotoToDB = photoData => api.post("photos", photoData);
  const postPhotoToRoute = (photoURL, RouteID) => api.patch(`route/${RouteID}`, {
    photoURL: photoURL
  })
  const downloadUserPhotos = (userID) => api.get(`photos?userId=${userID}`).then(response => {
    console.log(response.data);
    return response.data;
  })
  const postUserData = user => api.post("/users", user);
  const findUserData = query =>
    api.get(`/users?googleId=${query}`).then(response => {
      console.log("findUserData", response);
      return response.data;
    });
  const saveRoute = route => api.post("/route", route).then(successfulData => {
    console.log(successfulData.data);
    return successfulData.data;
  }) ; 
  const addBadge = (badges, userID) => api.patch(`users/${userID}`, {
    badges: badges
  });

  const endRoute = (newAdvCount, userID) => api.patch(`users/${userID}`, {
    advCounter: newAdvCount
  });

  const saveCities = (newCities, userID) => api.patch(`users/${userID}`, {
    cities: newCities
  });

  const updateMiles = (newMiles, userID) => api.patch(`users/${userID}`, {
    miles: newMiles
  });

  const downloadUserAdventures = (userID) => api.get(`route?createdby=${userID}`);
  
  const downloadAdventures = () => api.get('route');
  


  return {
    postUserData,
    findUserData,
    postUserPhoto,
    saveRoute,
    addBadge,
    endRoute,
    saveCities,
    updateMiles,
    downloadAdventures,
    downloadUserAdventures,
    downloadUserPhotos,
    postPhotoToDB,
    postPhotoToRoute
  };

};

export default {
  create
};
