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

class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            list: [],
        };
    }

    handleSearch = () => {
        if (this.state.username) {
            axios
                .get(`http://192.168.0.107:5000/users?username=${this.state.username}`)
                .then(result => this.setState({list: result.data}))
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

                <SearchList list={this.state.list}/>    
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