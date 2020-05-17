import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Test() {
    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <View style={styles.leftColumn}> 
                    <Text style={styles.text}>Hello</Text>
                    <Text style={styles.text}>1</Text>
                    <Text style={styles.text}>2</Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.bigNumber}>162</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        display: "flex",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        padding: 5
    },
    container: {
        margin: 5
    },
    leftColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
    },
    bigNumber: {
        fontSize: 72
    },
    text: {
        fontSize: 16
    }
})
