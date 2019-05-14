import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    FlatList 
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { SearchListItem } from './';

class SearchList extends Component {
    render() {
        return (
            <View style={styles.container}>
                {/* <FlatList
                    data={this.props.list}
                    renderItem={({item}) => <SearchListItem item={item} />}
                    keyExtractor={(item, index) => 'key'+index}
                /> */}

                {
                    this.props.list.map((item, idx) => (
                        <ListItem
                            key={idx}
                            leftAvatar={{ source: { uri: item.thumbnail }}} 
                            title={item.username}
                            chevronColor="#a9a9a9"
                            chevron={true}
                            bottomDivider={true}
                        />
                    ))
                }
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