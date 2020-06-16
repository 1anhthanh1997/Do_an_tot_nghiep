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
    Image,
    Alert,
    ActivityIndicator,
    Platform,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

import AddIcon from 'react-native-vector-icons/Ionicons';
import Dialog, {
    DialogContent,
    DialogTitle,
    DialogButton,
    DialogFooter,
} from 'react-native-popup-dialog';
import EditIcon from 'react-native-vector-icons/Entypo';
import DeleteIcon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import SearchInput, {createFilter} from 'react-native-search-filter';

const url = 'http://192.168.55.108:8000';
const selfUrl = 'http://open-drone-map.herokuapp.com';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class TaskScheduleScreen extends Component {
    state = {
        filterData: [],
        data: [],
        data2: ['value1', 'value2', 'value3'],
        tasks: [],
        addVisible: false, // taskNameTmp: '',        // taskDescriptionTmp: '',        numberOfImage: 0,        projectId: '',        taskName: '',
        taskDescription: '',
        id: '',
        authODM: '',
        auth: '',
        editVisible: false,
        images: [],
        loading: false,
        imageUrl: 'file:////storage/emulated/0/Download/test.tif',
        chooseFolder: false,
        folderUri: '',
        isDisplaySpinner: false,
        searchText: '',
    };

    getListTaskApi = async token => {
        let auth = token;
        let getListTaskUrl =
            selfUrl + '/projects/' + this.state.projectId + '/tasks/';
        console.log(getListTaskUrl);
        let response = await fetch(getListTaskUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: auth,
            },
        });
        return response;
    };
    getListTask = async (token) => {
        await this.getListTaskApi(token).then(async res => {
            let responseJson = await res.json();
            console.log('Task list:');
            console.log(responseJson);
            await this.setState({
                filterData: responseJson,
                data: responseJson,
            });

        });
    };

    download = async id => {
        let downloadUrl =
            url +
            '/api/projects/' +
            this.state.projectId +
            '/tasks/' +
            id +
            '/download/orthophoto_tiles.zip';
        let dirs = RNFetchBlob.fs.dirs;
        let path = `${dirs.DownloadDir}/test.zip`;
        RNFetchBlob.config({
            // response data will be saved to this path if it has access right.
            path: path,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: path,
                description: 'Image',
            },
        })
            .fetch('GET', downloadUrl, {
                Authorization: this.state.authODM,
                //some headers ..
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
    };


    pickFolder = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            let uri = res.uri;
            for (let i = 0; i < uri.length - 2; i++) {
                if (uri[i] === '%' && uri[i + 1] === '2' && uri[i + 2] === 'F') {
                    uri = uri.slice(i);
                    break;
                }
            }
            uri = uri.replace(/%2F/gi, '/');
            for (let j = uri.length - 1; j >= 0; j--) {
                if (uri[j] === '/') {
                    uri = uri.slice(0, j + 1);
                    break;
                }
            }
            uri = 'file://' + uri + '{z}/{x}/{y}.png';
            this.setState({
                folderUri: uri,
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    };
    updateTileUri = async (id) => {
        console.log(id);
        await this.updateTileUriApi(id)
            .then(async res => {
                console.log(res);
                await Toast.show('Cập nhật đường dẫn thành công', Toast.SHORT);
                await this.setState({
                    chooseFolder: false,
                });
                await this.getListTask(this.state.auth);
            })
            .catch(e => {
                console.log(e);
            });
    };
    updateTileUriApi = async (id) => {
        let link = {
            link: this.state.folderUri,
        };
        console.log(this.state.auth);
        let editLinkUrl =
            selfUrl + '/projects/' + this.state.projectId + '/tasks/' + id + '/link';
        console.log('link:' + editLinkUrl);
        let response = await fetch(editLinkUrl, {
            method: 'PATCH',
            body: JSON.stringify(link),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: this.state.auth,
            },
        });
        return response;
    };

    search = async () => {
        const KEYS_TO_FILTERS = ['taskName'];
        const filteredEmails = await this.state.data.filter(createFilter(this.state.searchText, KEYS_TO_FILTERS));
        await console.log(filteredEmails);
        await this.setState({
            filterData: filteredEmails,
        });
    };
    getLinkApi = async () => {
        let getLinkUrl =
            selfUrl + '/projects/' + this.state.projectId + '/tasks/' + this.state.id ;
        console.log('link:' + getLinkUrl);
        let response = await fetch(getLinkUrl, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: this.state.auth,
            },
        });
        return response;
    };

    getLink = async () => {
        await this.getLinkApi().then(async (res) => {
            let response = await res.json();
            console.log(response);
            await this.setState({
                folderUri: response.link
            });

        });
    };

    async componentDidMount() {
        try {
            const {projectId} = await this.props.route.params;

            await this.setState({
                projectId: projectId,
            });
            const value = await AsyncStorage.getItem('tokenODM');
            const value2 = await AsyncStorage.getItem('token');

            await this.setState({
                authODM: 'JWT ' + value,
                auth: 'Bearer ' + value2,
            });
            await this.getListTask(this.state.auth);


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
                        placeholder="Type a message to search"/>


                    {/*Chọn đường dẫn*/}
                    <Dialog
                        visible={this.state.chooseFolder}
                        dialogTitle={<DialogTitle title="Chọn đường dẫn đến thư mục"/>}
                        onTouchOutside={() => {
                            this.setState({addVisible: false});
                        }}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="Cập nhật"
                                    onPress={async () => {
                                        await this.updateTileUri(this.state.id);

                                    }}
                                />
                                <DialogButton
                                    text="Hủy"
                                    onPress={() => {
                                        this.setState({
                                            chooseFolder: false,
                                        });
                                    }}
                                />
                            </DialogFooter>
                        }
                    >
                        <DialogContent>
                            <View style={styles.dialogContentView}>
                                <View style={{alignItems: 'center', flex: 1}}>
                                    <TextInput
                                        style={styles.taskNameInput}
                                        placeholder={'Đường dẫn'}
                                        value={this.state.folderUri}
                                        onChangeText={value => {
                                            this.setState({
                                                folderUri: value,
                                            });
                                            console.log(this.state.folderUri);
                                        }}
                                    />
                                </View>
                                <View style={styles.chooseImageView}>
                                    <TouchableOpacity
                                        style={styles.chooseImageTouchable}
                                        onPress={async () => {
                                            await this.pickFolder();
                                        }}>
                                        <Text style={{color: 'white', fontSize: 16}}>Chọn thư mục</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </DialogContent>
                    </Dialog>
                    <Spinner
                        visible={this.state.isDisplaySpinner}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />

                    <FlatList
                        data={this.state.filterData}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={async () => {
                                    await this.setState({
                                        id: item.taskId
                                    });
                                    // console.log(item.taskId)
                                    await this.getLink();
                                    if (this.state.folderUri === '' || this.state.folderUri === null||this.state.folderUri ===undefined) {
                                        await Toast.show('Vui lòng chọn đường dẫn tới thư mục tile trước khi xem bản đồ');
                                    } else {
                                        await this.props.navigation.navigate('MapSchedule', {
                                            link: this.state.folderUri,
                                            taskId: item.taskId,
                                            projectId: this.state.projectId,
                                        });
                                    }
                                }
                                }>
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
                                            {item.taskName}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flex: 3,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <TouchableOpacity
                                            style={{height: 37, width: 37, marginRight: 10}}
                                            onPress={async () => {
                                                await this.download(item.taskId);
                                            }}>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <DeleteIcon
                                                    style={{margin: 5}}
                                                    name="download"
                                                    size={28}
                                                    color="black"
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{height: 37, width: 37, margin: 5}}
                                            onPress={async () => {
                                                await this.setState({
                                                    id: item.taskId,
                                                    chooseFolder: true,
                                                });
                                                await this.getLink();

                                            }}>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <EditIcon
                                                    style={{margin: 5}}
                                                    name="link"
                                                    size={30}
                                                    color="black"
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.taskId}
                    />
                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    bottomButtonDialog: {
        flex: 1,
        backgroundColor: 'red',
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
    chooseImageTouchable: {
        height: 35,
        width: 120,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    dialogContentView: {
        height: 100,
        width: 350,
    },
    imageBackground: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    taskNameInput: {
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
    chooseImageView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    searchInput: {
        padding: 10,
        borderColor: '#CCC',
        backgroundColor: '#CCC',
        borderWidth: 1,
    },
});
