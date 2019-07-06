import React from 'react';
import { ScrollView, StyleSheet, View, Text, PixelRatio } from 'react-native';
import { BackButton, NextButton } from '../DirectionalButtons';
import { MarkdownView } from 'react-native-markdown-view';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    alignSelf: 'center'
  },
  navBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  title: {
    fontSize: 28,
    justifyContent: 'center',
    color: Colors.tintColor
  }
});

const mdStyles = StyleSheet.create({
  paragraph: {
    lineHeight: 20
  },
  strong: {
    color: Colors.tintColor
  },
  heading2: {
    color: Colors.tintColor
  }
});

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this._nextPage = this._nextPage.bind(this);
    this._previousPage = this._previousPage.bind(this);
  }

  state = {
    activePage: 0
  };

  _nextPage = () => {
    const { activePage } = this.state;
    this.setState({ activePage: activePage + 1 });
  };

  _previousPage = () => {
    const { activePage } = this.state;
    this.setState({ activePage: activePage - 1 });
  };

  render() {
    const { activePage } = this.state;
    const nextDisabled = activePage >= this.props.pages.length - 1;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.navBarContainer}>
          <BackButton onPress={this._previousPage} disabled={activePage <= 0} />
          <Text style={styles.title}>Howard Center</Text>
          <NextButton onPress={this._nextPage} disabled={nextDisabled} />
        </View>
        <MarkdownView styles={mdStyles}>
          {this.props.pages[activePage].content}
        </MarkdownView>
      </ScrollView>
    );
  }
}

export default Carousel;
