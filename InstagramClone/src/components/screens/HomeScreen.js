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

    render() {
        return (
            <View style={styles.container}>
                {globalStore.posts.length ? 
                    <Posts /> 
                    :
                    <View style={styles.btnContainer}>
                        <Text
                            onPress={() => this.props.navigation.navigate('AddPost')}
                            style={styles.btn}
                        >
                            Something you want to share?
                        </Text>
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
        backgroundColor: 'powderblue',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    }
});