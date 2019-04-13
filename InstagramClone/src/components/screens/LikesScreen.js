import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native';


class LikesScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>LikesScreen</Text>
            </View>
        );
    }
}

export default LikesScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
});