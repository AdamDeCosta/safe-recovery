import React from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    header: {
        fontWeight: "700",
        fontSize: 28,
    }
});

const Header = ({text}) => (
    <Text style={styles.header}>{text}</Text>
)

export default Header;