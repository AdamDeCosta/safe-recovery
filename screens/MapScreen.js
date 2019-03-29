import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';
import SafeMap from '../components/SafeMap';
import * as data from '../assets/locations.json';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingTop: 30
  }
});

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    errorMessage: null,
    location: null,
    markers: null
  };

  componentDidMount() {
    this._getLocationAsync();
    this._loadMarkers();
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({ location: undefined });
    } else {
      loc = await Location.getCurrentPositionAsync({});
      const location = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      };

      this.setState({ location });
    }
  };

  _loadMarkers = () => {
    markers = data.addresses.map((address) => (
      <MapView.Marker
        coordinate={address.coordinates}
        title={address.name}
        description={address.address}
        key={address.address}
      />
    ));
    this.setState({ markers });
  };

  render() {
    const { location, markers } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <SafeMap location={location}>{markers}</SafeMap>
        </ScrollView>
      </View>
    );
  }
}
