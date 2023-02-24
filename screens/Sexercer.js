import { StyleSheet, View, TextInput, Button, Text,Pressable, Dimensions } from 'react-native';
import * as React from 'react';
import data from '../storage/data.json';


const screen = Dimensions.get('window');

export default function Sexercer({navigation}) {

  const [text, setText] = React.useState('');
  const [status, setstatus] = React.useState("start");
  const [timer, setTimer] = React.useState(15);
  const [timings, setTimings] = React.useState(false);
  const [reset, setReset] = React.useState(false);


  const [quiz, setquiz] = React.useState(true);
  

  var randomQ, randomA, currentQuiz, Question,Answers, correctOption;
  const [currentQuestion, setcurrentQuestion] = React.useState("testT");
  const [currentOptions, setcurrentOptions] = React.useState(["test2", "test3", "test4", "test5"]);
  const [correctAnswer, setcorrectAnswer] = React.useState("");
  const [optionSelected, setoptionSelected] = React.useState("");
  const [endGame, setendGame] = React.useState(false);

  const [Nbquestion, setNbquestion] = React.useState(0);
  const [NbquestionCorrect, setNbquestionCorrect] = React.useState(0);

  function Shuffle(arr){
    for(var i =arr.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
  }

  const validateAnswer = (optionsSelected) =>{

      setoptionSelected(optionsSelected);
      setendGame(true);
      setTimer(0);
      if (optionsSelected == correctAnswer){
        setNbquestionCorrect(NbquestionCorrect+1);
      }

  }


  const handleNext = () =>{

    if(Nbquestion < 15){
      setNbquestion(Nbquestion+1);
      console.log('Question :');

      setquiz(!quiz);
      setText("");
      setTimer(15);
      setReset(true);
      randomQ = Math.floor(Math.random() * (data.length));
      currentQuiz = data[randomQ];


        Question = currentQuiz.city;
        correctOption= currentQuiz.country;
        Answers = [currentQuiz.country];
        for (let i = 0; i < 2; i++) {
        randomA = Math.floor(Math.random() * (data.length));
        while (Answers.includes(data[randomA].country)) {
          randomA = Math.floor(Math.random() * (data.length));
        }
        Answers.push(data[randomA].country);
        }

      console.log(currentQuiz);
      console.log(Answers);
      Shuffle(Answers);
      setcurrentQuestion(Question);
      setcurrentOptions(Answers);
      setcorrectAnswer(correctOption);
      setoptionSelected("");
      setendGame(false);
      }else{
        setstatus("end");
        setTimings(false);
      }
  }

  React.useEffect(() => {
    handleNext();
}, [])


  React.useEffect(()=>{
    let interval=null;
    let counter =15;

    if(timings){
      console.log('timing');
      counter =15;
      interval = setInterval(() => {
        setTimer(timer => timer-1);
        counter--;
        if (counter==0){
          setendGame(true);
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
    setTimings(true);
  }



  const showNextButton = () =>{
    if (endGame){
      return(
        <View style={{padding:10,alignItems: 'center', marging : 0}}>
        <Text style={[styles.text,
          {
              color : correctAnswer == optionSelected ? 'green' : 'red',
              fontWeight : 'bold',
              fontSize : 20,
          }]} >
            {correctAnswer == optionSelected ? 'Correct !' : 'Wrong !'}
        </Text>
        <Text style={[styles.text,
          {
              color : 'white',
              fontWeight : 'bold',
              fontSize : 20,
              marginBottom : 10,
          }]} >
            {correctAnswer == optionSelected ? null : quiz ? null :'Correct Answer : '+ correctAnswer}
        </Text>
        <Button
        onPress={() => handleNext()}
        title="Suivant"
        color="#508fa0"
        accessibilityLabel="Next button"/>
        </View>
      )
    } else {
      return(null)
    }
  }

    const renderQuestion = () => {
      return (
        <View style={{justifyContent: 'flex-start', width : '100%',}}>
      <View style={{padding : 10,}}> 
          <Text style = {{
            fontSize : 15,
            fontWeight : 'bold',
            color : 'white',
            opacity : 0.6,
          }}>{status == "game"? Nbquestion + " / 15 ": null}</Text> 
        </View>
      <View style= {{}}>
          <Text style={styles.consigne}>Donner le Pays dont la capitale est</Text>
          <View style={{marginVertical : 30, alignItems : 'center'}}>
          <Text style={
          styles.element}> 
            {currentQuestion}
        </Text>
          </View>
        
      </View>
      </View>
      )
  }


  const renderAnswer = () => {
      return (
        <View style={[styles.selection,]}>
            
            {
              currentOptions.map((option) => {
                return (
                  <Pressable key={option}
                    disabled={endGame}
                    onPress={() => {validateAnswer(option)}}
                    style={({ pressed }) => [{backgroundColor: pressed? 'rgb(210, 230, 255)': 'white'},styles.options]}>
                    {({ pressed }) => (
                    <Text style={[styles.optionsText,
                    {
                        color : endGame? correctAnswer == option ? 'green' : optionSelected == option ? 'red' : 'black' : 'black',
                    }]} >
                      {option}
                    </Text>
                    )}
                  </Pressable>
                )
              })
            }

        </View>
      )
    }


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
        <Text style={styles.score}> {NbquestionCorrect} / {Nbquestion} </Text>
      </View>
      <Button
      onPress={() => navigation.navigate('Exercices sur les Noms')}
      title="Retour au Menu"
      color="#508fa0"
      accessibilityLabel="Retour au Menu"/>
    </View>)}

  const Game = () => {
    return(
    <View style={{height : '70%', justifyContent: 'space-evenly'}}> 
      <View style={{justifyContent: 'flex-start', width : '100%',}}>
      <View style={{padding : 10,}}> 
          <Text style = {{
            fontSize : 20,
            fontWeight : 'bold',
            color : 'white',
            opacity : 0.6,
          }}>{status == "game"? Nbquestion + " / 15 ": null}</Text> 
        </View>
      <View style= {{}}>
          <Text style={styles.consigne}>Donner le Pays dont la capitale estn</Text>
          <View style={{marginVertical : 30, alignItems : 'center'}}>
          <Text style={
          styles.element}> 
            {currentQuestion}
        </Text>
          </View>
        
      </View>
      </View>
      
    <View style={{padding:10,alignItems: 'center'}}>
      <TextInput
      style={[styles.input,{marginBottom: 10}]}
      placeholder="Type here plz"
      onChangeText={newText => setText(newText)}
      defaultValue={text}
      />
     <Button
      onPress={() => validateAnswer(text)}
      title="Validate"
      color="#508fa0"
      accessibilityLabel="Validate"/>
    </View>
    </View>
    )}


    return (
      <View style={{flex : 1, backgroundColor: '#081621',}}>

        { status == "start"? start() : status == "end" ? end(): quiz? 
          <View style={{height : '100%', justifyContent :'space-evenly', alignItems: 'center'}}>
            {renderQuestion()}
            {renderAnswer()}
            {status != "game" || endGame ? null :  <Text style={[styles.text, {fontSize : 20}]}>{timer}</Text>  }
            {showNextButton()}
          </View>
        : 
        <View style={{height : '100%', justifyContent : 'flex-start', alignItems : 'center'}}>
            {Game()}
            {status != "game" || endGame ? null :  <Text style={[styles.text, {fontSize : 20}]}>{timer}</Text>  }
            {showNextButton()}
          </View>
         }
      </View>
    );
    }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
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
    optionsText: {
      fontSize: 20
    },
    options: {
      borderRadius: 8,
      padding: 8,
      margin: 5

    },
    element : {
      fontSize: 30,
      color : 'white',
      fontWeight : 'bold',
      margin : 10,
      backgroundColor : '#43a095',
      borderRadius : 10,
      padding : 5,
    },
    elementBox : {
      justifyContent: 'center',
    },
    consigne : {
      fontSize: 25,
      fontWeight: 'bold',
      color : 'white',
      paddingHorizontal : 10,
    },
    selection : {
      marginTop : 10,
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
    },
  });


