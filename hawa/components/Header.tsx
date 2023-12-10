import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'

import { Text, View } from './Themed'
import Colors from '../constants/Colors'

export default function Header(
    props: Omit<React.ComponentProps<typeof Link>, 'href'> & { title: string, link?: string, href?: string }
) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                {props.title}
            </Text>
            { props.link ? (
                <Link style={styles.headerLink} href={props.href}>
                    <Text lightColor={Colors.light.tint} darkColor={Colors.dark.tint}>{props.link}</Text>
                </Link>
            ) : null }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    headerLink: {
        fontSize: 17
    }
})