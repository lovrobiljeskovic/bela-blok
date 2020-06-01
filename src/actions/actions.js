export const setSelectedTeam = (teamName) => ({
    type: "SET_SELECTED_TEAM",
    payload: teamName
})

export const setSelectedPoints = (pointsType) => ({
    type: "SET_SELECTED_POINTS",
    payload: pointsType
})

export const updateTeam = (team, newState) => ({
    type: "UPDATE_TEAM",
    payload: { team, newState }
})

export const setTeams = (teams) => ({
    type: "SET_TEAMS",
    payload: teams
})

export const saveRoundPoints = (roundPoints) => ({
    type: "SAVE_ROUND_POINTS",
    payload: roundPoints
})

export const resetTeamPoints = () => ({
    type: "RESET_TEAM_POINTS"
})

export const resetAllPoints = () => ({
    type: "RESET_ALL_POINTS"
})

export const updateGameWins = (gameWins) => ({
    type: "UPDATE_GAME_WINS",
    payload: gameWins
})

export const setSelectedMaxPoints = (buttonIndex) => ({
    type: "SET_SELECTED_MAX_POINTS",
    payload: buttonIndex
})

export const saveChangesToRow = (index, roundPoints) => ({
    type: "SAVE_CHANGES_TO_ROW",
    payload: { index, roundPoints }
})