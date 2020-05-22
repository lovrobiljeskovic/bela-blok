import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import compose from "recompose/compose"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { scale, moderateScale } from "../utils/scalingUtils"
import PropTypes from 'prop-types'
import { updateTeam } from "../actions/actions"

class NumPad extends React.Component {
    handleDeleteAll = () => {
        const { updateTeam, selectedTeam, teams } = this.props

        updateTeam(selectedTeam, {...teams[selectedTeam], bonus: "", score: "" })
    }

    handleDeleteLastInput = () => {
        const { updateTeam, selectedPoints, selectedTeam, teams } = this.props

        const scoreToUpdate = selectedPoints === "Igra" ? 'score' : 'bonus'

        updateTeam(selectedTeam, {...teams[selectedTeam], [scoreToUpdate]: teams[selectedTeam][scoreToUpdate].slice(0, -1) })
    }

    handleNumPadClick = (number) => {
        const { updateTeam, selectedPoints, selectedTeam, teams } = this.props

        const scoreToUpdate = selectedPoints === "Igra" ? 'score' : 'bonus'

        updateTeam(selectedTeam, {...teams[selectedTeam], [scoreToUpdate]: teams[selectedTeam][scoreToUpdate] + number })
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.handleNumPadClick("1")} style={styles.numPadButton}>
                            <Text style={styles.numpadNumber}>1</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.handleNumPadClick("2")} style={styles.numPadButton}>
                            <Text style={styles.numpadNumber}>2</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.handleNumPadClick("3")} style={styles.numPadButton}>
                            <Text style={styles.numpadNumber}>3</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.handleNumPadClick("4")} style={styles.numPadButton}>
                            <Text style={styles.numpadNumber}>4</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.handleNumPadClick("5")} style={styles.numPadButton}>
                            <Text style={styles.numpadNumber}>5</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.handleNumPadClick("6")} style={styles.numPadButton}>
                            <Text style={styles.numpadNumber}>6</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.handleNumPadClick("7")} style={styles.numPadButton}>
                            <Text style={styles.numpadNumber}>7</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.handleNumPadClick("8")} style={styles.numPadButton}>
                            <Text style={styles.numpadNumber}>8</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.handleNumPadClick("9")} style={styles.numPadButton}>
                            <Text style={styles.numpadNumber}>9</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.handleDeleteAll()} style={styles.numPadButton}>
                            <Text style={styles.numpadText}>Izbriši sve</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.handleNumPadClick("0")} style={styles.numPadButton}>
                            <Text style={styles.numpadNumber}>0</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => this.handleDeleteLastInput()} style={styles.numPadButton}>
                            <Text style={styles.numpadTextDel}>Izbriši zadnji unos</Text>
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
        margin: scale(4)
    },
    numpadNumber: {
        fontSize: moderateScale(60, 0.1),
        color: 'black',
        textAlign: "center",
        fontWeight: "600"
    },
    numpadTextDel: {
        fontSize: moderateScale(20, 0.25),
        color: 'black',
        textAlign: "center"
    },
    numpadText: {
        fontSize: moderateScale(30, 0.25),
        color: 'black',
        textAlign: "center",
    }
})

const mapStateToProps = ({ state }) => {
    return {
        selectedPoints: state.selectedPoints,
        selectedTeam: state.selectedTeam,
        teams: state.teams
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateTeam }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(NumPad)