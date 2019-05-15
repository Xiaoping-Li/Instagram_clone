import React, { Component } from 'react';
import { 
    View, 
    StyleSheet, 
    TextInput,
    Text,
    Button, 
} from 'react-native';
import axios from 'axios';
import Icon from '@expo/vector-icons/Ionicons';

import { SearchList } from '../presentation';
import { ListItem } from 'react-native-elements';

class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            list: [],
            msg: '',
        };
    }

    handleSearch = () => {
        if (this.state.username) {
            axios
                .get(`http://192.168.0.107:5000/users?username=${this.state.username}`)
                .then(result => {
                    if (result.data.length) {
                        this.setState({list: result.data, msg: '', });
                    } else {
                        this.setState({ msg: 'No result found'});
                    }
                    
                })
                .catch(err => console.log(err));
        } else {
            alert('Please type username');
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <Icon 
                        color="#e0e0e0"
                        name="md-search"
                        size={20}
                        style={{marginLeft: 5}}
                    />

                    <TextInput
                        placeholder="Search"
                        value={this.state.query}
                        onChangeText={username => this.setState({username})}
                        style={styles.input}
                    />

                    <Text 
                        onPress={this.handleSearch} 
                        style={{fontSize: 15,marginRight: 5,}}
                    >
                        Search
                    </Text>    
                </View>

                <View>
                    {this.state.msg ?
                        <Text style={{ fontSize: 30 }}>{this.state.msg}</Text>
                        :
                        this.state.list.map((item, idx) => (
                            <ListItem
                                key={idx}
                                leftAvatar={{ source: { uri: item.thumbnail }}} 
                                title={item.username}
                                chevronColor="#a9a9a9"
                                chevron={true}
                                bottomDivider={true}
                                onPress={() => this.props.navigation.navigate('FriendStatus', {
                                    friendName: item.username,
                                    thumbnail: item.thumbnail,
                                    friendID: item.id,
                                })}
                            />
                        ))
                    }
                </View>
            </View>
        );
    }
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center', ---> If keep this, SearchList won't show correct properties for list item
        justifyContent: 'flex-start',    
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderStyle: 'solid',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        padding: 5,
        height: 40,
    },
    input: {
        width: 300,
        fontSize: 20,
        marginLeft: 10,
    },
});