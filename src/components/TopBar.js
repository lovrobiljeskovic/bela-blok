import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { scale, moderateScale } from "../utils/scalingUtils"
import compose from "recompose/compose"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { setSelectedTeam } from "../actions/actions"

class TopBar extends React.Component {
    handleTeamClick = (teamName) => {
        const { setSelectedTeam } = this.props

        setSelectedTeam(teamName)
    }

    render() {
        const { isActive, bonus, score, name } = this.props;

        return (
            <TouchableOpacity onPress={() => this.handleTeamClick(name)} style={isActive ? [styles.root, styles.selectedRoot] : styles.root}>
                <View style={styles.leftColumn}>
                    <Text style={styles.text}>
                        {name}
                    </Text>
                    <Text style={styles.text}>
                        {bonus || '0'}
                    </Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Text style={styles.title}>
                        {score || '0'}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

TopBar.propTypes = {
    teamName: PropTypes.string,
    score: PropTypes.string,
    selectedTeam: PropTypes.number,
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
        padding: scale(8)
    },
    selectedRoot: {
        backgroundColor: 'rgba(63, 195, 128, 1)'
    },
    leftColumn: {
        flex: 1
    },
    scoreContainer: {
        flex: 3
    },
    text: {
        fontSize: moderateScale(16, 0.25),
    },
    title: {
        fontSize: moderateScale(32, 0.25),
        color: 'black',
        textAlign: "right"
    }
})

const mapStateToProps = ({ state }) => {
    return {
        miScore: state.miScore,
        viScore: state.viScore
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setSelectedTeam }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(TopBar)