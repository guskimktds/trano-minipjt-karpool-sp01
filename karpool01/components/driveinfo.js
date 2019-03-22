import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";

const { width, height } = Dimensions.get("window");

export default class Driveinfo extends Component {

  constructor(props){
    super(props);
    this.state = {
      jsonData : {}  
    };
  }

  componentDidMount() {
    this._getDriveInfo();
  }

  _getDriveInfo=() => {
    //let driveApiUrl = "http://localhost:8080/driveInfos";
    let driveApiUrl = "http://192.168.43.85:8080/driveInfos";
    console.log("driveApiUrl : "+driveApiUrl);

    fetch(driveApiUrl, {
        method: 'GET',
        headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json'
        }
      }).then(response => response.json()).then(driveinfos => {
      console.log(driveinfos);
      this.setState({
        jsonData : driveinfos
        // id: driveinfos[0]._id,
        // custno: driveinfos[0].custno
      });

      //console.log(jsonData);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  render() {
    const { jsonData } = this.state;

    return (
      <View style={styles.container}>
        { Object.values(jsonData).map(
          (driveinfos) =>
          <View key={driveinfos._id}>
            <Text>{driveinfos.waypoint}</Text>
            <Text>{driveinfos.destination}</Text>
            <Text>{driveinfos.start_time}</Text>
            <Text>{driveinfos.term}</Text>
            <Text>{driveinfos.personnel}</Text>
            <Text>{driveinfos.status}</Text>
          </View>
        )}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: width - 50,
    flexDirection: "row",
    alignItems: "center",
    padding: 15
  },
  button: {
    borderStyle: 'solid',
    borderColor: '#d5d5d5',
    borderWidth: 1,
    backgroundColor: '#eee',
    borderRadius: 3,
    margin: 5
  },
  buttenText: {
    fontWeight: "200",
    fontSize: 20,
    marginVertical: 5
  }

});
