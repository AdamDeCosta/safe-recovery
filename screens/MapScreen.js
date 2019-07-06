import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  StatusBar
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Location } from 'expo';
import * as Permissions from 'expo-permissions';
import { MapView, Marker } from 'react-native-maps';
import SafeMap from '../components/SafeMap';
import * as data from '../assets/locations.json';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row'
  },
  spinner: {
    position: 'relative',
    flex: 1
  }
});

const locTypes = {
  ALL: 'ALL',
  NARCAN: 'red',
  HUB: 'blue'
};

const intToLoc = {
  0: locTypes.ALL,
  1: locTypes.NARCAN,
  2: locTypes.HUB
};

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
      const loc = await Location.getCurrentPositionAsync({});
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
      <Marker
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
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <Text
          style={{
            fontSize: 26,
            paddingTop: 5,
            paddingBottom: 5,
            alignSelf: 'center'
          }}
        >
          Howard Center - Help Is Here
        </Text>
        {location != null ? (
          <>
            <SegmentedControlTab
              style={{}}
              selectedIndex={this.state.selected}
              values={['All', 'Narcan', 'Hub']}
              onTabPress={(index) => {
                this.setState({ selected: index });
                this._filterMarkers(intToLoc[index]);
              }}
            />
            <SafeMap location={location}>{visableMarkers}</SafeMap>
          </>
        ) : (
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            color="#063a47"
          />
        )}
      </View>
    );
  }
}
