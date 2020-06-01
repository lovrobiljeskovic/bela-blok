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
    },
    gameWins: { "Mi": 0, "Vi": 0 },
    selectedMaxPoints: 1001
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
        case "RESET_TEAM_POINTS":
            return {
                ...state,
                teams: INITIAL_STATE.teams
            }
        case "UPDATE_GAME_WINS":
            return {
                ...state,
                gameWins: action.payload
            }
        case "RESET_ALL_POINTS":
            return {
                ...state,
                teams: INITIAL_STATE.teams,
                overallPoints: []
            }
        case "SET_SELECTED_MAX_POINTS":
            return {
                ...state,
                selectedMaxPoints: action.payload
            }
        default:
            return state
    }
}

export default reducers