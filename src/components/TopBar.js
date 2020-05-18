import React from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';

export default class TopBar extends React.Component {
    render() {
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.text}>{this.props.teamName}</Text>
                        <Text style={styles.text}>1</Text>
                        <Text style={styles.text}>2</Text>
                    </View>
                </View>
                <View style={styles.container}>
                <Button buttonStyle={styles.button} title="162" titleStyle={styles.title}/>
                </View>
            </View>
        )
    }
}

TopBar.propTypes = {
    teamName: PropTypes.string
}

const styles = StyleSheet.create({
    root: {
        display: "flex",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        padding: 5
    },
    container: {
        margin: 5
    },
    leftColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
    },
    text: {
        fontSize: 16
    },
    title: {
        fontSize: 65,
        color: 'black'
    },
    button: {
        backgroundColor: 'white',
        height: hp('12%'),
        width: wp('37%'),
    }
})
