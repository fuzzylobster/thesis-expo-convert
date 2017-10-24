import apisauce from "apisauce";
const create = (baseURL = "http://270a5296.ngrok.io/") => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache"
    },
    timeout: 10000
  });

  const postUserData = user => api.post("/authentication", user);
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
    saveRoute,
    addBadge,
    endRoute
  };

};

export default {
  create
};
