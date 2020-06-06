import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends Component {
  handleUploadPhoto = () => {
    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return await response.json(); // parses JSON response into native JavaScript objects
    }

    postData('http://192.168.55.108:8000/api/token-auth/', {
      username: '1anhthanh1997',
      password: 'anhthanh1997',
    }).then(async data => {
      this.setState({
        token: data.token,
      });
      // console.log(this.state.token)

      try {
        await AsyncStorage.setItem('token', data.token);
        console.log('Hello');
      } catch (e) {
        // saving error
        console.log(e);
      }

      // alert('Upload success:' + data.token);
      console.log(data.token); // JSON data parsed by `response.json()` call
    });
  };

  async componentDidMount() {
    try {
      await this.handleUploadPhoto();
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            console.log('Hello World!');
            this.props.navigation.navigate('Project');
          }}
        />
      </View>
    );
  }
}
