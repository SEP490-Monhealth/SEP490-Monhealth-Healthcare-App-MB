import AsyncStorage from "@react-native-async-storage/async-storage"

export const getAllStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    const items = await AsyncStorage.multiGet(keys)

    console.log("All Items in AsyncStorage:")
    items.forEach(([key, value]) => {
      console.log(`${key}: ${value}`)
    })
  } catch (error) {
    console.log("Error fetching AsyncStorage items:", error)
  }
}

export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear()
    console.log("AsyncStorage cleared successfully!")
  } catch (error) {
    console.log("Error clearing AsyncStorage:", error)
  }
}
