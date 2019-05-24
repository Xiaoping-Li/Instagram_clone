import React, { Component } from 'react';
import {
    View,  
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import axios from 'axios';

import DeleteIcon from '@expo/vector-icons/AntDesign';
import globalStore from '../../../GlobalStore'; 
import { action } from 'mobx';


class Like extends Component {
    deleteLikedPost = () => {
        const postID = this.props.post._id;
        const userID = globalStore.user.userID;
        axios
            .delete(`http://192.168.0.107:5000/posts/likes/?postID=${postID}&userID=${userID}`)
            .then(action(result => {
                if (result.data.ok) {
                    globalStore.removeLike(postID);
                }
            }))
            .catch(err => console.log(err));
    }
    
    render() {
        return (
            <View style={styles.container}>
                {/* Post Header */}
                <View style={styles.header}>
                    <Image style={{width: 40, height: 40, margin: 10, borderRadius: 20,}} source={{uri: this.props.post.owner.thumbnail}} />
                    <Text style={{fontSize: 15, fontWeight: 'bold',}}>{this.props.post.owner.username}</Text>
                    <DeleteIcon 
                        style={{ marginLeft: 200 }}
                        onPress={this.deleteLikedPost} 
                        name="delete" 
                        size={25}
                    />    
                </View>

                {/* Post Image */}
                <Image 
                    source={{uri: this.props.post.uri}}
                    style={{height: 300, width: null, flex: 1,}}
                />
            </View>
        );
    }
}

export default Like;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: '#E0E0E0',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 10,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: 1,
    },
});