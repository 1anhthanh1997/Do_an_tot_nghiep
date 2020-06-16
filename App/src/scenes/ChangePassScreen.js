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
              style={styles.input}
              placeholder={'Mật khẩu cũ'}
              onChangeText={value => this.setState({username: value})}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder={'Mật khẩu mới'}
              secureTextEntry={true}
              onChangeText={value => this.setState({password: value})}
            />
            <TextInput
              style={styles.input}
              placeholder={'Nhập lại mật khẩu'}
              secureTextEntry={true}
              onChangeText={value => this.setState({retypePassword: value})}
            />

            <TouchableOpacity
              style={styles.touchable}
              onPress={() => this.register()}>
              <View style={styles.touchableLogInView}>
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
const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  imageBackground: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  firstView: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  secondView: {
    flex: 8,
    alignItems: 'center',
  },
  input: {
    height: 43,
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    // borderWidth:2,
    // borderColor:'#afb4b3',
    color: 'gray',
    fontSize: 15,
    borderRadius: 25,
    margin: 10,
    paddingLeft: 20,
  },
  touchable: {
    height: 45,
    width: 300,
    marginTop: 30,
  },
  touchableLogInView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b86da',
    borderRadius: 25,
  },
  touchableLogInText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  genderView: {
    flex: 1,
  },
  radioButtonView: {
    flexDirection: 'row',
    padding: 10,
  },
  genderText: {
    fontSize: 15,
    color: 'gray',
    paddingRight: 67,
  },
  datePickerView: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 15,
    color: 'gray',
    paddingRight: 20,
  },
});
