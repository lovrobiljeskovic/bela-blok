import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
    },
    confirmationButton: {
        backgroundColor: 'green',
        width: wp('65%'),
        height: hp('15%')
    },
    goBackButton: {
        backgroundColor: 'red',
        width: wp('35%'),
        height: hp('15%')
    }
})
