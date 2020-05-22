import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { scale, moderateScale } from "../utils/scalingUtils"
import { } from 'react-native-gesture-handler';

export default class BottomBar extends React.Component {
    render() {
        const { navigation } = this.props

        return (
            <View style={styles.root}>
                <View style={[styles.container, { paddingLeft: scale(2), paddingRight: scale(1) }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('SecondScreen')} style={styles.goBackButton}>
                        <FontAwesomeIcon icon={faChevronLeft} color='white' size={35} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.container, { paddingLeft: scale(1), paddingRight: scale(2) }]}>
                    <TouchableOpacity style={styles.confirmationButton}>
                        <Text style={styles.title}>potvrdi</Text>
                    </TouchableOpacity>
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
        flex: 1,
        flexDirection: "row",
        margin: scale(2),
    },
    container: {
        flex: 1,
        paddingTop: scale(2),
        paddingBottom: scale(2),
    },
    goBackButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgb(255, 69, 58)',
        borderRadius: scale(4),
        borderWidth: 1,
        borderColor: "rgb(228, 228, 228)"
    },
    confirmationButton: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: scale(3),
        backgroundColor: 'rgb(46, 204, 113)',
        borderRadius: scale(4),
        borderWidth: 1,
        borderColor: "rgb(228, 228, 228)"
    },
    title: {
        fontSize: moderateScale(36, 0.25),
        color: 'rgb(58, 58, 60)',
        fontVariant: ["small-caps"],
    }
})
