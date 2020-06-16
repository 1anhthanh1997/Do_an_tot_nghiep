import React, {Component} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import styles from '../res/styles'
import AsyncStorage from '@react-native-community/async-storage';


export default class LoginScreen extends Component {
  state = {
    username: '',
    password: '',
    tokenODM: '',
    token: '',
  };

  login = async () => {
    let data = {
      username: '1anhthanh1997',
      password: 'anhthanh1997',
    };
    console.log(data);
    await this.loginODMAPI(data)
      .then(async res => {
        let responseJsonODM = await res.json();
        await this.setState({
          tokenODM: responseJsonODM.token,
        });
        console.log(responseJsonODM);
        try {
          await AsyncStorage.setItem('tokenODM', responseJsonODM.token);
          console.log('Hello');
        } catch (e) {
          // saving error
          console.log(e);
        }
        // alert('Upload success:' + data.token);
        console.log(responseJsonODM.token);
      })
      .catch(e => {
        Alert.alert(
          'Thông báo',
          'Vui lòng kiểm tra lại tài khoản hoặc mật khẩu',
          [{text: 'OK'}],
          {cancelable: false},
        );
        console.log(e);
      });
    await this.loginAPI()
      .then(async res => {
        let responseJson = await res.json();
        // console.log(responseJson)
        if (!responseJson.token) {
          throw new Error('Invalid');
        }
        await this.setState({
          token: responseJson.token,
        });
        // console.log(responseJson)
        try {
          await AsyncStorage.setItem('token', responseJson.token);
          console.log('He');
        } catch (e) {
          // saving error
          console.log(e);
        }
        await this.props.navigation.replace('BottomTab', {screen: 'Project'});
      })
      .catch(e => {
        Alert.alert(
          'Thông báo',
          'Vui lòng kiểm tra lại tài khoản hoặc mật khẩu',
          [{text: 'OK'}],
          {cancelable: false},
        );
        console.log(e);
      });
  };
  loginODMAPI = async data => {
    const response = await fetch('http://192.168.55.108:8000/api/token-auth/', {
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
    return response;
  };
  loginAPI = async () => {
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    let response = await fetch('http://open-drone-map.herokuapp.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    return response;
  };


  render() {
    return (
      <View style={styles.screenView}>
        <ImageBackground
          style={styles.imageBackground}
          source={require('../res/images/loginBackground.jpg')}>
          <View style={styles.partitionFirstView}>
            <Text style={styles.signInText}>Đăng nhập</Text>
          </View>
          <View style={styles.additionView}>
            <Image
              style={styles.logo}
              source={require('../res/images/logo.png')}
            />
          </View>
          <View style={styles.partitionSecondView}>
            <TextInput
              style={styles.inputLogin}
              placeholder={'Tên đăng nhập'}
              onChangeText={username =>
                this.setState({
                  username: username,
                })
              }
            />
            <TextInput
              style={styles.inputLogin}
              secureTextEntry={true}
              placeholder={'Mật khẩu'}
              onChangeText={password =>
                this.setState({
                  password: password,
                })
              }
            />
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => this.login()}>
              <View style={styles.touchableLogInView}>
                <Text style={styles.touchableLogInText}>Đăng nhập</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.partitionThirdView}>
            <View style={styles.secondOption}>
              <Text
                style={styles.secondOptionText}
                onPress={() => this.props.navigation.navigate('Register')}>
                Đăng ký
              </Text>
            </View>
            <View style={styles.secondOption}>
              <Text
                style={styles.secondOptionText}
                onPress={() =>
                  this.props.navigation.navigate('ForgotPassword')
                }>
                Quên mật khẩu
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}


