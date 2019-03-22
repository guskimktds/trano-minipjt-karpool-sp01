import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native";

const { width, height } = Dimensions.get("window");

export default class Condition extends Component {

  render() {
    return (
      <View style={styles.container} >
          <TouchableOpacity style={styles.button} >
            <View >
              <Text style={styles.buttenText}>전체</Text>
            </View>
          </TouchableOpacity >
          <TouchableOpacity style={styles.button} >
            <View >
              <Text style={styles.buttenText}>출근</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <View >
              <Text style={styles.buttenText}>퇴근</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <View >
              <Text style={styles.buttenText}>필터</Text>
            </View>
          </TouchableOpacity>
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
