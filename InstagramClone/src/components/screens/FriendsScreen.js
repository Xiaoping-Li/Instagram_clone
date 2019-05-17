import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';

import { 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native';

import { ListItem } from 'react-native-elements';
// import globalStore from '../../../GlobalStore';


@inject('globalStore')
@observer
class FriendsScreen extends Component {
    // handleRemoveFriend = () => {
    //     const userID = globalStore.user.userID;
    //     axios
    //         .delete(`http://192.168.0.107:5000/friends/?sender=${userID}&recipient=${this.state.friendID}`)
    //         .then(action(result => {
    //             globalStore.deleteRequest(userID, this.state.friendID);
    //             globalStore.deleteFriend(friendID);
    //             this.setState({ status: "Add Friend"});
    //         }))
    //         .catch(err => console.log(err));
    // }

    render() {
        return (
            <View style={styles.container}>
                {this.props.globalStore.friends.length ?
                    <View>
                        {
                            this.props.globalStore.friends.map((item, idx) => (
                                <ListItem
                                    key={idx}
                                    leftAvatar={{ source: { uri: item.thumbnail }}} 
                                    title={item.friendName}
                                    chevronColor="#a9a9a9"
                                    bottomDivider={true}  
                                />
                            ))
                        }
                    </View>
                    : 
                    <View style={styles.textContainer}><Text style={styles.text}>Add some Friends</Text></View>
                }
                
            </View>
        );
    }
}

export default FriendsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff', 
      //justifyContent: 'flex-start',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    }
});