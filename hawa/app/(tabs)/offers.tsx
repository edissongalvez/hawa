import { Image, Pressable, StyleSheet } from 'react-native'

import { Body, View as ThemedView, Text} from '../../components/Themed'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import DiscountController, { Discount } from '../../classes/discount'
import { router } from 'expo-router'

export default function TabTwoScreen() {
  const [discounts, setDiscounts] = useState<Discount[]>()

  useEffect(() => {
    DiscountController.getDiscounts().then(discounts => setDiscounts(discounts.slice(1)))
  }, [])

  return (
    <Body>
      {discounts ? discounts?.map(discount => (
        <Pressable onPress={() => router.push(`/discount/${discount.id}`)} key={discount.id}>
            <ThemedView lightColor='rgba(255, 149, 0, .15)' darkColor='rgba(255, 159, 10, .15)' style={styles.card}>
              <View style={styles.imageBox} >
                { discount.products.length > 0 ? discount.products.map(product => (<Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${product.image.replace(/\\/g, '/')}` }} style={ discount.active ? styles.image : styles.imageFilter} key={product.id} />)) : <Text style={styles.desc} secondary>SIN PRODUCTOS</Text>}
              </View>
              <View>
                <Text style={styles.name} tint>{ discount.name }</Text>
                <Text style={styles.desc} secondary>{ discount.desc }</Text>
              </View>
          </ThemedView>
        </Pressable>
          
        
      )) : <Text>Cargando...</Text>}
    </Body>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16
  },
  link: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: 240,
    width: '100%'
  },
  imageBox: {
    flexDirection: 'row'
  },
  image: {
    height: 20,
    width: 20,
    borderRadius: 9,
    objectFit: 'cover'
  },
  imageFilter: {
    height: 20,
    width: 20,
    borderRadius: 9,
    objectFit: 'cover',
    filter: 'grayscale(100%)'
  },
  name: {
    fontWeight: 'bold'
  },
  desc: {
    fontSize: 15
  }
});
