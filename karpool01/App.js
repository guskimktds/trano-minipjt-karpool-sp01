import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import DriveSearch from "./components/driveSearch";
import DriveRegist from "./components/driveRegist";
import DriveInput from "./components/regist/driveinput";


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      viewName : false
    }

    this._controlViewChange = this._controlViewChange.bind(this);
  }

  _controlViewChange = (name) => {
    console.log("name : "+name);
    this.setState({
      viewName: name
    });
  };


  render() {
    const { viewName } = this.state;
    return (
      <View style={styles.container}>
            { viewName ? <DriveSearch /> : <DriveInput />  }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#510CE8",
    alignItems: "center"
  },
  menutab: {
    padding: 30,
    fontSize: 20
  }
});
