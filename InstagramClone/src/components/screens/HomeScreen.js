import React, { Component } from 'react';
import {
    Text, 
    View, 
    StyleSheet,
    AsyncStorage, 
} from 'react-native';
import axios from 'axios';
import { Posts } from '../presentation';

class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            userID: '',
            posts: [],
        };
    }

    componentDidMount () {
        AsyncStorage
            .getItem('userToken')
            .then(result => {
                this.setState({ userID: result });
                this.getPosts();
            })
            .catch(err => console.log(err));
    }

    getPosts() {
        const owner = this.state.userID;
        axios
            .get('http://192.168.0.107:5000/posts/' + owner)
            .then(result => {
                if (result.data.length) {
                    this.setState({ posts: result.data });
                }
            })
            .catch(err => console.log(err));   
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.posts.length ? 
                    <Posts posts={this.state.posts}/> 
                    : 
                    <Text
                        onPress={() => this.props.navigation.navigate('AddPost')}
                        style={{fontSize: 20, fontWeight: 'bold',}}
                    >
                        Something you want to share?
                    </Text>
                }    
            </View>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',  
    },
});