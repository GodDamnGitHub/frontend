import {React} from "react";
import { StyleSheet, View} from "react-native";
import {Button, DataTable, Text } from "react-native-paper";
import * as Clipboard from "expo-clipboard";

const AppInfo = require("../app.json").expo;

export default function About(){
  const copyToClipboard = () => {
    Clipboard.setString(JSON.stringify(require("../app.json")));
  };
  return(
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Item</DataTable.Title>
          <DataTable.Title>Value</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Name</DataTable.Cell>
          <DataTable.Cell>{AppInfo.name}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Splash Location</DataTable.Cell>
          <DataTable.Cell>{AppInfo.splash.image}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Version</DataTable.Cell>
          <DataTable.Cell>{AppInfo.version}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Orientation</DataTable.Cell>
          <DataTable.Cell>{AppInfo.orientation}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Android</DataTable.Cell>
          <DataTable.Cell>{JSON.stringify(AppInfo.android)}</DataTable.Cell>
        </DataTable.Row>
      </DataTable> 

      

      <Button
        mode={"contained"}
        onPress={copyToClipboard}
      >   
        Copy
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
  }
});