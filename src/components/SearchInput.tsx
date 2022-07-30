import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDebouncedValue } from '../hooks/useDebouncedValue';

interface Props  {
  onDebounce: (value: string) => void;
}

export const SearchInput = ({ onDebounce }: Props) => {
 
  const [textValue, setTextValue] = useState(``);

  const debouncedValue = useDebouncedValue(textValue);
  
  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={styles.container}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="Buscar pokemon"
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />

        {/* @ts-ignore */}
        <Ionicons name="search-circle" size={42} color="grey" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textBackground: {
    backgroundColor: `#F3F1F3`,
    borderRadius: 50,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: `center`,
    alignContent: `center`,
    flexDirection: `row`,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
});
