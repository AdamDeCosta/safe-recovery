import React from 'react';
import { MapView } from 'expo';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignSelf: 'stretch',
    height: '100%'
  }
});

export default class SafeMap extends React.Component {
  render() {
    const { location, children } = this.props;
    return (
      <MapView style={styles.map} region={location}>
        {children}
      </MapView>
    );
  }
}
