import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class PointsBar extends React.Component {
    render() {
        const { isActive, title, handlePointsClick } = this.props

        return (
            <TouchableOpacity onPress={() => handlePointsClick(title)} style={isActive ? [styles.root, styles.selectedRoot] : styles.root}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
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
        display: "flex",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        height: hp("9.5%"),
        width: wp('50%'),
    },
    selectedRoot: {
        backgroundColor: 'rgba(63, 195, 128, 1)'
    },
    container: {

    },
    titleContainer: {
        width: wp('30%')
    },
    title: {
        fontSize: 32,
        color: 'black'
    },
})
