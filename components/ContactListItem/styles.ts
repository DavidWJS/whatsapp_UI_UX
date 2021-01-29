import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
    },
    leftContainer: {
        flexDirection: 'row',
    },
    midContainer: {
        justifyContent: 'space-around',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 20,
    },
    userName: {
        fontWeight:'bold',
        fontSize: 18,
    },
    status: {
        fontSize: 16,
        color: 'grey',
        flexWrap: 'wrap',
    },
});

export default styles;