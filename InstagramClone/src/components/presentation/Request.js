import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Image, 
} from 'react-native';

import globalStore from '../../../GlobalStore';
import { action } from 'mobx';

class Request extends PureComponent {
    // handleAccpetRequest = () => {
    //     const userID = globalStore.user.userID;
    //     axios
    //         .put(`http://192.168.0.107:5000/friends/?sender=${userID}&recipient=${this.state.friendID}`)
    //         .then(action(result => {
    //             globalStore.updateRequests(userID, this.state.friendID);
    //             this.setState({ status: 'Friends'});
    //         }))
    //         .catch(err => console.log(err));
    // }

    // handleRemoveRequest = () => {
    //     const userID = globalStore.user.userID;
    //     axios
    //         .delete(`http://192.168.0.107:5000/friends/?sender=${userID}&recipient=${this.state.friendID}`)
    //         .then(action(result => {
    //             globalStore.deleteRequest(userID, this.state.friendID);
    //             this.setState({ status: "Add Friend"});
    //         }))
    //         .catch(err => console.log(err));
    // }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={{uri: this.props.req.recipient.thumbnail}} />
                <Text style={styles.name}>{this.props.req.recipient.username}</Text>
                <Text>Accept</Text>
                <Text>Reject</Text>
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
        margin: 10, 
        borderRadius: 20,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        width: 200,
    },
});