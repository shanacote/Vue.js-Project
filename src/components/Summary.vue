<template>
    <button @click="handleAddClick()" class="flex items-center px-3 py-2 border rounded bg-blue-400 text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <span>Add</span>
    </button>
    <ItemTable ref="itemTable"/>



    <teleport to="#modals">
        <div v-if="showAddModal" class="modal">
            <AddItem v-on:done-update="addModalDone"></AddItem>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import ItemTable from "./ItemTable.vue";
import AddItem from "./AddItem.vue";




export default defineComponent({
    name: "Summary",
    data() {
        return {
            showAddModal: false,
        };
    },
    methods: {
        addModalDone: function() {
            this.showAddModal=false;
            const tableComp:any=this.$refs.itemTable;
            tableComp.doSearch('item_id', 'asc');
        },
        handleAddClick() {
            this.showAddModal=true;
        }
    },
    components: {
        ItemTable,
        AddItem
    }
});
</script>

<style>
</style>