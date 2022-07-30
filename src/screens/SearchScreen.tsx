import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../theme/appTheme';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

export const SearchScreen = () => {

  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();
  const [term, setTerm] = useState(``);

  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  useEffect(() => {

    if(term.length === 0) return setPokemonFiltered([]);

    setPokemonFiltered(simplePokemonList.filter(poke => poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())))

  }, [term])

  if (isFetching) return (
    <View style={{ flex: 1, justifyContent: `center`, alignItems: `center` }}>
      <ActivityIndicator />
    </View>
  )

  return (
    <View>

        <SearchInput
          onDebounce={(value) => { setTerm(value) }}
        />

        <FlatList
          data={pokemonFiltered}
          keyExtractor={(pokemon) => pokemon.id}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
              }}
            >
              {term}
            </Text>
          }
          renderItem={({ item }) => <PokemonCard pokemon={item} />} 
          showsVerticalScrollIndicator={false}
        />
    </View>
  )
}
