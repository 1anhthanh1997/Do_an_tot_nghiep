import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Button} from 'native-base';
export default class BottomTabCustomize extends Component {
  render() {
    return (
      <View style={styles.screenView}>
        <View style={styles.childView}>
          <TouchableOpacity>
            <Text>Map</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.childView}>
          <Text>Map</Text>
        </View>
        <View style={styles.childView}>
          <Text>Map</Text>
        </View>
        <View style={styles.childView}>
          <Text>Setting</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screenView: {
    flex: 0.1,
    flexDirection: 'row',
  },
  childView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {},
});
