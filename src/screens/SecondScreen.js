import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class SecondScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.root}>
                <View style={styles.scrollableContainer}>
                    <View style={styles.column}>
                        <Text style={styles.title}>0</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>0</Text>
                    </View>
                </View>
                <View style={styles.overallScoreContainer}>
                    <View style={styles.column}>
                        <Text style={styles.title}>0</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>0</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Button
                        onPress={() => navigation.navigate("FirstScreen")}
                        buttonStyle={styles.confirmationButton}
                        title="Nova"
                        titleStyle={styles.title}
                    />
                </View>
            </View>
        );
    }
}

SecondScreen.propTypes = {
    navigation: PropTypes.any,
};

const styles = StyleSheet.create({
    root: {
        height: hp("100%"),
    },
    confirmationButton: {
        backgroundColor: "green",
        width: wp("100%"),
        height: hp("15%"),
    },
    title: {
        fontSize: 35,
    },
    overallScoreContainer: {
        height: hp("15%"),
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    column: {
        width: wp("50%"),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        height: hp("15%"),
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
    scrollableContainer: {
        height: hp('70%'),
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'flex-start'
    }
});
