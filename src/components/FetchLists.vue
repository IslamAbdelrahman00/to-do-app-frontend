<template>
  <h1 class="lists class">Todos</h1>
  <div class="component_body">
    <input v-model="itemName1" placeholder="New Todo Item">
    <ul class="Todolists" v-for="list in lists" :key="list.list_id">
      <li>
        <text class="slist_small_title">{{ list.list_name }}</text>
        <button aria-label="Delete List" class="slist_small_button" type="button" @click="deleteList(list.list_id)">
          X
        </button>
      </li>
      <li>
        <div>
          <ul>
            <li class="slist_items" v-for="item in list.listItems" :key="item.item_id">
              {{ item.item_name }}
              <button aria-label="Delete Item" class="slist_small_button" type="button" @click="deleteItem(item.item_id)">
                ✖
              </button>
            </li>
          </ul>
          <button aria-label="Add Item" class="slist_small_button" type="button" @click="addItem(list.list_id, itemName1 )">
            +
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'

export default {
  name: 'TodoApp',
  data () {
    return {
      lists: [],
      listName: '',
      selectedList: null,
      itemName: '',
      itemName1: ''

    }
  },
  mounted () {
    this.getAllLists()
  },
  methods: {
    async getAllLists () {
      try {
        const response = await axios.get('/todolists')
        this.lists = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async createList () {
      try {
        const listDTO = {
          list_name: this.listName,
          list_items: []
        }
        const response = await axios.post('/todolists/create', listDTO)
        this.lists.push(response.data)
        this.listName = ''
        this.itemName = ''
      } catch (error) {
        console.error(error)
      }
    },
    async deleteList (listId) {
      try {
        await axios.post(`/todolists/remove/${listId}`)
        this.lists = this.lists.filter(list => list.list_id !== listId)
      } catch (error) {
        console.error(error)
      }
    },
    async updateItem (itemId, itemName) {
      try {
        const response = await axios.put(`/item/updatename/${itemId}/${itemName}`)
        const updatedList = this.lists.find(list => list.list_id === response.data.list_id)
        const updatedItem = updatedList.listItems.find(item => item.item_id === response.data.item_id)
        updatedItem.item_name = response.data.item_name
      } catch (error) {
        console.error(error)
      }
    },
    async addItem (listId, itemName) {
      try {
        const response = await axios.post(`/todolists/updatelist/${listId}/${itemName}`)
        const updatedList = this.lists.find(list => list.list_id === response.data.list_id)
        updatedList.listItems.push(response.data.listItems[response.data.listItems.length - 1])
        this.itemName1 = ''
      } catch (error) {
        console.error(error)
      }
    },
    async deleteItem (itemId) {
      try {
        await axios.post(`/item/remove/${itemId}`)
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

<style>

.lists {
  color: #2c3e50;
  font-size: 24px;
}

.component_body {
  margin: 16px;
  background-color: #f0f0f0;
}

.Todolists {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.slist_small_title {
  display: inline-block;
  font-size: 18px;
  margin-right: 8px;
}

.slist_small_button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.slist_items {
  margin-bottom: 8px;
}
</style>
