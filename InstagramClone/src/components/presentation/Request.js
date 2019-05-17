import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react/native';

import { 
    View, 
    Text, 
    StyleSheet,
    Image, 
} from 'react-native';

import axios from 'axios';

// import globalStore from '../../../GlobalStore';
// import { action } from 'mobx';

@inject('globalStore')
@observer
class Request extends PureComponent {
    handleAccpetRequest = () => {
        const userID = this.props.globalStore.user.userID;
        axios
            .put(`http://192.168.0.107:5000/friends/?sender=${userID}&recipient=${this.props.req.recipient.ID}`)
            .then(result => {
                const friend = {};
                friend.id = this.props.req.recipient.ID;
                friend.friendName = this.props.req.recipient.username;
                friend.thumbnail = this.props.req.recipient.thumbnail;

                this.props.globalStore.addFriends(friend);
                this.props.globalStore.deleteRequest(this.props.idx);
            })
            .catch(err => console.log(err));
    }

    handleRemoveRequest = () => {
        const userID = this.props.globalStore.user.userID;
        axios
            .delete(`http://192.168.0.107:5000/friends/?sender=${userID}&recipient=${this.props.req.recipient.ID}`)
            .then(action(result => {
                this.props.globalStore.deleteRequest(this.props.idx);
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