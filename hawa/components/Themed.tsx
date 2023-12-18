/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React from 'react'
import { StyleSheet, Text as DefaultText, useColorScheme, View as DefaultView, ScrollView as DefaultScrollView, Pressable as DefaultPressable, TextInput as DefaultTextInput, Pressable } from 'react-native'
import { Picker as DefaultPicker } from '@react-native-picker/picker'
import Checkbox from 'expo-checkbox'

import Colors from '../constants/Colors'

type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']
export type ScrollViewProps = ThemeProps & DefaultScrollView['props']
export type PressableProps = ThemeProps & React.ComponentProps<typeof DefaultPressable>
export type TextFieldProps = ThemeProps & DefaultTextInput['props']
export type PickerProps = ThemeProps & React.ComponentProps<typeof DefaultPicker>
export type PickerItemProps = ThemeProps & React.ComponentProps<typeof DefaultPicker.Item>
export type ToggleProps = ThemeProps & Checkbox['props']

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text({secondary, tertiary, tint, ...props}: TextProps & { secondary?: boolean, tertiary?: boolean, tint?: boolean }) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const colorTint = useThemeColor({ light: lightColor, dark: darkColor }, 'tint')
  const colorSecondary = useThemeColor({ light: lightColor, dark: darkColor }, 'textSecondary')
  const colorTertiary = useThemeColor({ light: lightColor, dark: darkColor }, 'textTertiary')

  if (secondary) {
    return <DefaultText style={[{ color: colorSecondary, fontSize: 17 }, style]} {...otherProps} />
  } else if (tertiary) {
    return <DefaultText style={[{ color: colorTertiary, fontSize: 17 }, style]} {...otherProps} />
  } else if (tint) {
    return <DefaultText style={[{ color: colorTint, fontSize: 17 }, style]} {...otherProps} />
  } else {
    return <DefaultText style={[{ color, fontSize: 17 }, style]} {...otherProps} />
  }
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Box({ children, header, footer, ...props }: ViewProps & { header?: string, footer?: string } ) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'groupedBackground')
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'textSecondary')

  return (
    <View>
      {header && <Text style={{ color, fontSize: 13, paddingHorizontal: 16, marginBottom: 7 }}>{header}</Text>}
      <DefaultView style={[{ backgroundColor, borderRadius: 10 }, style]} {...otherProps}>
        {children}
      </DefaultView>
      {footer && <Text style={{ color, fontSize: 13, paddingHorizontal: 16, marginTop: 5 }}>{footer}</Text>}
    </View>
    
  )
}

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  return <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function Button({ action, secondary, tertiary, ...props }: PressableProps & { action: string, secondary?: boolean, tertiary?: boolean }) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint')
  const backgroundColorSecondary = useThemeColor({ light: lightColor, dark: darkColor }, 'groupedBackground')
  const backgroundColorTertiary = useThemeColor({ light: lightColor, dark: darkColor }, 'fillTertiary')

  if (secondary) {
    return <DefaultPressable style={{ backgroundColor: backgroundColorSecondary, minHeight: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 1 }} {...otherProps} ><Text style={{ color: backgroundColor }}>{action}</Text></DefaultPressable>
  } else if (tertiary) {
    return <DefaultPressable style={{ backgroundColor: backgroundColorTertiary, height: 34, borderRadius: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 }} {...otherProps} ><Text style={{ color: backgroundColor, fontSize: 15 }}>{action}</Text></DefaultPressable>
  } else {
    return <DefaultPressable style={{ backgroundColor, minHeight: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flex: 1}} {...otherProps} ><Text style={{ color: 'white' }}>{action}</Text></DefaultPressable>
  }    
}

export function TextField(props: TextFieldProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const placeholderTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'textTertiary')
  const cursorColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint')

  return <DefaultTextInput style={[{ color, minHeight: 44, padding: 16, fontSize: 17 }, style]} placeholderTextColor={placeholderTextColor} cursorColor={cursorColor} {...otherProps} />
}

export function Picker(props: PickerProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'tint')

  return <DefaultPicker style={[{ color, backgroundColor: 'transparent', minHeight: 44, padding: 16, fontSize: 17, borderWidth: 0 }, style]} {...otherProps} />
}

export function PickerItem({ label, value, ...props }: PickerItemProps & { label: string, value: any } ) {
  return <DefaultPicker.Item label={label} value={value} />
}

export function Toggle(props: ToggleProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'tint')

  return <Checkbox color={color} {...otherProps} />
}

export function Body({center, ...props}: ScrollViewProps & { center?: boolean }) {
  const { lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  return (
    <DefaultScrollView style={[{ backgroundColor }, styles.body]} contentContainerStyle={[styles.bodyContent, center ? { justifyContent: 'center', flex: 1 } : null]} { ...otherProps } />
  )
}

export function Separator(props: ViewProps) {
  const { lightColor, darkColor } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'separatorNonOpaque')

  return <DefaultView style={[{ backgroundColor }, styles.separator]}  />
}

export function Trailing(props: {children: React.ReactNode}) {
  return <DefaultView style={styles.trailing}>
    {props.children}
  </DefaultView>
}

export function TrailingButton(props: { onPress: () => void, label: string }) {
  return <Pressable onPress={props.onPress}>
    {({ pressed }) => (
      <Text tint style={{ fontWeight: '500', marginRight: 15, opacity: pressed ? 0.5 : 1 }} >{props.label}</Text>
    )} 
  </Pressable>
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 16,
    gap: 16,
    maxWidth: 672,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 49,
    marginTop: 64
  },
  separator: {
    marginHorizontal: 16,
    height: 1,
    // width: '80%',
  },
  trailing: {
    flexDirection: 'row'
  }

})