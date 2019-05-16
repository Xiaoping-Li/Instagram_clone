import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Image,
    TextInput,
    Button, 
} from 'react-native';
import axios from 'axios';
import Icon from '@expo/vector-icons/Feather';
import EllipsisIcon from '@expo/vector-icons/AntDesign';

import globalStore from '../../../GlobalStore'; 
import { action } from 'mobx';

class Post extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            countLikes: this.props.post.likes.length,
            commentInfo: '',
            comment: false,
        };
    }

    handleLikeClick = () => {
        let update;
        this.state.like ? update = this.state.countLikes - 1 : update = this.state.countLikes + 1;
        this.setState({ countLikes: update, like: !this.state.like });
    }

    handlecommentClick = () => {
        this.setState({ comment: !this.state.comment });
    }

    handlePostDelete = () => {
        const id = this.props.post._id;
        axios
            .delete(`http://192.168.0.107:5000/posts/?id=${id}`)
            .then(action(result => {
                if (result.data.success) {
                    globalStore.deletePost(this.props.idx, 1);
                }
            }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={{width: 40, height: 40, margin: 10, borderRadius: 20,}} source={{uri: globalStore.user.thumbnail}} />
                    <Text style={{fontSize: 15, fontWeight: 'bold',}}>{globalStore.user.username}</Text>
                    <EllipsisIcon 
                        style={{ marginLeft: 200,}}
                        onPress={this.handlePostDelete} 
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
                        onPress={this.handleLikeClick} 
                        name="heart" 
                        size={20}
                        color={this.state.like ? "red" : null} 
                    />

                    <Icon
                        style={{ paddingLeft: 10}}
                        onPress={this.handlecommentClick} 
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

                <Text style={styles.likes}>{this.state.countLikes} {this.state.countLikes > 1 ? 'likes' : 'like'}</Text>

                <View style={this.state.comment ? styles.comment : {height: 0}}>
                    <TextInput
                        placeholder="Add a comment..."
                        value={this.state.commentInfo}
                        onChangeText={commentInfo => this.setState({commentInfo})}
                        style={styles.input}
                    />
                    <Button
                        title="Post"
                        onPress={() => {}}
                    />
                </View>
                
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
    comment: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        borderStyle: 'solid',
    },
    input: {
        width: 300,
    },
});