import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class SecondScreen extends React.Component {
    render() {
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <Button buttonStyle={styles.confirmationButton} title="Nova" titleStyle={styles.title} />
                </View>
            </View>
        )
    }
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
        width: wp('100%'),
        height: hp('15%')
    },
    title: {
        fontSize: 35
    }
})
