import React, { Component } from 'react';
import {
    View,  
    StyleSheet,
    Text,
} from 'react-native';

import globalStore from '../../../GlobalStore';


class FriendItem extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Text>FriendItem page</Text>
            </View>
        );
    }
}

export default FriendItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});