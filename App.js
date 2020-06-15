import React, { Component } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView,
  Platform, 
  AsyncStorage,
  Keyboard,
  Alert

 
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import DatePicker from 'react-native-datepicker';
 

export default function App(){
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  async function addTask() {
    const search = task.filter(task => task === newTask);

    if (search.length !== 0) {
      Alert.alert("Atenção", "Nome da tarefa repetido!");
      return;
    }

    setTask([...task, newTask]);
    setNewTask("");

    Keyboard.dismiss();
  }

  async function removeTask(item) {
    Alert.alert(
      "Deletar Tarefa",
      "Tem certeza que deseja remover esta anotação?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => setTask(task.filter(tasks => tasks !== item))
        }
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function carregaDados() {
      const task = await AsyncStorage.getItem("task");

      if (task) {
        setTask(JSON.parse(task));
      }
    }
    carregaDados();
  }, []);

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem("task", JSON.stringify(task));
    }
    salvaDados();
  }, [task]);



  return (
    
  <> 
     <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === "ios"}
      >
    
    <View style={styles.container}>
      <View style={styles.Body}>   
        <FlatList 
        style={styles.FlatList}
        data={task}
        keyExtractor={item => item.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item })=>(
        <View style={styles.ConteinerView}>
         <Text style={styles.Texto}>{item}</Text>
                  <TouchableOpacity onPress={() => removeTask(item)}>
                    <MaterialIcons
                      name="delete-forever"
                      size={25}
                      color="#f64c75"
                      
                      />
           <DatePicker 
              format="DD/MM/YYYY"           
           />
         </TouchableOpacity>
        </View>
        )}
      />         
      </View> 
      <View style={styles.Form}>
        <TextInput 
        style={styles.Input}
        placeholderTextColor='#999'
        autoCorrect={true}
        value={newTask}
        placeholder="adicione uma tarefa"
        maxlenght={25}
        onChangeText={text => setNewTask(text)}

        
        />
        <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
         <Ionicons name="ios-add" size ={20} color="white"/>
        </TouchableOpacity> 
      </View>
    </View>
  </KeyboardAvoidingView> 
  </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal:20,
    paddingVertical:20,
    marginTop: 20
  },
  Body:{
     flex:1
  },
   Form:{
     padding: 0,
     height: 60,
     justifyContent: 'center',
     alignSelf: 'stretch',
     flexDirection: 'row',
     paddingTop: 13,
     borderTopWidth: 1,
     borderColor:'#eee',
      
  },
  Input:{
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c6cce',
    borderRadius: 4,
    marginLeft: 10
  },
  FlatList:{
     flex:1,
     marginTop: 5

  },
  ConteinerView: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 4,
        backgroundColor: '#eee',


        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#eee'


  },
  Texto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center"
  },

});
