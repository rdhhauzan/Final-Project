const initialState = {
	games: [],
};

export function rootReducer(state = initialState, action) {
	switch (action.type) {
		case "games/setGames":
			return {
				...state,
				games: action.payload,
			};

		default:
			return state;
	}
}
