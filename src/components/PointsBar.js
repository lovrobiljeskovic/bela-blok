import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { scale, moderateScale } from "../utils/scalingUtils"

export default class PointsBar extends React.Component {
    render() {
        const { isActive, title, handlePointsClick } = this.props

        return (
            <TouchableOpacity onPress={() => handlePointsClick(title)} style={isActive ? [styles.root, styles.selectedRoot] : styles.root}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }
}

PointsBar.propTypes = {
    isActive: PropTypes.bool,
    handlePointsClick: PropTypes.func,
    selectedPoints: PropTypes.string,
    title: PropTypes.string
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        borderColor: 'black',
    },
    selectedRoot: {
        backgroundColor: 'rgba(63, 195, 128, 1)'
    },
    title: {
        fontSize: moderateScale(32, 0.25),
        color: 'black'
    },
})
