import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class TopBar extends React.Component {
    render() {
        const { isActive } = this.props;
        return (
            <TouchableOpacity onPress={() => this.props.handleTeamClick(this.props.teamName)} style={isActive ? [styles.root, styles.selectedRoot] : styles.root}>
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.text}>{this.props.teamName}</Text>
                        <Text style={styles.text}>{this.props.bonusPoints ? this.props.bonusPoints : '0'}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.rightColumn}>
                    <Text style={styles.title}>
                        {this.props.score ? this.props.score : '0'}
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
        padding: 5,
        width: wp('50%'),
    },
    selectedRoot: {
        backgroundColor: 'rgba(63, 195, 128, 1)'
    },
    container: {
        margin: 5,
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
        fontSize: 40,
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
