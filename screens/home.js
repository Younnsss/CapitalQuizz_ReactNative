import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, Linking } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));
const StatusHeight = StatusBar.currentHeight;
const { height, width } = Dimensions.get('screen');


export default function HomeScreen({navigation}){
    return(
        <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <Block space="between" style={styles.padded}>
            <Block>
              <Block middle >
                <Image source={require('../assets/home.png')}
                  style={{ marginBottom: theme.SIZES.BASE * 5}}/>
              </Block>
              <Block >
                <Block>
                  <Text color="white" size={60}>Capital</Text>
                </Block>
                <Block row>
                  <Text color="white" size={60}>Quizz</Text>
                </Block>
              </Block>
              <Text size={16} color='rgba(255,255,255,0.6)' style={{ marginTop: 35 }}>
              Découvrez et apprenez les capitales et leurs pays associé au travers de divers quiz ludiques et interactifs.
              </Text>
              <Block row style={{ marginTop: theme.SIZES.BASE * 1.5, marginBottom: theme.SIZES.BASE * 4 }}>
              </Block>
              <Button
                shadowless
                style={styles.button}
                color='#508fa0'
                onPress={()=> navigation.navigate('Exercices sur les Noms')}>
                <Text bold color={theme.COLORS.WHITE}>GET STARTED</Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.BLACK,
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
      },
      padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        zIndex: 3,
        position: 'absolute',
        bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
      },
      button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
      },
      pro: {
        backgroundColor: '#11CDEF',
        paddingHorizontal: 8,
        marginLeft: 3,
        borderRadius: 4,
        height: 22,
        marginTop: 15
      },
      gradient: {
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 66,
      },
  });