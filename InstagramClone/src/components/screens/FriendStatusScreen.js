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
                    this.setState({ status: result.data[0].status });
                }
            })
            .catch(err => console.log(err));   
            
    }

    handleAddFriend = () => {
        const userID = globalStore.user.userID;
        axios
            .post(`http://192.168.0.107:5000/friends/?sender=${userID}&recipient=${this.state.friendID}`)
            .then(result => {
                this.setState({ status: "Requested"});
            })
            .catch(err => console.log(err));
    }

    
    render() {
        let renderItems;
        if (this.state.status !== 'Add Friend') {
            renderItems = 
                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                    <View style={styles.status}><Text style={{fontSize: 20}}>{this.state.status}</Text></View>
                    <View style={styles.divider}></View>
                </View>;
        } else {
            renderItems = 
                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                    <View style={styles.divider}></View>
                    <View style={styles.btn}>
                        <Text style={styles.btnText} onPress={this.handleAddFriend}>
                            {this.state.status}
                        </Text>
                    </View>
                    
                </View>;
        }

        return (
            <View style={styles.container}>
                <Image style={{width: 100, height:100, margin: 30, borderRadius: 50,}} source={{uri: this.state.thumbnail}} />
                <Text style={styles.friendName}>{this.state.friendName}</Text> 
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
    },
    friendName: {
        fontSize: 30,
        fontWeight: "600",
        marginBottom: 20,
    },
    divider: {
        backgroundColor: '#D3D3D3',
        width: 200,
        height: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    status: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#D3D3D3',
        borderRadius: 10,
        padding: 10,
    },
    btn: {
        width: 150,
        backgroundColor: '#009FF8',
        marginTop: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        width: 130,
        color: '#fff',
    }
});