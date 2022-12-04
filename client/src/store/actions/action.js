import axios from "axios";
const URL = "http://localhost:3000";

export function setGames(payload) {
	return {
		type: "games/setGames",
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
	return (dispatch) => {
		axios(`${URL}/users/register`, {
			method: "POST",
		}).catch((err) => console.log(err));
	};
}
