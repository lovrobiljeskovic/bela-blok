import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { scale, moderateScale } from "../utils/scalingUtils"
import PropTypes from 'prop-types';

export default class NumPad extends React.Component {
    render() {
        const { handleDeleteAll, handleDeleteLastInput, handleNumPadClick } = this.props

        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleNumPadClick("1")} style={styles.numPadButton}>
                            <Text style={styles.title}>1</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleNumPadClick("1")} style={styles.numPadButton}>
                            <Text style={styles.title}>2</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleNumPadClick("1")} style={styles.numPadButton}>
                            <Text style={styles.title}>3</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleNumPadClick("1")} style={styles.numPadButton}>
                            <Text style={styles.title}>4</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleNumPadClick("1")} style={styles.numPadButton}>
                            <Text style={styles.title}>5</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleNumPadClick("1")} style={styles.numPadButton}>
                            <Text style={styles.title}>6</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleNumPadClick("1")} style={styles.numPadButton}>
                            <Text style={styles.title}>7</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleNumPadClick("1")} style={styles.numPadButton}>
                            <Text style={styles.title}>8</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleNumPadClick("1")} style={styles.numPadButton}>
                            <Text style={styles.title}>9</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleDeleteAll()} style={styles.numPadButton}>
                            <Text style={styles.title}>Izbriši sve</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleNumPadClick("1")} style={styles.numPadButton}>
                            <Text style={styles.title}>0</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleDeleteLastInput()} style={styles.numPadButton}>
                            <Text style={styles.delTitle}>Izbriši zadnji unos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

NumPad.propTypes = {
    handleNumPadClick: PropTypes.func,
    deleteAll: PropTypes.func,
    deleteLastInput: PropTypes.func
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        borderTopColor: "black"
    },
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
    },
    buttonContainer: {
        flex: 1,
        height: "100%",
        flexDirection: "column",
    },
    numPadButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
        borderColor: 'black',
        margin: scale(4)
    },
    title: {
        fontSize: moderateScale(30, 0.25),
        color: 'black',
        textAlign: "center"
    },
    delTitle: {
        fontSize: moderateScale(20, 0.25),
        color: 'black',
        textAlign: "center"
    }
})