import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';

import Router from './app/config/routes'
import store from './app/redux/store';

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
    }

    async _loadAssetsAsync() {
        const fontAssets = cacheFonts([
            {RobotoExtraBold: require('./app/assets/Roboto-Black.ttf')},
            {RobotoBold: require('./app/assets/Roboto-Bold.ttf')},
            {RobotoMedium: require('./app/assets/Roboto-Medium.ttf')},
            {RobotoRegular: require('./app/assets/Roboto-Regular.ttf')},
            {RobotoLight: require('./app/assets/Roboto-Light.ttf')}
        ]);

        await Promise.all([...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={(/*maybe here?*/) => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }
        
        return (
            <Provider store={store}>
                    <Router/>
            </Provider>
        );
    }
}