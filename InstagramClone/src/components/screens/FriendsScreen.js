import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList,
} from 'react-native';

import { ListItem } from 'react-native-elements';
import globalStore from '../../../GlobalStore';
import {observer} from 'mobx-react/native';

import { Icon } from 'react-native-elements';


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

    renderRow = ({item}) => {
        return (
            <ListItem
                key={item.id}
                leftAvatar={{ source: { uri: item.thumbnail }}} 
                title={item.friendName}
                chevronColor="#a9a9a9"
                bottomDivider={true} 
                rightIcon={
                    <Icon
                        raised
                        name='remove'
                        type='font-awesome'
                        color='#8B0000'
                        size={15}
                        onPress={() => {}}
                    />
                } 
            />
        );
    }

    render() {
         
        return (
            <View style={styles.container}>
                {globalStore.friends.length ?
                    <FlatList
                        data={globalStore.friends}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => 'key'+index}
                    />
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
        color: '#808080',
    }
});