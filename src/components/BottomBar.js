import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { scale, moderateScale } from "../utils/scalingUtils"
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class BottomBar extends React.Component {
    render() {
        const { navigation } = this.props

        return (
            <View style={styles.root}>
                <TouchableOpacity onPress={() => navigation.navigate('SecondScreen')} style={styles.goBackButton}>
                    <FontAwesomeIcon icon={faChevronLeft} color='white' size={35} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmationButton}>
                    <Text style={styles.title}>Potvrdi</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

BottomBar.propTypes = {
    navigation: PropTypes.any
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: "row",
    },
    goBackButton: {
        flex: 1,
        backgroundColor: 'rgba(207, 0, 15, 1)',
    },
    confirmationButton: {
        flex: 1,
        backgroundColor: 'green',
    },
    title: {
        fontSize: 36
    }
})
