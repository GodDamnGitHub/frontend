import React, {StyleSheet, View, FlatList, Picker} from "react-native";
import {Text} from "react-native-paper";
import {useEffect, useState} from "react";



export default function ItemDetail() {
  const [data, setData] = useState([]);
  const [num, setNum] = useState(0);


  /*useEffect(() => {
    //function fetchFromApi() {
    /etch("http://brandaserver.herokuapp.com/getinfo/libraryHours/week", {mode:"no-cors"})
        .then((response) => response.json())
        .then((json) => {
          setData(JSON.stringify(json));
        })
        .catch((error) => {
          console.error(error);
        });
    }

    //fetchFromApi();
  }, []);*/

  useEffect(() => {
    let loadData = require("../library.json");
    let Array2D = (r,c) => [...Array(r)].map(x=>Array(c).fill(0));
    let arr = Array2D(7, 5);

    for (let i = 0; i < loadData.length; i++) {
      for (let j = 0; j < loadData[i].hours.length; j++) {
        if (loadData[i].hours[j].times.status == "open") {
          arr[j][i] = {"day": loadData[i].day, "isOpen": true, "from": loadData[i].hours[j].times.hours[0].from, "to": loadData[i].hours[j].times.hours[0].to};
        } else {
          arr[j][i] = {"day": loadData[i].day, "isOpen": false, "from": "", "to": ""};
        }
      }
      setData(arr);
    }
    
  }, []);

  const Item = ({day, isOpen, from, to}) => {
    if (isOpen) {
      return (
        <View style={styles.item}>
          <Text style={{fontSize:24}}>{day} {from}~{to}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.item}>
          <Text style={{fontSize:24}}>{day} Closed</Text>
        </View>
      );
    }

  };

  
  const renderItem = ({item}) => (
    <Item day={item.day} isOpen={item.isOpen} from={item.from} to={item.to}/>
  );

  return (
    <View style={styles.listView}>
      <FlatList
        data={data[num]}
        renderItem={renderItem}
        keyExtractor={item => item.day}
        extraData={num}
      />    
      <Picker
        selectedValue={num}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setNum(itemValue)}
      >
        <Picker.Item label="Main Library" value={0} />
        <Picker.Item label="Research Help Desk" value={1} />
        <Picker.Item label="Research Help Online Chat" value={2} />
        <Picker.Item label="Archives and Special Collections" value={3} />
        <Picker.Item label="Sound and Image Media Studios" value={4} />

      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  listView: {
    flex: 6,
    alignItems: "center",
    justifyContent: "space-around",
  },
  item: {
    backgroundColor: "lightgreen",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});