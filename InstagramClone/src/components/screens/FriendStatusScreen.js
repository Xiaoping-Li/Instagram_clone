import React, { Component } from 'react';
import axios from 'axios';
import { 
    View,  
    StyleSheet,
    Text,
    Image, 
} from 'react-native';

import globalStore from '../../../GlobalStore';
import { action } from 'mobx';

class FriendStatusScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendName: '',
            thumbnail: '',
            friendID: '',
            status: 'Add Friend',
        };
    }

    componentWillMount = () => {
        const { navigation } = this.props;
        const friendName = navigation.getParam('friendName');
        const thumbnail = navigation.getParam('thumbnail');
        const friendID = navigation.getParam('friendID');
        this.setState({ friendID, friendName, thumbnail });
    }

    componentDidMount = () => {
        const userID = globalStore.user.userID;
        
        axios
            .get(`http://192.168.0.107:5000/friends/?sender=${userID}&recipient=${this.state.friendID}`)
            .then(result => {
                if (result.data.length) {
                    this.setState({ status: result.data.length[0].status });
                }
            })
            .catch(err => console.log(err));       
    }

    handleAddFriend = () => {
        const userID = globalStore.user.userID;
        axios
            .post(`http://192.168.0.107:5000/friends/?sender=${userID}&recipient=${this.state.friendID}`)
            .then(action(result => {
                const senderRequest = result.data[0];
                globalStore.addRequests(senderRequest);
                this.setState({ status: "Requested"});
            }))
            .catch(err => console.log(err));
    }

    render() {
        let renderItems;
        if (this.state.status === 'Friends') {
            renderItems = 
                <View>
                    <Text>{this.state.status}</Text>
                    <Text>No Friends</Text>
                </View>;
        } else if (this.state.status === 'Pending') {
            renderItems = 
                <View>
                    <Text>{this.state.status}</Text>
                    <Text>Accept</Text>
                    <Text>Reject</Text>
                </View>;
        } else if (this.state.status === 'Requested') {
            renderItems = 
                <View>
                    <Text>{this.state.status}</Text>
                    <Text>Cancel</Text>
                </View>;
        } else {
            renderItems = 
                <View>
                    <Text onPress={this.handleAddFriend}>{this.state.status}</Text>
                </View>;
        }

        return (
            <View style={styles.container}>
                <Image style={{width: 100, height:100, margin: 30, borderRadius: 50,}} source={{uri: this.state.thumbnail}} />
                <Text>{this.state.friendName}</Text> 
                {renderItems}
            </View>
        );
    }
}

export default FriendStatusScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center', 
      justifyContent: 'center',
    },
});