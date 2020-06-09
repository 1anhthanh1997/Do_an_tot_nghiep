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
const selfUrl = 'http://192.168.55.108:3000';
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
        let getListProjectUrl = selfUrl + '/projects';
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
    createProjectODMAPI = async data => {
        console.log(data);
        console.log(this.state.authODM);
        let createProjectUrl = url + '/api/projects/';
        let response = await fetch('http://192.168.55.108:8000/api/projects/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: this.state.authODM,
            },
            body: JSON.stringify(data),
        });
        return response;
    };
    createProjectAPI = async data => {
        console.log(data);
        let createProjectUrl = selfUrl + '/projects';
        console.log(createProjectUrl);
        let response = await fetch(createProjectUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.state.auth,
            },
            body: JSON.stringify(data),
        });
        return response;
    };
    createProject = async () => {
        let projectData = {
            name: this.state.projectName,
            description: this.state.projectDescription,
        };
        await this.createProjectODMAPI(projectData)
            .then(async res => {
                try {
                    let response = await res.json();
                    console.log(response);
                    let data = {
                        projectId: response.id,
                        projectName: response.name,
                        description: response.description,
                    };
                    // await console.log(data);
                    let projectRes = await this.createProjectAPI(data);
                    await console.log('exam');
                    await console.log(projectRes);
                    await this.getListProject(this.state.auth);
                    await this.props.navigation.navigate('BottomTab', {screen: 'Project'});
                } catch (e) {
                    console.log(e);
                }

            })
            .catch(async err => {
                await this.props.navigation.navigate('BottomTab', {screen: 'Project'});
                console.log(err);
            });
    };

    // getDetailsProject = () => {
    //     this.props.navigation.navigate('Task');
    // };
    editProjectODMAPI = async id => {
        let projectData = {
            name: this.state.projectName,
            description: this.state.projectDescription,
        };
        let editProjectUrl = url + '/api/projects/' + id + '/';
        let response = await fetch(editProjectUrl, {
            method: 'PATCH',
            body: JSON.stringify(projectData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: this.state.authODM,
            },
        });
        return response;
    };
    editProjectAPI = async id => {
        let projectData = {
            projectName: this.state.projectName,
            description: this.state.projectDescription,
        };
        let editProjectUrl = selfUrl + '/projects/' + id;
        let response = await fetch(editProjectUrl, {
            method: 'PATCH',
            body: JSON.stringify(projectData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: this.state.auth,
            },
        });
        return response;
    };
    editProject = async id => {
        await this.editProjectODMAPI(id)
            .then(async res => {
                await this.editProjectAPI(id);
                Alert.alert(
                    'Thông báo',
                    'Chỉnh sửa thông tin thành công!',
                    [
                        {
                            text: 'OK',
                            onPress: async () => {
                                await this.getListProject(this.state.auth);
                                await this.props.navigation.navigate('BottomTab', {
                                    screen: 'Project',
                                });
                            },
                        },
                    ],
                    {cancelable: false},
                );
            })
            .catch(e => {
                console.log(e);
            });
    };
    deleteProjectODMAPI = async id => {
        let deleteProjectUrl = url + '/api/projects/' + id + '/';
        console.log(deleteProjectUrl);
        let response = await fetch(deleteProjectUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: this.state.authODM,
            },
        });
        return response;
    };
    deleteProjectAPI = async id => {
        let deleteProjectUrl = selfUrl + '/projects/' + id;
        console.log(deleteProjectUrl);
        let response = await fetch(deleteProjectUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: this.state.auth,
            },
        });
        return response;
    };
    deleteProject = async id => {
        await this.deleteProjectODMAPI(id)
            .then(async res => {
                await this.getListProject(this.state.auth);
            })
            .catch(e => {
                console.log(e);
            });
        let deleteProject = await this.deleteProjectAPI(id);
        console.log(deleteProject);
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
                    {/*<SearchBar*/}
                    {/*    lightTheme*/}
                    {/*    placeholder="Search..."*/}
                    {/*    onChangeText={async (value)=>{*/}
                    {/*        await this.setState({*/}
                    {/*            searchText:value*/}
                    {/*        })*/}
                    {/*        await this.search();*/}
                    {/*    }}*/}
                    {/*    value={this.state.searchText}*/}
                    {/*/>*/}
                    <View style={{flexDirection: 'row', height: 50}}>
                        <View style={{flex: 2}}/>
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{justifyContent: 'center'}}
                                onPress={() =>
                                    this.setState({
                                        addVisible: true,
                                    })
                                }>
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                    }}>
                                    <AddIcon
                                        name="md-add-circle-outline"
                                        size={30}
                                        color="black"
                                    />
                                    <Text style={{fontSize: 15, margin: 5}}>Tạo project</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Dialog
                        visible={this.state.addVisible}
                        dialogTitle={<DialogTitle title="Tạo project"/>}
                        onTouchOutside={() => {
                            this.setState({addVisible: false});
                        }}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="Xác nhận"
                                    onPress={async () => {
                                        await this.createProject();
                                        await this.setState({
                                            addVisible: false,
                                        });
                                    }}
                                />
                                <DialogButton
                                    text="Hủy"
                                    onPress={() => {
                                        this.setState({
                                            addVisible: false,
                                        });
                                    }}
                                />
                            </DialogFooter>
                        }>
                        <DialogContent>
                            <View style={styles.dialogContentView}>
                                <TextInput
                                    style={styles.projectNameInput}
                                    placeholder={'Tên project'}
                                    onChangeText={value =>
                                        this.setState({
                                            projectName: value,
                                        })
                                    }
                                />
                                <TextInput
                                    style={styles.descriptionInput}
                                    placeholder={'Mô tả'}
                                    multiline={true}
                                    onChangeText={value =>
                                        this.setState({
                                            projectDescription: value,
                                        })
                                    }
                                />
                            </View>
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        visible={this.state.editVisible}
                        dialogTitle={<DialogTitle title="Chỉnh sửa project"/>}
                        onTouchOutside={() => {
                            this.setState({editVisible: false});
                        }}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="Xác nhận"
                                    onPress={async () => {
                                        await this.editProject(this.state.id);
                                        await this.setState({
                                            editVisible: false,
                                        });
                                    }}
                                />
                                <DialogButton
                                    text="Hủy"
                                    onPress={() => {
                                        this.setState({
                                            editVisible: false,
                                        });
                                    }}
                                />
                            </DialogFooter>
                        }>
                        <DialogContent>
                            <View style={styles.dialogContentView}>
                                <TextInput
                                    style={styles.projectNameInput}
                                    placeholder={'Tên project'}
                                    defaultValue={this.state.projectName}
                                    onChangeText={value =>
                                        this.setState({
                                            projectName: value,
                                        })
                                    }
                                />
                                <TextInput
                                    style={styles.descriptionInput}
                                    placeholder={'Mô tả'}
                                    multiline={true}
                                    defaultValue={this.state.projectDescription}
                                    onChangeText={value =>
                                        this.setState({
                                            projectDescription: value,
                                        })
                                    }
                                />
                            </View>
                        </DialogContent>
                    </Dialog>
                    <FlatList
                        data={this.state.filterData}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => {
                                    console.log(item.projectId);
                                    this.props.navigation.navigate('Task', {
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
                                        <TouchableOpacity
                                            style={{height: 35, width: 35}}
                                            onPress={() => {
                                                this.setState({
                                                    // projectNameTmp:item.name,
                                                    // projectDescriptionTmp:item.description,
                                                    id: item.projectId,
                                                    projectName: item.projectName,
                                                    projectDescription: item.description,
                                                    editVisible: true,
                                                });
                                            }}>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <EditIcon
                                                    style={{margin: 5}}
                                                    name="edit"
                                                    size={32}
                                                    color="black"
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{height: 37, width: 37}}
                                            onPress={async () => {
                                                Alert.alert(
                                                    'Cảnh báo',
                                                    'Bạn có chắc chắn muốn xóa project?',
                                                    [
                                                        {
                                                            text: 'Xác nhận',
                                                            onPress: async () => {
                                                                await this.deleteProject(item.projectId);
                                                            },
                                                        },
                                                        {
                                                            text: 'Hủy',
                                                            onPress: async () => {
                                                                this.props.navigation.navigate('Project');
                                                            },
                                                        },
                                                    ],
                                                    {cancelable: false},
                                                );

                                            }}>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <DeleteIcon
                                                    style={{margin: 5}}
                                                    name="delete"
                                                    size={30}
                                                    color="black"
                                                />
                                            </View>
                                        </TouchableOpacity>
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
