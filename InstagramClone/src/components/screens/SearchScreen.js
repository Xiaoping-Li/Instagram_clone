import React, { Component } from 'react';
import { 
    View, 
    StyleSheet, 
    TextInput,
    Button,
    Text, 
} from 'react-native';
import axios from 'axios';
import Icon from '@expo/vector-icons/Ionicons';

import SearchList from '../presentation/SearchList';

class SearchScreen extends Component {
    state = {
        query: '',
        list: [],
    }

    handleSearch() {

        if (this.state.query) {
            axios
                .get(`http://192.168.0.107:5000/users/?username=${this.state.query}`)
                .then(result => {
                    console.log(result.data);
                })
                .catch(err => console.log(err));
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
                        onChangeText={query => this.setState({query})}
                        style={styles.input}
                    />

                    <Text onPress={() => {}} style={{fontSize: 15,marginRight: 5,}}>Search</Text>    
                </View>

                <SearchList />    
            </View>
        );
    }
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', 
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