import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    FlatList 
} from 'react-native';

import { SearchListItem } from './';

class SearchList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.list}
                    renderItem={({item}) => <SearchListItem item={item} />}
                    keyExtractor={(item, index) => 'key'+index}
                />
            </View>
        );
    }
}

export default SearchList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});