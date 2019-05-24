import React, { Component } from 'react';
import {
    View,  
    StyleSheet,
} from 'react-native';

import globalStore from '../../../GlobalStore';


class Like extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Text>hello</Text>
            </View>
        );
    }
}

export default Like;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});