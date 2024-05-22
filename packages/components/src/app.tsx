import React from "react"
import {SafeAreaProvider} from "react-native-safe-area-context";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MoviesScreen} from "components/src/features/movies/screen";
import {PaperProvider} from "react-native-paper";
import {appTheme} from "components/src/resources/theme/theme";
import {ThemeProvider} from "@emotion/react";
import 'components/src/resources/translations';
import {store} from "components/src/store";
import {Provider} from "react-redux";


const Stack = createNativeStackNavigator();

export const App = () => {
    return <Provider store={store}><ThemeProvider theme={appTheme}>
        <PaperProvider theme={appTheme}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="MoviesScreen"
                            component={MoviesScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </PaperProvider>
    </ThemeProvider>
    </Provider>
}
