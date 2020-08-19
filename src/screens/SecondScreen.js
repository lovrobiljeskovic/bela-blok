import React, { Fragment } from "react"
import PropTypes from "prop-types"
import compose from "recompose/compose"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, StatusBar, Platform } from "react-native";
import { scale, moderateScale, getWindowWidth, getWindowHeight } from '../utils/scalingUtils';
import { Divider, Overlay } from "react-native-elements"
import { BlurView } from 'expo-blur'
import { updateGameWins, resetAllPoints } from "../actions/actions"
import { getImageFromIndex } from '../utils/imageUtils'
import { setTeams, resetTeamPoints } from "../actions/actions"
import Svg, { Circle } from 'react-native-svg';

class SecondScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            didGameEnd: false,
            combinedTeamRoundPoints: []
        }
    }

    componentDidMount = () => {
        const { overallPoints, gameWins, updateGameWins, selectedMaxPoints } = this.props

        const combinedTeamRoundPoints = overallPoints.reduce((acc, roundPoints) => {
            return [acc[0] + roundPoints.teams[0].combinedPoints, acc[1] + roundPoints.teams[1].combinedPoints]
        }, [0, 0])

        const winningTeam = combinedTeamRoundPoints[0] >= selectedMaxPoints ? "Mi" : (combinedTeamRoundPoints[1] >= selectedMaxPoints ? "Vi" : null)

        if (winningTeam) {
            updateGameWins({ ...gameWins, [winningTeam]: gameWins[winningTeam] + 1 })
            this.setState({ didGameEnd: true, combinedTeamRoundPoints })
        } else {
            this.setState({ combinedTeamRoundPoints })
        }
    }

    handleNewGamePressed = () => {
        const { navigation, resetAllPoints } = this.props

        this.setState({ didGameEnd: false }, () => {
            resetAllPoints()
            navigation.navigate("FirstScreen")
        })
    }

    render() {
        const { navigation, overallPoints, gameWins, setTeams, resetTeamPoints } = this.props
        const { didGameEnd, combinedTeamRoundPoints } = this.state

        return (
            <>
                {didGameEnd &&
                    <EndOfGameScreen overallPoints={overallPoints} combinedTeamRoundPoints={combinedTeamRoundPoints} didGameEnd={didGameEnd} gameWins={gameWins} handleNewGamePressed={this.handleNewGamePressed} />
                }
                <View style={styles.roundPointsContainer}>
                    <View style={{ flexGrow: 0, flexShrink: 1, flexBasis: "auto" }}>
                        <View style={styles.teamNamesContainer}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: scale(32) }}>
                                <View style={{ borderRadius: 50, backgroundColor: 'white', borderWidth: 1, borderColor: "#bdc3c7", width: scale(24), height: scale(24), justifyContent: "center", alignItems: 'center' }}>
                                    <Text style={{ fontSize: moderateScale(16, 0.1), fontWeight: "600", color: "#2ecc71" }}>{gameWins['Mi']}</Text>
                                </View>
                                <Text style={styles.teamName}>Mi</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: scale(32) }}>
                                <View style={{ borderRadius: 50, backgroundColor: 'white', borderWidth: 1, borderColor: "#bdc3c7", width: scale(24), height: scale(24), justifyContent: "center", alignItems: 'center' }}>
                                    <Text style={{ fontSize: moderateScale(16, 0.1), fontWeight: "600", color: "#e74c3c" }}>{gameWins['Vi']}</Text>
                                </View>
                                <Text style={styles.teamName}>Vi</Text>
                            </View>
                        </View>
                        <View>
                            <Divider />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            ref={(ref) => this.flatList = ref}
                            data={overallPoints}
                            onContentSizeChange={() => this.flatList.scrollToEnd()}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ item, index }) => <RoundPointsRow index={index} item={item} navigation={navigation} setTeams={setTeams} />}
                        />
                    </View>
                    <View>
                        <Divider />
                    </View>
                </View>
                <View style={styles.overallScoresContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                        {combinedTeamRoundPoints.map((teamRoundPoints, index) => {
                            return <Text key={index} style={styles.overallScoresText}>{teamRoundPoints}</Text>
                        })}
                    </View>
                </View>
                <View style={styles.novaButtonContainer}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => { resetTeamPoints(); navigation.navigate("FirstScreen", { isEditing: false }) }}
                            style={styles.confirmationButton}
                        >
                            <Text style={styles.buttonText}>nova</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {didGameEnd &&
                    <BlurView intensity={100} style={StyleSheet.absoluteFill} />
                }
            </>
        );
    }
}

