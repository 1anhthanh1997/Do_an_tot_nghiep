import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../res/styles';

export default class ChangePassScreen extends Component {
  state = {
    username: '',
    password: '',
    retypePassword: '',
    name: '',
    dateOfBirth: '02/03/2020',
    gender: 'Nam',
    email: '',
    phoneNumber: '',
    auth: '',
  };
  registerAPI = async () => {
    let data = {
      oldPassword: this.state.username,
      newPassword: this.state.password,
    };
    let response = await fetch('http://open-drone-map.herokuapp.com/users/changePass', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.state.auth,
      },
      body: JSON.stringify(data),
    });
    return response;
  };
  register = async () => {
    this.registerAPI()
      .then(async res => {
        Alert.alert(
          'Thông báo',
          'Đổi mật khẩu thành công!',
          [{text: 'OK', onPress: () => this.props.navigation.replace('Login')}],
          {cancelable: false},
        );
      })
      .catch(e => {
        Alert.alert('Thông báo', 'Đổi mật khẩu thất bại', [{text: 'OK'}], {
          cancelable: false,
        });
        console.error(e);
      });
  };
  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('token');
      await this.setState({
        auth: 'Bearer ' + value,
      });
      console.log(this.state.auth);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={styles.screenView}>
        <ImageBackground
          style={styles.imageBackground}
          source={require('../res/images/loginBackground.jpg')}>
          <View style={styles.firstView}>
            <Text style={styles.registerText}>Đổi mật khẩu</Text>
          </View>
          <View style={styles.secondView}>
            <TextInput
              style={styles.inputRegister}
              placeholder={'Mật khẩu cũ'}
              onChangeText={value => this.setState({username: value})}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.inputRegister}
              placeholder={'Mật khẩu mới'}
              secureTextEntry={true}
              onChangeText={value => this.setState({password: value})}
            />
            <TextInput
              style={styles.inputRegister}
              placeholder={'Nhập lại mật khẩu'}
              secureTextEntry={true}
              onChangeText={value => this.setState({retypePassword: value})}
            />

            <TouchableOpacity
              style={styles.touchableRegister}
              onPress={() => this.register()}>
              <View style={styles.touchableLogInViewRegister}>
                <Text style={styles.touchableLogInText}>Đổi mật khẩu</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

let radio_props = [
  {label: 'Nam           ', value: 0},
  {label: 'Nữ', value: 1},
];

