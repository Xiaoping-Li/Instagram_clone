import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

class AddPostScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon
                    onPress={() => this.props.navigation.navigate('Album')} 
                    name="photo-album" 
                    size={100} 
                />

                <Icon
                    onPress={() => this.props.navigation.navigate('Camera')} 
                    name="camera-alt" 
                    size={100} 
                />                  
            </View>
        );
    }
}

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
});