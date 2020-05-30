import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
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

class FirstScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentlyActiveColorButton: 0
        }
    }

    handleColorButtonPressed = (index) => {
        this.setState({ currentlyActiveColorButton: index })
    }

    render() {
        const { currentlyActiveColorButton } = this.state
        const { navigation, teams, selectedPoints, selectedTeamName } = this.props;

        const colorButtons = ["P", "K", "L", "F"]

        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.scoreTrackerContainer}>
                    <View style={[styles.row, { flex: 20 }]}>
                        {Object.values(teams).sort((a, b) => a.name > b.name).map((team, idx) => {
                            return (
                                <View style={[styles.container, { paddingLeft: idx === 0 ? scale(4) : scale(2), paddingRight: idx === 1 ? scale(4) : scale(2), paddingBottom: scale(1), paddingTop: scale(4) }]} key={idx}>
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
                        {colorButtons.map((button, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => this.handleColorButtonPressed(index)} disabled={currentlyActiveColorButton === index} style={[styles.colorButtonContainer, { marginRight: index === colorButtons.length - 1 ? 0 : verticalScale(24) }, index === currentlyActiveColorButton && styles.disabledColorButtonContainer]}>
                                    <View style={styles.colorButton}>
                                        <Text>{button}</Text>
                                    </View>
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
                        <BottomBar navigation={navigation} currentlyActiveColorButton={currentlyActiveColorButton} />
                    </View>
                </View>
            </SafeAreaView>
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
        backgroundColor: "rgb(242, 242, 247)",
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
        backgroundColor: 'grey',
        alignItems: "center",
        borderRadius: 1000,
        width: verticalScale(32),
        height: verticalScale(32),
    },
    disabledColorButtonContainer: {
        backgroundColor: "teal"
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

export default compose(
    connect(mapStateToProps, null),
)(FirstScreen)