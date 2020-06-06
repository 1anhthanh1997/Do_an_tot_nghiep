import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
export default class CreateProject extends Component {
  state = {
    visible: false,
  };
  render() {
    return (
      <Dialog
        visible={this.state.visible}
        onTouchOutside={() => {
          this.setState({visible: false});
        }}>
        <DialogContent>
          <Text>Hello</Text>
        </DialogContent>
      </Dialog>
    );
  }
}
const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
});
