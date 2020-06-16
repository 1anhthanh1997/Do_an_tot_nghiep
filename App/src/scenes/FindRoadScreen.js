/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SearchInput, {createFilter} from 'react-native-search-filter';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import styles from '../res/styles';

let selfUrl2 = 'http://192.168.55.108:5000';

const KEYS_TO_FILTERS = ['user.name', 'subject'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      email:[{
        user:{
          name:"Thanh"
        },
        subject:"IT"
      }],
      images: '',
    }
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  detectPersonApi = async (data) => {
    // let body = new FormData();
    // body.append('photo', {uri: imagePath,name: 'photo.png',filename :'imageName.png',type: 'image/png'});
    let createTaskUrl =
        selfUrl2 + '/api/test' ;
    console.log(createTaskUrl)
    let response = await fetch(createTaskUrl, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        'Content-type': 'multipart/form-data',
      },
      body: data,
    });
    return response;

  };
  detectPerson = async () => {
    let data = new FormData();
    await data.append('image', {
      uri: this.state.images.uri,
      type: this.state.images.mime,
      name: `filename1.jpg`,
    });

    await this.detectPersonApi(data).then(async (res)=>{
        res.data.pipe(fs.createWriteStream('test.jpg'));

        }
    )


  };
  handleChoosePhoto = () => {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,

    })
        .then(async images => {
          await this.setState({
            images: {
              uri: images.path,
              width: images.width,
              height: images.height,
              mime: images.mime,
            },

          });
          // console.log(this.state.images)

        })
        .catch(e => alert(e));
  };

  componentDidMount() {

  }

  render() {
    const filteredEmails = this.state.email.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
        <View style={styles.containerFindRoad}>
          <SearchInput
              onChangeText={(term) => { this.searchUpdated(term) }}
              style={styles.searchInput}
              placeholder="Type a message to search"
          />
          <ScrollView>
            {filteredEmails.map(email => {
              return (
                  <TouchableOpacity onPress={() => alert(email.user.name)} key={email.id} style={styles.emailItem}>
                    <View>
                      <Text>{email.user.name}</Text>
                      <Text style={styles.emailSubject}>{email.subject}</Text>
                    </View>
                  </TouchableOpacity>
              )
            })}
          </ScrollView>
          <TouchableOpacity style={{height: 70, width: 100, backgroundColor: 'blue'}}
                            onPress={async () => {
                              await this.handleChoosePhoto();
                              // await this.detectPerson()
                            }
                            }>
          </TouchableOpacity>
          <TouchableOpacity style={{height: 70, width: 100, backgroundColor: 'red'}}
                            onPress={async () => {
                              // await this.handleChoosePhoto()
                              await this.detectPerson();
                            }
                            }>

          </TouchableOpacity>
        </View>
    );
  }
}


