import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Image, 
} from 'react-native';

import axios from 'axios';

import globalStore from '../../../GlobalStore';
import { action } from 'mobx';


class Request extends PureComponent {
    handleAccpetRequest = () => {
        const userID = globalStore.user.userID;
        axios
            .put(`http://192.168.0.107:5000/friends/?sender=${userID}&recipient=${this.props.req.recipient.ID}`)
            .then(action(result => {
                const friend = {};
                friend.id = this.props.req.recipient.ID;
                friend.friendName = this.props.req.recipient.username;
                friend.thumbnail = this.props.req.recipient.thumbnail;

                globalStore.addFriends(friend);
                globalStore.deleteRequest(this.props.idx);
            }))
            .catch(err => console.log(err));
    }

    handleRemoveRequest = () => {
        const userID = globalStore.user.userID;
        axios
            .delete(`http://192.168.0.107:5000/friends/?sender=${userID}&recipient=${this.props.req.recipient.ID}`)
            .then(action(result => {
                globalStore.deleteRequest(this.props.idx);
            }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={{uri: this.props.req.recipient.thumbnail}} />
                <Text style={styles.name}>{this.props.req.recipient.username}</Text>
                
                <Text 
                    style={{fontSize: 20}}
                    onPress={this.handleAccpetRequest}
                >
                    Accept
                </Text>
                
                <Text 
                    style={{marginLeft: 20, color: 'red', fontSize: 20, marginRight: 10}}
                    onPress={this.handleRemoveRequest}
                >
                    Reject
                </Text>      
            </View>
        );
    }

}

export default Request;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderStyle: 'solid',
        borderRadius: 10,
        padding: 5,
        height: 40,
    },
    img: {
        width: 40, 
        height: 40,
        marginLeft: 10, 
        borderRadius: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        width: 150,
        marginLeft: 20,
    },
});