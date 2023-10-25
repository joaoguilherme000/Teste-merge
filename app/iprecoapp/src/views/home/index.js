import * as React from 'react';
import { Button, View, Text } from 'react-native';

function HomeScreen({ navigation }) {
  return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Camera</Text>
      <Button
        title="Go to Result"
        onPress={() => navigation.navigate('Result')}
      />
    </View>
  );
}

export default HomeScreen;