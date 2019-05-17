import React, { Component } from 'react';
import { inject } from 'mobx-react/native';

import { View, Text, StyleSheet, Button, AsyncStorage, } from 'react-native';

// import globalStore from '../../../GlobalStore';
// import { action } from 'mobx';

@inject('globalStore')
class ProfileScreen extends Component {
    signOut = () => {
        AsyncStorage
            .clear()
            .then(result => {
                const update = {
                    username: '',
                    email: '',
                    thumbnail: '',
                    userID: '',
                };

                this.props.globalStore.updateUser(update);
                this.props.globalStore.initFriends([]);
                this.props.globalStore.initPosts([]);
                this.props.globalStore.initRequests([]);
            })
            .catch(err => console.log(err));
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