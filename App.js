import {useState, useEffect} from "react";
import React, { StyleSheet, Text, View, TouchableOpacity, FlatList} from "react-native";
import {Button, Provider as PaperProvider,  Checkbox } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import About from "./components/About";
import ItemDetail from "./components/ItemDetail";




const Home = () => {
  const [todo, setTodo] = useState([]);
  const [num, setNum] = useState(0);
  const [flag, setFlag] = useState(true);
  const [originTodo, setOriginTodo] = useState([]);
  const [isVisible, setIsVisible] = useState(true);



  
  useEffect(() => {
    let todoData = require("./todo.json").todo;
    setTodo(todoData);
  }, []);

  const Item = ({ name, due, done, index}) => {
    const [checked, setChecked] = useState(done?true:false);
    return (
      <View style={done ? styles.item1 : styles.item2}>
        <Text style={{fontSize:24}}>{name}    {due}</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
            markItemDone(index);
          }}
        />
      </View>
    );
  };

  
  const renderItem = ({ item, index }) => (
    <Item name={item.name} due={moment(item.due,"YYYY-MM-DD").format("LL")} done={item.done} index={index}/>
  );

  const markItemDone = (index)=>{
    let todoCopy = todo;
    todoCopy[index].done = !todoCopy[index].done;
    setTodo(todoCopy);
    setFlag(!flag);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text>Num is {num}</Text>
      </View>
      <View style={styles.buttonView}>
        <Button mode={"contained"} onPress={() => setNum(num +1 )}>
          Increase
        </Button>
        <Button mode={"contained"} onPress={() => setNum(num -1 )}>
          Decrease
        </Button>
        <Button mode={"contained"} onPress={() => setNum(0)}>
          Reset
        </Button>
      </View>
      <View style={styles.listView}>
        <FlatList
          data={todo}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          extraData={flag}
        />
      </View>
      <View style={{flex:1, alignItems:"center"}}>
        <Button mode={"contained"} onPress={() => {
          if (isVisible) {
            let todoFiltered = todo.filter(item=>item.done==false);
            setOriginTodo(todo);
            setTodo(todoFiltered);
            setIsVisible(false);
          } else {
            setTodo(originTodo);
            setIsVisible(true);
          }

        }}>
          Hide/Show
        </Button>
      </View>
    </View>
  );
};


export default function App() {
  const Root = createNativeStackNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
        <Root.Navigator>
          <Root.Screen 
            name={"Home"} 
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => (
                <View style={{flexDirection:"row"}}>
                  <TouchableOpacity style={styles.icon} onPress={()=>{
                    navigation.navigate("Library Hours");
                  }}>
                    <Text style={{letterSpacing: 2, fontSize: 18}}>Library Hours</Text>
                    <Ionicons name="information-circle-outline" size={32}  />

                  </TouchableOpacity>
                  <TouchableOpacity style={styles.icon} onPress={()=>{
                    navigation.navigate("About");
                  }}>
                    <Text style={{letterSpacing: 2, fontSize: 18}}>About</Text>
                    <Ionicons name="information-circle-outline" size={32}  />

                  </TouchableOpacity>
                </View>
              ),              
            })}

          />
          <Root.Screen name={"About"} component={About}/>
          <Root.Screen name={"Library Hours"} component={ItemDetail}/>
        </Root.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  textView: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  listView: {
    flex: 6,
    alignItems: "center",
    justifyContent: "space-around",
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
  },
  item1: {
    backgroundColor: "lightgreen",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item2: {
    backgroundColor: "pink",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});
