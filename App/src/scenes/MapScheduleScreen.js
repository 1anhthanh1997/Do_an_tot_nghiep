import React from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import MapView, {MAP_TYPES, Marker, Polyline, PROVIDER_DEFAULT, UrlTile} from 'react-native-maps';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from '../res/styles';

import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.002; // 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const selfUrl = 'http://open-drone-map.herokuapp.com';
const speed=4000
const mountOfcalo=546


export default class MapScheduleScreen extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            region: {
                latitude: (41.30297805032947 + 41.305323408114326) / 2,
                longitude: (-81.75436772316507 + -81.74998458946746) / 2,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [],
            currentMarker:{
                dateTime:{
                    date:'',
                    time:''
                }
            },
            isCreateMarker: false,
            markerType: 0,
            polylines: [],
            isCreateRoad: false,
            coordinateLine: [],
            isRenderSaveButton: false,
            link: '',
            taskId: '',
            projectId: '',
            auth: '',
            isShowFindingView: false,
            startingId:'',
            finishingId:'',
            startingPoint: '',
            finishingPoint: '',
            isDisplaySearchDropdown: false,
            placeholderSearch: '',
            length: 0,
            isDatePickerVisible:true,
            isTimePickerVisible: true,
            isShowScheduleView: false,
            schedule:[]
        };
    }

    get mapType() {
        // MapKit does not support 'none' as a base map
        return this.props.provider === PROVIDER_DEFAULT
            ? MAP_TYPES.STANDARD
            : MAP_TYPES.NONE;
    }

    makeId = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    renderSaveButton = () => {
        if (!this.state.isShowFindingView && !this.state.isShowScheduleView) {
                return (
                    <View style={styles.bottomButtonView}>
                        <View style={styles.rowBottomButtonView}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.TouchableOpacityStyle}

                                onPress={async () => {
                                    await this.setState({
                                        isShowFindingView: true,
                                    });
                                    // await this.test();
                                    // await this.findRoadSheet.open();
                                    // this.RBSheet2.open()

                                }}>

                                <Image
                                    //We are making FAB using TouchableOpacity with an image
                                    //We are using online image here
                                    source={require('../res/images/findingRoad.png')}
                                    //You can use you project image Example below
                                    //source={require('./images/float-add-icon.png')}
                                    style={styles.FloatingButtonStyle3}
                                />
                                <Text style={styles.textUnderImage}>
                                    Tìm đường
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.TouchableOpacityStyle}

                                onPress={async () => {
                                    // await this.createSchedule()
                                    await this.setState({
                                        isShowScheduleView: true,
                                    });
                                    for (let i = 0; i < this.state.schedule.length - 1; i++) {
                                        if (this.state.schedule[i].id !== '' && this.state.schedule[i + 1].id !== '') {
                                            await this.findSchedule(this.state.schedule[i].id, this.state.schedule[i + 1].id);
                                        }
                                    }

                                }}>

                                <Image
                                    //We are making FAB using TouchableOpacity with an image
                                    //We are using online image here
                                    source={require('../res/images/create_schedule.png')}
                                    //You can use you project image Example below
                                    //source={require('./images/float-add-icon.png')}
                                    style={styles.FloatingButtonStyle3}
                                />
                                <Text style={styles.textUnderImage}>
                                    Lịch trình
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );

        } else if (this.state.length !== 0) {
            let distance
            let distanceString
            if(this.state.length>1000){
                distance=Math.round(this.state.length * 100.0 / 1000) / 100
                distanceString=distance+' km'
            }else {
                distance=Math.round(this.state.length * 1.0 )
                distanceString=distance+' m'
            }
            let time=Math.round(this.state.length * 60 * 100.0/speed)/100
            let timeString
            let minutes
            if(time-~~time>=0.5)
                minutes=~~time+1
            else minutes=~~time
            console.log(minutes)

            if (minutes>=60){
                let minute=minutes%60
                let hour=(minutes-minute)/60
                timeString=hour+' giờ '+minute+' phút'
            }else{
                if(minutes===0) minutes=1
                timeString=minutes+' phút'
            }
            let amountOfCalories=mountOfcalo/60*time
            if(amountOfCalories-~~amountOfCalories>=0.5)
                amountOfCalories=~~amountOfCalories+1
            else amountOfCalories=~~amountOfCalories
            let caloriesString=amountOfCalories+' kcal'

            console.log(distance)
            return (
                <View style={styles.bottomButtonView2}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{marginLeft:10, fontSize:20,fontWeight:'bold'}}>Thông tin đoạn đường</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <Image
                            //We are making FAB using TouchableOpacity with an image
                            //We are using online image here
                            source={require('../res/images/distance.png')}
                            //You can use you project image Example below
                            //source={require('./images/float-add-icon.png')}
                            style={styles.FloatingButtonStyle4}
                        />
                        <Text style={{marginLeft:10, fontSize:16,fontWeight:'bold'}}>Khoảng cách:</Text>
                        <Text style={{marginLeft:10, fontSize:16,fontWeight:'bold'}}>{distanceString}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <Image
                            //We are making FAB using TouchableOpacity with an image
                            //We are using online image here
                            source={require('../res/images/clock.png')}
                            //You can use you project image Example below
                            //source={require('./images/float-add-icon.png')}
                            style={styles.FloatingButtonStyle4}
                        />
                        <Text  style={{marginLeft:10, fontSize:16,fontWeight:'bold'}}>Thời gian đi:</Text>
                        <Text  style={{marginLeft:10, fontSize:16,fontWeight:'bold'}}>{timeString}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <Image
                            //We are making FAB using TouchableOpacity with an image
                            //We are using online image here
                            source={require('../res/images/burn.png')}
                            //You can use you project image Example below
                            //source={require('./images/float-add-icon.png')}
                            style={styles.FloatingButtonStyle4}
                        />
                        <Text style={{marginLeft:10, fontSize:16,fontWeight:'bold'}}>Lượng calo tiêu thụ:</Text>
                        <Text style={{marginLeft:10, fontSize:16,fontWeight:'bold'}}>{caloriesString}</Text>
                    </View>
                </View>
            );

        }

    };

    getListTaskApi = async token => {
        let auth = token;
        let getListTaskUrl =
            selfUrl + '/projects/' + this.state.projectId + '/tasks/' + this.state.taskId;
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

    getDataOfTask = async () => {
        await this.getListTaskApi(this.state.auth).then(async (res) => {
            let response = await res.json();
            console.log(response);
            await this.setState({
                markers: response.markers,
                polylines: response.polylines,
                schedule:response.schedule
            });

        });
    };

    shortestDistanceNode = (distances, visited) => {
        let shortest = null;

        // for each node in the distances object
        for (let node in distances) {
            // if no node has been assigned to shortest yet
            // or if the current node's distance is smaller than the current shortest
            let currentIsShortest =
                shortest === null || distances[node] < distances[shortest];

            // and if the current node is in the unvisited set
            if (currentIsShortest && !visited.includes(node)) {
                // update shortest to be the current node
                shortest = node;
            }
        }
        return shortest;
    };
    findShortestPath = (graph, startNode, endNode) => {
        console.log(graph);
        let distances = {};
        distances[endNode] = 'Infinity';
        distances = Object.assign(distances, graph[startNode]);
// track paths using a hash object
        let parents = {endNode: null};
        for (let child in graph[startNode]) {
            parents[child] = startNode;
        }

        // collect visited nodes
        let visited = [];

// find the nearest node
        let node = this.shortestDistanceNode(distances, visited);

        // for that node:
        while (node) {
            // find its distance from the start node & its child nodes
            let distance = distances[node];
            let children = graph[node];

            // for each of those child nodes:
            for (let child in children) {

                // make sure each child node is not the start node
                if (String(child) === String(startNode)) {
                    continue;
                } else {
                    // save the distance from the start node to the child node
                    let newdistance = distance + children[child];
// if there's no recorded distance from the start node to the child node in the distances object
// or if the recorded distance is shorter than the previously stored distance from the start node to the child node
                    if (!distances[child] || distances[child] > newdistance) {
// save the distance to the object
                        distances[child] = newdistance;
// record the path
                        parents[child] = node;
                    }
                }
            }
            // move the current node to the visited set
            visited.push(node);
// move to the nearest neighbor node
            node = this.shortestDistanceNode(distances, visited);
        }

        // using the stored paths from start node to end node
        // record the shortest path
        let shortestPath = [endNode];
        let parent = parents[endNode];
        while (parent) {
            shortestPath.push(parent);
            parent = parents[parent];
        }
        shortestPath.reverse();

        //this is the shortest path
        let results = {
            distance: distances[endNode],
            path: shortestPath,
        };
        // return the shortest path & the end node's distance from the start node
        return results;
    };
    initData = async (real) => {
        let graph = {};
        // console.log(this.state.markers)
        await this.state.markers.map((marker) => {
            graph[marker.markerId] = {};
        });
        // console.log(this.state.polylines)
        await this.state.polylines.map((line) => {
            if(real===0){
                graph[line.coordinates[0].markerId][line.coordinates[1].markerId] = line.length*line.weight;
                graph[line.coordinates[1].markerId][line.coordinates[0].markerId] = line.length*line.weight;
            }else{
                graph[line.coordinates[0].markerId][line.coordinates[1].markerId] = line.length;
                graph[line.coordinates[1].markerId][line.coordinates[0].markerId] = line.length;
            }

        });
        return graph;

    };
    findRoad = async () => {

    };
    test = async (startingId,finishingId) => {
        await this.getDataOfTask()
        console.log('Hello');
        let graph = await this.initData(0);
        await console.log(graph);
        // let graph = {
        //     start: { A: 5, B: 2 },
        //     A: { start: 1, C: 4, D: 2 },
        //     B: { A: 8, D: 7 },
        //     C: { D: 6, finish: 3 },
        //     D: { finish: 1 },
        //     finish: {},
        // };
        let result = await this.findShortestPath(graph, startingId, finishingId);
        console.log(result.distance)
        if(result.distance!=="Infinity"){
            this.setState({
                length:result.distance
            })
            await console.log('result:');
            await console.log(result);
            let roadResult = [];
            let polylines = this.state.polylines;
            for (let i = 0; i < result.path.length - 1; i++) {
                let startPoint = result.path[i];
                let finishPoint = result.path[i + 1];
                for (let j = 0; j < polylines.length; j++) {
                    if ((polylines[j].coordinates[0].markerId === startPoint &&
                        polylines[j].coordinates[1].markerId === finishPoint) ||
                        (polylines[j].coordinates[1].markerId === startPoint &&
                            polylines[j].coordinates[0].markerId === finishPoint)) {
                        if(polylines[j].dangerous===true){
                            polylines[j].strokeColor = 'red';
                        }else{
                            console.log(this.state.polylines[j].strokeColor);
                            polylines[j].strokeColor = '#0b86da';
                        }


                        roadResult.unshift(this.state.polylines[j].roadId);
                    }
                }
            }
            await this.setState({
                polylines: polylines,
            });
            // await console.log(this.state.polylines);
            // await console.log(roadResult)
        }else{
            Toast.show("Không thể tìm được đường đi",Toast.SHORT)
        }

    };
    showFindingView = () => {
        let items = [];
        this.state.markers.map((marker) => {
            items.unshift({
                id: marker.markerId,
                name: marker.title,
            });
        });

        if (this.state.isShowFindingView) {
            if (!this.state.isDisplaySearchDropdown) {
                return (
                    <View style={styles.testView}>
                        <View style={styles.detailInfoView}>
                            <View
                                style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity style={{
                                    height: 40, width: 40, justifyContent: 'center', alignItems: 'center'
                                    , marginRight: 5,
                                }}
                                                  onPress={async () => {
                                                      await this.setState({
                                                          isShowFindingView: false,
                                                          length:0,
                                                          startingId:'',
                                                          startingPoint:'',
                                                          finishingId:'',
                                                          finishingPoint:''
                                                      });
                                                      await this.getDataOfTask()
                                                  }}>
                                    <Image style={{height: 20, width: 20}} source={require('../res/images/back.png')}/>
                                </TouchableOpacity>
                                <Image style={{height: 15, width: 15}}
                                       source={require('../res/images/startingPoint.png')}/>
                                <TextInput
                                    style={styles.input1}
                                    onTouchStart={() => this.setState({
                                        isDisplaySearchDropdown: true,
                                        placeholderSearch: 'Chọn điểm khởi hành',
                                    })}
                                    placeholder={'Chọn địa điểm bắt đầu'}
                                    value={this.state.startingPoint}
                                    onChangeText={(startingPoint) => {
                                        this.setState({
                                            startingPoint: startingPoint,
                                        });
                                        // console.log(this.state.currentMarker);
                                    }

                                    }
                                />
                                <View style={{height: 40, width: 40}}>

                                </View>
                            </View>
                            <View
                                style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{
                                    height: 40,
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 5,
                                }}>
                                </View>
                                <Image style={{height: 20, width: 20}}
                                       source={require('../res/images/normalMarker_96x96.png')}/>
                                <TextInput
                                    style={styles.input3}
                                    onTouchStart={() => this.setState({
                                        isDisplaySearchDropdown: true,
                                        placeholderSearch: 'Chọn điểm đến',
                                    })}
                                    placeholder={'Chọn điểm đến'}
                                    value={this.state.finishingPoint}
                                    onChangeText={(finishingPoint) => {
                                        this.setState({
                                            finishingPoint: finishingPoint,
                                        });
                                    }
                                    }
                                />
                                <TouchableOpacity
                                    style={{height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}}
                                    onPress={async () => {
                                        let tmp = await this.state.startingPoint;
                                        await this.setState({
                                            startingPoint: this.state.finishingPoint,
                                            finishingPoint: tmp,
                                        });
                                    }}>
                                    <Image style={{height: 20, width: 20}}
                                           source={require('../res/images/exchange.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                );
            } else {
                return (
                    <View style={styles.testView2}>
                        <TouchableOpacity style={{
                            height: 40, width: 40, justifyContent: 'center', alignItems: 'center'
                            , marginLeft: 5,marginTop:10,marginBottom:10
                        }}
                                          onPress={async () => {
                                              await this.setState({
                                                  isDisplaySearchDropdown:false
                                              });
                                              await this.getDataOfTask()
                                          }}>
                            <Image style={{height: 20, width: 20}} source={require('../res/images/back.png')}/>
                        </TouchableOpacity>
                        <SearchableDropdown
                            onItemSelect={(item) => {
                                if (this.state.placeholderSearch === 'Chọn điểm khởi hành') {
                                    if(item.id===this.state.finishingId){
                                        this.setState({
                                            isDisplaySearchDropdown: false,
                                            startingPoint: item.name,
                                            startingId:item.id,
                                            finishingPoint: '',
                                            finishingId:''
                                        })
                                    }else{
                                        this.setState({
                                            isDisplaySearchDropdown: false,
                                            startingPoint: item.name,
                                            startingId:item.id
                                        });
                                    }

                                } else {
                                    if(item.id===this.state.startingId){
                                        this.setState({
                                            isDisplaySearchDropdown: false,
                                            startingPoint:'' ,
                                            startingId:'',
                                            finishingPoint:item.name,
                                            finishingId:item.id
                                        })
                                    }else{
                                        this.setState({
                                            isDisplaySearchDropdown: false,
                                            finishingPoint: item.name,
                                            finishingId:item.id
                                        });
                                    }

                                }
                                if (this.state.startingPoint !== '' && this.state.finishingPoint !== '') {
                                    this.test(this.state.startingId,this.state.finishingId);
                                }

                                // console.log(item)
                                // const items = this.state.selectedItems;
                                // items.push(item)
                                // this.setState({ selectedItems: items });
                            }}
                            containerStyle={{padding: 5}}
                            // onRemoveItem={(item, index) => {
                            //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                            //   this.setState({ selectedItems: items });
                            // }}
                            itemStyle={{
                                height: 40,
                                width: width-70,
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#ddd',
                                borderColor: '#bbb',
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                            itemTextStyle={{color: '#222'}}
                            itemsContainerStyle={{maxHeight: 140}}
                            items={items}
                            // defaultIndex={2}
                            resetValue={false}
                            textInputProps={
                                {
                                    placeholder: this.state.placeholderSearch,
                                    underlineColorAndroid: 'transparent',
                                    style: {
                                        height: 40,
                                        width: width - 70,
                                        padding: 12,
                                        margin: 5,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                    },
                                    // onTextChange: te
                                }
                            }
                            listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                            }
                        />
                    </View>
                );
            }
        }
    };
    findSchedule = async (startingId, finishingId) => {
        console.log(startingId+" "+finishingId)
        let graph = await this.initData(0);
        // await console.log(graph);
        // let graph = {
        //     start: { A: 5, B: 2 },
        //     A: { start: 1, C: 4, D: 2 },
        //     B: { A: 8, D: 7 },
        //     C: { D: 6, finish: 3 },
        //     D: { finish: 1 },
        //     finish: {},
        // };
        let result = await this.findShortestPath(graph, startingId, finishingId);
        // console.log(result.distance)
        if (result.distance !== 'Infinity') {
            this.setState({
                length: this.state.length+result.distance,
            });
            // await console.log('result:');
            // await console.log(result);
            let roadResult = [];
            let polylines = this.state.polylines;
            for (let i = 0; i < result.path.length - 1; i++) {
                let startPoint = result.path[i];
                let finishPoint = result.path[i + 1];
                for (let j = 0; j < polylines.length; j++) {
                    if ((polylines[j].coordinates[0].markerId === startPoint &&
                        polylines[j].coordinates[1].markerId === finishPoint) ||
                        (polylines[j].coordinates[1].markerId === startPoint &&
                            polylines[j].coordinates[0].markerId === finishPoint)) {
                        if (polylines[j].dangerous === true) {
                            polylines[j].strokeColor = 'red';
                        } else {
                            // console.log(this.state.polylines[j].strokeColor);
                            polylines[j].strokeColor = '#0b86da';
                        }


                        roadResult.unshift(this.state.polylines[j].roadId);
                    }
                }
            }
            await this.setState({
                polylines: polylines,
            });
            // await console.log(this.state.polylines);
            // await console.log(roadResult)
        } else {
            Toast.show('Không thể tìm được đường đi', Toast.SHORT);
        }
    };
    showScheduleView = () => {
        if (this.state.isShowScheduleView) {
            return (
                <View style={styles.scheduleView}>
                    <View style={{height: 200, width: 50}}>
                        <TouchableOpacity style={{
                            height: 40, width: 40, justifyContent: 'center', alignItems: 'center'
                            , marginLeft: 5, marginTop: 10, marginBottom: 10,
                        }}
                                          onPress={async () => {
                                              await this.setState({
                                                  isShowScheduleView: false,
                                                  length:0,
                                              });
                                              await this.getDataOfTask();
                                          }}>
                            <Image style={{height: 20, width: 20}} source={require('../res/images/back.png')}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.scrollScheduleView}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <FlatList
                                data={this.state.schedule}
                                renderItem={({item, index}) => (
                                    <View style={styles.itemView}>
                                        <TextInput
                                            style={styles.scheduleInput}
                                            placeholder={'Chọn địa điểm'}
                                            value={item.name}

                                        />

                                    </View>
                                )
                                }
                                keyExtractor={item => item.id}
                            />
                        </View>
                        {/*<View style={{height: 40, width: width - 50, flexDirection: 'row', alignItems: 'center'}}>*/}


                        {/*</View>*/}
                    </ScrollView>
                </View>
            );
        }
    };
    async componentDidMount() {
        const {link} = await this.props.route.params;
        const {taskId} = await this.props.route.params;
        const {projectId} = await this.props.route.params;


        await this.setState({
            link: link,
            taskId: taskId,
            projectId: projectId,
        });

        const value2 = await AsyncStorage.getItem('token');

        await this.setState({
            auth: 'Bearer ' + value2,
        });
        await this.getDataOfTask();
        // await this.test();
        // await this.state.markers.map(async (marker)=>{
        //     await marker.markerId.showCallout()
        // })
        // const link2 = await AsyncStorage.getItem(this.state.taskId);
        // await console.log(link2)
    }

    render() {
        const {region} = this.state;
        return (
            <View style={styles.container}>

                <MapView
                    mapType={Platform.OS === 'android' ? 'none' : 'standard'}
                    style={styles.map}
                    initialRegion={region}

                    maxZoomLevel={25}
                    // minZoomLevel={18}

                >

                    <UrlTile
                        urlTemplate={'file:///storage/emulated/0/Download/Tile/test/{z}/{x}/{y}.png'}
                        maximumZ={21}
                        flipY={true}
                        zIndex={-3}
                    />
                    {this.state.polylines.map((line) => {
                        let coordinates = [
                            {
                                latitude: line.coordinates[0].latitude,
                                longitude: line.coordinates[0].longitude,
                            },
                            {
                                latitude: line.coordinates[1].latitude,
                                longitude: line.coordinates[1].longitude,
                            },
                        ];

                        return (
                            <Polyline
                                coordinates={coordinates}
                                strokeColor={line.strokeColor}
                                strokeWidth={5}
                                tappable={true}
                                onPress={async (e) => {
                                    if(!this.state.isCreateRoad){
                                        Alert.alert(

                                            'Cảnh báo',
                                            'Bạn có chắc chắn muốn xóa đường đi?',
                                            [
                                                {
                                                    text: 'OK', onPress: async () => {

                                                        await this.deleteRoad(line.roadId);
                                                    },
                                                },
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel',
                                                },

                                            ],
                                            {cancelable: false},
                                        );
                                    }


                                }}
                            />
                        );
                    })}
                    {this.state.markers.map((marker) => {
                        // console.log(marker.markerType);
                        // let link='../res/images/normalMarker.png'
                        //
                        // let imageLink = ['../res/images/normalMarker.png', '../res/images/takingPhotoLocation.png', '../res/images/helpMarker.png', '../res/images/warningMarker.png'];
                        // let link2=imageLink[0]
                        // console.log(link)
                        switch (marker.markerType) {
                            case 0: {
                                return (
                                    <Marker
                                        identifier={marker.markerId}
                                        coordinate={marker.coordinate}
                                        // image={require("../res/images/normalMarker_96x96.png")}
                                        title={marker.title}
                                        description={marker.description}
                                        onPress={async (e) => {

                                            await this.setState({
                                                currentMarker: marker,
                                            });
                                            // await console.log(marker.markerId);
                                            // await console.log(this.state.currentMarker);
                                            // console.log(marker);
                                            // console.log('Create road:' + this.state.isCreateRoad);
                                            if (this.state.isCreateRoad) {
                                                this.handleCreateRoad(marker.markerId, marker.coordinate.latitude, marker.coordinate.longitude);
                                            } else {
                                                this.RBSheet2.open();
                                            }

                                        }}>
                                        {/*<Text>{marker.title}</Text>*/}
                                        <View style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{fontWeight: 'bold'}}>{marker.title}</Text>
                                            <Image style={{height: 40, width: 40}}
                                                   source={require('../res/images/normalMarker_96x96.png')}/>

                                        </View>

                                    </Marker>

                                );
                                break;
                            }
                            case 1: {
                                return (
                                    <Marker
                                        identifier={marker.markerId}
                                        coordinate={marker.coordinate}
                                        // image={require("../res/images/takingPhotoLocation.png")}
                                        title={marker.title}
                                        description={marker.description}
                                        onPress={async (e) => {
                                            await this.setState({
                                                currentMarker: marker,
                                            });
                                            // await console.log(marker.markerId);
                                            // await console.log(this.state.currentMarker);
                                            // console.log(marker);
                                            // console.log('Create road:' + this.state.isCreateRoad);
                                            if (this.state.isCreateRoad) {
                                                this.handleCreateRoad(marker.markerId, marker.coordinate.latitude, marker.coordinate.longitude);
                                            } else {
                                                this.RBSheet2.open();
                                            }

                                        }}>
                                        <View style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{fontWeight: 'bold'}}>{marker.title}</Text>
                                            <Image style={{height: 40, width: 40}}
                                                   source={require('../res/images/takingPhotoLocation.png')}/>

                                        </View>
                                    </Marker>
                                );
                                break;
                            }
                            case 2: {
                                return (
                                    <Marker
                                        identifier={marker.markerId}
                                        coordinate={marker.coordinate}
                                        // image={require("../res/images/helpMarker_96x96.png")}
                                        title={marker.title}
                                        description={marker.description}
                                        onPress={async (e) => {
                                            await this.setState({
                                                currentMarker: marker,
                                            });
                                            // await console.log(marker.markerId);
                                            // await console.log(this.state.currentMarker);
                                            // console.log(marker);
                                            // console.log('Create road:' + this.state.isCreateRoad);
                                            if (this.state.isCreateRoad) {
                                                this.handleCreateRoad(marker.markerId, marker.coordinate.latitude, marker.coordinate.longitude);
                                            } else {
                                                this.RBSheet2.open();
                                            }

                                        }}>
                                        <View style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{fontWeight: 'bold'}}>{marker.title}</Text>
                                            <Image style={{height: 40, width: 40}}
                                                   source={require('../res/images/helpMarker_96x96.png')}/>

                                        </View>
                                    </Marker>

                                );
                                break;
                            }
                            case 3: {
                                return (
                                    <Marker
                                        identifier={marker.markerId}
                                        coordinate={marker.coordinate}
                                        // image={require("../res/images/warningMaker_96x96.png")}
                                        title={marker.title}
                                        description={marker.description}
                                        onPress={async (e) => {
                                            await this.setState({
                                                currentMarker: marker,
                                            });
                                            // await console.log(marker.markerId);
                                            // await console.log(this.state.currentMarker);
                                            // console.log(marker);
                                            // console.log('Create road:' + this.state.isCreateRoad);
                                            if (this.state.isCreateRoad) {
                                                this.handleCreateRoad(marker.markerId, marker.coordinate.latitude, marker.coordinate.longitude);
                                            } else {
                                                this.RBSheet2.open();
                                            }

                                        }}>
                                        <View style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{fontWeight: 'bold'}}>{marker.title}</Text>
                                            <Image style={{height: 40, width: 40}}
                                                   source={require('../res/images/warningMaker_96x96.png')}/>

                                        </View>
                                    </Marker>
                                );
                                break;
                            }
                            default:
                                break;
                        }
                        marker.markerId.showCallout();
                    })}

                </MapView>


                {this.showFindingView()}
                {this.renderSaveButton()}
                {this.showScheduleView()}

                <RBSheet
                    ref={ref => {
                        this.RBSheet2 = ref;
                    }}
                    height={450}
                    closeOnDragDown={true}
                    openDuration={250}
                    customStyles={{
                        container: {
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    }}
                >
                    <ScrollView style={{flex: 1}}>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>Thông tin địa điểm</Text>
                        </View>
                        <View style={styles.detailInfoView}>

                            <View style={styles.dateTimeView}>
                                <Text style={{marginLeft: 15, fontSize: 15, marginRight: 2}}>Tên địa điểm:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'Tên địa điểm'}
                                    value={this.state.currentMarker.title}
                                    onChangeText={(title) => {
                                        this.setState({
                                            currentMarker: {
                                                dateTime: this.state.currentMarker.dateTime,
                                                coordinate: this.state.currentMarker.coordinate,
                                                title: title,
                                                description: this.state.currentMarker.description,
                                                markerId: this.state.currentMarker.markerId,
                                                markerType: this.state.currentMarker.markerType,
                                            },
                                        });
                                        // console.log(this.state.currentMarker);
                                    }

                                    }
                                />
                            </View>
                            <View style={styles.dateTimeView}>
                                <Text style={{marginLeft: 15, fontSize: 15, marginRight: 50}}>Mô tả:</Text>
                                <TextInput
                                    style={styles.input2}
                                    placeholder={'Mô tả'}
                                    value={this.state.currentMarker.description}
                                    onChangeText={(description) => {
                                        this.setState({
                                            currentMarker: {
                                                dateTime: this.state.currentMarker.dateTime,
                                                coordinate: this.state.currentMarker.coordinate,
                                                title: this.state.currentMarker.title,
                                                description: description,
                                                markerId: this.state.currentMarker.markerId,
                                                markerType: this.state.currentMarker.markerType,
                                            },
                                        });
                                        // console.log(this.state.currentMarker);
                                    }
                                    }
                                />
                            </View>
                            <View style={styles.dateTimeView}>
                                <Text style={{marginLeft: 15, fontSize: 15}}>Thời gian đến:</Text>
                                <TextInput
                                    style={styles.input2}
                                    placeholder={'Thời gian đến'}
                                    value={this.state.currentMarker.dateTime.time}
                                    onTouchStart={() => this.setState({
                                        isTimePickerVisible: true,
                                    })}
                                />
                            </View>
                            <View style={styles.dateTimeView}>
                                <Text style={{marginLeft: 15, fontSize: 15, marginRight: 30}}>Ngày đến:</Text>
                                <TextInput
                                    style={styles.input2}
                                    placeholder={'Ngày đến'}
                                    value={this.state.currentMarker.dateTime.date}
                                    onTouchStart={() => this.setState({
                                        isDatePickerVisible: true,
                                    })}
                                />
                            </View>
                        </View>

                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style={styles.formalAcceptButton}
                                onPress={() => {
                                    this.updateMarkerData();
                                }}

                            >
                                <Text style={styles.textButton}>Cập nhật</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.formalCancelButton}
                                onPress={async () => {
                                    await this.deleteMarker();
                                    await this.RBSheet2.close();
                                }}
                            >
                                <Text style={styles.textButton}>Xóa đánh dấu</Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </RBSheet>

            </View>
        );
    }
}


// const styles = StyleSheet.create({
//
// });
