import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function BottomBar() {
    return (
        <View style={styles.root}>
            <View style={styles.container}>
    <Button icon={<FontAwesomeIcon icon={faChevronLeft} color='white' size={30}/>} buttonStyle={styles.goBackButton}/>
            </View>
            <View style={styles.container}>
                <Button buttonStyle={styles.confirmationButton} title="Potvrdi"/>
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
    confirmationButton: {
        backgroundColor: 'green',
        width: 200,
        height: 50
    },
    goBackButton: {
        backgroundColor: 'red',
        width: 100,
        height: 50,
    }
})
