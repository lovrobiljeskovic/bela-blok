import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class TopBar extends React.Component {
    render() {
        const { isActive, bonusPoints, score, teamName, handleTeamClick } = this.props;

        return (
            <TouchableOpacity onPress={() => handleTeamClick(teamName)} style={isActive ? [styles.root, styles.selectedRoot] : styles.root}>
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.text}>
                            {teamName}
                        </Text>
                        <Text style={styles.text}>
                            {bonusPoints || '0'}
                        </Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.rightColumn}>
                        <Text style={styles.title}>
                            {score || '0'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

TopBar.propTypes = {
    teamName: PropTypes.string,
    score: PropTypes.string,
    selectedTeam: PropTypes.number,
    handleTeamClick: PropTypes.func,
    selectedPoints: PropTypes.string,
    bonusPoints: PropTypes.string,
    isActive: PropTypes.bool
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
    leftColumn: {
        width: wp('10%'),
        paddingLeft: wp("1%"), 
        paddingRight: wp("1%"), 
        paddingTop: hp("1%"),
        paddingBottom: hp("1%")
    },
    rightColumn: {
        width: wp('40%'),
        paddingLeft: wp("1%"), 
        paddingRight: wp("1%"), 
        paddingTop: hp("1%"),
        paddingBottom: hp("1%")
    },
    text: {
        fontSize: 16,
    },
    title: {
        fontSize: 32,
        color: 'black',
        textAlign: "right"
    }
})
