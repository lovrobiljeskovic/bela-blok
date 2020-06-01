import React from "react"
import { View } from 'react-native';
import MainApp from './MainApp';
import { Provider } from "react-redux";
import { store }  from './src/store/store'

export default class App extends React.Component {
  render() {
    return <Provider store={store}><MainApp /></Provider>
  }
}

