import React, { Component } from 'react';
import { View,  FlatList, StyleSheet } from 'react-native';

import { Request } from '../presentation';


import globalStore from '../../../GlobalStore';



class RequestsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={globalStore.requests}
                    renderItem={({item, idx}) => <Request req={item} idx={idx} />}
                    keyExtractor={(item, index) => 'key'+index}
                />
            </View>
        );
    }
}

export default RequestsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
    }
});