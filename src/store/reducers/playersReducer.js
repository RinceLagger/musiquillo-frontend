import {useMemo} from "react";
import {useDispatch} from "react-redux"


const UPDATE_PLAYERS = "UPDATE_PLAYERS";

const initialState = {
  players: [],
};

export function playersReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYERS:
      return {
        ...state,
        players: action.payload,
      };
    default:
      return state;
  }
}


const updatePlayerAction = (players) => ({type: UPDATE_PLAYERS, payload: players});


const buildHandlers = dispatch => ({
    updatePlayers: players => dispatch(updatePlayerAction(players)),
});


export function usePlayersHandlers(){
    const dispatch = useDispatch();
    const handlers = useMemo(()=> buildHandlers(dispatch),[dispatch]);

    return handlers;
}
