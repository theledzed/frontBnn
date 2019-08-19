import axios from "axios";

export const register = newUser => {
  return axios
    .post("users/register", {
      fist_name: newUser.fist_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      userAdmin: newUser.userAdmin
    })
    .then(res => {
      console.log("Registered");
    });
};

export const login = user => {
  return axios
    .post("users/login", {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch(e => {
      console.log("errorLogin", e);
    });
};

export const registerMovie = movie => {
  return axios
    .post("/movies/register/movie", {
      tittle: movie.tittle,
      director_name: movie.director_name,
      date: movie.date,
      time: movie.time,
      captchaToken: movie.captchaToken
    })
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log("errorLogin", e);
    });
};

export const deleteMovie = movie => {
  return axios
    .post("/movies/deleted/movie", {
      _id: movie
    })
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log("errorLogin", e);
    });
};

export const updateMovie = movie => {
  return axios
    .put("/movies/update/movie", {
      tittle: movie.tittle,
      director_name: movie.director_name,
      date: movie.date,
      time: movie.time,
      _id: movie._id
    })
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log("errorLogin", e);
    });
};

export const moviesRegistered = movies => {
  return axios
    .get("/movies/movie/register")
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log("errorLogin", e);
    });
};
