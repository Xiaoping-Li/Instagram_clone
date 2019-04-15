import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Image, 
} from 'react-native';

import Icon from '@expo/vector-icons/Feather';
import EllipsisIcon from '@expo/vector-icons/AntDesign';

class Post extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={{width: 40, height: 40, margin: 10, borderRadius: 20,}} source={{uri: this.props.post.thumbnail}} />
                    <Text style={{fontSize: 15, fontWeight: 'bold',}}>{this.props.post.user}</Text>
                    <EllipsisIcon 
                        style={{ marginLeft: 200,}}
                        onPress={() => {}} 
                        name="ellipsis1" 
                        size={25}/>
                </View>

                <Image 
                    source={{uri: this.props.post.uri}}
                    style={{height: 300, width: null, flex: 1,}}
                />
               
                <View style={styles.icons}>
                    <Icon
                        style={{ paddingLeft: 10}}
                        onPress={() => {}} 
                        name="heart" 
                        size={20} 
                    />

                    <Icon
                        style={{ paddingLeft: 10}}
                        onPress={() => {}} 
                        name="message-circle" 
                        size={20} 
                    />

                    <Icon
                        style={{ paddingLeft: 10}}
                        onPress={() => {}} 
                        name="upload" 
                        size={20} 
                    />
                </View>

                <Text style={styles.likes}>{this.props.post.likes} {this.props.post.likes > 1 ? 'likes' : 'like'}</Text>
            </View>
        );
    }
}

export default Post;

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
    icons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
    },
    likes: {
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10,
    },
});