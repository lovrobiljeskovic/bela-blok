let INITIAL_STATE = {
    selectedTeam: "Mi",
    selectedPoints: "igra",
    teams: {
        "Mi": {
            score: "",
            bonus: "",
            name: "Mi"
        },
        "Vi": {
            score: "",
            bonus: "",
            name: "Vi"
        }
    }
}

const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_SELECTED_TEAM":
            return {
                ...state,
                selectedTeam: action.payload
            }
        case "SET_SELECTED_POINTS":
            return {
                ...state,
                selectedPoints: action.payload
            }
        case "UPDATE_TEAM":
            return {
                ...state,
                teams: {
                    ...state.teams,
                    [action.payload.team]: action.payload.newState
                }
            }
        default:
            return state
    }
}

export default reducers