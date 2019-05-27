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
import DeleteIcon from '@expo/vector-icons/AntDesign';

import globalStore from '../../../GlobalStore'; 
import { action } from 'mobx';

import Comments from './Comments';

class Post extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            comment: false,
            // like: globalStore.likes.find(post => post._id === this.props.post._id),
            // count: this.props.post.likes.length,  
        };
    }

    handleLikeClick = () => {
        const postID = this.props.post._id;
        const userID = globalStore.user.userID;
        axios 
            .post(`http://192.168.0.107:5000/posts/likes/?postID=${postID}&userID=${userID}`)
            .then(action(result => {
                if (result.data.ok) {
                    const owner = {};
                    owner.username = globalStore.user.username;
                    owner._id = globalStore.user.userID;
                    owner.thumbnail = globalStore.user.thumbnail;

                    const like = {
                        owner: owner,
                        uri: this.props.post.uri,
                    }

                    globalStore.addLike(like, postID, userID);
                    //this.setState({ like: like, count: this.state.count + 1 });
                }
            }))
            .catch(err => console.log(err));
    }

    handleUnlikeClick = () => {
        const postID = this.props.post._id;
        const userID = globalStore.user.userID;
        axios
            .delete(`http://192.168.0.107:5000/posts/likes/?postID=${postID}&userID=${userID}`)
            .then(action(result => {
                if (result.data.ok) {
                    globalStore.removeLike(postID);
                    //this.setState({ like: undefined, count: this.state.count - 1 });
                }
            }))
            .catch(err => console.log(err));
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
                    globalStore.deletePost(this.props.post._id);
                }
            }))
            .catch(err => console.log(err));
    }

    handleSubmitComment = () => {
        const postID = this.props.post._id;
        const userID = globalStore.user.userID;

        const comment = {
            content: this.state.content,
        };

        axios
            .put(`http://192.168.0.107:5000/posts/comments/?postID=${postID}&userID=${userID}`, comment)
            .then(action(result => {
                if (result.data.ok) {
                    const user = {
                        _id: globalStore.user.userID,
                        username: globalStore.user.username,
                        thumbnail: globalStore.user.thumbnail,
                    };
                    const gcomment = {
                        user: user,
                        content: this.state.content,
                    };
                    globalStore.addComment(postID, gcomment);
                    this.setState({ content: ''});
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
                    {
                        this.props.post.owner._id === globalStore.user.userID ?
                        <DeleteIcon 
                            style={{ marginLeft: 200 }}
                            onPress={this.handlePostDelete} 
                            name="delete" 
                            size={25}
                        />
                        :
                        null
                    }    
                </View>

                {/* Post Image */}
                <Image 
                    source={{uri: this.props.post.uri}}
                    style={{height: 300, width: null, flex: 1,}}
                />
               
               {/* Post likes, comments */}
                <View style={styles.icons}>
                    {globalStore.likes.find(post => post._id === this.props.post._id) ?
                        <Icon
                            style={{ paddingLeft: 10}}
                            onPress={this.handleUnlikeClick} 
                            name="heart" 
                            size={20}
                            color={"red"} 
                        />
                        :
                        <Icon
                            style={{ paddingLeft: 10}}
                            onPress={this.handleLikeClick} 
                            name="heart" 
                            size={20}
                        />
                    }

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

                <Text style={styles.likes}>{this.props.post.likes.length} {this.props.post.likes.length > 1 ? 'likes' : 'like'}</Text>

                {/* comments content */}
                {
                    this.props.post.comments.length ?
                    <Comments comments={this.props.post.comments}/>
                    : 
                    <Text>Be the first to add some comments...</Text>
                }    

                {/* Post comments */}
                {
                    this.state.comment ?
                    <View style={styles.comment}>
                        <TextInput
                            placeholder="Add a comment..."
                            value={this.state.content}
                            onChangeText={content => this.setState({content})}
                            style={styles.input}
                        />
                        <Button
                            title="Post"
                            onPress={this.handleSubmitComment}
                        />
                    </View>
                    : 
                    null
                }
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