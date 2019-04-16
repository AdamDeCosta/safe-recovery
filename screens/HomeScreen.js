import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import Accordian from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: 'Identify Opiod Overdose and Check for Response',
    content: 
      <>
        <Text>Hey</Text>
      </>
  },
  {
    title: 'Give Narcan Nasal Spray',
    content: 
      <>
        <Text>Remove NARCAN Nasal Spray from the box. Peel back the tab with the circle to open the NARCAN Nasal Spray.</Text>
        <Text>Hold the NARCAN nasal spray with your thumb on the bottom of the plunger and your first and middle fingers on either side of the nozzle.</Text>
        <Text>Gently insert the tip of the nozzle into either nostril.</Text>
      </>
  },
  {
    title: 'Call for emergency medical help, Evaluate, and Support',
    content: <Text>Hey</Text>
  }
];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    activeSections: [],
  }

  _renderSectionTitle = (section) => (
    <View style={styles.content}>
      <Text>{section.content}</Text>
    </View>
  )

  _renderHeader = (section) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{section.title}</Text>
    </View>
  )

  _renderContent = (section) => (
    <View style={styles.content}>
      {section.content}
    </View>
  )

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Accordian 
            sections={SECTIONS}
            activeSections={this.state.activeSections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  bodyText: {
    fontSize: 16,
  }
});
