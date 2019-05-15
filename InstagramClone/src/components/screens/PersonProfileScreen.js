import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native';


class PersonProfileScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>PersonProfileScreen</Text>
            </View>
        );
    }
}

export default PersonProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
});