import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Test from "../components/Test"
import { Divider } from 'react-native-elements';

export default function FirstScreen() {
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.scoreTrackerContainer}>
                <View style={styles.row}>
                    <Test />
                    <Test />
                </View>
                <Divider />
                <View style={styles.row}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Igra</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Zvanje</Text>
                    </View>
                </View>
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
        flexBasis: "25%"
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
    }
})