const RoundPointsRow = (props) => {
    const { item, navigation, setTeams, index } = props

    const handleRowPressed = () => {
        const teams = {
            "Mi": {
                score: { number: item.teams[0].score, charsDidExceedContainer: false },
                bonus: { number: item.teams[0].bonus, charsDidExceedContainer: false },
                name: "Mi"
            },
            "Vi": {
                score: { number: item.teams[1].score, charsDidExceedContainer: false },
                bonus: { number: item.teams[1].score, charsDidExceedContainer: false },
                name: "Vi"
            }
        }

        setTeams(teams)
        navigation.navigate("FirstScreen", { currentlyActiveColorButton: item.currentlyActiveColorButton, indexOfRow: index, isEditing: true })
    }

    return (
        <TouchableOpacity onPress={handleRowPressed} style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingRight: scale(32) }}>
                <Text style={styles.title}>{item.teams[0].combinedPoints}</Text>
            </View>
            <View style={styles.absoluteContainer}>
                <Image source={getImageFromIndex(item.currentlyActiveColorButton)} resizeMode='stretch' style={{ width: scale(24), height: scale(24) }} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingLeft: scale(32) }}>
                <Text style={styles.title}>{item.teams[1].combinedPoints}</Text>
            </View>
        </TouchableOpacity>
    )
}

const EndOfGameScreen = (props) => {
    const { combinedTeamRoundPoints, didGameEnd, overallPoints, gameWins, handleNewGamePressed } = props

    const totalBonus = overallPoints.reduce((acc, roundPoints) => {
        return [acc[0] + parseInt(roundPoints.teams[0].bonus || "0"), acc[1] + parseInt(roundPoints.teams[1].bonus || "0")]
    }, [0, 0])

    return (
        <Overlay isVisible={didGameEnd} overlayStyle={{ width: getWindowWidth() - scale(40), height: getWindowHeight() - scale(100), borderRadius: scale(8) }}>
            <View style={{ flex: 1 }}>
                <View style={[styles.centeredView, { flex: 20, flexDirection: 'column' }]}>
                    <Text style={[combinedTeamRoundPoints[0] > combinedTeamRoundPoints[1] ? styles.miText : styles.viText, { fontSize: moderateScale(36, 0.1), fontWeight: "600" }]}>{combinedTeamRoundPoints[0] > combinedTeamRoundPoints[1] ? 'Mi Smo pobjedili' : 'Vi ste pobjedili'}</Text>
                </View>
                <View style={[styles.centeredView, {flex: 20, flexDirection: 'row' }]}>
                    {Array(8).fill().map((value, index) => (
                        <Svg key={index} height="20" width="34" viewBox="0 0 34 20">
                            <Circle cx="17" cy="10" r="4" fill="black" />
                        </Svg>
                    ))}
                </View>
                <View style={[styles.centeredView, { flex: 50, flexDirection: 'row' }]}>
                    <View style={{ flex: 1, paddingLeft: scale(24), paddingRight: scale(24) }}>
                        <View style={[styles.centeredView, styles.shrinkView, { flexDirection: 'row', justifyContent: "space-around" }]}>
                            <Text style={[styles.text, { fontSize: moderateScale(64, 0.1), fontWeight: "900" }]}>Mi</Text>
                            <Text style={[styles.text, { fontSize: moderateScale(64, 0.1), fontWeight: "900" }]}>Vi</Text>
                        </View>
                        <View style={[styles.centeredView, styles.shrinkView, { flexDirection: 'row', justifyContent: "space-around" }]}>
                            <Text style={[styles.numberText, { fontSize: moderateScale(64, 0.1), fontWeight: "900" }]}>{gameWins["Mi"]}</Text>
                            <Text style={[styles.numberText, { fontSize: moderateScale(64, 0.1), fontWeight: "900" }]}>{gameWins["Vi"]}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 6 }} />
                <View style={[styles.centeredView, { flex: 26, flexDirection: 'row' }]}>
                    <View style={{ flex: 1 }}>
                        <View style={[styles.pointsRowContainer]}>
                            <Text style={[styles.numberText, { fontSize: moderateScale(32, 0.1), fontWeight: "600" }]}>{combinedTeamRoundPoints[0]}</Text>
                            <View style={[styles.absoluteContainer, { paddingTop: '10', paddingBottom: '10', left: -scale(40) }]}>
                                <Text style={[styles.text, { fontSize: moderateScale(16), fontWeight: "900" }]}>igra</Text>
                            </View>
                            <Text style={[styles.numberText, { fontSize: moderateScale(32, 0.1), fontWeight: "600" }]}>{combinedTeamRoundPoints[1]}</Text>
                        </View>
                        <View style={[styles.pointsRowContainer]}>
                            <Text style={[styles.numberText, { fontSize: moderateScale(32, 0.1), fontWeight: "600" }]}>{totalBonus[0]}</Text>
                            <View style={[styles.absoluteContainer, { paddingTop: '10', paddingBottom: '10', left: -scale(40) }]}>
                                <Text style={[styles.text, { fontSize: moderateScale(16), fontWeight: "900" }]}>zvanje</Text>
                            </View>
                            <Text style={[styles.numberText, { fontSize: moderateScale(32, 0.1), fontWeight: "600" }]}>{totalBonus[1]}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 10 }} />
                <View style={[styles.centeredView, { flex: 20, flexDirection: 'row' }]}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.confirmationButton} onPress={handleNewGamePressed}>
                            <Text style={[styles.numberText, { fontSize: moderateScale(32, 0.1), fontWeight: "900" }]}>zapocni novu igru</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Overlay>
    )
}

