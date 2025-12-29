import { TextInput, TextInputProps } from "react-native"

import { colors } from "@/styles/colors"
import { styles } from "./styles"

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={styles.container}
      placeholderTextColor={colors.gray[400]}
      {...rest}
    />
  )
}
