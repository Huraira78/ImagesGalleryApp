import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client/react';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store/store';
import { client } from './src/graphql/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor="black" translucent={false} />
          <AppNavigator />
        </Provider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

