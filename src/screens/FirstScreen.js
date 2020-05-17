import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Divider } from 'react-native-elements';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import NumPad from '../components/NumPad';

export default function FirstScreen() {
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.scoreTrackerContainer}>
                <View style={styles.row}>
                    <TopBar />
                    <TopBar />
                </View>
                <Divider style={styles.divider} />
                <View style={styles.row}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Igra</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Zvanje</Text>
                    </View>
                </View>
            </View>
            <View style={styles.numPadContainer}>
                <NumPad/>
            </View>
            <View>
                <BottomBar/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        height: "100%"
    },
    scoreTrackerContainer: {
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
    text: {
        fontSize: 42,
    },
    divider: {
        height: 10,
    },
    numPadContainer: {
        paddingBottom: 5
    }
})
