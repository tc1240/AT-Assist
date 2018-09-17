import {StyleSheet} from 'react-native';
import {theme} from "../../index"
import { color } from '../../../../styles/theme';
const  { fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    activityIndicator:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    },

    picker:{
        height: 75, 
        width: 350, 
        marginLeft: 10
    },

    text: {
        marginLeft: 10,
        marginTop: 5,
        fontFamily: fontFamily.bold,
        fontSize: fontSize.large
    },

    logOutButton: {
        marginTop: 5,
        backgroundColor: color.grey
    },

    checkInButton: {
        backgroundColor: color.main
    }
});

export default styles;