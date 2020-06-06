import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class OrthophotoScreen extends Component {
  state = {
    orthophotoSource: '../res/images/logo.png',
  };
  chooseOrthophoto = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          orthophotoSource: source,
        });
      }
    });
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={this.state.orthophotoSource}
          style={{height: 300, width: 300}}
        />
        <TouchableOpacity
          style={{
            height: 50,
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0b86da',
            marginTop: 10,
          }}
          onPress={() => this.chooseOrthophoto()}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Choose orthophoto
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
