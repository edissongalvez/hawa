import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { UserProvider } from '../context/UserContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
          
          {/* <Stack.Screen name='productCategory/create' options={{ title: 'Crear categoría de producto', presentation: 'formSheet', headerTitleAlign: 'center' }} />
          <Stack.Screen name='productCategory/[productCategoryId]' options={{ title: 'Categoría de producto', presentation: 'card', headerTitleAlign: 'center' }} /> 
          <Stack.Screen name='productCategory/edit/[productCategoryId]' options={{ title: 'Editar categoría de producto', presentation: 'card', headerTitleAlign: 'center' }} /> */}

          {/* <Stack.Screen name='product/create' options={{ title: 'Crear producto', presentation: 'formSheet', headerTitleAlign: 'center' }} />
          <Stack.Screen name='product/[productId]' options={{ title: 'Producto', presentation: 'card', headerTitleAlign: 'center' }} />
          <Stack.Screen name='product/edit/[productId]' options={{ title: 'Editar producto', presentation: 'card', headerTitleAlign: 'center' }} /> */}

          {/* <Stack.Screen name='discount/create' options={{ title: 'Crear descuento', presentation: 'formSheet', headerTitleAlign: 'center' }} />
          <Stack.Screen name='discount/[discountId]' options={{ title: 'Descuento', presentation: 'card', headerTitleAlign: 'center' }} />
          <Stack.Screen name='discount/edit/[discountId]' options={{ title: 'Editar descuento', presentation: 'card', headerTitleAlign: 'center' }} /> */}

          <Stack.Screen name='user/login' options={{ title: 'Iniciar sesión', presentation: 'modal', headerTitleAlign: 'center' }} />
          <Stack.Screen name='user/create' options={{ title: 'Crear cuenta', presentation: 'formSheet', headerTitleAlign: 'center' }} />
          <Stack.Screen name='user/edit' options={{ title: 'Editar cuenta', presentation: 'card', headerTitleAlign: 'center' }} />

          {/* <Stack.Screen name='orderDetails' options={{ title: 'Historial de ordenes', presentation: 'card', headerTitleAlign: 'center' }} /> */}
        </Stack>
      </ThemeProvider>
    </UserProvider>
  );
}
