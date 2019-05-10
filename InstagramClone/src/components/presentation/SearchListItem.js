import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Image,
} from 'react-native';


class SearchListItem extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Image 
                    source={{uri: this.props.item.thumbnail}}
                    style={styles.image} 
                />
                <Text style={styles.username}>{this.props.item.username}</Text>
                <Text 
                    onPress={() => {}}
                    style={styles.connect}
                >
                    Connect
                </Text>
            </View>
        );
    }
}

export default SearchListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        borderStyle: 'solid',
    },
    image: {
        width: 40, 
        height: 40, 
        margin: 10, 
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    username: {
        width: 200,
        fontSize: 20,
    },
    connect: {
        fontWeight: "600",
        fontSize: 20,
        color: "#838383",
    }
});