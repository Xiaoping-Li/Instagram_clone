import React, { Component } from 'react';
import {
    Text, 
    View, 
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import axios from 'axios';
import { Posts } from '../presentation';

import {observer} from 'mobx-react/native';
import { action } from 'mobx';
import globalStore from '../../../GlobalStore';


@observer
class HomeScreen extends Component {

    componentDidMount = () => {
        AsyncStorage
            .getItem('userToken')
            .then(result => {
                this.getPosts();
                this.getFriendsAndRequests();
                this.getLikedPosts();
            })
            .catch(err => console.log(err));
    }

    getPosts = () => {
        const userID = globalStore.user.userID;
        axios
            .get(`http://192.168.0.107:5000/posts/?owner=${userID}`)
            .then(action(result => {
                if (result.data.length) {
                    globalStore.initPosts(result.data);
                }
            }))
            .catch(err => console.log(err));   
    }

    getFriendsAndRequests = () => {
        const userID = globalStore.user.userID;
        axios
            .get(`http://192.168.0.107:5000/users/${userID}`)
            .then(action(result => {
                if (result.data.friends.length) {
                    globalStore.initFriends(result.data.friends);
                }

                if (result.data.requests.length) {
                    globalStore.initRequests(result.data.requests);
                }
            }))
            .catch(err => console.log(err));
    }

    getLikedPosts = () => {
        const userID = globalStore.user.userID;
        axios
            .get(`http://192.168.0.107:5000/posts/likes/?userID=${userID}`)
            .then(action(result => {
                if (result.data.length) globalStore.initLikes(result.data);
            }))
            .catch(err => console.log(err));
    }

    navigateTo = () => {
        this.props.navigation.navigate('AddPost');
    }


    render() {
        return (
            <View style={styles.container}>
                {globalStore.posts.length ? 
                    <Posts /> 
                    :
                    <View style={styles.btnContainer}>
                        <View style={styles.btn}>
                            <Text
                                onPress={this.navigateTo}
                                style={styles.btnText}
                            >
                                Something you want to share?
                            </Text>
                        </View>
                        
                    </View> 
                }    
            </View>
            
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',  
    },
    btnContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    btn: {
        width: 350,
        backgroundColor: '#009FF8',
        marginTop: 25,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        width: 300,
        color: '#fff',
    }
});