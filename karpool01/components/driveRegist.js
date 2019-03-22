import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

import DriveLoad from "./regist/driveload";
import DriveInput from "./regist/driveinput";


export default class DriveRegist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registflag : false
    }
  }

  _RegistHandling = () => {
    this.setState({
      registflag: true
    });
  };


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>운행정보등록</Text>
        </View>
        <DriveLoad />
        <DriveInput />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  }
});
