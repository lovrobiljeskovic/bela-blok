import React, { Fragment } from "react"
import PropTypes from "prop-types"
import compose from "recompose/compose"
import { connect } from "react-redux"
import TopBar from '../components/TopBar'
import { bindActionCreators } from "redux"
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, StatusBar, Platform } from "react-native";
import { scale, moderateScale, getWindowWidth, getWindowHeight } from '../utils/scalingUtils';
import { Divider, Overlay } from "react-native-elements"
import { updateGameWins, resetAllPoints } from "../actions/actions"

class SecondScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            didGameEnd: false,
            combinedTeamRoundPoints: []
        }
    }

    componentDidMount = () => {
        const { overallPoints, gameWins, updateGameWins } = this.props

        const combinedTeamRoundPoints = overallPoints.reduce((acc, roundPoints) => {
            return [acc[0] + roundPoints.teams[0].combinedPoints, acc[1] + roundPoints.teams[1].combinedPoints]
        }, [0, 0])

        const winningTeam = combinedTeamRoundPoints[0] >= 1001 ? "Mi" : (combinedTeamRoundPoints[1] >= 1001 ? "Vi" : null)

        if (winningTeam) {
            updateGameWins({...gameWins, [winningTeam]: gameWins[winningTeam] + 1 })
            this.setState({ didGameEnd: true, combinedTeamRoundPoints: [] })
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
        const { navigation, overallPoints, gameWins } = this.props
        const { didGameEnd, combinedTeamRoundPoints } = this.state

        return (
            <>
                {didGameEnd &&
                    <EndOfGameScreen combinedTeamRoundPoints={combinedTeamRoundPoints} didGameEnd={didGameEnd} gameWins={gameWins} handleNewGamePressed={this.handleNewGamePressed} />
                }
                <View style={styles.roundPointsContainer}>
                    <View style={{ flexGrow: 0, flexShrink: 1, flexBasis: "auto" }}>
                        <View style={styles.teamNamesContainer}>
                            <Text style={styles.teamName}>Mi</Text>
                            <Text style={styles.teamName}>Vi</Text>
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
                            renderItem={({ item }) => <RoundPointsRow item={item} />}
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
                            onPress={() => navigation.navigate("FirstScreen")}
                            style={styles.confirmationButton}
                        >
                            <Text style={styles.buttonText}>nova</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }
}

const RoundPointsRow = (props) => {
    const { item } = props

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.teams[0].combinedPoints}</Text>
            <View style={styles.iconContainer}>
                <Image source={require("../images/acorn.png")} style={{ width: scale(32), height: scale(32) }} />
            </View>
            <Text style={styles.title}>{item.teams[1].combinedPoints}</Text>
        </View>
    )
}

const EndOfGameScreen = (props) => {
    const { combinedTeamRoundPoints, didGameEnd, gameWins, handleNewGamePressed } = props

    return (
        <Overlay isVisible={didGameEnd} overlayStyle={{ width: getWindowWidth() - scale(28), height: getWindowHeight() - scale(88) }}>
            <View style={{ flex: 1 }}>
                <View style={[styles.centeredView, { flex: 20, flexDirection: 'row' }]}>
                    <Text style={[styles.text, { fontSize: moderateScale(36, 0.1), fontWeight: "600" }]}>{combinedTeamRoundPoints[0] > combinedTeamRoundPoints[1] ? 'Mi Smo pobjedili' : 'Vi ste pobjedili'}</Text>
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
                <View style={[styles.centeredView, { flex: 50, flexDirection: 'row' }]}>
                    <View style={{ flex: 1 }}>
                        <View style={[styles.centeredView, styles.shrinkView, { flexDirection: 'row', justifyContent: "space-around", margin: scale(8), borderColor: "darkgray", borderWidth: 1, borderTopLeftRadius: scale(12), borderTopRightRadius: scale(12), backgroundColor: "ghostwhite" }]}>
                            <Text style={[styles.numberText, { fontSize: moderateScale(42, 0.1), fontWeight: "900" }]}>1082</Text>
                            <Text style={[styles.numberText, { fontSize: moderateScale(42, 0.1), fontWeight: "900" }]}>728</Text>
                        </View>
                        <View style={[styles.centeredView, styles.shrinkView, { flexDirection: 'row', justifyContent: "space-around", margin: scale(8), borderColor: "darkgray", borderWidth: 1, borderBottomLeftRadius: scale(12), borderBottomRightRadius: scale(12), backgroundColor: "ghostwhite" }]}>
                            <Text style={[styles.numberText, { fontSize: moderateScale(42, 0.1), fontWeight: "900" }]}>442</Text>
                            <Text style={[styles.numberText, { fontSize: moderateScale(42, 0.1), fontWeight: "900" }]}>208</Text>
                        </View>
                    </View>
                </View>
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
        paddingRight: scale(36),
        paddingBottom: scale(6),
        paddingLeft: scale(36),
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
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
    iconContainer: {
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
        backgroundColor: 'rgb(46, 204, 113)',
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
    numberText: {
        color: 'rgb(58, 58, 60)',
        fontVariant: ["tabular-nums"],
    },
    text: {
        color: 'rgb(58, 58, 60)',
        fontVariant: ["small-caps"],
    }
});

const mapStateToProps = ({ state }) => {
    return {
        selectedTeamName: state.selectedTeamName,
        teams: state.teams,
        overallPoints: state.overallPoints,
        gameWins: state.gameWins
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateGameWins, resetAllPoints }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(SecondScreen)