import { MaterialIcons } from "@expo/vector-icons"
import { Pressable, PressableProps, Text } from "react-native"

import { colors } from "@/styles/colors"
import { styles } from "./styles"

type Props = PressableProps & {
  name: string
  icon: keyof typeof MaterialIcons.glyphMap
}

export function Category({ name, icon, ...rest }: Props) {
  return (
    <Pressable style={styles.container} {...rest}>
      <MaterialIcons name={icon} size={16} color={colors.gray[400]} />
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  )
}
