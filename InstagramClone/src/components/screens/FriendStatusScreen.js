import React, { Component } from 'react';
import axios from 'axios';
import { 
    View,  
    StyleSheet,
    Text,
    Image, 
} from 'react-native';

import globalStore from '../../../GlobalStore';

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

    render() {
        // let renderItems;
        // if (this.state.status === 'Friends') {

        // } else if (this.state.status === 'Pending') {

        // } else if (this.state.status === 'Requested') {

        // } else {

        // }

        return (
            <View style={styles.container}>
                <Image style={{width: 100, height:100, margin: 30, borderRadius: 50,}} source={{uri: this.state.thumbnail}} />
                <Text>{this.state.friendName}</Text> 
                <Text>{this.state.status}</Text>
                <Text>FriendID: {this.state.friendID}</Text>
                {/* <View>{renderItems}</View> */}
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