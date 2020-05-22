import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { scale, moderateScale } from "../utils/scalingUtils"
import compose from "recompose/compose"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { setSelectedTeam } from "../actions/actions"
import { updateTeam } from "../actions/actions"

class TopBar extends React.Component {
    handleTeamClick = (teamName) => {
        const { setSelectedTeam } = this.props

        setSelectedTeam(teamName)
    }

    // ensureTextIntegrity = ({ nativeEvent: { lines }}) => {
    //     const { selectedTeam, selectedPoints, teams, updateTeam } = this.props

    //     const scoreToUpdate = selectedPoints === "Igra" ? 'score' : 'bonus'

    //     if (lines.length > 1) {
    //         updateTeam(selectedTeam, {...teams[selectedTeam], [scoreToUpdate]: teams[selectedTeam][scoreToUpdate].slice(0, -1) })
    //     }
    // }

    render() {
        const { isActive, bonus, score, name } = this.props;

        return (
            <TouchableOpacity onPress={() => this.handleTeamClick(name)} style={isActive ? [styles.root, styles.selectedRoot] : styles.root}>
                <View style={styles.bonusContainer}>
                    <Text style={styles.teamNameText}>
                        {name}
                    </Text>
                    <Text style={styles.bonus} numberOfLines={1} ellipsizeMode={"clip"}>
                        {bonus || "0"}
                    </Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Text style={styles.score} numberOfLines={1} ellipsizeMode={"clip"}>
                        {score || "0"}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

TopBar.propTypes = {
    teamName: PropTypes.string,
    score: PropTypes.string,
    selectedTeam: PropTypes.string,
    handleTeamClick: PropTypes.func,
    selectedPoints: PropTypes.string,
    bonusPoints: PropTypes.string,
    isActive: PropTypes.bool
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        paddingRight: scale(8),
        paddingBottom: scale(2),
        paddingLeft: scale(8),
        marginTop: scale(2),
        marginRight: scale(2),
        marginBottom: scale(1),
        marginLeft: scale(2),
        borderRadius: scale(2)
    },
    selectedRoot: {
        backgroundColor: 'rgb(48, 209, 88)'
    },
    bonusContainer: {
        flex: 1,
        marginRight: scale(2)
    },
    scoreContainer: {
        flex: 2,
        marginLeft: scale(2)
    },
    teamNameText: {
        fontSize: moderateScale(20, 0.1),
        fontWeight: "900",
        color: 'rgb(58, 58, 60)',
        fontVariant: ["small-caps"]
    },
    bonus: {
        fontSize: moderateScale(16, 0.1),
        fontWeight: "600",
        color: 'rgb(58, 58, 60)',
        fontVariant: ["small-caps"],
    },
    score: {
        fontSize: moderateScale(32, 0.1),
        color: 'rgb(58, 58, 60)',
        textAlign: "right",
    }
})

const mapStateToProps = ({ state }) => {
    return {
        miScore: state.miScore,
        viScore: state.viScore,
        teams: state.teams,
        selectedTeam: state.selectedTeam,
        selectedPoints: state.selectedPoints
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateTeam, setSelectedTeam }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(TopBar)