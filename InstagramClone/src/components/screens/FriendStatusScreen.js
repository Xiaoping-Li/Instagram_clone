import React, { Component } from 'react';
import { 
    View,  
    StyleSheet,
    Text, 
} from 'react-native';

class FriendStatusScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to FriendStatus Screen</Text> 
            </View>
        );
    }
}

export default FriendStatusScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
});