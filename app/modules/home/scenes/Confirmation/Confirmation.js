import React from 'react';
var { View, Button, Alert, Picker, Text } = require('react-native');
import styles from "./styles";
import { actions as auth } from "../../../auth/index";
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

const { signOut } = auth;

class Confirmation extends React.Component {
    constructor(){ 
        super();
        this.state = {}
        this.onSignOut = this.onSignOut.bind(this);
     }

     // problem of n+1 firebase reports might be due to auth in home changed to firebase stuff and not here
     // props in home might reference a new type of props or something
    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.reset("root")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>You are checked in!</Text>
                <Text style={styles.text}>Thank you, please log out</Text>
                <Button
                    raised
                    borderRadius={4}
                    title={'Log Out'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.logOutButton]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}/>
            </View>
        );
    }
}


export default connect(null, { signOut })(Confirmation);