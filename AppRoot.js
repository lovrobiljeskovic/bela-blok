import React from "react"
import { Provider } from "react-redux"
import { store } from "./src/store/store"
import MainApp from "./MainApp"

export default class AppRoot extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MainApp />
            </Provider>
        )
    }
}