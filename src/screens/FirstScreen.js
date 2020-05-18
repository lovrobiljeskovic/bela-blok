import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Divider } from 'react-native-elements';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import NumPad from '../components/NumPad';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PointsBar from '../components/PointsBar';

export default class FirstScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            miScore: '',
            viScore: '',
            selectedTeam: 'Mi',
            selectedPoints: 'Igra',
            miBonusScore: '',
            viBonusScore: ''
        }
    }

    handleNumPadClick = (number) => {
        const { selectedTeam, selectedPoints } = this.state
        if (selectedTeam === 'Mi') {
            if (selectedPoints === 'Igra') {
                this.setState({ miScore: this.state.miScore + number})
            } else {
                this.setState({ miBonusScore: this.state.miBonusScore + number })
            }
        } else if (selectedTeam === 'Vi') {
            if (selectedPoints === 'Igra') {
                this.setState({ viScore: this.state.viScore + number })
            } else {
                this.setState({ viBonusScore: this.state.viBonusScore + number })
            }

        }
    }

    handleTeamClick = (teamName) => {
        this.setState({ selectedTeam: teamName })
    }

    handlePointsClick = (pointsType) => {
        this.setState({ selectedPoints: pointsType })
    }

    deleteAll = () => {
        const { selectedTeam } = this.state
        if (selectedTeam === 'Mi') {
                this.setState({ miScore: '', miBonusScore: ''})
            } else {
                this.setState({ viScore: '', viBonusScore: '' })
            }
    }


    render() {
        const { miScore, viScore, selectedPoints, miBonusScore, viBonusScore, selectedTeam} = this.state;
        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.scoreTrackerContainer}>
                    <View style={styles.row}>
                        <TopBar isActive={selectedTeam === 'Mi'} bonusPoints={miBonusScore} selectedPoints={selectedPoints} handleTeamClick={this.handleTeamClick} score={miScore} teamName={'Mi'} />
                        <TopBar isActive={selectedTeam === 'Vi'} bonusPoints={viBonusScore} selectedPoints={selectedPoints} handleTeamClick={this.handleTeamClick} score={viScore} teamName={'Vi'} />
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.row}>
                            <PointsBar title={'Igra'} handlePointsClick={this.handlePointsClick} isActive={selectedPoints ==='Igra'} selectedPoints={selectedPoints}/>
                            <PointsBar title={'Zvanje'} handlePointsClick={this.handlePointsClick} isActive={selectedPoints ==='Zvanje'} selectedPoints={selectedPoints}/>
                    </View>
                </View>
                <View style={styles.numPadContainer}>
                    <NumPad deleteAll={this.deleteAll} handleNumPadClick={this.handleNumPadClick} />
                </View>
                <View style={styles.bottomBarContainer}>
                    <BottomBar />
                </View>
            </SafeAreaView>
        )
    }
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
    textContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    selectedTextContainer: {
        backgroundColor: 'green'
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
    title: {
        fontSize: 42,
        color: 'black'
    },
    button: {
        backgroundColor: 'white',
        width: wp('50%'),
    }
})
