
import React, { useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles' 

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [partipantName, setParticipantName] = useState('');

  function handleParticipantAdd() {
     if (participants.includes(partipantName)) {
      return Alert.alert('Aviso', 'Já existe um participannte na lista com esse nome!')
     }
     
     setParticipants(prevState => [...prevState, partipantName]);
     setParticipantName('');
  }
  function handleParticipantRemove(name: string) {
      Alert.alert('Remover', `Remover participannte ${name}?`, [
        {
          text: 'Sim',
          onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
          Nome do evento
        </Text>
      <Text style={styles.eventDate}>
        Sexta, 28 de Junho de 2024.
        </Text>
       <View style={styles.form}>
        <TextInput 
        style={styles.input}
        placeholder='Nome do participante'
        placeholderTextColor="#6b6b6b"
        onChangeText={setParticipantName}
        value={partipantName}
       /> 

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
        <Text style={styles.buttonText}>
          +
        </Text>
        </TouchableOpacity> 
      </View>
    
      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
            <Participant 
              key={item}
              name={item}
              onRemove={() => handleParticipantRemove(item)}
              />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Niguém chegou no evento ainda? Adicione participantes a sua lista de presença!
          </Text>
        )}
      />
    </View>
  )
}