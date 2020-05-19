import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class BottomBar extends React.Component {
    render() {
        const { navigation } = this.props

        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <Button onPress={() => navigation.navigate('SecondScreen')} icon={<FontAwesomeIcon icon={faChevronLeft} color='white' size={35} />} buttonStyle={styles.goBackButton} />
                </View>
                <View style={styles.container}>
                    <Button buttonStyle={styles.confirmationButton} title="Potvrdi" titleStyle={styles.title} />
                </View>
            </View>
        )
    }
}

BottomBar.propTypes = {
    navigation: PropTypes.any
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
        backgroundColor: 'rgba(207, 0, 15, 1)',
        width: wp('35%'),
        height: hp('15%')
    },
    title: {
        fontSize: 36
    }
})
