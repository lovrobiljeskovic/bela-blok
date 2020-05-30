import React from "react"
import PropTypes from "prop-types"
import compose from "recompose/compose"
import { connect } from "react-redux"
import TopBar from '../components/TopBar'
import { bindActionCreators } from "redux"
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from "react-native";
import { scale, moderateScale, getWindowWidth } from '../utils/scalingUtils';
import { Divider } from "react-native-elements"

class SecondScreen extends React.Component {
    render() {
        const { navigation, overallPoints } = this.props

        const combinedTeamRoundPoints = overallPoints.reduce((acc, roundPoints) => {
            return [acc[0] + roundPoints.teams[0].combinedPoints, acc[1] + roundPoints.teams[1].combinedPoints]
        }, [0, 0])

        return (
            <SafeAreaView style={styles.root}>
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
                            data={overallPoints}
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
            </SafeAreaView>
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

SecondScreen.propTypes = {
    navigation: PropTypes.any,
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "rgb(242, 242, 247)",
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
});

const mapStateToProps = ({ state }) => {
    return {
        selectedTeamName: state.selectedTeamName,
        teams: state.teams,
        overallPoints: state.overallPoints
    }
}

export default compose(
    connect(mapStateToProps, null),
)(SecondScreen)