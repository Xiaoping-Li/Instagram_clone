import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';

import {
    Text, 
    View, 
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import axios from 'axios';
import { Posts } from '../presentation';

// import {observer} from 'mobx-react';
// import { action } from 'mobx';
// import globalStore from '../../../GlobalStore';


@inject('globalStore')
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
            .then(result => {
                if (result.data.length) {
                    this.props.globalStore.initPosts(result.data);
                }
            })
            .catch(err => console.log(err));   
    }

    getFriendsAndRequests = () => {
        const userID = globalStore.user.userID;
        axios
            .get(`http://192.168.0.107:5000/users/${userID}`)
            .then(result => {
                if (result.data.friends.length) {
                    this.props.globalStore.initFriends(result.data.friends);
                }

                if (result.data.requests.length) {
                    this.props.globalStore.initRequests(result.data.requests);
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.globalStore.posts.length ? 
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