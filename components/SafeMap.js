import React from 'react';
import {
  Constants,
  Location,
  Permissions,
  MapView,
} from 'expo';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    alignSelf: 'stretch',
    height: 400,
  },
});

export default class SafeMap extends React.Component {
  state = {
    errorMessage: null,
    location: null,
    markers: null,
  };

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
      console.log(coords);
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
    const { location, errorMessage, markers } = this.state;
    return (
      <View style={styles.container}>
        {
          location != null && errorMessage == null
            ? (
              <MapView
                style={styles.map}
                region={location}
              >
                {markers}
              </MapView>
            )
            : <Text style={styles.paragraph}>{errorMessage == null ? 'Loading...' : errorMessage}</Text>
        }
      </View>
    );
  }
}
