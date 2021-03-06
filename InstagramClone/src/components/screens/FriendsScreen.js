import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList,
} from 'react-native';
import axios from 'axios';

import { Icon } from 'react-native-elements';
import { ListItem } from 'react-native-elements';

import globalStore from '../../../GlobalStore';
import { action } from 'mobx';
import {observer} from 'mobx-react/native';


@observer
class FriendsScreen extends Component {

    handleRemoveFriend = (id) => {
        const userID = globalStore.user.userID;
        axios
            .delete(`http://192.168.0.107:5000/friends/?sender=${userID}&recipient=${id}`)
            .then(action(result => {
                globalStore.deleteFriend(id);

                // Update posts to exclude deleted friend's posts
                return axios.get(`http://192.168.0.107:5000/posts/?owner=${userID}`);
            }))
            .then(action(result => {
                if (result.data.length) {
                    globalStore.initPosts(result.data);
                }
            }))
            .catch(err => console.log(err));
    }

    renderRow = ({item}) => {
        return (
            <ListItem
                key={item.id}
                leftAvatar={{ source: { uri: item.thumbnail }}} 
                title={item.friendName}
                bottomDivider={true} 
                rightIcon={
                    <Icon
                        raised
                        name='remove'
                        type='font-awesome'
                        color='#8B0000'
                        size={15}
                        onPress={() => this.handleRemoveFriend(item.id)}
                    />
                } 
            />
        );
    }

    render() {
        let friends = globalStore.friends.slice();
        return (
            <View style={styles.container}>
                {globalStore.friends.length ?
                    <FlatList
                        data={friends}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => item.id}
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