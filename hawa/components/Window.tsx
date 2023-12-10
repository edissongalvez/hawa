import { Alert, Platform } from 'react-native'

export function Notify(
    props: { title: string, desc: string }
) {
    return (
        Platform.OS === 'web' ?
            (window.alert(props.title + '\n' + props.desc))
        :
            Alert.alert(props.title, props.desc)
    )
}

export function Confirm(
    props: { title: string, desc: string, action?: () => void }
) {
    return (
        Platform.OS === 'web' ?
            (window.confirm(props.title + '\n' + props.desc) && props.action && props.action())
        :
            Alert.alert(props.title, props.desc, [{ text: 'Sí', onPress: props.action }, { text: 'No', onPress: () => null, style: 'cancel' }])
    )
}