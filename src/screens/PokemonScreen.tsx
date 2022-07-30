import { useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootStackParams } from "../navigation/Navigator";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from "../components/FadeInImage";
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from "../components/PokemonDetails";

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{};

export const PokemonScreen = ( { navigation, route }: Props ) => {

  const { top } = useSafeAreaInsets();

  const { simplePokemon, color } = route.params;
  const { name, picture, id } = simplePokemon;

  const { isloading, pokemon: pokemonFull } = usePokemon(id);

  return (
    <View style={{ flex: 1 }}>


    <View style={{...styles.headerContainer, backgroundColor: color}}>
      <Text style={{...styles.name, top: top + 20}}>{name + '\n'}#{id}</Text>

      <Image source={require('../assets/pokebola-blanca.png')} style={styles.pokebola} />

      <FadeInImage uri={picture} style={styles.pokemonImage}/>
    </View>

{isloading ? (
    <View style={styles.loadingIndicator}>
      <ActivityIndicator color={color} size={50} />
    </View>

) : (
  <PokemonDetails pokemon={pokemonFull} />
)}

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: `center`,
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000
  },
  backButton: {
    position: `absolute`,
    left: 20,
    bottom: 20
  },
  name: {
    color: `white`,
    fontSize: 40,
    alignSelf: `flex-start`,
    left: 20
  },
  pokebola: {
    height: 250,
    width: 250,
    bottom: -10,
    opacity: 0.7    
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: `absolute`,
    bottom: -15
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`
  }
})
