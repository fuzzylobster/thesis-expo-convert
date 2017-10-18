import apisauce from "apisauce";
const create = (baseURL = "http://85c6b3d2.ngrok.io") => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache"
    },
    timeout: 10000
  });

  const postUserData = user => api.post("/authentication", user);
  const updateProfileData = (field) => {
    api.post('/user', {
      headers: {},
      data: field
    })
  }
  return {
    postUserData,
    updateProfileData
  };

};

export default {
  create
};
