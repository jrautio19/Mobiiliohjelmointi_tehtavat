import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, TextInput, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { firestore, collection, doc, addDoc, deleteDoc, updateDoc, onSnapshot } from "./firebase/Config";
import { useEffect, useState } from 'react';

type Product = {
  id: string
  text: string
  purchased: boolean
}

export default function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'shopping'), (snapshot) => {
      const data: Product[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[]
      setItems(data)
  })

  return () => unsubscribe()
}, [])

const addItem = async () => {
  if (item.trim() === '') return

  await addDoc(collection(firestore, 'shopping'), {
    text: item,
    purchased: false
  })

  setItem('')
}

const togglePurchased = async (id: string) => {
  const item = items.find((i) => i.id === id)
  if (!item) return;

  const itemRef = doc(firestore, "shopping", id)
  await updateDoc(itemRef, {
    purchased: !item.purchased, 
  })
}

const deleteItem = async (id: string) => {
  await deleteDoc(doc(firestore, 'shopping', id))
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <TextInput
        placeholder='Add items to the list'
        value={item}
        onChangeText={setItem}
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Add item" onPress={addItem} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => togglePurchased(item.id)}>
              <Text style={[styles.itemText, item.purchased && styles.purchasedText]}>
                {item.text}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,    
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
  purchasedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  deleteText: {
    color: "red",
  },
});
