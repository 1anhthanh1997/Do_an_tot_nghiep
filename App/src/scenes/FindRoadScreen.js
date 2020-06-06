import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import MapView from 'react-native-maps';

export default class FindRoad extends Component {
  render() {
    return (
      <View style={styles.screenView}>
        <View style={styles.container}>
          <MapView
            mapType={'hybrid'}
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          {/*<View  style={{*/}
          {/*    position: 'absolute',//use absolute position to show button on top of the map*/}
          {/*    top: '0%', //for center align*/}
          {/*    alignSelf: 'flex-start' //for align to right*/}
          {/*}}>*/}
          {/*    <Button title={"Hello"}/>*/}
          {/*</View>*/}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
