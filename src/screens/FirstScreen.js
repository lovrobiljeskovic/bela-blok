import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Divider } from 'react-native-elements';
import compose from "recompose/compose"
import { connect } from "react-redux"
import TopBar from '../components/TopBar';
import { bindActionCreators } from "redux"
import BottomBar from '../components/BottomBar';
import NumPad from '../components/NumPad';
import PointsBar from '../components/PointsBar';
import PropTypes from 'prop-types';
import { scale } from '../utils/scalingUtils';

class FirstScreen extends React.Component {
    render() {
        const { navigation, teams, selectedPoints, selectedTeam } = this.props;

        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.scoreTrackerContainer}>
                    <View style={[styles.row, { flex: 20 }]}>
                        {Object.values(teams).map((team, idx) => {
                            return (
                                <View style={[styles.container, { paddingLeft: idx === 0 ? scale(4) : scale(2), paddingRight: idx === 1 ? scale(4) : scale(2), paddingBottom: scale(1), paddingTop: scale(4) }]} key={idx}>
                                    <TopBar isActive={selectedTeam === team.name} {...team} />
                                </View>
                            )
                        })}
                    </View>
                    <View style={[styles.row, { flex: 20 }]}>
                        <View style={[styles.container, { paddingLeft: scale(4), paddingRight: scale(2), paddingTop: scale(1), paddingBottom: scale(4) }]}>
                            <PointsBar title={"igra"} isActive={selectedPoints === 'igra'} />
                        </View>
                        <View style={[styles.container, { paddingLeft: scale(2), paddingRight: scale(4), paddingTop: scale(1), paddingBottom: scale(4) }]}>
                            <PointsBar title={"zvanje"} isActive={selectedPoints === 'zvanje'} />
                        </View>
                    </View>
                </View>
                <View style={styles.numPadContainer}>
                    <View style={{ flex: 1 }}>
                        <NumPad />
                    </View>
                </View>
                <View style={styles.bottomBarContainer}>
                    <View style={{ flex: 1 }}>
                        <BottomBar navigation={navigation} />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

FirstScreen.propTypes = {
    miScore: PropTypes.string,
    viScore: PropTypes.string,
    selectedPoints: PropTypes.string,
    selectedTeam: PropTypes.string,
    miBonusScore: PropTypes.string,
    viBonusScore: PropTypes.string,
    handlePointsClick: PropTypes.func,
    handleTeamClick: PropTypes.func,
    handleDeleteAll: PropTypes.func,
    handleDeleteLastInput: PropTypes.func,
    handleNumPadClick: PropTypes.func,
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "rgb(242, 242, 247)",
    },
    scoreTrackerContainer: {
        flex: 30,
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
})

const mapStateToProps = ({ state }) => {
    return {
        selectedTeam: state.selectedTeam,
        selectedPoints: state.selectedPoints,
        teams: state.teams
    }
}

export default compose(
    connect(mapStateToProps, null),
)(FirstScreen)