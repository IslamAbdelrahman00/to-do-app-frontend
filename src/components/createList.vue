<template>
  <div class="container">
    <h1 class="title">Create a new Todo List:</h1>
    <p>List Name: <input class="inputbox" v-model="list_name" placeholder="list name" /></p>

    <h3>Add List Items:</h3>
    <table>
      <tr v-for="(item, index) in list_items" :key="index">
        <td>
          <h4>{{ item }}</h4>
        </td>
        <td>
          <button class="button button_removing" id="removeButton" type="button" @click="list_items.splice(index, 1)">
            Remove
          </button>
        </td>
      </tr>
    </table>
    <p>
      New Item: <input class="inputbox" v-model="itemName" placeholder="add a new Item" @keyup.enter="addItem(itemName)" />
      <button class="button button_webpage" id="addItemButton" type="button" @click="addItem(itemName)">+</button>
    </p>

    <div class="buttons">
      <p>
        <button class="button button_webpage" type="button" @click="save_list">Submit</button>
        <button class="button button_webpage" type="button" @click="reset_inputfields">Reset</button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

// Set the baseURL to the URL of your backend
axios.defaults.baseURL = 'http://localhost:8080'
export default {
  data () {
    return {
      list_items: [],
      list_name: '',
      itemName: ''
    }
  },
  methods: {
    addItem (itemName) {
      if (itemName !== '') {
        this.list_items.push(itemName)
        this.itemName = ''
      }
    },
    reset_inputfields () {
      this.list_items = []
      this.itemName = ''
      this.list_name = ''
    },
    save_list () {
      if (this.list_name !== '' && this.list_items !== []) {
        axios.post('/todolists/create', {
          list_name: this.list_name,
          list_items: this.list_items
        })
          .then((response) => {
            this.reset_inputfields()
            this.show_save_dialog()
          })
      } else {
        Swal.fire('Please add a name for the list!')
      }
    },
    show_save_dialog () {
      Swal.fire({
        title: ' list created!',
        text: ' list created successfully!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'created new list',
        cancelButtonText: 'view all  lists'
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.href = '/alllists'
        }
      })
    }
  }
}
</script>

<style>
.container {
  background-color: #f0f0f0;
}

.title {
  color: #2c3e50;
  font-size: 24px;
}

.inputbox {
  padding: 8px;
  font-size: 16px;
}

.button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  padding: 8px;
}

.button_removing {
  color: red;
}

.button_webpage {
  color: #2c3e50;
}
</style>
