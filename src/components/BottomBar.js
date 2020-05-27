import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { scale, moderateScale } from "../utils/scalingUtils"
import { saveRoundPoints, resetPoints } from "../actions/actions"
import compose from "recompose/compose"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"


class BottomBar extends React.Component {

    handleSaveRoundPoints = () => {
        const { teams, saveRoundPoints, navigation, resetPoints } = this.props;
        const miOverallScore = parseInt(teams['Mi'].score.number || '0') + parseInt(teams['Mi'].bonus.number || '0')
        const viOverallScore = parseInt(teams['Vi'].score.number || '0') + parseInt(teams['Vi'].bonus.number || '0')
        const roundPoints = [
            {
                score: teams['Mi'].score.number,
                bonus: teams['Mi'].bonus.number,
                combinedPoints: miOverallScore
            },
            {
                score: teams['Vi'].score.number,
                bonus: teams['Vi'].bonus.number,
                combinedPoints: viOverallScore
            }
        ]
        saveRoundPoints(roundPoints)
        navigation.navigate('SecondScreen')
        resetPoints()
    }

    // handleBackPress = () => {
    //     const { navigation, resetPoints} = this.props;
    //     navigation.navigate('SecondScreen')
    //     resetPoints()
    // }

    render() {

        return (
            <View style={styles.root}>
                <View style={[styles.container, { paddingLeft: scale(1), paddingRight: scale(2) }]}>
                    <TouchableOpacity onPress={this.handleSaveRoundPoints} style={styles.confirmationButton}>
                        <Text style={styles.title}>potvrdi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

BottomBar.propTypes = {
    navigation: PropTypes.any,
    teams: PropTypes.object
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "row",
        margin: scale(2),
    },
    container: {
        flex: 1,
        paddingTop: scale(2),
        paddingBottom: scale(2),
    },
    // goBackButton: {
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     backgroundColor: 'rgb(255, 69, 58)',
    //     borderRadius: scale(4),
    //     borderWidth: 1,
    //     borderColor: "rgb(228, 228, 228)"
    // },
    confirmationButton: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: scale(3),
        backgroundColor: 'rgb(46, 204, 113)',
        borderRadius: scale(4),
        borderWidth: 1,
        borderColor: "rgb(228, 228, 228)"
    },
    title: {
        fontSize: moderateScale(36, 0.25),
        color: 'rgb(58, 58, 60)',
        fontVariant: ["small-caps"],
        fontWeight: "900",
    }
})

const mapStateToProps = ({ state }) => {
    return {
        teams: state.teams
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ saveRoundPoints, resetPoints, }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(BottomBar)
