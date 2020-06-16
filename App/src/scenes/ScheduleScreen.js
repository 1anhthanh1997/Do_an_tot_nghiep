import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import {Thumbnail, List, ListItem, Separator, Icon} from 'native-base';
import AddIcon from 'react-native-vector-icons/Ionicons';
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogButton,
  DialogFooter,
} from 'react-native-popup-dialog';
import {SearchBar} from 'react-native-elements';
import {pink50} from 'react-native-paper/src/styles/colors';
import EditIcon from 'react-native-vector-icons/FontAwesome';
import DeleteIcon from 'react-native-vector-icons/AntDesign';
import SearchInput, {createFilter} from 'react-native-search-filter';

const url = 'http://192.168.55.108:8000';
const selfUrl = 'http://open-drone-map.herokuapp.com';
export default class ProjectScreen extends Component {
  state = {
    filterData: [],
    data: [],
    data2: ['value1', 'value2', 'value3'],
    tasks: [],
    addVisible: false,
    // projectNameTmp: '',
    // projectDescriptionTmp: '',
    projectName: '',
    projectDescription: '',
    id: '',
    authODM: '',
    auth: '',
    editVisible: false,
    searchText: '',
  };

  getListProjectApi = async token => {
    let auth = token;
    console.log(auth);
    let getListProjectUrl = selfUrl + '/allProjects';
    console.log(getListProjectUrl);
    let response = await fetch(getListProjectUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth,
      },
    });
    return response;
  };
  getListProject = token => {
    this.getListProjectApi(token).then(async res => {
      let responseJson = await res.json();
      console.log(responseJson);
      this.setState({
        filterData: responseJson,
        data: responseJson,
      });
    });
  };

  search = async () => {
    const KEYS_TO_FILTERS = ['projectName'];
    const filteredEmails = await this.state.data.filter(createFilter(this.state.searchText, KEYS_TO_FILTERS));
    await console.log(filteredEmails);
    await this.setState({
      filterData: filteredEmails,
    });
  };

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('tokenODM');
      await this.setState({
        authODM: 'JWT ' + value,
      });
      const value2 = await AsyncStorage.getItem('token');
      await this.setState({
        auth: 'Bearer ' + value2,
      });
      await this.getListProject(this.state.auth);
      // console.log(this.state.tasks);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ImageBackground
              style={styles.imageBackground}
              source={require('../res/images/loginBackground.jpg')}>
            <SearchInput
                onChangeText={async (term) => {
                  await this.setState({
                    searchText: term,
                  });
                  await this.search();
                }}
                style={styles.searchInput}
                placeholder="Type a message to search"
            />


            <FlatList
                data={this.state.filterData}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => {
                          console.log(item.projectId);
                          this.props.navigation.navigate('TaskSchedule', {
                            projectId: item.projectId,
                          });
                        }}>
                      <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            height: 60,
                            justifyContent: 'center',
                            backgroundColor: '#E0E0E0',
                            borderRadius: 10,
                            margin: 5,
                          }}>
                        <View
                            style={{flex: 5, justifyContent: 'center', marginLeft: 15}}>
                          <Text style={{fontWeight: 'bold', fontSize: 17}}>
                            {item.projectName}
                          </Text>
                          <Text style={{fontSize: 17}}>{item.description}</Text>
                        </View>
                        <View
                            style={{
                              flex: 2,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>

                        </View>
                      </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.projectId}
            />
          </ImageBackground>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  dialogContentView: {
    height: 200,
    width: 350,
    alignItems: 'center',
  },
  imageBackground: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  projectNameInput: {
    height: 50,
    width: 300,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginTop: 5,
    color: 'gray',
    fontSize: 15,
    paddingLeft: 15,
  },
  descriptionInput: {
    height: 150,
    width: 300,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginTop: 5,
    color: 'gray',
    fontSize: 15,
    paddingLeft: 15,
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    backgroundColor: '#CCC',
    borderWidth: 1,
  },
});
