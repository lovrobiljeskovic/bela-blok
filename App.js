import React, { Component } from "react"
import { StyleSheet, Text, View } from 'react-native'
import FirstScreen from "./src/screens/FirstScreen"
import SecondScreen from './src/screens/SecondScreen'
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

    handleNumPadClick = (number) => {
        const { selectedTeam, selectedPoints } = this.state

        if (selectedTeam === 'Mi') {
            if (selectedPoints === 'Igra') {
                this.setState({ miScore: this.state.miScore + number })
            } else {
                this.setState({ miBonusScore: this.state.miBonusScore + number })
            }
        } else if (selectedTeam === 'Vi') {
            if (selectedPoints === 'Igra') {
                this.setState({ viScore: this.state.viScore + number })
            } else {
                this.setState({ viBonusScore: this.state.viBonusScore + number })
            }

        }
    }

    handleTeamClick = (teamName) => {
        this.setState({ selectedTeam: teamName })
    }

    handlePointsClick = (pointsType) => {
        this.setState({ selectedPoints: pointsType })
    }

    handleDeleteAll = () => {
        const { selectedTeam } = this.state

        if (selectedTeam === 'Mi') {
            this.setState({ miScore: '', miBonusScore: '' })
        } else {
            this.setState({ viScore: '', viBonusScore: '' })
        }
    }

    handleDeleteLastInput = () => {
        const { selectedTeam, selectedPoints } = this.state

        if (selectedTeam === 'Mi') {
            if (selectedPoints === 'Igra') {
                this.setState({ miScore: this.state.miScore.slice(0, - 1) })
            } else {
                this.setState({ miBonusScore: this.state.miBonusScore.slice(0, - 1) })
            }
        } else if (selectedTeam === 'Vi') {
            if (selectedPoints === 'Igra') {
                this.setState({ viScore: this.state.viScore.slice(0, - 1) })
            } else {
                this.setState({ viBonusScore: this.state.viBonusScore.slice(0, - 1) })
            }

        }
    }

    render() {
        const { miScore, viScore, selectedTeam, selectedPoints, miBonusScore, viBonusScore } = this.state

        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="FirstScreen">
                    <Stack.Screen name="FirstScreen">
                        {(props) => <FirstScreen {...props} handleDeleteLastInput={this.handleDeleteLastInput} handleDeleteAll={this.handleDeleteAll} handlePointsClick={this.handlePointsClick} handleTeamClick={this.handleTeamClick} handleNumPadClick={this.handleNumPadClick} miScore={miScore} viScore={viScore} selectedTeam={selectedTeam} selectedPoints={selectedPoints} miBonusScore={miBonusScore} viBonusScore={viBonusScore} />}
                    </Stack.Screen>
                    <Stack.Screen name="SecondScreen">
                        {(props) => <SecondScreen {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}