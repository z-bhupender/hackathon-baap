import { SET_CHATBOT_DATA } from "../actions/types";

const initialState = {
  data: [],
  loading: false,
};

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHATBOT_DATA:
      return { ...state, loading: true };

    default:
      return state;
  }
};

export default exampleReducer;
