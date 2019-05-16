import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native';

import globalStore from '../../../GlobalStore';


class RequestsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>PersonRequestsScreen</Text>
            </View>
        );
    }
}

export default RequestsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
});