import { StatusBar } from 'expo-status-bar';
import {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, useWindowDimensions} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';

export default function App() {
  const [answerValue, setAnswerValue] = useState("0");
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState("0");
  const [operatorValue, setOperatorValue] = useState("0");
  const { styleSheet } = useStyle();

  const buttonPressed = (value) => {
    if(isNaN(value)){ // if button pressed is not a number 
      console.log("not a value")
      if(value == "C"){ //reset everything. displays 0 on the screen
        setAnswerValue("0") 
        setMemoryValue("0")
        setOperatorValue("0")
        setReadyToReplace(true)
      } 
      else if(value == "-" || value == "+" || value == "x" || value == "/" || value == "%" || value == "+/-"){
        if(operatorValue == "0" )
        {
          setMemoryValue(answerValue)
          setReadyToReplace(true)
          setOperatorValue(value) 
        }
        else{
          var currentAnswer = calculateEquals()
          setMemoryValue(currentAnswer)
          setReadyToReplace(true)
          setOperatorValue(value)
        }

      }
      else if(value == "="){
        calculateEquals()
        setMemoryValue("0")
        setReadyToReplace(true)
      }
    }else{
      setAnswerValue(handleNumber(value))
    }
    
  }

  const calculateEquals = () =>{
    var previous = parseFloat(memoryValue)
    var current = parseFloat(answerValue)
    switch(operatorValue){
      case '+' :
        setAnswerValue(previous + current)
        return (previous + current)
      case '-' :
        setAnswerValue(previous - current)
        return (previous - current)
      case 'x':
        setAnswerValue(previous * current)
        return(previous * current)
      case '/':
        setAnswerValue(previous / current)
        return(previous/current)
      case '%':
        setAnswerValue(current/100)
        return(current/100)
      case '+/-': //additional functionality for scientific calculator. 
        setAnswerValue(current*-1)
      default:
        return "not working"
      
    }
  }

  const handleNumber = (number) => {
    if(readyToReplace == true){
      number == "0" ? setReadyToReplace(true) : setReadyToReplace(false)
      return(number)
    }else{
      return(answerValue + number)
    }
  }

  return (
    <SafeAreaView style={styleSheet.container} >
      <View style={styleSheet.container}>
        <View style = {styleSheet.answerContainer}>
        <Text style = {styleSheet.answerText} >{answerValue}</Text>
        </View>
        <View style = {styleSheet.rowContainer}>
          <TouchableOpacity style={[styleSheet.row, styleSheet.lightGreyBackground]} onPress = {()=>buttonPressed("C")}>
            <Text style = {styleSheet.rowText}>C</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.lightGreyBackground]} onPress = {()=>buttonPressed('+/-')}>
            <Text style = {styleSheet.rowText}>+/-</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.lightGreyBackground]} onPress = {()=>buttonPressed('%')}>
            <Text style = {styleSheet.rowText}>%</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.blueBackground]} onPress = {()=>buttonPressed('/')}>
            <Text style = {[styleSheet.rowText, styleSheet.whiteText]}>/</Text> 
          </TouchableOpacity>

        </View>

        <View style = {styleSheet.rowContainer}>
          <TouchableOpacity style={[styleSheet.row, styleSheet.darkGreyBackground]} onPress = {()=> buttonPressed("7")}>
            <Text style = {[styleSheet.rowText, styleSheet.whiteText]}>7</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row,styleSheet.darkGreyBackground ]} onPress = {()=>buttonPressed("8")}>
            <Text style = {[styleSheet.rowText, styleSheet.whiteText]}>8</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.darkGreyBackground]} onPress = {()=>buttonPressed("9")}>
            <Text style = {[styleSheet.rowText, styleSheet.whiteText]}>9</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.blueBackground]} onPress = {()=>buttonPressed('x')}>
            <Text style ={[styleSheet.rowText, styleSheet.whiteText]}>x</Text> 
          </TouchableOpacity>

        </View>

        <View style = {styleSheet.rowContainer}>
          <TouchableOpacity style={[styleSheet.row, styleSheet.darkGreyBackground]} onPress = {()=>buttonPressed("4")}>
            <Text style = {[styleSheet.rowText, styleSheet.whiteText]} >4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.darkGreyBackground]} onPress = {()=>buttonPressed("5")}>
            <Text style = {[styleSheet.rowText, styleSheet.whiteText]}>5</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.darkGreyBackground]} onPress = {()=>buttonPressed("6")}>
            <Text style = {[styleSheet.rowText, styleSheet.whiteText]} >6</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.blueBackground]} onPress = {()=>buttonPressed('-')}>
            <Text style = {[styleSheet.rowText, styleSheet.whiteText]}>-</Text> 
          </TouchableOpacity>
        </View> 

        <View style = {styleSheet.rowContainer}>
          <TouchableOpacity style={[styleSheet.row, styleSheet.darkGreyBackground]} onPress = {()=>buttonPressed("1")}>
            <Text style= {[styleSheet.rowText, styleSheet.whiteText]} >1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.darkGreyBackground]} onPress = {()=>buttonPressed("2")}>
            <Text style= {[styleSheet.rowText, styleSheet.whiteText]} >2</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.darkGreyBackground]} onPress = {()=>buttonPressed("3")}>
            <Text style= {[styleSheet.rowText, styleSheet.whiteText]}>3</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.blueBackground]} onPress = {()=>buttonPressed('+')}>
            <Text style= {[styleSheet.rowText, styleSheet.whiteText]}>+</Text> 
          </TouchableOpacity>
        </View> 

        <View style = {styleSheet.rowContainer}>
          <TouchableOpacity style={[styleSheet.equalsRow, styleSheet.darkGreyBackground]} onPress = {()=>buttonPressed('0')}>
            <Text style = {[styleSheet.rowText, styleSheet.whiteText]} >0</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.darkGreyBackground]} onPress = {()=>buttonPressed('.')}>
            <Text style = {[styleSheet.rowText, styleSheet.whiteText]}>.</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={[styleSheet.row, styleSheet.blueBackground]} onPress = {()=>buttonPressed('=')}>
            <Text style = {[styleSheet.rowText, styleSheet.whiteText]} >=</Text> 
          </TouchableOpacity>
        </View> 

         
        <StatusBar style="light" />
      </View>
      
    </SafeAreaView>
  );
}

