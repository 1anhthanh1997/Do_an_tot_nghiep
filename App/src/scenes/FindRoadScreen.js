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
    let downloadUrl =selfUrl2 + '/api/test'


    let dirs = RNFetchBlob.fs.dirs;
    let path = `${dirs.DownloadDir}/test.jpg`;
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      path: path,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: path,
        description: 'Image',
      },
    }).fetch(downloadUrl, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        'Content-type': 'multipart/form-data',
      },
      body: data,
    })
        .then(async res => {
          // the path should be dirs.DocumentDir + 'path-to-file.anything'
          let url = 'file://' + res.path();
          // await this.changeToPng(url);
          // await this.setState({
          //      imageUrl:url
          //  });
          console.log(url);
        });
    // // await this.detectPersonApi();
    // await this.detectPersonApi(data).then(async (res)=>{

      // let response= await res.json()
      // console.log(response)
    // })
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
        <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
});
