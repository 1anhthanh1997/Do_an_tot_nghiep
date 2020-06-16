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

export default class PersonalInformationScreen extends Component {
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
  getInforAPI = async () => {
    let response = await fetch('http://open-drone-map.herokuapp.com/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.state.auth,
      },
    });
    return response;
  };
  getInfo = async () => {
    await this.getInforAPI().then(async res => {
      let responseJson = await res.json();
      console.log(responseJson);
      await this.setState({
        name: responseJson.name,
        dateOfBirth: responseJson.dateOfBirth,
        gender: responseJson.gender,
        email: responseJson.email,
        phoneNumber: responseJson.phoneNumber,
      });
    });
  };
  updateAPI = async () => {
    let data = {
      name: this.state.name,
      dateOfBirth: this.state.dateOfBirth,
      gender: this.state.gender,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    };
    let response = await fetch('http://open-drone-map.herokuapp.com/users/me', {
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
  update = async () => {
    this.updateAPI()
      .then(async res => {
        console.log(res);
        Alert.alert(
          'Thông báo',
          'Cập nhật thông tin thành công!',
          [
            {
              text: 'OK',
              onPress: async () => {
                await this.getInfo();
                await this.props.navigation.navigate('PersonalInformation');
              },
            },
          ],
          {cancelable: false},
        );
      })
      .catch(e => {
        Alert.alert('Thông báo', 'Cập nhật thông tin thất bại', [{text: 'OK'}], {
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
      await this.getInfo();
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
            <Text style={styles.registerText}>Thông tin cá nhân</Text>
          </View>
          <View style={styles.secondView}>
            <TextInput
              style={styles.inputRegister}
              placeholder={'Họ và tên'}
              defaultValue={this.state.name}
              onChangeText={value => this.setState({name: value})}
            />
            <View style={styles.radioButtonView}>
              <Text style={styles.genderText}>Giới tính:</Text>
              <RadioForm
                radio_props={radio_props}
                formHorizontal={true}
                labelHorizontal={true}
                initial={this.state.gender == 'Nam' ? 0 : 1}
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
              style={styles.inputRegister}
              placeholder={'Email'}
              defaultValue={this.state.email}
              onChangeText={value => this.setState({email: value})}
            />
            <TextInput
              style={styles.inputRegister}
              placeholder={'Số điện thoại'}
              defaultValue={this.state.phoneNumber}
              onChangeText={value => this.setState({phoneNumber: value})}
            />
            <TouchableOpacity
              style={styles.touchableRegister}
              onPress={() => this.update()}>
              <View style={styles.touchableLogInViewRegister}>
                <Text style={styles.touchableLogInText}>Cập nhật</Text>
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
