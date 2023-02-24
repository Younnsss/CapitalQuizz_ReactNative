
import { StyleSheet, View, Button } from 'react-native';
import { Text, Block } from 'galio-framework'
import * as React from 'react';

import {
  ListItem,
  Avatar,
} from '@rneui/themed';

import { LinearGradient } from 'expo-linear-gradient';

export default function NomsExercices({navigation}) {
    return (
      <Block style={{flex: 1, justifyContent: 'flex-start', backgroundColor: '#081621',}}>
      <Text style={{fontSize:30, fontWeight: 'bold', color: 'white', marginTop: 20, marginLeft: 20}}>Bienvenue !</Text>
      <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#081621',}}>


<ListItem
      onPress={() => navigation.navigate('Decouvrir')}
      linearGradientProps={{
        colors: ['#43a095', '#96d7cf'],
        start: [1, 0],
        end: [0.2, 0],
      }}
      ViewComponent={LinearGradient}
      containerStyle={{
        marginHorizontal: 16,
        marginBottom: 30,
        borderRadius: 8,
      }}
    >
      <Avatar rounded source={require('../assets/loupe.png')} />
      <ListItem.Content>
        <ListItem.Title
          style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}
        >
          Découvrir
        </ListItem.Title>
        <ListItem.Subtitle style={[{ color: 'white' }]}>
        Découvrez les capitales et leur pays associés de façon ludique et rapide au travers d'un quiz infini.
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color="white" />
    </ListItem>


    <ListItem
      onPress={() => navigation.navigate('Sexercer')}
      linearGradientProps={{
        colors: ['#508fa0', '#83c0d0'],
        start: [1, 0],
        end: [0.2, 0],
      }}
      ViewComponent={LinearGradient}
      containerStyle={{
        marginHorizontal: 16,
        marginBottom: 30,
        borderRadius: 8,
      }}
    >
      <Avatar rounded source={require('../assets/engrenage.png')} />
      <ListItem.Content>
        <ListItem.Title
          style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}
        >
          S'exercer
        </ListItem.Title>
        <ListItem.Subtitle style={[{ color: 'white' }]}>
        Exercez-vous au travers de ce test constitué de 15 questions, 1 point par question :  essayer d'obtenir le plus grand score.
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color="white" />
    </ListItem>


    <ListItem
      onPress={() => navigation.navigate('Sevaluer')}
      linearGradientProps={{
        colors: ['#5077a0', '#96b4d3'],
        start: [1, 0],
        end: [0.2, 0],
      }}
      ViewComponent={LinearGradient}
      containerStyle={{
        marginHorizontal: 16,
        marginBottom: 30,
        borderRadius: 8,
      }}
    >
      <Avatar rounded source={require('../assets/graduate.png')} />
      <ListItem.Content>
        <ListItem.Title
          style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}
        >
          S'évaluer
        </ListItem.Title>
        <ListItem.Subtitle style={[{ color: 'white' }]}>
        Testez vos connaissances à l'aide de cet examen final. Vous devez entrer un nouveau pays chaque 15 secondes. Essayez d'en saisir le maximum.

        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color="white" />
    </ListItem>


{/* 
        <View style={styles.container}>
          <Text style={styles.titre}>Découvrir </Text>
          <Text style={styles.text}>Découvrez les noms d'Allah de facon ludique et rapide au travers d'un quiz infini.  </Text>
          <Button
            title="Go"
            color={'#508fa0'}
            onPress={() => navigation.navigate('Decouvrir')}
          />
        </View>
  
        <View style={styles.container}>
          <Text style={styles.titre}>S'exercer </Text>
          <Text style={styles.text}>Exercez-vous au travers de ce test constitué de 15 questions. Il y a 1 point par question, essayer d'obtenir le plus de point possible  </Text>
          <Button
            title="Go"
            color={'#508fa0'}
            onPress={() => navigation.navigate('Sexercer')}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.titre}>S'evaluer </Text>
          <Text style={styles.text}>Testez vos connaissances à l'aide de cet examen finale. Il faut entrer tous les noms d'Allah selon un temps limité </Text>
          <Button
            title="Go"
            color={'#508fa0'}
            onPress={() => navigation.navigate('Sevaluer')}
          />
        </View> */}

      </View>

      </Block>
      );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#081621',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection : 'column'
    },
    text: {
      color: 'white',
      fontSize: 15,
      padding : 15
    },
    titre : {
      color: 'white',
      fontSize: 25,
      padding : 10,
    }
  });