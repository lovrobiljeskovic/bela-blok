export const setSelectedTeam = (team) => ({
    type: "SET_SELECTED_TEAM",
    payload: team
})

export const setSelectedPoints = (pointsType) => ({
    type: "SET_SELECTED_POINTS",
    payload: pointsType
})

export const updateTeam = (team, newState) => ({
    type: "UPDATE_TEAM",
    payload: { team, newState }
})