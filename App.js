import React, { Component, useState, useEffect, useRef } from "react"
import { Provider } from "react-redux"
import { StyleSheet, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, Text, Animated } from "react-native"
import FirstScreen from "./src/screens/FirstScreen"
import SecondScreen from './src/screens/SecondScreen'
import { store } from "./src/store/store"
import { scale, getWindowWidth, getWindowHeight } from './src/utils/scalingUtils'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from "react-native-vector-icons/MaterialIcons"

const Stack = createStackNavigator()

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="FirstScreen">
                        <Stack.Screen name="FirstScreen">
                            {(props) => <HeaderWrapper><FirstScreen {...props} /></HeaderWrapper>}
                        </Stack.Screen>
                        <Stack.Screen name="SecondScreen">
                            {(props) => <HeaderWrapper><SecondScreen {...props} /></HeaderWrapper>}
                        </Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}

const HeaderWrapper = (props) => {
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
        slideIn()
    }

    const handleBackPressed = () => {
        slideOut()
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
            <Animated.View
                style={{
                    ...styles.settingsDrawer,
                    left: slideInAnim
                }}
            >
                <SafeAreaView style={styles.root}>
                    <Settings handleBackPressed={handleBackPressed} />
                </SafeAreaView>
            </Animated.View>
        </>

    )
}

const Settings = (props) => {
    const { handleBackPressed } = props

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
               <View style={styles.row}>
                   <Text>Test test</Text>
                   <View style={[styles.row]}>
                        
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
})