const useStyle = () => {
  const dimensions = useWindowDimensions();

  const styleSheet = StyleSheet.create({
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: 'row',
      backgroundColor: "#DDDDDD",
      height: dimensions.height/9,
      width: dimensions.width/5,
      borderRadius: 50,
      marginBottom: 15,
      marginRight: 15,
    },
    equalsRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: 'row',
      backgroundColor: "#DDDDDD",
      height: dimensions.height/9,
      width: dimensions.width/2.3,
      borderRadius: 50,
      marginBottom: 15,
      marginRight: 15, 
      paddingLeft: 30,
    },

    rowContainer: {
      display: "flex",
      flexDirection: "row",
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    rowText: {
      fontSize: '25',
    },

    answerContainer: {
      display: 'flex',
      width: dimensions.width/1.2, 
      height: dimensions.height/9,
      alignSelf: 'flex-end',
      margin: 10,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },

    darkGreyBackground: {
      backgroundColor: '#3a3b3c',

    },

    lightGreyBackground: {
      backgroundColor: '#a9a9a9',
    },

    blueBackground: {
      backgroundColor: '#007FFF',
    },

    whiteText: {
      color: 'white',
    },

    answerText: {
      color: 'white',
      width: dimensions.width,
      height: dimensions.height/9,
      textAlign: 'right',
      fontSize: 60,
      padding: 10,
    },

  })
  return { styleSheet }
}

