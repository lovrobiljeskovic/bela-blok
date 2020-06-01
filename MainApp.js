import React, { useState, useRef } from "react"
import { StyleSheet, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, Text, Animated } from "react-native"
import FirstScreen from "./src/screens/FirstScreen"
import SecondScreen from './src/screens/SecondScreen'
import compose from "recompose/compose"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { scale, getWindowWidth, getWindowHeight, moderateScale } from './src/utils/scalingUtils'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from "react-native-vector-icons/MaterialIcons"
import { Button } from "react-native-elements"
import { setSelectedMaxPoints } from "./src/actions/actions"

const Stack = createStackNavigator()

class MainApp extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="FirstScreen">
                    <Stack.Screen name="FirstScreen">
                        {(props) => <HeaderWrapper {...this.props}><FirstScreen {...props} /></HeaderWrapper>}
                    </Stack.Screen>
                    <Stack.Screen name="SecondScreen">
                        {(props) => <HeaderWrapper {...this.props}><SecondScreen {...props} /></HeaderWrapper>}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const HeaderWrapper = (props) => {
    const [isVisible, setIsVisible] = useState(false)
    const slideInAnim = useRef(new Animated.Value(getWindowWidth())).current

    const slideIn = () => {
        Animated.timing(slideInAnim,
            {
                toValue: 0,
                duration: 200
            }).start()
    }

    const slideOut = () => {
        Animated.timing(slideInAnim,
            {
                toValue: getWindowWidth(),
                duration: 200
            }).start()
    }

    const handleSettingsPressed = () => {
        setIsVisible(true)
        slideIn()
    }

    const handleBackPressed = () => {
        slideOut()
        setTimeout(() => setIsVisible(false), 200)
    }

    return (
        <>
            <SafeAreaView style={styles.root}>
                <View style={styles.header}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={handleSettingsPressed}>
                            <Icon name="settings" size={scale(24)} />
                        </TouchableOpacity>
                    </View>
                </View>
                {props.children}
            </SafeAreaView>
            {isVisible &&
                <Animated.View
                    style={{
                        ...styles.settingsDrawer,
                        left: slideInAnim
                    }}
                >
                    <SafeAreaView style={styles.root}>
                        <Settings handleBackPressed={handleBackPressed} {...props} />
                    </SafeAreaView>
                </Animated.View>
            }
        </>

    )
}

const Settings = (props) => {
    const { handleBackPressed, setSelectedMaxPoints, selectedMaxPoints } = props

    return (
        <>
            <View style={styles.header}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={handleBackPressed}>
                        <Icon name="forward" size={scale(24)} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={[styles.row, { paddingLeft: scale(16), paddingRight: scale(16) }]}>
                    <Text style={[styles.text, { flex: 10, fontSize: moderateScale(18), fontWeight: "900" }]}>igra se do</Text>
                    <View style={{ flex: 14, flexDirection: "row", justifyContent: "flex-end" }}>
                        <View style={{ flex: 1 }}>
                            <Button onPress={() => setSelectedMaxPoints(501)} title="501" type="outline" raised={selectedMaxPoints === 501} containerStyle={{ marginRight: scale(6) }} buttonStyle={selectedMaxPoints === 501 && styles.selectedButton} titleStyle={selectedMaxPoints === 501 && styles.selectedButtonTitle} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button onPress={() => setSelectedMaxPoints(701)} title="701" type="outline" raised={selectedMaxPoints === 701} containerStyle={{ marginRight: scale(6) }} buttonStyle={selectedMaxPoints === 701 && styles.selectedButton} titleStyle={selectedMaxPoints === 701 && styles.selectedButtonTitle} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button onPress={() => setSelectedMaxPoints(1001)} title="1001" type="outline" raised={selectedMaxPoints === 1001} buttonStyle={selectedMaxPoints === 1001 && styles.selectedButton} titleStyle={selectedMaxPoints === 1001 && styles.selectedButtonTitle} />
                        </View>

                    </View>
                </View>
                <View style={[styles.row, { flex: 10 }]} />
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "rgb(242, 242, 247)",
        margin: scale(2)
    },
    header: {
        height: scale(36),
    },
    row: {
        flex: 1,
        paddingRight: scale(10),
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    settingsDrawer: {
        position: "absolute",
        zIndex: 100,
        backgroundColor: "rgb(242, 242, 247)",
        width: getWindowWidth(),
        height: getWindowHeight(),
        left: getWindowWidth(),
    },
    text: {
        color: 'rgb(58, 58, 60)',
        fontVariant: ["small-caps"],
    },
    selectedButton: {
        backgroundColor: "rgb(46, 204, 113)"
    },
    selectedButtonTitle: {
        color: "white" 
    }
})

const mapStateToProps = ({ state }) => {
    return {
        selectedMaxPoints: state.selectedMaxPoints
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setSelectedMaxPoints }, dispatch)
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(MainApp)