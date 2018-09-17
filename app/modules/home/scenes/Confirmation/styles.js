import {StyleSheet} from 'react-native';
import {theme} from "../../index"
import { color } from '../../../../styles/theme';
const  { fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logOutButton: {
        marginTop: 5,
        backgroundColor: color.grey
    },
    text: {
        marginLeft: 10,
        marginTop: 5,
        fontFamily: fontFamily.bold,
        fontSize: fontSize.large
    }
});

export default styles;