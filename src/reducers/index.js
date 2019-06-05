import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
	currentUser: null,
	isLoading: true
};

const initialChannelState = {
	currentChannel: null
};

const user_reducer = (state = initialUserState, action) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				currentUser: action.payload.currentUser,
				isLoading: false
			};
		case actionTypes.CLEAR_USER:
			return {
				...state,
				isLoading: false
			};
		default:
			return state;
	}
};

const channelReducer = (state = initialChannelState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_CHANNEL:
			return {
				...state,
				currentChannel: action.payload.currentChannel
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	user: user_reducer,
	channel: channelReducer
});

export default rootReducer;
