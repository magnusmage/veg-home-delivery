import { AsyncStorage } from "react-native";

class Storage {

  static async retrieveData(key) {
    try {
      if(key){
        const retrievedItem =  await AsyncStorage.getItem(key);
        const item = JSON.parse(retrievedItem);
        return item;
      }
      } catch (error) {
      }
  }

  static async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    }
  }

  static async mergeData(key, value) {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (error) {
    }
  }

  static async getAllKeys() {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      return allKeys;
    } catch (error) {
    }
  }

  static async removeData(key, value) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
    }
  }
  
}
export default Storage;
