import { shallowMount } from '@vue/test-utils'
import TodoList from '@/components/createList.vue'

describe('TodoList.vue', () => {
  it('renders the correct elements', () => {
    const wrapper = shallowMount(TodoList)
    expect(wrapper.find('.title').text()).toBe('Create a new Todo List:')
    expect(wrapper.find('.inputbox').exists()).toBe(true)
    expect(wrapper.find('.button').exists()).toBe(true)
  })
  it('adds a new item to the list', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({ itemName: 'new item' })
    wrapper.find('#addItemButton').trigger('click')
    expect(wrapper.vm.list_items).toContain('new item')
  })
})
