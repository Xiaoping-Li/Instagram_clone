import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    AsyncStorage,
    Image, 
} from 'react-native';
import { Icon } from 'react-native-elements';

import globalStore from '../../../GlobalStore';
import { action } from 'mobx';

class ProfileScreen extends Component {
    signOut = () => {
        AsyncStorage
            .clear()
            .then(action(result => {
                const update = {
                    username: '',
                    email: '',
                    thumbnail: '',
                    userID: '',
                };

                globalStore.updateUser(update);
                globalStore.initFriends([]);
                globalStore.initPosts([]);
                globalStore.initRequests([]);
            }))
            .catch(err => console.log(err));
        this.props.navigation.navigate('AuthLoading');
    }
    
    render() {
        return (
            <View style={styles.container}>
                {globalStore.user.userID ?
                    <View>
                        <Icon
                            raised
                            name='edit'
                            type='font-awesome'
                            onPress={() => {}} 
                        />
                        <View>
                            <Image source={{uri: globalStore.user.thumbnail}} style={styles.img}/>
                            <Text>User Name: {globalStore.user.username}</Text>
                            <Text>Primary Email Address: {globalStore.user.email}</Text>
                        </View>
                        
                        <View>
                            <Text onPress={this.signOut}>Sign Out</Text>
                        </View>    
                    </View>
                    :
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text onPress={this.signOut} style={styles.signOut}>Sign Out</Text>
                    </View>
                }   
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
    img: {
        width: 100,
        height: 100,
        borderColor: 'gray',
        borderRadius: 50,
        borderWidth: 1,
    },
    signOut: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        width: 100,
        fontSize: 20,
        padding: 5,
        textAlign: 'center',
        color: 'red',
    }
});