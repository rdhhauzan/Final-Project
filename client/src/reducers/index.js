const initialState = {
	games: [],
	posts: [],
	users: [],
	onlineUsers: [],
	userDetail: {},
	loading: false,
	match: [],
	matching: false,
};

export function rootReducer(state = initialState, action) {
	switch (action.type) {
		case "games/setGames":
			return {
				...state,
				games: action.payload,
			};
		case "posts/setPosts":
			return {
				...state,
				posts: action.payload,
			};
		case "users/setUsers":
			return {
				...state,
				users: action.payload,
			};
		case "onlineUsers/setOnlineUsers":
			return {
				...state,
				onlineUsers: action.payload,
			};
		case "userDetail/setUserDetail":
			return {
				...state,
				userDetail: action.payload,
			};
		case "match/setMatch":
			return {
				...state,
				match: action.payload,
			};
		case "isLoading":
			return {
				...state,
				loading: true,
			};
		case "doneLoading":
			return {
				...state,
				loading: false,
			};
		case "isMatching":
			return {
				...state,
				matching: true,
			};
		case "doneMatching":
			return {
				...state,
				matching: false,
			};
		default:
			return state;
	}
}
