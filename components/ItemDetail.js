import React, {StyleSheet, View, FlatList, Picker} from "react-native";
import {Text} from "react-native-paper";
import {useEffect, useState} from "react";



export default function ItemDetail() {
  const [data, setData] = useState([]);
  const [num, setNum] = useState(0);


  useEffect(() => {
    async function fetchFromApi() {
      fetch("http://brandaserver.herokuapp.com/getinfo/libraryHours/week")
        .then((response) => response.json())
        .then((json) => {
          let Array2D = (r,c) => [...Array(r)].map(x=>Array(c).fill(0));
          let arr = Array2D(7, 5);
      
          for (let i = 0; i < json.length; i++) {
            for (let j = 0; j < json[i].hours.length; j++) {
              if (json[i].hours[j].times.status == "open") {
                arr[j][i] = {"day": json[i].day, "isOpen": true, "from": json[i].hours[j].times.hours[0].from, "to": json[i].hours[j].times.hours[0].to};
              } else {
                arr[j][i] = {"day": json[i].day, "isOpen": false, "from": "", "to": ""};
              }
            }
            setData(arr);
          }
        }).then(() => {

        })
        .catch((error) => {
          console.error(error);
        });
    }

    fetchFromApi();


    
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
    <View style={styles.container}>
      <View style={styles.listView}>
        <FlatList
          data={data[num]}
          renderItem={renderItem}
          keyExtractor={item => item.day}
          extraData={num}
        />    
      </View>
      <View style={styles.pickerView}>
        <Picker
          selectedValue={num}
          style={{ height: 50, width: 350 }}
          onValueChange={(itemValue) => setNum(itemValue)}
        >
          <Picker.Item label="Main Library" value={0} />
          <Picker.Item label="Research Help Desk" value={1} />
          <Picker.Item label="Research Help Online Chat" value={2} />
          <Picker.Item label="Archives and Special Collections" value={3} />
          <Picker.Item label="Sound and Image Media Studios" value={4} />

        </Picker>
      </View>

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
  pickerView: {
    flex: 2,
    alignItems: "center",
  },
  item: {
    backgroundColor: "lightgreen",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});