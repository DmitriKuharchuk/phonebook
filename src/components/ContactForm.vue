<template lang="html">
    <div>

        <div v-if="isEditable">
            <div class='-errors' v-if="errors.length">
                <h4>Please fill out required fields.</h4>
                <ul>
                    <li
                            v-for="(error, index) in errors"
                            :key="index">{{ error }}</li>
                </ul>
            </div>
            <form class="form"
                  @keyup.enter="toggleEdit">

                <BaseInput
                        type="text"
                        class="w-50"
                        v-model="editContact.fname"
                        placeholder="First Name"
                        label="First Name"
                        required />

                <BaseInput
                        type="text"
                        class="w-50"
                        v-model="editContact.lname"
                        label="Last Name"
                        placeholder="Last Name" />

                <BaseInput
                        type="phone"
                        class="w-100"
                        v-model="editContact.phone"
                        placeholder="phone"
                        label="phone"
                        required />
            </form>
        </div>

        <div v-else>
            <div class='-errors' v-if="errors.length">
                <h4>Please fill out required fields.</h4>
                <ul>
                    <li
                            v-for="(error, index) in errors"
                            :key="index">{{ error }}</li>
                </ul>
            </div>
            <form class="form" @submit.prevent>
                <BaseInput
                        type="text"
                        class="w-50"
                        v-model="newContact.fname"
                        placeholder="First Name"
                        label="First Name*"
                        required />

                <BaseInput
                        type="text"
                        class="w-50"
                        v-model="newContact.lname"
                        label="Last Name"
                        placeholder="Last Name" />

                <BaseInput
                        type="phone"
                        class="w-100"
                        v-model="newContact.phone"
                        placeholder="phone"
                        label="phone*"
                        required />

                <button
                        class="button -icon-left -fill-success text-center"
                        @click="sendNewContact"
                        @keyup.enter="sendNewContact">
                    <Icon name="plus" />
                    <span>Add Contact</span>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import BaseInput from '@/components/BaseInput.vue'
    export default {
        name: 'AddPhone',
        props: ['edit', 'contact'],
        components: {
            BaseInput
        },
        data() {
            return {
                newContact: this.createContact(),
                editContact: this.contact,
                isEditable: false,
                errors: false
            }
        },
        mounted() {
            if (this.edit == undefined) return
            this.isEditable = true
        },
        methods: {
            sendNewContact() {
                if (this.validateContact()) {
                    // Submit new contact
                    this.$emit('new-contact', this.newContact)

                    // Reset Form when submited
                    this.newContact = this.createContact()
                }
            },
            createContact() {
                return {
                    id: Date.now(),
                    fname: '',
                    lname: '',
                    phone: ''
                }
            },
            toggleEdit() {
                this.$emit('toggle')
            },
            validateContact() {
                if (this.newContact.fname && this.newContact.phone) {
                    this.errors = false
                    return true
                }

                this.errors = [];

                if (!this.newContact.fname) {
                    this.errors.push('First Name required.');
                }
                if (!this.newContact.phone) {
                    this.errors.push('phone required.');
                }
            }
        }
    }
</script>

<style lang="stylus">

</style>
