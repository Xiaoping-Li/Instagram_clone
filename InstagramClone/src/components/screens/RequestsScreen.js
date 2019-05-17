import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';

import { View,  FlatList, StyleSheet } from 'react-native';

import { Request } from '../presentation';


// import globalStore from '../../../GlobalStore';


@inject('globalStore')
@observer
class RequestsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.globalStore.requests}
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