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

    ensureTextIntegrity = (event) => {
        console.log(event)
    }

    render() {
        const { isActive, bonus, score, name } = this.props;

        return (
            <TouchableOpacity onPress={() => this.handleTeamClick(name)} style={isActive ? [styles.root, styles.selectedRoot] : styles.root}>
                <View style={styles.bonusContainer}>
                    <Text style={styles.text} onTextLayout={this.ensureTextIntegrity}>
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
        padding: scale(8),
        marginTop: scale(2),
        marginRight: scale(2),
        marginBottom: scale(1),
        marginLeft: scale(2)
    },
    selectedRoot: {
        backgroundColor: 'rgba(63, 195, 128, 1)'
    },
    bonusContainer: {
        flex: 1
    },
    scoreContainer: {
        flex: 2
    },
    text: {
        fontSize: moderateScale(16, 0.1),
    },
    title: {
        fontSize: moderateScale(32, 0.1),
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