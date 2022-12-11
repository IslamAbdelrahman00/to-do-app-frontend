<template>
  <div>
    <h1>Todo App</h1>
    <h2>All Lists</h2>
    <ul>
      <li v-for="list in lists" :key="list.list_id">
        {{ list.list_name }}
        <button @click="deleteList(list.list_id)">Delete</button>
        <ul>
          <li v-for="item in list.listItems" :key="item.item_id">
            {{ item.item_name }}
            <button @click="deleteItem(item.item_id)">Delete</button>
            <input v-model="item.item_name" @change="updateItem(item.item_id, item.item_name)">
          </li>
        </ul>
        <input v-model="itemName" placeholder="Enter item name">
        <button @click="addItem(list.list_id, itemName)">Add Item</button>
      </li>
    </ul>
    <input v-model="listName" placeholder="Enter list name">
    <button @click="createList(listName)">Create List</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TodoApp',
  data () {
    return {
      lists: [],
      listName: '',
      itemName: ''
    }
  },
  mounted () {
    this.getAllLists()
  },
  methods: {
    async getAllLists () {
      try {
        const response = await axios.get('http://localhost:8080/todolists')
        this.lists = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async createList () {
      try {
        const listDTO = {
          list_name: this.listName,
          list_items: this.itemName.split(',')
        }
        const response = await axios.post('http://localhost:8080/todolists/create', listDTO)
        this.lists.push(response.data)
        this.listName = ''
        this.itemName = ''
      } catch (error) {
        console.error(error)
      }
    },
    async deleteList (listId) {
      try {
        await axios.post(`http://localhost:8080/todolists/remove/${listId}`)
        this.lists = this.lists.filter(list => list.list_id !== listId)
      } catch (error) {
        console.error(error)
      }
    },
    async updateItem (itemId, itemName) {
      try {
        const response = await axios.put(`http://localhost:8080/item/updatename/${itemId}/${itemName}`)
        const updatedList = this.lists.find(list => list.list_id === response.data.list_id)
        const updatedItem = updatedList.listItems.find(item => item.item_id === response.data.item_id)
        updatedItem.item_name = response.data.item_name
      } catch (error) {
        console.error(error)
      }
    },
    async addItem (listId, itemName) {
      try {
        const response = await axios.post(`http://localhost:8080/todolists/updatelist/${listId}/${itemName}`)
        const updatedList = this.lists.find(list => list.list_id === response.data.list_id)
        updatedList.listItems.push(response.data.listItems[response.data.listItems.length - 1])
      } catch (error) {
        console.error(error)
      }
    },
    async deleteItem (itemId) {
      try {
        await axios.post(`http://localhost:8080/item/remove/${itemId}`)
        this.lists.forEach(list => {
          list.listItems = list.listItems.filter(item => item.item_id !== itemId)
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>

</style>
