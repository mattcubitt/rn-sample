import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Character = {
  name: string;
  score: number;
  type: string;
  weakness: string;
};
function App(): JSX.Element {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedHero, setHero] = useState<string | null>(null);
  const [selectedVillain, setVillain] = useState<string | null>(null);
  const [winnerText, setWinnerText] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://s3.eu-west-2.amazonaws.com/build-circle/characters.json')
      .then(response => response.json())
      .then(data => {
        setCharacters(data.items);
      });
  });

  const heros = characters.filter(character => character.type === 'hero');
  const villains = characters.filter(character => character.type === 'villain');

  return (
    <SafeAreaView>
      <Text style={styles.heading}>Heros:</Text>
      <ScrollView contentInsetAdjustmentBehavior="automatic" testID="herosList">
        {heros.length > 0 ? (
          heros.map((character, index) => (
            <View key={character.name + index} style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setHero(character.name)}
                testID={character.name}>
                <Text>
                  {selectedHero === character.name ? 'Un-select' : 'Select'}
                </Text>
              </TouchableOpacity>
              <Text>{character.name}</Text>
            </View>
          ))
        ) : (
          <Text>no items</Text>
        )}
      </ScrollView>
      <Text style={styles.heading}>Villains:</Text>
      {villains.length > 0 ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          testID="villainsList">
          {villains.map((character, index) => (
            <View key={character.name + index} style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setVillain(character.name)}
                testID={character.name}>
                <Text>
                  {selectedVillain === character.name ? 'Un-select' : 'Select'}
                </Text>
              </TouchableOpacity>
              <Text>{character.name}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>no items</Text>
      )}

      <View>
        <TouchableOpacity style={styles.fightButton}>
          <Text
            testID="fightButton"
            style={styles.fightButtonText}
            onPress={() => {
              const foundHero = heros.find(hero => hero.name === selectedHero);
              const foundVillain = villains.find(
                villain => villain.name === selectedVillain,
              );

              if (foundHero && foundVillain) {
                if (foundHero?.score >= foundVillain?.score) {
                  setWinnerText(`Hero ${foundHero?.name} wins`);
                } else {
                  setWinnerText(`Villain ${foundVillain?.name} wins`);
                }
              }
            }}>
            Flight!!!
          </Text>
        </TouchableOpacity>
      </View>
      <Text testID="winnerText">{winnerText}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {marginRight: 10},
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  fightButton: {
    width: 100,
  },
  fightButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
