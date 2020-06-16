import {StyleSheet,Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const styles=({


    firstView: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    secondView: {
        flex: 8,
        alignItems: 'center',
    },
    inputRegister: {
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
    touchableRegister: {
        height: 45,
        width: 300,
        marginTop: 30,
    },
    touchableLogInViewRegister: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b86da',
        borderRadius: 25,
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
    screenView: {
        flex: 1,
    },
    imageBackground: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    additionView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 100,
        width: 100,
    },
    signInText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    partitionFirstView: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20,
    },
    touchable: {
        height: 50,
        width: 300,
        marginTop: 15,
    },
    touchableLogInView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#da4842',
        borderRadius: 25,
    },
    touchableLogInText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    inputLogin: {
        height: 50,
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        // borderWidth:2,
        // borderColor:'#afb4b3',
        color: 'gray',
        fontSize: 15,
        borderRadius: 25,
        margin: 15,
        paddingLeft: 20,
    },
    partitionSecondView: {
        flex: 3,
        alignItems: 'center',
    },
    partitionThirdView: {
        flex: 3,
        flexDirection: 'row',
    },
    secondOption: {
        flex: 1,
        alignItems: 'center',
    },
    secondOptionText: {
        fontSize: 15,
        color: 'gray',
        marginTop: 10,
        fontWeight: 'bold',
    },
    itemView: {
        height: 60,
        width: width,
        flexDirection: 'row',
        marginLeft: 10,
        alignItems: 'center',
    },
    rowBottomButtonView: {
        height: 80,
        width: width,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor:'red'
    },
    dateTimeView: {
        height: 78,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
    },
    testView: {
        height: 130,
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
    },
    scheduleView: {
        height: 200,
        width: width,
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
    },
    scrollScheduleView: {
        height: 200,
        width: width - 50,

    },
    testView2: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 200,
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
    },
    textUnderImage: {
        fontSize: 10,
    },
    textButton: {
        fontSize: 15,
        color: 'white',
    },
    formalCancelButton: {
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        margin: 15,
        borderRadius: 10,
    },
    formalAcceptButton: {
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        margin: 15,
        borderRadius: 10,
    },
    buttonView: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    titleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailInfoView: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    RBSheetView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,

    },
    RBSheetViewName: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    bottomButtonView: {
        height: 150,
        width: width,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    bottomButtonView2: {
        height: 150,
        width: width,
        backgroundColor: 'white',


    },
    TouchableOpacityStyle: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'white',
        marginBottom: 15,
        marginTop: 10,
        marginRight: 20,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        //backgroundColor:'black'
    },
    FloatingButtonStyle2: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        //backgroundColor:'black'
    },
    FloatingButtonStyle3: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        //backgroundColor:'black'
    },
    FloatingButtonStyle4: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        marginLeft: 15,
        //backgroundColor:'black'
    },
    bottomView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    addMarkerButton: {
        height: 50,
        width: 50,
        borderRadius: 30,

        justifyContent: 'center',
        alignItems: 'center',
        margin: 24,
    },
    markerImage: {
        height: 35,
        width: 35,
    },
    markerImage2: {
        height: 45,
        width: 45,
    },
    input: {
        height: 50,
        width: 250,
        borderWidth: 1,
        borderColor: '#afb4b3',
        color: 'black',
        fontSize: 15,
        borderRadius: 25,
        margin: 15,
        paddingLeft: 20,
    },
    input1: {
        height: 40,
        width: 250,
        borderWidth: 1,
        borderColor: '#afb4b3',
        color: 'black',
        fontSize: 15,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 20,
    },
    input2: {
        height: 50,
        width: 250,
        borderWidth: 1,
        borderColor: '#afb4b3',
        color: 'black',
        fontSize: 15,
        borderRadius: 25,
        margin: 15,
        paddingLeft: 20,
    },
    input3: {
        height: 40,
        width: 250,
        borderWidth: 1,
        borderColor: '#afb4b3',
        color: 'black',
        fontSize: 15,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 20,
    },
    scheduleInput: {
        height: 40,
        width: 250,
        borderWidth: 1,
        borderColor: '#afb4b3',
        color: 'black',
        fontSize: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        paddingLeft: 20,
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
})
export default styles

