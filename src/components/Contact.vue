<template lang="html">
  <div class="contact-card"
       @mouseover='showActions = true'
       @mouseleave='showActions = false'>

    <div class="body" v-if="!showEdit">
      <div class="media" :style="{backgroundColor: bgColor}">
        {{ initials }}
      </div>
      <div class="content">
        <h4 class="title">{{ fullName }}</h4>
        <p class="meta"><b>phone:</b> {{ contact.phone }}</p>
      </div>

      <div class="actions" :class="{ show: showActions }">
        <button
                class="button -icon-center -fill-gray -small"
                @click="toggleForm"
                :title="editText">
          <span class="sr-only">{{ editText }}</span>
          <Icon :name="editText + '-2'" />
        </button>

        <button
                class="button -icon-center -fill-error -small"
                @click="removeContact"
                title="Delete">
          <Icon name="trash-2" />
        </button>
      </div>
    </div>

    <ContactForm v-else edit
                 :contact="contact"
                 @toggle="toggleForm" />

  </div>
</template>

<script>
    import ContactForm from '@/components/ContactForm.vue'
    import randomColor from 'randomcolor'

    export default {
        name: 'contact-item',
        props: ['contact'],
        components: {
            ContactForm
        },
        data() {
            return {
                showEdit: false,
                editText: 'edit',
                showActions: false,
                bgColor: randomColor({luminosity: 'light'})
            }
        },
        computed: {
            fullName() {
                return `${this.contact.fname} ${this.contact.lname}`
            },
            initials() {
                const names = [
                    this.contact.fname,
                    this.contact.lname
                ]

                const initials = this.$compact(names.map(i => i[0]))
                return initials.join('').toUpperCase()
            }
        },
        methods: {
            toggleForm() {
                this.editText = this.showEdit ? 'edit' : 'save'
                this.showEdit = !this.showEdit
            },
            removeContact() {
                this.$emit('remove')
            }
        }
    }
</script>

<style lang="stylus" scoped>
</style>
