let INITIAL_STATE = {
    selectedTeamName: "Mi",
    selectedPoints: "igra",
    teams: {
        "Mi": {
            score: { number: "", charsDidExceedContainer: false },
            bonus: { number: "", charsDidExceedContainer: false },
            name: "Mi"
        },
        "Vi": {
            score: { number: "", charsDidExceedContainer: false },
            bonus: { number: "", charsDidExceedContainer: false },
            name: "Vi"
        }
    }
}

const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_SELECTED_TEAM":
            return {
                ...state,
                selectedTeamName: action.payload
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