import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, } from 'react-native';

class ProfileScreen extends Component {
    signOut = async () => {
        AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to Profiles page.</Text>
                <Text> You could modify and overview your Profiles here</Text>
                <Button
                    title="Sign Out"
                    onPress={this.signOut}
                />
            </View>
        );
    }
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
});