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
import styles from '../res/styles';
let selfUrl = 'http://open-drone-map.herokuapp.com';

export default class ForgotPasswordScreen extends Component {
    state = {
        email: '',
        OTP:''
    };
    sendOTPApi=async ()=>{
      let data={
        email:this.state.email
      }
      console.log(data)
      let logOutUrl =
          selfUrl + '/sendOTP';
      console.log(logOutUrl);
      console.log(logOutUrl);
      let response = await fetch(logOutUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      });
      return response;
    }
    sendOTP=async ()=>{
      await this.sendOTPApi().then(async (res)=>{
        let response=await res.json();
        console.log(response)
        await this.setState({
          OTP:response.OTP
        })
      })
    }
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
                        <TextInput style={styles.inputForgotPassword}
                                   placeholder={'Email'}
                                   value={this.state.email}
                                   onChangeText={(value) => {
                                       this.setState({
                                           email: value,
                                       });
                                   }}/>
                        <TouchableOpacity
                            style={styles.touchableForgotPassword}
                            onPress={async () => {
                              await this.sendOTP()
                              await this.props.navigation.navigate('EnterOTPScreen',{
                                email:this.state.email,
                                OTP:this.state.OTP
                              })}}>
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