SecondScreen.propTypes = {
    navigation: PropTypes.any,
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "rgb(242, 242, 247)",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        margin: scale(2)
    },
    roundPointsContainer: {
        flex: 100
    },
    overallScoresContainer: {
        flex: 40,
        padding: scale(2),
    },
    overallScoresText: {
        fontSize: moderateScale(36),
        fontWeight: "900",
        paddingLeft: scale(54),
        paddingRight: scale(54),
    },
    novaButtonContainer: {
        flex: 20,
        flexDirection: "row",
        padding: scale(2)
    },
    teamNamesContainer: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "auto",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    teamName: {
        fontSize: moderateScale(48, 0.1),
        color: 'rgb(58, 58, 60)',
        fontWeight: "900",
    },
    container: {
        position: "relative",
        height: scale(80),
        paddingBottom: scale(6),
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1,
        elevation: 3,
    },
    absoluteContainer: {
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        width: getWindowWidth()
    },
    title: {
        fontSize: moderateScale(36),
        fontVariant: ["tabular-nums"],
        color: 'rgb(58, 58, 60)',
        fontWeight: "900"
    },
    buttonText: {
        color: 'rgb(58, 58, 60)',
        fontVariant: ["small-caps"],
        fontWeight: "900",
        fontSize: moderateScale(36, 0.25)
    },
    confirmationButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: scale(3),
        backgroundColor: '#2ecc71',
        borderRadius: scale(4),
        borderWidth: 1,
        borderColor: "rgb(228, 228, 228)",
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center"
    },
    shrinkView: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "auto"
    },
    pointsRowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        margin: scale(10),
        paddingLeft: scale(16),
        paddingRight: scale(16),
        backgroundColor: "#ecf0f1",
        borderColor: "#ecf0f1",
        shadowColor: "#ecf0f1",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 2,
    },
    numberText: {
        color: 'rgb(58, 58, 60)',
        fontVariant: ["tabular-nums"],
    },
    miText: {
        color: '#2ecc71',
        fontVariant: ["small-caps"],
    },
    viText: {
        color: '#FF0000',
        fontVariant: ["small-caps"]
    }
});

const mapStateToProps = ({ state }) => {
    return {
        selectedTeamName: state.selectedTeamName,
        teams: state.teams,
        overallPoints: state.overallPoints,
        gameWins: state.gameWins,
        selectedMaxPoints: state.selectedMaxPoints
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateGameWins, resetAllPoints, setTeams, resetTeamPoints }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(SecondScreen)