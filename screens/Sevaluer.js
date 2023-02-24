import { StyleSheet, View, Pressable, TextInput, Button, Text,Dimensions } from 'react-native';
import * as React from 'react';
import data from '../storage/data.json';

const screen = Dimensions.get('window')

export default function Sevaluer({navigation}) {

  const Names = data.map(item => item.country);
  const [text, setText] = React.useState('');
  const [enteredNames, setEnteredNames] = React.useState([]);
  const [status, setstatus] = React.useState("start");
  const [timer, setTimer] = React.useState(20);
  const [timings, setTimings] = React.useState(false);
  const [reset, setReset] = React.useState(false);

  React.useEffect(()=>{
    let interval=null;
    let counter =20;

    if(timings){
      console.log('timing');
      counter =20;
      interval = setInterval(() => {
        setTimer(timer => timer-1);
        counter--;
        if (counter==0){
          setTimings(false);
          counter=10;
          setstatus("end");
        }
        console.log(counter);
      },1000);
    } else {
      console.log('not timing');
      clearInterval(interval);
    }

    if(reset){
      console.log('reset');
      clearInterval(interval);
      setReset(false);
    }

    return ()=> clearInterval(interval);
  }, [timings, reset] )

  function startGame() {
    setstatus("game");
    setText('');
    setEnteredNames([]);
    setTimings(true);
  }
  
  const verify = () =>{

    if (Names.includes(text)){
      if (enteredNames.includes(text)){
        alert("Ce pays a déjà été entré");
      } else {
          alert("Correct");
          setEnteredNames([...enteredNames, text]);
          console.log('tst');
          setTimer(10);
          setReset(true);
          console.log(enteredNames.length)
          console.log(Names.length)
          if ((enteredNames.length + 1) == Names.length){
            alert("You have finished the test");
            setstatus("end");
          }
        }
    }else{
      alert("Wrong !");
    }
  }

  const renderEnteredNames = () => {
    return enteredNames.map(name => {
      return <Text key={name} style={styles.text}>{name}</Text>;
    }
    );
  }



  // const endGame = () => {
  //   clearInterval(timing);
  //   alert("You have finished the test");
  // }

//   const oneSecInterval = setInterval(() => {
//     console.log(counter);
//     counter--;

//     if (counter == 0) {
//         clearInterval(oneSecInterval);
//     }
// }, 1000);


  
const start = () => {
  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Pressable  onPress={() => startGame() } >
        <View style={styles.cercle}>
            <Text style={styles.score}> {'START'} </Text> 
        </View>
        </Pressable>
      </View>
  )
}

const end = () => {
  return(<View style={styles.result}>
    <Text style={styles.score}> Score : </Text>
    <View style={styles.cercle}> 
      <Text style={styles.score}> {enteredNames.length} / {Names.length} </Text>
    </View>
    <Button
    onPress={() => navigation.navigate('Exercices sur les Noms')}
    title="Retour au Menu"
    color="#508fa0"
    accessibilityLabel="Retour au Menu"/>
  </View>)}

const Game = () => {
  return(<View style={styles.container}>
    <View style={styles.list}>{renderEnteredNames()}</View>
  <View style={styles.container}>
    <TextInput
    style={[styles.input,{marginBottom: 20}]}
    placeholder="Type here plz"
    onChangeText={newText => setText(newText)}
    defaultValue={text}
  />
   <Button
    onPress={() => verify()}
    title="Validate"
    color="#508fa0"
    accessibilityLabel="Validate"/>
    <Text style={[styles.text,{marginTop: 20}]}>{timer}</Text>
  </View>
  </View>)}


  return (
    <View style={styles.container}>
      {status == "start"? start() : status == "end" ? end(): Game()}
    </View>
  );
  }


  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#081621',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical : 30,
    },
    result : {
      backgroundColor: '#081621',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom : 50,
    },
    text: {
      fontSize: 15   ,
      color : 'white',
      fontWeight : 'bold',
      margin : 2,
    },
    input : {
      height: 40,
      borderWidth: 1,
      borderColor: 'white',
      backgroundColor : '#43a095',
      width : 200,
    },
    list : {
      flexDirection : 'row',
      flexWrap : 'wrap',
    },
    score  : {
      fontSize: screen.width /10,
      color : 'white',
      fontWeight : 'bold',
      margin : 2,
    },
    cercle : {
      borderColor: '#43a095',
      borderWidth : 10,
      width : screen.width /2,
      height: screen.width /2,
      borderRadius : screen.width /2,
      justifyContent : 'center',
      alignItems : 'center',
    }
  });


