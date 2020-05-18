import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Divider } from 'react-native-elements';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import NumPad from '../components/NumPad';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';

export default class FirstScreen extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          input: 0
        }
    }

    handleClick(event) {
        console.log('I GO HERE');
        console.log('EVENT TARGET VALUE', event.target.title);
        event.preventDefault();
        this.setState({ input: event.target.value });
      };
    

    render() {
        const { input } = this.state;
        console.log("INPUT", input);
        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.scoreTrackerContainer}>
                    <View style={styles.row}>
                        <TopBar teamName={'Mi'} />
                        <TopBar teamName={'Vi'} />
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.row}>
                        <View style={styles.textContainer}>
                            <Button buttonStyle={styles.button} title="Igra" titleStyle={styles.title} />
                        </View>
                        <View style={styles.textContainer}>
                            <Button buttonStyle={styles.button} title="Zvanje" titleStyle={styles.title} />
                        </View>
                    </View>
                </View>
                <View style={styles.numPadContainer}>
                    <NumPad handleClick={this.handleClick.bind(this)}/>
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
        flexBasis: "25%",
        paddingBottom: 5
    },
    row: {
        height: "50%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    textContainer: {
        flexBasis: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    divider: {
        height: 10,
    },
    numPadContainer: {
        height: hp('60%'),
        width: wp('100%'),
    },
    bottomBarContainer: {
        height: hp('20%'),
        width: wp('100%'),
    },
    title: {
        fontSize: 42,
        color: 'black'
    },
    button: {
        backgroundColor: 'white',
        height: hp('12%'),
        width: wp('50%'),
    }
})
