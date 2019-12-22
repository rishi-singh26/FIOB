import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Dimensions,
  ImageBackground
} from "react-native";
import { OutlinedTextField } from "react-native-material-textfield";
import { Card, Button, Input } from "react-native-elements";
import { AsyncStorage } from "react-native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

var today = new Date();
var date =
  today.getDate() +
  "/" +
  parseInt(today.getMonth() + 1) +
  "/" +
  today.getFullYear();

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      taskNo: 0,
      deletedTaskList: []
    };
  }

  componentDidMount() {
    console.log("component did mount");
    this.retriveTasks();
    console.log("component did mount end");
    // this.retriveSavedData();
  }

  retriveTasks = async () => {
    try {
      const value = await AsyncStorage.getItem("allData18");
      if (value !== null) {
        // We have data!!
        var retrivedData = JSON.parse(value);
        console.log(retrivedData, "Data retrived");
        this.setState({ taskList: retrivedData });
        this.setState({ taskList: this.state.taskList });
        var taskNo = retrivedData[retrivedData.length - 1].taskNo + 1;
        this.setState({ taskNo: taskNo });
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error in retriving saved data");
    }
    if (1 === 1) {
      try {
        const value = await AsyncStorage.getItem("deletedData1");
        if (value !== null) {
          // We have data!!
          var retrivedData = JSON.parse(value);
          console.log(retrivedData, "Deleted Data retrived");
          this.setState({ deletedTaskList: retrivedData });
          this.setState({ deletedTaskList: this.state.deletedTaskList });
        }
      } catch (error) {
        // Error retrieving data
        console.log("Error in retriving deleted data");
      }
    }
  };

  onSubmit = async () => {
    let { current: field } = this.fieldRef;
    var taskNo = this.state.taskNo;
    var task = {
      task: field.value(),
      taskNo: taskNo,
      date: date,
      isComplete: false
    };
    var newTaskList = this.state.taskList.concat(task);
    this.setState({ taskList: newTaskList });
    console.log(this.state.taskList);
    this.setState({ taskNo: this.state.taskNo + 1 });

    // storing the data in local storage

    var dataToBeSaved = JSON.stringify(newTaskList);

    try {
      await AsyncStorage.setItem("allData18", dataToBeSaved);
      console.log("no error in saving data");
    } catch (error) {
      // Error saving data
      console.log("error in saving data");
    }
  };

  fieldRef = React.createRef();

  render() {
    renderDeletedTasks = this.state.deletedTaskList
      .slice(0)
      .reverse()
      .map(tasks => {
        return (
          <View key={tasks.taskNo}>
            <Card
              title={tasks.date}
              containerStyle={{
                borderRadius: 30,
                borderColor: "#f2f7ff"
              }}
            >
              <Text style={styles.text}>{tasks.task}</Text>
              <Button
                title="Delete"
                titleStyle={{ color: "red" }}
                type="clear"
                onPress={async () => {
                  for (var i = 0; i < this.state.deletedTaskList.length; i++) {
                    if (this.state.deletedTaskList[i].taskNo == tasks.taskNo) {
                      this.state.deletedTaskList.splice(i, 1);
                      this.setState({
                        deletedTaskList: this.state.deletedTaskList
                      });

                      var dataToBeSaved = JSON.stringify(
                        this.state.deletedTaskList
                      );

                      try {
                        await AsyncStorage.setItem(
                          "deletedData1",
                          dataToBeSaved
                        );
                        console.log("no error in deleting deleted data");
                      } catch (error) {
                        // Error saving data
                        console.log("error in deleting deleted data");
                      }
                    }
                  }
                }}
              />
            </Card>
            <Text></Text>
          </View>
        );
      });

    renderTasks = this.state.taskList
      .slice(0)
      .reverse()
      .map(tasks => {
        return (
          <View key={tasks.taskNo}>
            <Card
              title={tasks.date}
              containerStyle={{
                borderRadius: 30,
                borderColor: "#f2f7ff"
              }}
            >
              <Text style={styles.text}>{tasks.task}</Text>
              <Button
                title="Complete"
                titleStyle={{ color: "red" }}
                type="clear"
                onPress={async () => {
                  for (var i = 0; i < this.state.taskList.length; i++) {
                    if (this.state.taskList[i].taskNo == tasks.taskNo) {
                      var deletedTask = this.state.taskList[i];
                      this.setState({
                        deletedTaskList: this.state.deletedTaskList.concat(
                          deletedTask
                        )
                      });
                      this.state.taskList.splice(i, 1);
                      this.setState({ taskList: this.state.taskList });

                      var dataToBeSaved = JSON.stringify(this.state.taskList);

                      try {
                        await AsyncStorage.setItem("allData18", dataToBeSaved);
                        console.log("no error in saving data after deletion");
                      } catch (error) {
                        // Error saving data
                        console.log("error in saving data after deletion");
                      }

                      if (1 === 1) {
                        var deletedDataToBeSaved = JSON.stringify(
                          this.state.deletedTaskList
                        );
                        try {
                          await AsyncStorage.setItem(
                            "deletedData1",
                            deletedDataToBeSaved
                          );
                          console.log("no error in saving deleted data");
                        } catch (error) {
                          // Error saving data
                          console.log("error in saving deleted data");
                        }
                      }
                    }
                  }
                }}
              />
            </Card>
            <Text></Text>
          </View>
        );
      });

    return (
      <ImageBackground
        source={require("./background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <ScrollView>
          <View style={{ flex: 1, minWidth: screenWidth }}>
            <Text
              style={{
                fontSize: 40,
                justifyContent: "center",
                paddingTop: 30,
                paddingLeft: 20,
                color: "white"
              }}
            >
              FIOB
            </Text>
            <Text></Text>
            <Text
              style={
                (styles.text,
                { fontSize: 20, margin: 10, paddingLeft: 10, color: "white" })
              }
            >
              What's next?
            </Text>
            <View
              style={{
                padding: 10,
                margin: 10
              }}
            >
              <OutlinedTextField
                label="Enter your Task"
                keyboardType="default"
                textColor="white"
                tintColor="white"
                baseColor="white"
                title="Pressing the Enter key on th ekeyboard will add this task."
                onSubmitEditing={this.onSubmit}
                ref={this.fieldRef}
              />
            </View>
            <View>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text style={styles.boldText}>Your tasks will appear below.</Text>
              <Text></Text>
              {renderTasks}
              <Text></Text>
              <Text></Text>
              <Text style={styles.boldText}>
                Your completed tasks will appear below.
              </Text>
              <Text></Text>
              {renderDeletedTasks}
              <Text></Text>
              <Text></Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  fixToScreen: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: 50,
    marginRight: 50
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 17,
    color: "#000",
    marginLeft: 30,
    marginRight: 30,
    lineHeight: 30,
    letterSpacing: 1
  },
  boldText: {
    fontFamily: "Roboto",
    fontSize: 17,
    color: "#000",
    marginLeft: 30,
    marginRight: 30,
    lineHeight: 30,
    letterSpacing: 1,
    fontWeight: "bold"
  },
  date: {
    fontFamily: "Roboto",
    fontSize: 22,
    color: "#000",
    marginLeft: 30,
    marginRight: 30,
    lineHeight: 30,
    letterSpacing: 1
  },
  contentContainer: {
    flexGrow: 1
  },
  titleStyle: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    marginTop: 20
  }
});
