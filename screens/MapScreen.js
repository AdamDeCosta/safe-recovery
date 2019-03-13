import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

export default class MapScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Text>Map Screen</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 30,
    },
});