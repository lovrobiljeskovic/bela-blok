import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class PointsBar extends React.Component {
    render() {
        const { isActive } = this.props;
        return (
            <TouchableOpacity onPress={() => this.props.handlePointsClick(this.props.title)} style={isActive ? [styles.root, styles.selectedRoot] : styles.root}>
                <View style={styles.container}>
                    <View style={styles.rightColumn}>
                    <Text style={styles.title}>
                        {this.props.title }
                    </Text>
                    </View>
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
        padding: 5,
        width: wp('50%'),
    },
    selectedRoot: {
        backgroundColor: 'green'
    },
    container: {
        margin: 2,
    },
    leftColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        width: wp('10%')
    },
    rightColumn: {
        width: wp('30%')
    },
    text: {
        fontSize: 16
    },
    title: {
        fontSize: 35,
        color: 'black'
    },
    button: {
        backgroundColor: 'white',
        height: hp('12%'),
        width: wp('40%'),
    },
    selectedButton: {
        backgroundColor: 'green'
    }
})
