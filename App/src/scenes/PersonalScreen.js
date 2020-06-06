import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import InfoIcon from 'react-native-vector-icons/Entypo';
import ChangePassIcon from 'react-native-vector-icons/Fontisto';
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class PersonalScreen extends Component {
  render() {
    return (
      <View style={styles.screenView}>
        <TouchableOpacity
          style={styles.childView}
          onPress={() => this.props.navigation.navigate('PersonalInformation')}>
          <InfoIcon
            style={styles.infoIcon}
            name="info-with-circle"
            color="#0b86da"
            size={27}
          />
          <Text style={styles.itemText}>Quản lý thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.childView}
          onPress={() => this.props.navigation.navigate('ChangePass')}>
          <ChangePassIcon
            style={styles.infoIcon}
            name="key"
            color="#0b86da"
            size={27}
          />
          <Text style={styles.itemText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.childView}
          onPress={() => this.props.navigation.replace('Login')}>
          <LogoutIcon
            style={styles.infoIcon}
            name="logout"
            color="#0b86da"
            size={27}
          />
          <Text style={styles.itemText}>Đăng xuất</Text>
        </TouchableOpacity>
        <View style={styles.emptyView} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  childView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  itemText: {
    fontSize: 16,
  },
  emptyView: {
    flex: 7,
  },
  infoIcon: {
    marginRight: 40,
  },
});
