import { MaterialIcons } from "@expo/vector-icons"
import { router, useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { linkStorage, LinkStorage } from "@/storage/link-storage"
import { colors } from "@/styles/colors"
import { categories } from "@/utils/categories"
import { styles } from "./styles"

import { Categories } from "@/components/categories"
import { Link } from "@/components/link"
import { Option } from "@/components/option"

export default function Index() {
  const [showModal, setShowModal] = useState(false)
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage)
  const [links, setLinks] = useState<LinkStorage[]>([])
  const [category, setCategory] = useState(categories[0].name)

  async function getLinks() {
    try {
      const response = await linkStorage.get()

      const filtered = response.filter((link) => link.category === category)

      setLinks(filtered)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível listar os links")
    }
  }

  function handleDetails(selected: LinkStorage) {
    setShowModal(true)
    setLink(selected)
  }

  async function linkRemove() {
    try {
      await linkStorage.remove(link.id)
      getLinks()
      setShowModal(false)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o link")
      console.error(error)
    }
  }

  function handleRemove() {
    Alert.alert("Excluir", "Deseja realmente excluir o link?", [
      { style: "cancel", text: "Não" },
      {
        text: "Sim",
        onPress: linkRemove,
      },
    ])
  }

  async function handleOpen() {
    try {
      let address = link.url

      // Se não começar com http ou https, adiciona o https:// na frente
      if (!address.startsWith("http://") && !address.startsWith("https://")) {
        address = "https://" + address
      }

      // Verifica se o celular consegue abrir esse link antes de tentar
      const canOpen = await Linking.canOpenURL(address)

      if (canOpen) {
        await Linking.openURL(address)
        setShowModal(false)
      } else {
        Alert.alert("Link", "Não foi possível abrir este link específico.")
      }
    } catch (error) {
      Alert.alert("Link", "Não foi possível abrir o link")
      console.error(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLinks()
    }, [category])
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity onPress={() => router.navigate("/add")}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <Categories onChange={setCategory} selected={category} />

      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={() => handleDetails(item)}
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>{link.category}</Text>

              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>{link.name}</Text>
            <Text style={styles.modalUrl}>{link.url}</Text>

            <View style={styles.modalFooter}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={handleRemove}
              />

              <Option name="Abrir" icon="language" onPress={handleOpen} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
