import React, { Component } from 'react';
import { View, StyleSheet, TextInput, } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

class SearchScreen extends Component {
    constructor() {
        super();
        this.state={
            query: '',
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Icon 
                    color="#e0e0e0"
                    name="md-search"
                    size={20}
                />

                <TextInput
                    placeholder="Search"
                    value={this.state.query}
                    onChange={query => this.setState({query})}
                    style={styles.input}
                />
            </View>
        );
    }
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center', 
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderStyle: 'solid',
        borderRadius: 10,
        marginTop: 10,
        padding: 5,
    },
    input: {
        width: 300,
        fontSize: 20,
        marginLeft: 5,
    },
});