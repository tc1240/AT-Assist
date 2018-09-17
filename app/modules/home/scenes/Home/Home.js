import React from 'react';
var { View, StyleSheet, Alert, Picker, Text } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

//import { actions as auth } from "../../../auth/index"
import { database } from "../../../../config/firebase";
import { auth} from "../../../../config/firebase";

const { signOut } = auth;

var firstReason;
var secondReason;
var impairment;
var pain;
var currentEmail



class Home extends React.Component {
    constructor(){
        super();
        this.state = { fReason: 'Regular Check-in', 
                       sReason: 'None',
                       impairment: '0',
                       pain: '0',
                       user: ' ' };
        value = this.state.pickerVal;
        this.onSignOut = this.onSignOut.bind(this);
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.reset("root")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    /**
     * A method that is called every time a value is changed in the picker
     * @param {First reason selected from the first picker} fReason 
     * @param {Second reason selected from the second picker} sReason 
     * @param {Impairment level selected from the third picker} impairLevel
     * @param {Pain Level selected from the fourth picker} painLevel 
     */
    onChange(fReason, sReason, impairLevel, painLevel) {
        // console.log("state f:"+fReason);
        // console.log("state s:"+sReason);
        firstReason = fReason;
        secondReason = sReason;
        impairment = impairLevel;
        pain = painLevel;
    }

    /**
     * A method that submits the current values in first and second reason (the whole form) to
     * firebase for storage, and then sends you to a confirmation page
     */
    onCheckin() {
        auth.onAuthStateChanged(function(curUser) {
            Actions.Confirmation();

            if (curUser ) {
                
                const newRef = database.ref().child('CheckIn').push();
                const newKey = newRef.key;
       
                var checkin = {id: newKey, firstR: firstReason, secondR: secondReason, impairment: impairment, pain: pain, user: curUser.email, note: ""};
            
                // Write the new quote data simultaneously in the quotes list and the user's quotes list.
                let updates = {};
                updates['/CheckIn/' + newKey] = checkin;
            
                database.ref().update(updates)
                    .then(() => callback(true, checkin, null))
                    .catch((error) => callback(false, null, error));
                

            }
        });        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Why are you here?</Text>
                <Picker
                    prompt={"Why are you here?"}
                    style={ styles.picker }
                    selectedValue={(this.state && this.state.fReason)}
                    onValueChange={(value) => this.setState({fReason: value})}
                    onPress={this.onChange(this.state.fReason, this.state.sReason, this.state.impairment, this.state.pain)}>
                        <Picker.Item label="Regular Check-in" value="Regular Check-in" />
                        <Picker.Item label="Illness" value="Illness" />
                        <Picker.Item label="Shoulder Issues" value="Shoulder Issues" />
                        <Picker.Item label="Neck/Back Pain" value="Neck/Back Pain" />
                        <Picker.Item label="Hip Issues" value="Hip Issues" />
                        <Picker.Item label="Knee Issues" value="Knee Issues" />
                        <Picker.Item label="Ankle Issues" value="Ankle Issues" />
                        <Picker.Item label="Other Issues" value="Other Issues" />
                </Picker>
                <Text style={styles.text}>Any other reason?</Text>
                <Picker
                    prompt={"Other reasons?"}
                    style={ styles.picker }
                    selectedValue={(this.state && this.state.sReason)}
                    onValueChange={(value) => this.setState({sReason: value})}>
                        <Picker.Item label="None" value="None" />
                        <Picker.Item label="Illness" value="Illness" />
                        <Picker.Item label="Shoulder Issues" value="Shoulder Issues" />
                        <Picker.Item label="Neck/Back Pain" value="Neck/Back Pain" />
                        <Picker.Item label="Hip Issues" value="Hip Issues" />
                        <Picker.Item label="Knee Issues" value="Knee Issues" />
                        <Picker.Item label="Ankle Issues" value="Ankle Issues" />
                        <Picker.Item label="Other Issues" value="Other Issues" />
                </Picker>
                <Text style={styles.text}>Level of Impairment</Text>
                <Picker
                    prompt={"Impairment Level"}
                    style={ styles.picker }
                    selectedValue={(this.state && this.state.impairment)}
                    onValueChange={(value) => this.setState({impairment: value})}>
                        <Picker.Item label="0" value="0" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="10" value="10" />
                </Picker>
                <Text style={styles.text}>Level of Pain</Text>
                <Picker
                    prompt={"Pain Level"}
                    style={ styles.picker }
                    selectedValue={(this.state && this.state.pain)}
                    onValueChange={(value) => this.setState({pain: value})}>
                        <Picker.Item label="0" value="0" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="10" value="10" />
                </Picker>
                <Button
                    raised
                    borderRadius={4}
                    title={'Check In'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.checkInButton]}
                    textStyle={styles.buttonText}
                    onPress={this.onCheckin}/>
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

export default connect(null, { signOut })(Home);