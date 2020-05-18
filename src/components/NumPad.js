import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

export default class NumPad extends React.Component {
    render() {
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <Button onClick={() => this.props.handleNumPadClick("1")} buttonStyle={styles.numPadButton} title="1" titleStyle={styles.title} />
                    <Button onClick={() => this.props.handleNumPadClick("2")} buttonStyle={styles.numPadButton} title="2" titleStyle={styles.title} />
                    <Button onClick={() => this.props.handleNumPadClick("3")} buttonStyle={styles.numPadButton} title="3" titleStyle={styles.title} />
                </View>
                <View style={styles.container}>
                    <Button onClick={() => this.props.handleNumPadClick("4")} buttonStyle={styles.numPadButton} title="4" titleStyle={styles.title} />
                    <Button onClick={() => this.props.handleNumPadClick("5")} buttonStyle={styles.numPadButton} title="5" titleStyle={styles.title} />
                    <Button onClick={() => this.props.handleNumPadClick("6")} buttonStyle={styles.numPadButton} title="6" titleStyle={styles.title} />
                </View>
                <View style={styles.container}>
                    <Button onClick={() => this.props.handleNumPadClick("7")} buttonStyle={styles.numPadButton} title="7" titleStyle={styles.title} />
                    <Button onClick={() => this.props.handleNumPadClick("8")} buttonStyle={styles.numPadButton} title="8" titleStyle={styles.title} />
                    <Button onClick={() => this.props.handleNumPadClick("9")} buttonStyle={styles.numPadButton} title="9" titleStyle={styles.title} />
                </View>
                <View style={styles.container}>
                    <Button buttonStyle={styles.numPadButton} title='DELETE ALL' titleStyle={styles.title} />
                    <Button onClick={() => this.props.handleNumPadClick("0")} buttonStyle={styles.numPadButton} title="0" titleStyle={styles.title} />
                    <Button buttonStyle={styles.numPadButton}size={45} title='DELETE' titleStyle={styles.title} />
                </View>
            </View>
        )
    }
}

NumPad.propTypes = {
    handleNumPadClick: PropTypes.func
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
        fontSize: 50,
        color: 'black'
    }
})