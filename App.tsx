import React from 'react';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
// import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <GestureHandlerRootView>
          <NavigationContainer>
            <AppNavigator />;
          </NavigationContainer>
        </GestureHandlerRootView>
      {/* </PersistGate> */}
    </Provider>
  );
}
