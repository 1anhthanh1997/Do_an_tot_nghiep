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

export default class RegisterScreen extends Component {
  state = {
    username: '',
    password: '',
    retypePassword: '',
    name: '',
    dateOfBirth: '02/03/2020',
    gender: 'Nam',
    email: '',
    phoneNumber: '',
  };
  registerAPI = async () => {
    let data = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      dateOfBirth: this.state.dateOfBirth,
      gender: this.state.gender,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    };
    let response = await fetch('http://192.168.55.108:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
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
          'Đăng kí tài khoản thành công!',
          [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('Login'),
            },
          ],
          {cancelable: false},
        );
      })
      .catch(e => {
        Alert.alert('Thông báo', 'Đăng kí tài khoản thất bại', [{text: 'OK'}], {
          cancelable: false,
        });
        console.error(e);
      });
  };

  render() {
    return (
      <View style={styles.screenView}>
        <ImageBackground
          style={styles.imageBackground}
          source={require('../res/images/loginBackground.jpg')}>
          <View style={styles.firstView}>
            <Text style={styles.registerText}>Đăng ký</Text>
          </View>
          <View style={styles.secondView}>
            <TextInput
              style={styles.input}
              placeholder={'Tên đăng nhập'}
              onChangeText={value => this.setState({username: value})}
            />
            <TextInput
              style={styles.input}
              placeholder={'Mật khẩu'}
              secureTextEntry={true}
              onChangeText={value => this.setState({password: value})}
            />
            <TextInput
              style={styles.input}
              placeholder={'Nhập lại mật khẩu'}
              secureTextEntry={true}
              onChangeText={value => this.setState({retypePassword: value})}
            />
            <TextInput
              style={styles.input}
              placeholder={'Họ và tên'}
              onChangeText={value => this.setState({name: value})}
            />
            <View style={styles.radioButtonView}>
              <Text style={styles.genderText}>Giới tính:</Text>
              <RadioForm
                radio_props={radio_props}
                formHorizontal={true}
                labelHorizontal={true}
                initial={0}
                buttonColor={'gray'}
                selectedButtonColor={'gray'}
                labelColor={'gray'}
                selectedLabelColor={'gray'}
                buttonSize={15}
                labelStyle={{fontSize: 15}}
                onPress={value => {
                  this.setState({gender: value == 0 ? 'Nam' : 'Nữ'});
                }}
              />
            </View>
            <View style={styles.datePickerView}>
              <Text style={styles.datePickerText}>Ngày sinh:</Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.dateOfBirth}
                mode="date"
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate="01/01/1945"
                maxDate="01/01/2021"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                    borderRadius: 25,
                  },
                  dateText: {
                    color: 'gray',
                  },
                }}
                onDateChange={date => {
                  this.setState({dateOfBirth: date});
                }}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder={'Email'}
              onChangeText={value => this.setState({email: value})}
            />
            <TextInput
              style={styles.input}
              placeholder={'Số điện thoại'}
              onChangeText={value => this.setState({phoneNumber: value})}
            />
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => this.register()}>
              <View style={styles.touchableLogInView}>
                <Text style={styles.touchableLogInText}>Tạo tài khoản</Text>
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
