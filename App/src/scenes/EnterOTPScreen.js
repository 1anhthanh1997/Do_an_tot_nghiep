import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions, Alert,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import styles from '../res/styles';
let selfUrl = 'http://open-drone-map.herokuapp.com';
export default class EnterOTPScreen extends Component {
    state = {
        email:'',
        OTP: '',
        realOTP:''
    };
    resetPasswordApi=async ()=>{
      let data={
        email:this.state.email
      }
      console.log(data)
      let resetPasswordUrl =
          selfUrl + '/resetPassword';
      let response = await fetch(resetPasswordUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      });
      return response;
    }
    resetPassword= async ()=>{
      if(this.state.OTP===this.state.realOTP){
        await this.resetPasswordApi().then(async (res)=>{
           await console.log(res.status)
           let response=await res.json()
          console.log(response)
          await Toast.show("Reset mật khẩu thành công. Vui lòng kiểm tra email để xác nhận.",Toast.SHORT)
          await this.props.navigation.navigate('Login')

        }).catch(async (e)=>{
          await Alert.alert(

              'Thông báo',
              e,
              [
                {
                  text: 'OK', onPress: async () => {
                  },
                }]

          );
        })
      }else {
        Alert.alert(

            'Thông báo',
            'Mã OTP không đúng vui lòng kiểm tra lại!',
            [
              {
                text: 'OK', onPress: async () => {


                },
              }]

        );
      }

    }
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
        realOTP:response.OTP
      })
      await Toast.show("Mã OTP đã được gửi. Vui lòng kiểm tra email.")
    })
  }
    async componentDidMount() {
      const {email} = await this.props.route.params;
      const {OTP} = await this.props.route.params;
      await this.setState({
        email:email,
        realOTP:OTP
      })
      console.log(this.state.realOTP)
    }

  render() {
        return (
            <View style={styles.screenView}>
                <ImageBackground
                    style={styles.imageBackground}
                    source={require('../res/images/loginBackground.jpg')}>
                    <View style={styles.firstView}>
                        <Text style={styles.titleText}>Nhập mã OTP</Text>
                    </View>
                    <View style={styles.secondView}>
                        <TextInput style={styles.inputForgotPassword}
                                   value={this.state.OTP}
                                   onChangeText={(value) => {
                                       this.setState({
                                           OTP: value,
                                       });
                                   }}
                                   placeholder={'Mã OTP'}/>
                        <TouchableOpacity style={styles.touchableEnterOTP} onPress={()=>this.resetPassword()}>
                            <View style={styles.touchableView}>
                                <Text style={styles.touchableText}>Xác nhận</Text>
                            </View>
                        </TouchableOpacity>
                      <Text style={styles.descriptionTextEnterOTP} onPress={()=>this.sendOTP()}>
                        Không nhận được mã OTP? Gửi lại.
                      </Text>

                    </View>
                </ImageBackground>
            </View>
        );
    }
}

