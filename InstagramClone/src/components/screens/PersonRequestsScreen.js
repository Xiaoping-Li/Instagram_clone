import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native';


class PersonRequestsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>PersonRequestsScreen</Text>
            </View>
        );
    }
}

export default PersonRequestsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
});