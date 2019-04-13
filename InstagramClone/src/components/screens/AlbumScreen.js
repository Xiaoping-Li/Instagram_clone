import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class AlbumScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>AlbumScreen</Text>
            </View>
        );
    }
}

export default AlbumScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
});