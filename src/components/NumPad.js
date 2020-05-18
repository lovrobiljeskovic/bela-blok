import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

export default class NumPad extends React.Component {
    render() {
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <Button onPress={() => this.props.handleNumPadClick("1")} buttonStyle={styles.numPadButton} title="1" titleStyle={styles.title} />
                    <Button onPress={() => this.props.handleNumPadClick("2")} buttonStyle={styles.numPadButton} title="2" titleStyle={styles.title} />
                    <Button onPress={() => this.props.handleNumPadClick("3")} buttonStyle={styles.numPadButton} title="3" titleStyle={styles.title} />
                </View>
                <View style={styles.container}>
                    <Button onPress={() => this.props.handleNumPadClick("4")} buttonStyle={styles.numPadButton} title="4" titleStyle={styles.title} />
                    <Button onPress={() => this.props.handleNumPadClick("5")} buttonStyle={styles.numPadButton} title="5" titleStyle={styles.title} />
                    <Button onPress={() => this.props.handleNumPadClick("6")} buttonStyle={styles.numPadButton} title="6" titleStyle={styles.title} />
                </View>
                <View style={styles.container}>
                    <Button onPress={() => this.props.handleNumPadClick("7")} buttonStyle={styles.numPadButton} title="7" titleStyle={styles.title} />
                    <Button onPress={() => this.props.handleNumPadClick("8")} buttonStyle={styles.numPadButton} title="8" titleStyle={styles.title} />
                    <Button onPress={() => this.props.handleNumPadClick("9")} buttonStyle={styles.numPadButton} title="9" titleStyle={styles.title} />
                </View>
                <View style={styles.container}>
                    <Button onPress={() => this.props.deleteAll()} buttonStyle={styles.numPadButton} title='Izbriši sve' titleStyle={styles.title} />
                    <Button onPress={() => this.props.handleNumPadClick("0")} buttonStyle={styles.numPadButton} title="0" titleStyle={styles.title} />
                    <Button buttonStyle={styles.numPadButton} title='Izbriši zadnji unos' titleStyle={styles.delTitle} />
                </View>
            </View>
        )
    }
}

NumPad.propTypes = {
    handleNumPadClick: PropTypes.func,
    deleteAll: PropTypes.func
}

const styles = StyleSheet.create({
    root: {
        display: "flex",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
    },
    numPadButton: {
        backgroundColor: 'white',
        height: hp('65%') / 4,
        width: wp('100%') / 3,
        borderWidth: 5,
        borderColor: 'black'
    },
    container: {
        display: "flex",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
    },
    title: {
        fontSize: 30,
        color: 'black'
    },
    delTitle: {
        fontSize: 20,
        color: 'black'
    }
})