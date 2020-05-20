import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Divider } from 'react-native-elements';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import NumPad from '../components/NumPad';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PointsBar from '../components/PointsBar';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';


export default class FirstScreen extends React.Component {
    render() {
        const { navigation, miScore, viScore, selectedPoints, miBonusScore, viBonusScore, selectedTeam, handlePointsClick, handleTeamClick, handleDeleteAll, handleDeleteLastInput, handleNumPadClick } = this.props;

        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.scoreTrackerContainer}>
                    <View style={styles.row}>
                        <TopBar isActive={selectedTeam === 'Mi'} bonusPoints={miBonusScore} selectedPoints={selectedPoints} handleTeamClick={handleTeamClick} score={miScore} teamName={'Mi'} />
                        <TopBar isActive={selectedTeam === 'Vi'} bonusPoints={viBonusScore} selectedPoints={selectedPoints} handleTeamClick={handleTeamClick} score={viScore} teamName={'Vi'} />
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.row}>
                        <PointsBar title={'Igra'} handlePointsClick={handlePointsClick} isActive={selectedPoints === 'Igra'} selectedPoints={selectedPoints} />
                        <PointsBar title={'Zvanje'} handlePointsClick={handlePointsClick} isActive={selectedPoints === 'Zvanje'} selectedPoints={selectedPoints} />
                    </View>
                </View>
                <View style={styles.numPadContainer}>
                    <NumPad handleDeleteLastInput={handleDeleteLastInput} handleDeleteAll={handleDeleteAll} handleNumPadClick={handleNumPadClick} />
                </View>
                <View style={styles.bottomBarContainer}>
                    <BottomBar navigation={navigation} />
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
        height: hp('100%')
    },
    scoreTrackerContainer: {
        height: hp('20%'),
        width: wp('100%'),
        display: "flex",
        flexDirection: "column",
    },
    row: {
        height: hp('9.5%'),
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    divider: {
        height: hp('1%'),
    },
    numPadContainer: {
        height: hp('65%'),
        width: wp('100%'),
    },
    bottomBarContainer: {
        height: hp('15%'),
        width: wp('100%'),
    },
})
