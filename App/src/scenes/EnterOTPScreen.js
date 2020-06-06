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

export default class EnterOTPScreen extends Component {
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
            <TextInput style={styles.input} placeholder={'Mã OTP'} />
            <TouchableOpacity style={styles.touchable}>
              <View style={styles.touchableView}>
                <Text style={styles.touchableText}>Xác nhận</Text>
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
  touchableView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#da4842',
    borderRadius: 25,
  },
  touchableText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
