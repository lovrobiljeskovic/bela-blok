let INITIAL_STATE = {
    selectedTeamName: "Mi",
    selectedPoints: "igra",
    overallPoints: [],
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
        case "SAVE_ROUND_POINTS":
            return {
                ...state,
                overallPoints: [...state.overallPoints, action.payload]
            }
        case "RESET_POINTS":
            return {
                ...state,
                teams: INITIAL_STATE.teams
            }

        default:
            return state
    }
}

export default reducers