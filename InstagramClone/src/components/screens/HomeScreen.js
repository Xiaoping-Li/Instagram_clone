import React, { Component } from 'react';
import { 
    View, 
    StyleSheet, 
} from 'react-native';

import { Posts } from '../presentation';

class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Posts />
            </View>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
});