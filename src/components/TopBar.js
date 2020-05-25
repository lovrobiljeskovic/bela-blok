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
    constructor(props) {
        super(props)

        this.state = {
            bonusCharWidth: null,
            scoreCharWidth: null,
            bonusContainerWidth: null,
            scoreContainerWidth: null
        }
    }
    handleTeamClick = (teamName) => {
        const { setSelectedTeam } = this.props

        setSelectedTeam(teamName)
    }

    // ensureTextIntegrity = ({ nativeEvent: { lines }}) => {
    //     const { selectedTeamName, selectedPoints, teams, updateTeam } = this.props

    //     const scoreToUpdate = selectedPoints === "Igra" ? 'score' : 'bonus'

    //     if (lines.length > 1) {
    //         updateTeam(selectedTeamName, {...teams[selectedTeamName], [scoreToUpdate]: teams[selectedTeamName][scoreToUpdate].slice(0, -1) })
    //     }
    // }

    onLayout = ({ nativeEvent: { layout } }, scoreType) => {
        this.setState({ [scoreType === "bonus" ? "bonusContainerWidth" : "scoreContainerWidth"]: layout.width })
    }

    onTextLayout = ({ nativeEvent: { lines } }, scoreType) => {
        const { name, updateTeam, teams } = this.props

        const widthKey = scoreType === "bonus" ? "bonusCharWidth" : "scoreCharWidth"
        const containerKey = scoreType === "bonus" ? "bonusContainerWidth" : "scoreContainerWidth"
        const scoreToUpdate = scoreType === "bonus" ? 'bonus' : 'score'

        if (lines[0].text.length === 1) {
            this.setState({ [widthKey]: lines[0].width })
        }

        if (this.state[containerKey] !== null && this.state[widthKey] !== null && lines[0].width + this.state[widthKey] >= this.state[containerKey]) {
            updateTeam(name, { ...teams[name], [scoreToUpdate]: { ...teams[name][scoreToUpdate], charsDidExceedContainer: true } })
        }
    }

    render() {
        const { isActive, bonus, score, name } = this.props;
        const baseScore = 162
        const combinedScore = parseInt(score.number || '0') + parseInt(bonus.number || '0')
        return (
            <View style={styles.wrapperContainer}>
                <TouchableOpacity onPress={() => this.handleTeamClick(name)} style={isActive ? [styles.root, styles.selectedRoot] : styles.root}>
                    <View style={styles.bonusContainer}>
                        <Text style={styles.teamNameText}>
                            {name}
                        </Text>
                        <Text style={styles.bonus} numberOfLines={1} onLayout={(e) => this.onLayout(e, "bonus")} onTextLayout={(e) => this.onTextLayout(e, "bonus")}>
                            {bonus.number || "0"}
                        </Text>
                    </View>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.score} numberOfLines={1} onLayout={(e) => this.onLayout(e, "score")} onTextLayout={(e) => this.onTextLayout(e, "score")}>
                            {combinedScore}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.row}>
                    <Text>
                        KEKW
                    </Text>
                </View>
            </View>
        )
    }
}

TopBar.propTypes = {
    teamName: PropTypes.string,
    score: PropTypes.object,
    selectedTeamName: PropTypes.string,
    handleTeamClick: PropTypes.func,
    selectedPoints: PropTypes.string,
    bonusPoints: PropTypes.object,
    isActive: PropTypes.bool
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: scale(1),
        paddingRight: scale(8),
        paddingBottom: scale(1),
        paddingLeft: scale(8),
        borderRadius: scale(4),
        borderWidth: 1,
        borderColor: "rgb(228, 228, 228)"
    },
    selectedRoot: {
        backgroundColor: 'rgb(46, 204, 113)'
    },
    wrapperContainer: {
        flex: 1
    },
    bonusContainer: {
        flex: 1,
        marginRight: scale(2)
    },
    scoreContainer: {
        flex: 2,
        marginLeft: scale(2)
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: scale(1)
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
        fontVariant: ["tabular-nums"],
    },
    score: {
        fontSize: moderateScale(32, 0.1),
        color: 'rgb(58, 58, 60)',
        textAlign: "right",
        fontVariant: ["tabular-nums"]
    }
})

const mapStateToProps = ({ state }) => {
    return {
        teams: state.teams,
        selectedTeamName: state.selectedTeamName,
        selectedPoints: state.selectedPoints
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateTeam, setSelectedTeam }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(TopBar)