import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { scale, moderateScale } from "../utils/scalingUtils"

export default class TopBar extends React.Component {
    render() {
        const { isActive, bonusPoints, score, teamName, handleTeamClick } = this.props;

        return (
            <TouchableOpacity onPress={() => handleTeamClick(teamName)} style={isActive ? [styles.root, styles.selectedRoot] : styles.root}>
                <View style={styles.leftColumn}>
                    <Text style={styles.text}>
                        {teamName}
                    </Text>
                    <Text style={styles.text}>
                        {bonusPoints || '0'}
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
