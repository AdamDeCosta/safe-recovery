import React from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Constants, Location, Permissions, MapView } from 'expo';
import SafeMap from '../components/SafeMap';
import * as data from '../assets/locations.json';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingTop: 25
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
});

const locTypes = {
  ALL: 'ALL',
  NARCAN: 'red',
  TYPE_2: 'blue',
  TYPE_3: 'yellow',
};

const intToLoc = {
  0: locTypes.ALL,
  1: locTypes.NARCAN,
  2: locTypes.TYPE_2,
  3: locTypes.TYPE_3
}

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    errorMessage: null,
    location: null,
    visableMarkers: null,
    markers: null,
    selected: 0
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

  _filterMarkers = (locType) => {
    if (locType !== locTypes.ALL) {
      visableMarkers = this.state.markers.filter(
        (marker) => marker.props.pinColor === locType
      );
    } else {
      visableMarkers = this.state.markers;
    }
    

    this.setState({ visableMarkers });
  };

  _loadMarkers = () => {
    markers = data.addresses.map((address) => (
      <MapView.Marker
        coordinate={address.coordinates}
        title={address.name}
        description={address.address}
        key={address.address}
        pinColor={locTypes[address.type]}
      />
    ));
    this.setState({ markers, visableMarkers: markers });
  };

  render() {
    const { location, visableMarkers } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <SegmentedControlTab
            selectedIndex={this.state.selected}
            values={['All', 'Narcan', 'Type_2', 'Type_3']}
            onTabPress={(index) => {
              this.setState({ selected: index });
              console.log(intToLoc[index]);
              this._filterMarkers(intToLoc[index]);
            }}
          />
          <SafeMap location={location}>{visableMarkers}</SafeMap>
        </ScrollView>
      </View>
    );
  }
}
