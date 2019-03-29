import React from 'react';
import { MapView } from 'expo';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center'
  },
  map: {
    alignSelf: 'stretch',
    height: 400
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
