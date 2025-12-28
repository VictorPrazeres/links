import { MaterialIcons } from "@expo/vector-icons"
import { Image, TouchableOpacity, View } from "react-native"

import { colors } from "@/styles/colors"
import { styles } from "./styles"

import { Categories } from "@/components/categories"
import { Link } from "@/components/link"

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <Categories />

      <Link
        name="Rocketseat"
        url="https://www.rocketseat.com.br"
        onDetails={() => console.log("Clicou!")}
      />
    </View>
  )
}
