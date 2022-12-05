import axios from "axios";
const URL = "http://localhost:3000";

export function setGames(payload) {
	return {
		type: "games/setGames",
		payload,
	};
}

export function setUsers(payload) {
	return {
		type: "users/setUsers",
		payload,
	};
}

export function setUserDetail(payload) {
	return {
		type: "userDetail/setUserDetail",
		payload,
	};
}

export function fetchGames() {
	return (dispatch) => {
		axios
			.get(`${URL}/games`)
			.then(({ data }) => {
				dispatch(setGames(data));
			})
			.catch((err) => console.log(err));
	};
}

export function register(payload) {
	return async () => {
		try {
			let { data } = await axios.post(`${URL}/users/register`, payload);
			// console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
}

export function login(payload) {
	return async () => {
		try {
			let { data } = await axios.post(`${URL}/users/login`, payload);
			localStorage.setItem("access_token", data.access_token);
			localStorage.setItem("id", data.id);
			localStorage.setItem("uuid", data.uuid);
			localStorage.setItem("email", data.email);
			// console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
}

export function fetchUsers() {
	return async (dispatch) => {
		try {
			let { data } = await axios.get(`${URL}/users`, {
				headers: {
					access_token: localStorage.getItem("access_token"),
				},
			});

			dispatch(setUsers(data));

			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
}

export function fetchUserById(id) {
	console.log(id);
	return async (dispatch) => {
		try {
			let { data } = await axios.get(`${URL}/users/${id}`, {
				headers: {
					access_token: localStorage.getItem("access_token"),
				},
			});
			console.log(id, data.user);

			dispatch(setUserDetail(data));
		} catch (err) {
			console.log(err);
		}
	};
}
