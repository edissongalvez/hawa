// import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons'
import { Link, Tabs, router } from 'expo-router'
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native'

import Colors from '../../constants/Colors'
import { useUser } from '../../context/UserContext'
import { Notify } from '../../components/Window'
import { BlurView } from 'expo-blur'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { user, setUser } = useUser()
  const colorScheme = useColorScheme()

  const handleLogout = async () => {
    try {
        setUser(null)
        // await AsyncStorage.clear()
        router.push('/')
        Notify({ title: 'Sesión cerrada', desc: 'Hasta pronto' })
    } catch (error) {
        Notify({ title: 'Error al cerrar sesión', desc: 'Intente nuevamente' })
    }
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: { position: 'absolute', borderWidth: 0 },
        tabBarBackground: () => <BlurUI />,
        headerTransparent: true,
        headerBackground: () => <BlurUI />
      }}>
      <Tabs.Screen
        name='offers'
        options={{
          title: 'Ofertas',
          tabBarIcon: ({ color }) => <TabBarIcon name='pricetags' color={color} />,
          headerRight: () => (
            user?.adminUser ? <View style={{ flexDirection: 'row' }}>
              <Link href='/discount/create' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name='pricetags-outline'
                      size={25}
                      color={Colors[colorScheme ?? 'light'].tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View> : null
          )
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          title: 'Orden',
          tabBarIcon: ({ color }) => <TabBarIcon name='fast-food' color={color} />,
          headerRight: () => (
            user?.adminUser ? <View style={{ flexDirection: 'row' }}>
              <Link href='/productCategory/create' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name='layers-outline'
                      size={25}
                      color={Colors[colorScheme ?? 'light'].tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href='/product/create' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name='restaurant-outline'
                      size={25}
                      color={Colors[colorScheme ?? 'light'].tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            </Link>
          </View> : null
          ),
        }}
      />
      <Tabs.Screen
        name='cart'
        options={{
          title: 'Carrito',
          tabBarIcon: ({ color }) => <TabBarIcon name='cart' color={color} />,
          headerRight: () => (
            user ? <View style={{ flexDirection: 'row' }}>
              {user.adminUser &&
                <Link href='/orderDetails' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name='file-tray-stacked-outline'
                      size={25}
                      color={Colors[colorScheme ?? 'light'].tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              }
              <Link href='/orderDetails' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name='receipt-outline'
                      size={25}
                      color={Colors[colorScheme ?? 'light'].tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href='/paymentDetail/create' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name='cash-outline'
                      size={25}
                      color={Colors[colorScheme ?? 'light'].tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
            </Link>
          </View> : null
          ),
        }} 
      />
      <Tabs.Screen
        name='account'
        options={{
          title: 'Cuenta',
          tabBarIcon: ({ color }) => <TabBarIcon name='person-circle' color={color} />,
          headerRight: () => (
            user ? <Pressable onPress={handleLogout}>
              {({ pressed }) => (
                <Ionicons
                  name='exit-outline'
                  size={25}
                  color={Colors[colorScheme ?? 'light'].tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable> : null
          )
        }} 
      />
    </Tabs>
  )
}

function BlurUI () {
  const colorScheme = useColorScheme()

  return <BlurView tint={colorScheme === 'light' ? 'light' : 'dark'} intensity={100} style={StyleSheet.absoluteFill} />
}