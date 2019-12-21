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
// import { AsyncStorage } from "react-native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

var today = new Date();
var date =
  today.getDate() +
  "/" +
  parseInt(today.getMonth() + 1) +
  "/" +
  today.getFullYear();

var taskNo = 0;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "This is an example task and you can't delete it.",
      taskList: [],
      //added: false, //this checks of the the "done" button is pressed or not.
      dataTyped: false //this checks if the keyboard enter key is pressed or not.
      //   savedDataRetriverd: [],
      //   task1Created: false, //this check if the first task is created ot not.
      //   taskNo: taskNo,
      //   finalData: ""
    };
  }

  componentDidMount() {
    console.log("component did mount2");
    // this.retriveTaskNo();
    // this.retriveTask1Created();
    // this.retriveSavedData();
  }

  //   retriveTaskNo = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("taskNumber");
  //       if (value !== null) {
  //         // We have data!!
  //         console.log(value);
  //         this.setState({ taskNo: parseInt(value, 10) });
  //       }
  //     } catch (error) {
  //       // Error retrieving data
  //       console.log("Errod in retriving task no");
  //     }
  //   };

  //   retriveTask1Created = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("task1created");
  //       if (value !== null) {
  //         // We have data!!
  //         console.log(Boolean(value));
  //         this.setState({ task1Created: Boolean(value) });
  //       }
  //     } catch (error) {
  //       // Error retrieving data
  //       console.log("Error in retriving saved data");
  //     }
  //     this.retriveSavedData();
  //   };

  //   retriveSavedData = async () => {
  //     if (this.state.task1Created) {
  //       try {
  //         const value = await AsyncStorage.getItem("allData2");
  //         if (value !== null) {
  //           // We have data!!
  //           console.log("component did mount1");
  //           var retrivedData = JSON.parse(value);
  //           this.setState({ savedDataRetriverd: retrivedData });
  //         }
  //       } catch (error) {
  //         // Error retrieving data
  //       }
  //     } else {
  //       console.log(this.state.task1Created);
  //     }
  //   };

  onSubmit = () => {
    let { current: field } = this.fieldRef;
    var task = {
      task: field.value(),
      taskNo: taskNo++,
      date: date,
      isComplete: false
    };
    var newTaskList = this.state.taskList.concat(task);
    this.setState({ taskList: newTaskList });
    this.setState({ added: !this.state.added });
    this.setState({ dataTyped: false });
    console.log(this.state.taskList);
  };

  showList = async () => {
    console.log(this.state.taskList);

    // storing the data in local storage

    // var dataToBeSaved = this.state.savedDataRetriverd.concat(
    //   this.state.taskList
    // );

    // try {
    //   await AsyncStorage.setItem("allData2", JSON.stringify(dataToBeSaved));
    // } catch (error) {
    //   // Error saving data
    //   console.log("error in saving data");
    // }

    // // storing the "task1created" state in local storage.
    // try {
    //   await AsyncStorage.setItem(
    //     "task1created",
    //     JSON.stringify(this.state.task1Created)
    //   );
    // } catch (error) {
    //   // Error saving data
    //   console.log("error in saving task1created");
    // }

    // // storing the "taskNo" state in local storage.
    // try {
    //   await AsyncStorage.setItem("taskNumber", taskNo.toString());
    // } catch (error) {
    //   // Error saving data
    //   console.log("error in saving taskNumber");
    // }

    // // retriving data from local storage

    // var finalData;

    // try {
    //   const value = await AsyncStorage.getItem("allData2");
    //   if (value !== null) {
    //     // We have data!!
    //     console.log(JSON.parse(value));
    //     finalData = JSON.parse(value);
    //   }
    // } catch (error) {
    //   // Error retrieving data
    // }

    // this.setState({
    //   added: !this.state.added,
    //   dataTyped: false
    //   task1Created: true,
    //   finalData: finalData
    // });
    // console.log(this.state.finalData);
  };

  fieldRef = React.createRef();

  render() {
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
                title="Delete"
                titleStyle={{ color: "red" }}
                type="clear"
                onPress={() => {
                  for (var i = 0; i < this.state.taskList.length; i++) {
                    if (this.state.taskList[i].taskNo == tasks.taskNo) {
                      this.state.taskList.splice(i, 1);
                      this.setState({ taskList: this.state.taskList });
                    }
                  }
                }}
              />
            </Card>
            <Text></Text>
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
              {renderTasks}
              <Text style={styles.text}>Your tasks will appear here.</Text>
              <Text></Text>
              <Text></Text>
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
    // textAlign: 'center',
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
    // fontFamily: 'serif',
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    // marginRight: 80,
    marginTop: 20
  }
});
