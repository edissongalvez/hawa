import { Image, ScrollView, StyleSheet, View as ViewDefault } from 'react-native'

import { Button, Text, View } from '../components/Themed'
import Header from './Header'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export function HorizontalList(
   props: { title: string, items?: any[], link?: string, href?: string }
) {
    return (
        <>
            <Header title={props.title} link={props.link} href={props.href} />
            { props.items ? (
                <ScrollView contentContainerStyle={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {props.items.map((item) => (
                        <Link href={`/product/${item.id}`} key={item.id}>
                            <View style={styles.item}>
                                {/* <Image style={styles.itemImage} source={{ uri: Url.api + '/' + item.image }} /> */}
                                <Image style={styles.itemImage} source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${item.image.replace(/\\/g, '/')}` }} />
                                <Text style={styles.itemText} numberOfLines={1}>
                                    {item.name}
                                </Text>
                                <View style={styles.itemPrice}>
                                    <Button tertiary action={`S/. ${ item.discount.active ? (item.price * (1 - item.discount.discountPercent)).toFixed(2) : Number(item.price).toFixed(2) }`} />
                                    { item.discount.active ? <Text tint><Ionicons name='pricetags'/></Text> : null }
                                    
                                </View>
                            </View>
                        </Link>
                    ))}
                </ScrollView>
            ) : (
                <Text>Lista vacía</Text>
            ) }
            
        </>

    )
}

export function VerticalList(
    props: { title: string, desc: string, items?: any[], link?: string, href?: string }
) {
    return (
        <>
            <Header title={props.title} link={props.link} href={props.href} />
            <Text secondary style={styles.descText}>{props.desc}</Text>
            {props.items ? (
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {props.items.map((item) => (
                        <Link href={`/product/${item.id}`} key={item.id}>
                            <View style={styles.itemV}>
                                <Image style={styles.itemImage} source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${item.image.replace(/\\/g, '/')}` }} />
                                <View style={{ flex: 1, gap: 8 }}>
                                    <View>
                                        <Text style={styles.nameText}>
                                            {item.name}
                                        </Text>
                                        <Text secondary style={styles.descText}>
                                            {item.desc}
                                        </Text>
                                    </View>
                                    <View style={styles.itemPrice}>
                                        <Button tertiary action={`S/. ${ item.discount.active ? (item.price * (1 - item.discount.discountPercent)).toFixed(2).toString() : Number(item.price).toFixed(2) }`} />
                                        { item.discount.active ? <Text tint><Ionicons name='pricetags'/></Text> : null }
                                    </View>
                                    
                                </View>
                            </View>
                        </Link>
                    ))}
                </ScrollView>
            ) : (
                <Text>Lista vacía</Text>
            )}
        </>
    )
}

export function BoxItem(
    props: { name: string, value: string }
) {
    return (
        <ViewDefault style={styles.boxItem}>
            <Text>{props.name}</Text>
            <Text secondary>{props.value}</Text>
        </ViewDefault>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        gap: 16
    },
    item: {
        alignItems: 'center',
        gap: 12,
        width: 128
    },
    itemImage: {
        height: 128,
        width: 128,
        borderRadius: 64
    },
    itemText: {
        // fontSize: 17,
        textAlign: 'center'
    },
    itemV: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    nameText: {
        // fontSize: 17,
        fontWeight: 'bold'
    },
    descText: {
        fontSize: 15
    },
    itemPrice: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    boxItem: {
        paddingHorizontal: 16,
        minHeight: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})