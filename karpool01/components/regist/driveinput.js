import React, { Component } from "react";
import { Input } from 'react-native-elements';
import {  View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, Platform, AsyncStorage, StatusBar   } from 'react-native';
//import uuidv1 from "react-native-uuid";
import uuidv1 from "uuid/v1";

const {height, width } = Dimensions.get("window");

export default class Driveinput extends Component {

  constructor(props){
    super(props);
    this.state = {
      loadedDriveInfo : false,
      waypoint : '',
      destination : '',
      waypointTime : '',
      term : '',
      personnel : '',
      status : '',
      drivername: '',
      custno : '',
      phone : '',
      driveInfos : {}
    }
    this._handleChange = this._handleChange.bind(this);
    this._addSetDriveInfo = this._addSetDriveInfo.bind(this);
    this._addDriveInfo = this._addDriveInfo.bind(this);
  }

  // _controllDriveInfo = (text) => {
  //   this.setState({
  //     waypoint: text
  //   });
  // };

  // handleChange(event) {
  //     const {name, type, value} = event.nativeEvent;
  //     console.log("name : "+name+", type : "+ type+", value : "+value);
  //     let processedData = value;
  //     if(type ==='text') {
  //         processedData = value.toUpperCase();
  //     } else if (type ==='number') {
  //         processedData = value * 2;
  //     }
  //     this.setState({[name]: processedData})
  // }

  _handleChange(name, value) {
      //console.log("name : "+name+", value : "+value);
      this.setState({[name]: value})
  }

  _addSetDriveInfo = () => {
    console.log("_addDriveInfo");
    const { waypoint, destination, waypointTime, term, personnel, status, drivername, custno, phone  } = this.state;
    if(waypoint !== "" &&
    destination !== "" &&
    waypointTime !== "" &&
    term !== "" &&
    personnel !== "" &&
    status !== "" &&
    drivername !== "" &&
    custno !== "" &&
    phone !== "" ){
      this.setState({
        waypoint: "",
        destination: "",
        waypointTime : "",
        term : "",
        personnel : "",
        status : "",
        drivername : "",
        custno : "",
        phone : ""
      });
      this.setState(prevState => {
        const ID = uuidv1();
        // const newDriveInfoObject = {
        //     [ID]: {
        //       id: ID,
        //       isCompleted: false,
        //       waypoint: waypoint,
        //       destination: destination,
        //       createdAt: Date.now()
        //     }
        // };

        const newDriveInfoObject = {
          id: ID,
          waypoint: waypoint,
          destination: destination,
          waypointTime : waypointTime,
          term : term,
          personnel : personnel,
          status : status,
          drivername : drivername,
          custno : custno,
          phone : phone
        };
        const newState = {
          ...prevState,
          waypoint: "",
          destination: "",
          waypointTime : "",
          term : "",
          personnel : "",
          status : "",
          drivername : "",
          custno : "",
          phone : "",
          drivInfos: {
            ...prevState.drivInfos,
            ...newDriveInfoObject
          }
        };
        this._saveDriveInfos(newState.drivInfos);
        return {...newState};
      })
    }
  };

  _saveDriveInfos = drivInfos => {
      console.log(JSON.stringify(drivInfos));
      const saveDriveInfos = AsyncStorage.setItem("driveInfos", JSON.stringify(drivInfos) );

      // db 등록
      this._addDriveInfo(JSON.stringify(drivInfos));
  }

  _addDriveInfo=(driveInfos) => {
    //let driveApiUrl = "http://localhost:8080/driveInfos";
    let driveApiUrl = "http://192.168.43.85:8080/driveInfos";
    console.log("driveApiUrl : "+driveApiUrl);
    console.log("driveInfos : "+driveInfos);

    fetch(driveApiUrl, {
        method: 'POST',
        headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json'
        },
        body: driveInfos
      }).then(res => console.log("posted res : "+res)).then(driveInfos => {
      console.log("posted driveInfos : "+driveInfos);
      // this.setState({
      //   driveInfos : driveInfos
      //   // id: driveinfos[0]._id,
      //   // custno: driveinfos[0].custno
      // });

      //console.log(jsonData);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  render() {
    const { waypoint, destination, waypointTime, term, personnel, status, drivername, custno, phone  } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"  />
        <Text style={styles.title}>카풀운행정보 등록화면</Text>
        <View style={styles.card}>
          <TextInput
            style={[styles.input, styles.text]}
            name="waypoint" type="text" value={waypoint}
            placeholder={'경유지(waypoint)'}
            placeholderTextColor={'aqua'}
            onChangeText={(txt) => this._handleChange("waypoint", txt)}
          />
          <TextInput
            style={styles.input}
            name="destination" type="text" value={destination}
            placeholder={'도착지(destination)'}
            placeholderTextColor={'coral'}
            onChangeText={(txt) => this._handleChange("destination", txt)}
          />
          <TextInput
            style={styles.input}
            name="waypointTime" type="text" value={waypointTime}
            placeholder={'경유지 도착시간(예정)'}
            placeholderTextColor={'deeppink'}
            onChangeText={(txt) => this._handleChange("waypointTime", txt)}
          />
          <TextInput
            style={styles.input}
            name="term" type="text" value={term}
            placeholder={'카풀기간'}
            placeholderTextColor={'goldenrod '}
            onChangeText={(txt) => this._handleChange("term", txt)}
          />
          <TextInput
            style={styles.input}
            name="personnel" type="text" value={personnel}
            placeholder={'동승자 인원'}
            placeholderTextColor={'honeydew'}
            onChangeText={(txt) => this._handleChange("personnel", txt)}
          />
          <TextInput
            style={styles.input}
            name="status" type="text" value={status}
            placeholder={'모집현황'}
            placeholderTextColor={'khaki'}
            onChangeText={(txt) => this._handleChange("status", txt)}
          />
          <TextInput
            style={styles.input}
            name="drivername" type="text" value={drivername}
            placeholder={'카풀운전자 이름'}
            placeholderTextColor={'lemonchiffon'}
            onChangeText={(txt) => this._handleChange("drivername", txt)}
          />
          <TextInput
            style={styles.input}
            name="custno" type="text" value={custno}
            placeholder={'ktds사번(8자리사번)'}
            placeholderTextColor={'maroon'}
            onChangeText={(txt) => this._handleChange("custno", txt)}
          />
          <TextInput
            style={styles.inputNoborder}
            name="phone" type="text" value={phone}
            placeholder={'ktds사번(8자리사번)'}
            placeholderTextColor={'olive'}
            onChangeText={(txt) => this._handleChange("phone", txt)}
          />
        </View>
        <TouchableOpacity onPress={this._addSetDriveInfo}>
          <View>
            <Text style={styles.button}>등록</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161673",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    margin: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "#1AC3D9",
    flex: 1,
    width: width - 70,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor:"rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height:-1,
          width: 1
        }
      },
      android: {
        elevation:3
      }
    })
  },
  input: {
    padding: 17,
    borderBottomColor: "#228b22",
    borderBottomWidth: 1,
    fontSize: 18
  },
  inputNoborder: {
    padding: 17,
    fontSize: 18
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  text: {
    color: "#000000"
  }

});
