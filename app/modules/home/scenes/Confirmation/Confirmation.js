import React from 'react';
var { View, Button, Alert, Picker, Text } = require('react-native');
import styles from "./styles";
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { auth } from "../../../../config/firebase";

const { signOut } = auth;

class Confirmation extends React.Component {
    constructor(){ 
        super();
        this.state = {}
        this.onSignOut = this.onSignOut.bind(this);
    }

    onSignOut() {
        auth.signOut() 
        Actions.reset("root")
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