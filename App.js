import React, { Component } from "react"
import { Provider } from "react-redux"
import FirstScreen from "./src/screens/FirstScreen"
import SecondScreen from './src/screens/SecondScreen'
import { store } from "./src/store/store"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            miScore: '',
            viScore: '',
            selectedTeam: 'Mi',
            selectedPoints: 'Igra',
            miBonusScore: '',
            viBonusScore: ''
        }
    }


    render() {
        const { miScore, viScore, selectedTeam, selectedPoints, miBonusScore, viBonusScore } = this.state

        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="FirstScreen">
                        <Stack.Screen name="FirstScreen">
                            {(props) => <FirstScreen {...props} handleDeleteLastInput={this.handleDeleteLastInput} handleDeleteAll={this.handleDeleteAll} handlePointsClick={this.handlePointsClick} handleTeamClick={this.handleTeamClick} handleNumPadClick={this.handleNumPadClick} miScore={miScore} viScore={viScore} selectedPoints={selectedPoints} miBonusScore={miBonusScore} viBonusScore={viBonusScore} />}
                        </Stack.Screen>
                        <Stack.Screen name="SecondScreen">
                            {(props) => <SecondScreen {...props} />}
                        </Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}