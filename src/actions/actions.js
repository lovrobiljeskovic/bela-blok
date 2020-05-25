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

export const saveRoundPoints = (roundPoints) => ({
    type: "SAVE_ROUND_POINTS",
    payload: roundPoints
})

export const resetPoints = () => ({
    type: "RESET_POINTS"
})

