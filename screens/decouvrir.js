import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import * as React from 'react';
import data from '../storage/data.json';


export default function Decouvrir() {

  var randomQ, randomA, currentQuiz, Question,Answers, correctOption;
  const [currentQuestion, setcurrentQuestion] = React.useState("testT");
  const [currentOptions, setcurrentOptions] = React.useState(["test2", "test3", "test4", "test5"]);
  const [correctAnswer, setcorrectAnswer] = React.useState("");
  const [optionSelected, setoptionSelected] = React.useState("");
  const [endQuiz, setendQuiz] = React.useState(false);
  const [exercice, setexercice] = React.useState(true);

  function Shuffle(arr){
    for(var i =arr.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
  }
    
  const validateAnswer = (optionsSelected) =>{
    setoptionSelected(optionsSelected);
    setendQuiz(true);

  }

  const handleNext = () =>{

    setexercice(!exercice);


    randomQ = Math.floor(Math.random() * (data.length));
    currentQuiz = data[randomQ];
    if (exercice == true){
      Question = currentQuiz.country;
      correctOption= currentQuiz.city;
      Answers = [currentQuiz.city];
      for (let i = 0; i < 2; i++) {
        randomA = Math.floor(Math.random() * (data.length));
        while (Answers.includes(data[randomA].city)) {
          randomA = Math.floor(Math.random() * (data.length));
      }
      Answers.push(data[randomA].city);
      }
    
    }else{
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
    }
    console.log(currentQuiz);
    console.log(Answers);
    Shuffle(Answers);
    setcurrentQuestion(Question);
    setcurrentOptions(Answers);
    setcorrectAnswer(correctOption);
    setoptionSelected("");
    setendQuiz(false);
  }


  const showNextButton = () =>{
    if (endQuiz){
      return(
        <View>
        <Text style={[styles.text,
          {
              color : correctAnswer == optionSelected ? 'green' : 'red',
              marginVertical : 20,
              fontWeight : 'bold',
              fontSize : 20,
          }]} >
            {correctAnswer == optionSelected ? 'Correct !' : 'Wrong !'}
        </Text>
        <Button
        onPress={() => handleNext()}
        title="Next"
        color="#508fa0"
        accessibilityLabel="Learn more about this purple button"/>
        </View>
      )
    } else {
      return(null)
    }
  }

    const renderQuestion = () => {
      return (
        <View style={{alignItems : 'center', marginBottom : 100}}>
          <Text style={styles.consigne}>{ !exercice ? 'Donner la Capitale ' : 'Donner le Pays dont la capitale est '}</Text>
        <Text style={
          styles.element}> 
            {currentQuestion}
        </Text>
      </View>
      )
  }


  const renderAnswer = () => {
      return (
        <View style={styles.selection}>
            
            {
              currentOptions.map((option) => {
                return (
                  <Pressable key={option}
                    disabled={endQuiz}
                    onPress={() => {validateAnswer(option)}}
                    style={({ pressed }) => [{backgroundColor: pressed? 'rgb(210, 230, 255)': 'white'},styles.options]}>
                    {({ pressed }) => (
                    <Text style={[styles.optionsText,
                    {
                        color : endQuiz? correctAnswer == option ? 'green' : optionSelected == option ? 'red' : 'black' : 'black',
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

    React.useEffect(() => {
      handleNext();
  }, [])

    return (
      <View style={styles.container}>
        {renderQuestion()}
        {renderAnswer()}
        {showNextButton()}
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
      alignItems : 'center',
    },
    elementBox : {
      justifyContent: 'center',
    },
    consigne : {
      fontSize: 25,
      fontWeight: 'bold',
      color : 'white',
      marginBottom : 30,
    },
    selection : {
      marginTop : 10,
    }
  });



  // const [currentQuestion, setcurrentQuestion] = React.useState("Error");

  // function next()
  //   var random = Math.floor(Math.random() * (data.length));
  //   var currentQuiz =  data[random];
  //   setcurrentQuestion(currentQuiz.country);
  //   var Answers = [currentQuiz.city];
  //   for (let i = 0; i < 2; i++) {
  //     random = Math.floor(Math.random() * (data.length));
  //     while (Answers.includes(data[random].city)) {
  //       random = Math.floor(Math.random() * (data.length));
  //     }
  //     Answers.push(data[random].city);
  //   }
  //   Shuffle(Answers);
  //   console.log("test2");
  //   console.log(Answers)
  // }

  // const renderQuestion = () => {
  //     return (
  //       <View style={styles.container}>
  //     <Text style={
  //       {fontSize: 30,}}> 
  //         {currentQuestion}
  //     </Text>
  //     </View>
  //     )
  // }
  

  // const renderAnswer = () => {
  //   return (
  //     <View style={styles.container}>
  //         {
  //           Answers.map(function(option) {
  //             return (
  //               <Pressable key={option}
  //                 onPress={() => {next();}}
  //                 style={({ pressed }) => [{backgroundColor: pressed? 'rgb(210, 230, 255)': 'white'},styles.wrapperCustom]}>
  //                 {({ pressed }) => (
  //               <Text style={styles.text} >
  //                 {option}
  //               </Text>
  //               )}
  //               </Pressable>
  //             )
  //           })
  //         }
 
  //       </View>
  //   )
  // }



  // let random = Math.floor(Math.random() * (data.length));
//   let currentQuiz =  data[random];
//   const [currentQuestion, setcurrentQuestion] = React.useState(currentQuiz.country);
//   let Answers = [currentQuiz.city];
//   for (let i = 0; i < 2; i++) {
//     random = Math.floor(Math.random() * (data.length));
//     while (Answers.includes(data[random].city)) {
//       random = Math.floor(Math.random() * (data.length));
//     }
//     Answers.push(data[random].city);
//   }
//   Shuffle(Answers);
//   const [answer1, setanswer1] = React.useState(Answers[0]);
//   const [answer2, setanswer2] = React.useState(Answers[1]);
//   const [answer3, setanswer3] = React.useState(Answers[2]);
//   console.log("test1");
//   console.log(Answers);
//   console.log(currentQuiz);