import React, { useEffect, useState, useRef } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SimplePokemon } from "../interfaces/pokemonInterfaces";
import { FadeInImage } from "./FadeInImage";
import ImageColors from 'react-native-image-colors'
import { useNavigation } from "@react-navigation/native";

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

    const navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;

    const [bgColor, setBgColor] = useState(`grey`);
    const isMounted = useRef(true);

    const getBackgroundColors = async () => {
        const result = await ImageColors.getColors(pokemon.picture, {
            fallback: 'grey',
            cache: true,
          });

          switch (result.platform) {
            case 'android':
              // android result properties
              setBgColor(result.vibrant || `grey`)
              break
            case 'web':
              // web result properties
              setBgColor(result.lightVibrant || `grey`)
              break
            case 'ios':
              // iOS result properties
              setBgColor(result.background || `grey`)
              break
            default:
              throw new Error('Unexpected platform key')
          }
    }


    useEffect(() => {

        if (!isMounted) return;

        getBackgroundColors();

        //el return del useeffect hace trigger cuando el componente será desmontado
        //Cuando el componente va a ser desmontado ponemos el useref en false
        //para que no hayan actualizaciones en el state en un componenete que está desmontado para que no haya memory leak
        return () => {
            isMounted.current = false;
        } 

    }, []);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => {
        navigation.navigate('PokemonScreen', { simplePokemon: pokemon, color: bgColor })
        }}>
        <View style={{...styles.cardContainer, width: windowWidth * 0.4, backgroundColor: bgColor}}>
            <Text style={styles.name}> {pokemon.name} </Text>
        

            <Image
                source={require('../assets/pokebola-blanca.png')}
                style={styles.pokebola}
            />


        <FadeInImage 
            uri={pokemon.picture}
            style={styles.pokemonImage}
        />
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        backgroundColor: `red`,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
    },
    name: {
        color: `white`,
        fontSize: 20,
        fontWeight: `bold`,
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: `absolute`,
        opacity: 0.5,
        bottom: -20,
        right: -20,
    },
    pokemonImage: {
        width: 110,
        height: 110,
        position: `absolute`,
        right: -8,
        bottom: -5,
    },
})


{/* <FadeInImage
            uri={item.picture}
            style={{
              width: 100,
              height: 100,
            }}
          /> */}