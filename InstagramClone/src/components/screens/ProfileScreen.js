import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    AsyncStorage,
    Image,
    Modal, 
} from 'react-native';
import { ProfileEdit } from '../presentation';
import { Icon } from 'react-native-elements';

import {observer} from 'mobx-react/native';
import globalStore from '../../../GlobalStore';
import { action } from 'mobx';

@observer
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
                    <View style={styles.profileContainer}>
                        <Icon
                            raised
                            name='edit'
                            type='font-awesome'
                            onPress={() => globalStore.toggleVisible()} 
                        />
                        <View style={styles.profile}>
                            <Image source={{uri: globalStore.user.thumbnail}} style={styles.img}/>

                            <Modal
                                visible={globalStore.isVisible}
                                animationType="slide"
                                transparent={false}
                            >
                                <ProfileEdit />
                            </Modal>

                            <Text style={{fontSize: 20, marginBottom: 10}}>User Name: {globalStore.user.username}</Text>
                            <Text style={{fontSize: 20, }}>Primary Email Address: {globalStore.user.email}</Text>
                        </View>
                        
                        <View style={{marginRight: 12}}>
                            <Text onPress={this.signOut} style={styles.signOut}>Sign Out</Text>
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
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    profile: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: 350,
        borderColor: '#e2e2e2',
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 12,
    },
    img: {
        width: 100,
        height: 100,
        borderColor: '#e2e2e2',
        borderRadius: 50,
        borderWidth: 1,
        marginBottom: 30
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