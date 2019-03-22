import React from 'react';
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
import Conditions from "./condition";
import DriveInfo from "./driveinfo";

const {height, width } = Dimensions.get("window");

export default class DriveSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newRoute : '',
      keyword : '',
      viewflag : ''
    }
  }

  _controlNewRoute = text => {
    this.setState({
      newRoute: text
    });
  };

  _searchHandling = () => {
    console.log("_searchHandling");
  };

  render() {
    const { newRoute} = this.state;
    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content"  />
      <Text style={styles.title}>카풀정보조회</Text>
      <View style={styles.inputbox}>
        <TextInput
          style={styles.input}
          placeholder={"출발지 또는 도착지를 입력하세요"}
          value={newRoute}
          onChangeText={this._controlNewRoute}
        />
        <TouchableOpacity onPress={this._searchHandling}>
           <View style={styles.circle} />
         </TouchableOpacity>

      </View>
      <View style={styles.conditionview}>
        <Conditions />
        <Text style={styles.condition}>
           필터 선택 시 조건이 나오는 자리입니다.
        </Text>
      </View>

      <View style={styles.list}>

          <ScrollView >
            <Text>카풀정보목록나오는 자리입니다.</Text>
            <DriveInfo />
          </ScrollView>
      </View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0067FF",
    alignItems: "center"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 3,
    marginRight:20
  },
  title: {
    color: "white",
    fontSize: 30,
    margin: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  conditionview: {
    flex: 0.3
  },
  condition: {
    padding: 20,
    fontSize: 25
  },
  list: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderRadius: 3,
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
  inputbox: {
    backgroundColor: "white",
    width: width - 25,
    borderRadius: 3
  },
  input: {
    padding: 20,
    fontSize: 25
  }

});
