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


class FirstScreen extends React.Component {
    render() {
        const { navigation, teams, selectedPoints, selectedTeam } = this.props;
        
        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.scoreTrackerContainer}>
                    <View style={[styles.row, { flex: 20 }]}>
                        {Object.values(teams).map((team, idx) => {
                            return <TopBar isActive={selectedTeam === team.name} {...team} key={idx} />
                        })}
                    </View>
                    <View style={styles.dividerContainer}>
                        <Divider />
                    </View>
                    <View style={[styles.row, { flex: 20 }]}>
                        <PointsBar title={"Igra"} isActive={selectedPoints === 'Igra'} />
                        <PointsBar title={"Zvanje"} isActive={selectedPoints === 'Zvanje'} />
                    </View>
                </View>
                <View style={styles.numPadContainer}>
                    <View style={[styles.row, { flex: 1 }]}>
                        <NumPad />
                    </View>
                </View>
                <View style={styles.bottomBarContainer}>
                    <View style={[styles.row, { flex: 1 }]}>
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
    },
    scoreTrackerContainer: {
        flex: 30,
        flexDirection: "column"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center"
    },
    dividerContainer: {
        flex: 1
    },
    numPadContainer: {
        flex: 100,
    },
    bottomBarContainer: {
        flex: 20,
        flexDirection: "row"
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