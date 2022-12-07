import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:3000";

// SET FUNCTIONS

export function setGames(payload) {
  return {
    type: "games/setGames",
    payload,
  };
}

export function setPosts(payload) {
  return {
    type: "posts/setPosts",
    payload,
  };
}

export function setUsers(payload) {
  return {
    type: "users/setUsers",
    payload,
  };
}

export function setOnlineUsers(payload) {
  return {
    type: "onlineUsers/setOnlineUsers",
    payload,
  };
}

export function setUserDetail(payload) {
  return {
    type: "userDetail/setUserDetail",
    payload,
  };
}

export function isLoading() {
  return {
    type: "isLoading",
  };
}

export function doneLoading() {
  return {
    type: "doneLoading",
  };
}

export function register(payload) {
  return async () => {
    try {
      isLoading();
      let { data } = await axios.post(`${URL}/users/register`, payload);
      Swal.fire({
        title: "Success!",
        icon: "success",
        text: "Registration successful! Please check your email to verify your account before login.",
        background: "#303030",
        color: "#FFFFFF",
        confirmButtonColor: "#D7385E",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.log(err);
    } finally {
      doneLoading();
    }
  };
}

export function login(payload) {
  return async () => {
    isLoading();
    try {
      const authKey = "a0b27f305eaed800bd7330c21a90db380a970e4e";
      let { data } = await axios.post(`${URL}/users/login`, payload);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("uuid", data.uuid);
      localStorage.setItem("email", data.email);

      window.CometChatWidget.init({
        appID: "2269480a5983d987",
        appRegion: "us",
        authKey: "a0b27f305eaed800bd7330c21a90db380a970e4e",
      }).then(
        (response) => {
          console.log("Initialization completed successfully");
          //You can now call login function.
          window.CometChatWidget.login({
            uid: data.uuid,
          }).then(
            (response) => {
              window.CometChatWidget.launch({
                widgetID: "bf899074-3999-4b4f-b173-1a680d708768",
                docked: "true",
                alignment: "right", //left or right
                roundedCorners: "true",
                height: "450px",
                width: "400px",
              });
            },
            (error) => {
              console.log("User login failed with error:", error);
              //Check the reason for error and take appropriate action.
            }
          );
        },
        (error) => {
          console.log("Initialization failed with error:", error);
          //Check the reason for error and take appropriate action.
        }
      );
      Swal.fire({
        title: `Welcome, @${data.username}!`,
        text: "Add a game to your profile to start using TeamUP!",
        background: "#303030",
        color: "#FFFFFF",
        showCancelButton: true,
        cancelButtonColor: "#D7385E",
        cancelButtonText: '<a href="/home">Go to home</a>',
        confirmButtonColor: "#D7385E",
        confirmButtonText: '<a href="/addgame"> Add a game </a>',
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: err.response.data.msg,
        background: "#303030",
        color: "#FFFFFF",
        confirmButtonColor: "#D7385E",
        confirmButtonText: "OK",
      });
    } finally {
      doneLoading();
    }
  };
}

// AXIOS FUNCTION - FETCH DATA

export function fetchGames() {
  isLoading();
  return (dispatch) => {
    axios
      .get(`${URL}/games`)
      .then(({ data }) => {
        dispatch(setGames(data));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        doneLoading();
      });
  };
}

export function fetchPosts() {
  return async (dispatch) => {
    try {
      isLoading();
      let { data } = await axios.get(`${URL}/users/posts`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      dispatch(setPosts(data));
    } catch (err) {
      console.log(err);
    } finally {
      doneLoading();
    }
  };
}

export function fetchOnlineUsers() {
  return async (dispatch) => {
    try {
      isLoading();
      let { data } = await axios.get(`${URL}/users/online`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(setOnlineUsers(data));
    } catch (err) {
      console.log(err);
    } finally {
      doneLoading();
    }
  };
}

export function fetchUsers() {
  return async (dispatch) => {
    try {
      isLoading();
      let { data } = await axios.get(`${URL}/users`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(setUsers(data));
    } catch (err) {
      console.log(err);
    } finally {
      doneLoading();
    }
  };
}

export function fetchUserById(id) {
  return async (dispatch) => {
    try {
      let { data } = await axios.get(`${URL}/users/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      dispatch(setUserDetail(data));
    } catch (err) {
      console.log(err);
    }
  };
}

// AXIOS FUNCTIONS - DATA MANIPULATION

export function addPost(payload) {
  return (dispatch) => {
    return axios({
      method: "POST",
      url: `${URL}/users/post`,
      data: payload,
      headers: {
        access_token: localStorage.getItem("access_token"),
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      body: FormData,
    })
      .then(() => {
        dispatch(fetchPosts());
      })
      .catch((error) => console.log(error));
  };
}

export function addUserGame(payload, id) {
  return async (dispatch) => {
    try {
      await axios({
        method: "post",
        url: `${URL}/usergames/${id}`,
        data: payload,
        headers: { access_token: localStorage.getItem("access_token") },
      });
      Swal.fire({
        title: `Game Info Added!`,
        text: "This game info has been added to your profile",
        background: "#303030",
        color: "#FFFFFF",
        showCancelButton: false,
        confirmButtonColor: "#D7385E",
        confirmButtonText: "<a href='/home'>Okay!</a>",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editUserGame(payload, id) {
  return async (dispatch) => {
    try {
      await axios({
        method: "put",
        url: `${URL}/usergames/${id}`,
        data: payload,
        headers: { access_token: localStorage.getItem("access_token") },
      });
      Swal.fire({
        title: `Game Info Edited!`,
        text: "You have successfuly edited your game info!",
        background: "#303030",
        color: "#FFFFFF",
        showCancelButton: false,
        confirmButtonColor: "#D7385E",
        confirmButtonText: "Okay!",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function payment() {
  return async (dispatch) => {
    try {
      let { data } = await axios.post(
        `${URL}/users/payment`,
        {},
        {
          headers: { access_token: localStorage.getItem("access_token") },
        }
      );
      let transactionToken = data.transactionToken;
      window.snap.pay(transactionToken, {
        onSuccess: async function (result) {
          console.log("success");
          console.log(result);

          Swal.fire({
            icon: "success",
            title: "Payment Success!",
            text: "Login again to Refresh your Premium Status",
            background: "#303030",
            color: "#FFFFFF",
            confirmButtonColor: "#D7385E",
            confirmButtonText: '<a href ="/login">Go to login </a>',
          });

          axios.get(`${URL}/users/premium`, {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          });

          localStorage.clear();
          this.isLogin = false;
          // this.isPremium = true;
        },

        onPending: function (result) {
          console.log("pending");
          console.log(result);
        },
        onError: function (result) {
          console.log("error");
          console.log(result);
        },
        onClose: function () {
          console.log(
            "customer closed the popup without finishing the payment"
          );
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function followFriend(id) {
  return (dispatch) => {
    return axios({
      method: "POST",
      url: `${URL}/users/follow/${id}`,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(() => {
        Swal.fire({
          title: "Followed!",
          icon: "success",
          background: "#303030",
          color: "#FFFFFF",
          confirmButtonColor: "#D7385E",
          confirmButtonText: "OK",
        });
        dispatch(fetchOnlineUsers());
      })
      .catch((err) => console.log(err));
  };
}

export function editUser(payload, id) {
  return async (dispatch) => {
    try {
      await axios({
        method: "PUT",
        url: `${URL}/users/edit/${id}`,
        data: payload,
        headers: {
          access_token: localStorage.getItem("access_token"),
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        body: FormData,
      });
      dispatch(fetchUserById(id));
      Swal.fire({
        title: `Edit Success`,
        text: "You have edited your profile!",
        background: "#303030",
        color: "#FFFFFF",
        showCancelButton: false,
        confirmButtonColor: "#D7385E",
        confirmButtonText: "Continue",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function findMatch(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${URL}/usergames/match/${id}`,
        headers: { access_token: localStorage.getItem("access_token") },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

// AXIOS FUNCTION - DELETE DATA

export function deletePost(id) {
  return (dispatch) => {
    return axios({
      method: "DELETE",
      url: `${URL}/users/post/${id}`,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(() => {
        dispatch(fetchPosts());
      })
      .catch((error) => console.log(error));
  };
}
