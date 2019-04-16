import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

class AddPostScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon
                    style={styles.icon}
                    onPress={() => this.props.navigation.navigate('Album')} 
                    name="photo-album" 
                    size={80} 
                    color="gray"
                />

                <Icon
                    style={styles.icon}
                    onPress={() => this.props.navigation.navigate('Camera')} 
                    name="camera-alt" 
                    size={80}
                    color="gray" 
                />                  
            </View>
        );
    }
}

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'space-around',
    },
    icon: {
        borderColor: '#e0e0e0',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: 20,
    },
});