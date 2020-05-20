import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Divider } from 'react-native-elements';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import NumPad from '../components/NumPad';
import PointsBar from '../components/PointsBar';
import PropTypes from 'prop-types';


export default class FirstScreen extends React.Component {
    render() {
        const { navigation, miScore, viScore, selectedPoints, miBonusScore, viBonusScore, selectedTeam, handlePointsClick, handleTeamClick, handleDeleteAll, handleDeleteLastInput, handleNumPadClick } = this.props;

        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.scoreTrackerContainer}>
                    <View style={[styles.row, { flex: 20 }]}>
                        <TopBar isActive={selectedTeam === 'Mi'} bonusPoints={miBonusScore} selectedPoints={selectedPoints} handleTeamClick={handleTeamClick} score={miScore} teamName={'Mi'} />
                        <TopBar isActive={selectedTeam === 'Vi'} bonusPoints={viBonusScore} selectedPoints={selectedPoints} handleTeamClick={handleTeamClick} score={viScore} teamName={'Vi'} />
                    </View>
                    <View style={styles.dividerContainer}>
                        <Divider />
                    </View>
                    <View style={[styles.row, { flex: 20 }]}>
                        <PointsBar title={'Igra'} handlePointsClick={handlePointsClick} isActive={selectedPoints === 'Igra'} selectedPoints={selectedPoints} />
                        <PointsBar title={'Zvanje'} handlePointsClick={handlePointsClick} isActive={selectedPoints === 'Zvanje'} selectedPoints={selectedPoints} />
                    </View>
                </View>
                <View style={styles.numPadContainer}>
                    <View style={[styles.row, { flex: 1 }]}>
                        <NumPad handleDeleteLastInput={handleDeleteLastInput} handleDeleteAll={handleDeleteAll} handleNumPadClick={handleNumPadClick} />
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
        flex: 20
    },
})
