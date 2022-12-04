const initialState = {
	games: [],
	users: [],
	userDetail: {},
};

export function rootReducer(state = initialState, action) {
	switch (action.type) {
		case "games/setGames":
			return {
				...state,
				games: action.payload,
			};
		case "users/setUsers":
			return {
				...state,
				users: action.payload,
			};
		case "userDetail/setUserDetail":
			return {
				...state,
				userDetail: action.payload,
			};
		default:
			return state;
	}
}
