import axios from "axios";
const URL = "http://localhost:3000";

export function setGames(payload) {
	return {
		type: "games/setGames",
		payload,
	};
}

export function setRegisterForm(payload) {
	return {
		type: "registerForm/setRegisterForm",
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
	console.log(payload);
	return async (dispatch) => {
		try {
			let { data } = await axios.post(`${URL}/users/register`, payload);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
}
