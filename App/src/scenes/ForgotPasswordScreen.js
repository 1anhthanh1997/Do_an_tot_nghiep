import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

export default class ForgotPasswordScreen extends Component {
  render() {
    return (
      <View style={styles.screenView}>
        <ImageBackground
          style={styles.imageBackground}
          source={require('../res/images/loginBackground.jpg')}>
          <View style={styles.firstView}>
            <Text style={styles.registerText}>Quên mật khẩu?</Text>
          </View>
          <View style={styles.secondView}>
            <Text style={styles.descriptionText}>
              Kiểm tra email của bạn, chúng tôi sẽ gửi mã OTP {'\n'}để xác nhận
            </Text>
            <TextInput style={styles.input} placeholder={'Email'} />
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => this.props.navigation.navigate('EnterOTPScreen')}>
              <View style={styles.touchableLogInView}>
                <Text style={styles.touchableLogInText}>Nhận OTP</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
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
    height: 50,
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
  descriptionText: {
    fontSize: 14,
    color: 'gray',
    margin: 10,
  },
  touchable: {
    height: 50,
    width: 300,
    marginTop: 30,
  },
  touchableLogInView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#da4842',
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
});
