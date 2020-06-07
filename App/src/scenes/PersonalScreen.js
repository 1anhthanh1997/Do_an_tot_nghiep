import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import InfoIcon from 'react-native-vector-icons/Entypo';
import ChangePassIcon from 'react-native-vector-icons/Fontisto';
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

let selfUrl = 'http://192.168.55.108:3000';
export default class PersonalScreen extends Component {
    state = {
        auth: '',
    };
    logOutApi = async (token) => {
        let auth = token;
        let logOutUrl =
            selfUrl + '/users/logout';
        console.log(logOutUrl);
        console.log(logOutUrl);
        let response = await fetch(logOutUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: auth,
            },
        });
        return response;
    };
    logOut = async () => {
        await this.logOutApi(this.state.auth).then(async (res) => {
            let response = await res.json();
            console.log(response);
        });
    };

    async componentDidMount() {
        const value = await AsyncStorage.getItem('token');
        await this.setState({
            auth: 'Bearer ' + value,
        });
    }

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
                    onPress={async () => {
                        await this.logOut();
                        await this.props.navigation.replace('Login');
                    }}>
                    <LogoutIcon
                        style={styles.infoIcon}
                        name="logout"
                        color="#0b86da"
                        size={27}
                    />
                    <Text style={styles.itemText}>Đăng xuất</Text>
                </TouchableOpacity>
                <View style={styles.emptyView}/>
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
