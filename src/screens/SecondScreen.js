import React from "react"
import PropTypes from "prop-types"
import compose from "recompose/compose"
import { connect } from "react-redux"
import TopBar from '../components/TopBar'
import { bindActionCreators } from "redux"
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { scale, moderateScale } from '../utils/scalingUtils';

class SecondScreen extends React.Component {
    render() {
        const { navigation, overallPoints } = this.props;
        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.roundPointsContainer}>
                    <FlatList
                        data={overallPoints}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item }) => <RoundPointsRow item={item} />}
                    />
                </View>
                <View style={styles.overallScoresContainer}>
                    <View style={{ flex: 1 }}>
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
            <Text style={styles.title}>{item[0].combinedPoints}</Text>
            <Text style={styles.title}>{item[1].combinedPoints}</Text>
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
        flex: 50,
        padding: scale(2)
    },
    novaButtonContainer: {
        flex: 20,
        flexDirection: "row",
        padding: scale(2)
    },
    container: {
        height: scale(80),
        paddingTop: scale(6),
        paddingRight: scale(12),
        paddingBottom: scale(6),
        paddingLeft: scale(12),
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
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