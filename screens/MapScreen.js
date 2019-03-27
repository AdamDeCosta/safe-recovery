import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Constants,
  Location,
  Permissions,
  MapView,
} from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import SafeMap from '../components/SafeMap';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },
});

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    errorMessage: null,
    location: null,
    markers: null,
  }

  componentDidMount() {
    this._getLocationAsync().then((loc) => {
      if (loc) {
        this.setState(
          {
            location: {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            },
          },
        );

        this._loadMarkers(loc.coords).then((response) => {
          if (response.data) {
            const markers = response.data.candidates.map((marker) => {
              const coordinate = {
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              };

              return (
                <MapView.Marker
                  key={marker.id}
                  coordinate={coordinate}
                  title={marker.name}
                  description={marker.formatted_address}
                />
              );
            });

            this.setState({ markers });
          }
        })
          .catch((error) => {
            this.setState({ errorMessage: error });
          });
      }
    });
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    return Location.getCurrentPositionAsync({});
  }

  _loadMarkers = (coords) => {
    try {
      return axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
        params: {
          key: Constants.manifest.android.config.googleMaps.apiKey,
          input: 'safe recovery',
          inputtype: 'textquery',
          fields: 'geometry,formatted_address,name,id',
          locationbias: `circle:5000@${coords.latitude},${coords.longitude}`,
        },
      });
    } catch (error) {
      return console.error(error);
    }
  };

  render() {
    const { location, markers } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <SafeMap
            location={location}
          >
            {markers}
          </SafeMap>
        </ScrollView>
      </View>
    );
  }
}
