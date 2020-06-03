import React, { Fragment, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image } from 'react-native'
import { Divider } from 'react-native-elements';
import compose from "recompose/compose"
import { connect } from "react-redux"
import TopBar from '../components/TopBar';
import { bindActionCreators } from "redux"
import BottomBar from '../components/BottomBar';
import NumPad from '../components/NumPad';
import PointsBar from '../components/PointsBar';
import PropTypes from 'prop-types';
import { scale, verticalScale } from '../utils/scalingUtils';
import { getImageFromIndex } from '../utils/imageUtils'
import { saveChangesToRow, saveRoundPoints, resetTeamPoints } from "../actions/actions"

class FirstScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentlyActiveColorButton: 0,
            isEditing: false,
            editedRowIndex: null
        }
    }

    componentDidMount = () => {
        const { navigation } = this.props

        navigation.addListener("focus", () => {
            if (this.props.route.params && this.props.route.params.isEditing) {
                this.setState({ isEditing: true, currentlyActiveColorButton: this.props.route.params.currentlyActiveColorButton, editedRowIndex: this.props.route.params.indexOfRow })
            }
        })
    }

    calculateRoundPoints = () => {
        const { currentlyActiveColorButton } = this.state
        const { teams } = this.props

        const miOverallScore = parseInt(teams['Mi'].score.number || '0') + parseInt(teams['Mi'].bonus.number || '0')
        const viOverallScore = parseInt(teams['Vi'].score.number || '0') + parseInt(teams['Vi'].bonus.number || '0')

        if (miOverallScore === 0 && viOverallScore === 0) return

        return {
            teams: [
                {
                    score: teams['Mi'].score.number,
                    bonus: teams['Mi'].bonus.number,
                    combinedPoints: miOverallScore,
                },
                {
                    score: teams['Vi'].score.number,
                    bonus: teams['Vi'].bonus.number,
                    combinedPoints: viOverallScore,
                }
            ],
            currentlyActiveColorButton
        }
    }

    handleColorButtonPressed = (index) => {
        this.setState({ currentlyActiveColorButton: index })
    }

    handleSaveRoundPoints = () => {
        const { saveRoundPoints, navigation, resetTeamPoints } = this.props

        const roundPoints = this.calculateRoundPoints()

        if (roundPoints) {
            saveRoundPoints(roundPoints)
            navigation.navigate('SecondScreen')
            resetTeamPoints()
        }
    }

    handleSaveEdit = () => {
        const { editedRowIndex } = this.state
        const { saveChangesToRow, navigation } = this.props

        saveChangesToRow(editedRowIndex, this.calculateRoundPoints())
        this.setState({ isEditing: false }, () => navigation.navigate("SecondScreen"))
    }

    render() {
        const { currentlyActiveColorButton, isEditing } = this.state
        const { navigation, teams, selectedPoints, selectedTeamName } = this.props;

        return (
            <>
                <View style={styles.scoreTrackerContainer}>
                    <View style={[styles.row, { flex: 20 }]}>
                        {Object.values(teams).sort((a, b) => a.name > b.name).map((team, idx) => {
                            return (
                                <View style={[styles.container, { paddingLeft: idx === 0 ? scale(4) : scale(2), paddingRight: idx === 1 ? scale(4) : scale(2), paddingBottom: scale(1) }]} key={idx}>
                                    <TopBar isActive={selectedTeamName === team.name} {...team} />
                                </View>
                            )
                        })}
                    </View>
                    <View style={[styles.row, { flex: 16 }]}>
                        <View style={[styles.container, { paddingLeft: scale(4), paddingRight: scale(2), paddingTop: scale(1), paddingBottom: scale(4) }]}>
                            <PointsBar title={"igra"} isActive={selectedPoints === 'igra'} />
                        </View>
                        <View style={[styles.container, { paddingLeft: scale(2), paddingRight: scale(4), paddingTop: scale(1), paddingBottom: scale(4) }]}>
                            <PointsBar title={"zvanje"} isActive={selectedPoints === 'zvanje'} />
                        </View>
                    </View>
                </View>
                <View style={styles.colorButtonsRoot}>
                    <View style={[styles.row, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
                        {[0, 1, 2, 3].map((numberOfColor, idx, arr) => {
                            return (
                                <TouchableOpacity key={numberOfColor} onPress={() => this.handleColorButtonPressed(numberOfColor)} disabled={currentlyActiveColorButton === numberOfColor} style={[styles.colorButtonContainer, { marginRight: numberOfColor === arr.length - 1 ? 0 : verticalScale(24) }, numberOfColor === currentlyActiveColorButton && styles.disabledColorButtonContainer]}>
                                    <Image source={getImageFromIndex(numberOfColor, currentlyActiveColorButton !== numberOfColor)} resizeMode='stretch' style={{ width: scale(24), height: scale(24) }}></Image>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
                <View style={styles.numPadContainer}>
                    <View style={{ flex: 1 }}>
                        <NumPad />
                    </View>
                </View>
                <View style={styles.bottomBarContainer}>
                    <View style={{ flex: 1 }}>
                        <BottomBar handleSaveRoundPoints={this.handleSaveRoundPoints} handleSaveEdit={this.handleSaveEdit} isEditing={isEditing} navigation={navigation} currentlyActiveColorButton={currentlyActiveColorButton} />
                    </View>
                </View>
            </>
        )
    }
}

FirstScreen.propTypes = {
    selectedPoints: PropTypes.string,
    selectedTeamName: PropTypes.string,
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    scoreTrackerContainer: {
        flex: 40,
    },
    row: {
        flexDirection: "row",
    },
    container: {
        flex: 1,
        flexDirection: "row"
    },
    numPadContainer: {
        flex: 100,
    },
    bottomBarContainer: {
        flex: 20,
    },
    colorButtonsRoot: {
        flex: 10,
        marginTop: scale(12)
    },
    colorButtonContainer: {
        alignItems: "center",
        justifyContent: 'center',
    },
    colorButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

const mapStateToProps = ({ state }) => {
    return {
        selectedTeamName: state.selectedTeamName,
        selectedPoints: state.selectedPoints,
        teams: state.teams
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ saveChangesToRow, saveRoundPoints, resetTeamPoints }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(FirstScreen)