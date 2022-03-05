<template>
    <table-lite
        :is-slot-mode="true"
        :title= "'Items'"
        :has-checkbox="false"
        :is-loading="table.isLoading"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        :messages="table.messages"
        @do-search="doSearch"
        @is-finished-old="table.isLoading = false"
        @is-finished="tableLoadingFinish"
        @return-checked-rows="updateCheckedRows">
        <template v-for="(col, i) of table.columns" v-slot:[col.field]="data" :key="i">
            <div v-if="!data.value[col.field]">
                <button type="button" @click="editClicked(data.value.item_id)" data-id="{{data.value[col.field]}}" ><font-awesome-icon :icon="['fas', 'pencil-alt']" /></button>&nbsp;
                <button type="button" @click="deleteClicked(data.value.item_id)" data-id="{{data.value[col.field]}}" ><font-awesome-icon :icon="['fas', 'trash-alt']" /></button>
            </div>
            <div v-else>
                <!-- Show normal cell value -->
                {{data.value[col.field]}}
            </div>
        </template>
    </table-lite>

    <teleport to="#modals">
        <div v-if="table.showEditModal" class="modal">
            <ItemDetails :current-item-id="table.currentItemId" @doneUpdate="editModalDone"></ItemDetails>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import TableLite from "./Table.vue";
import ItemDataService from "@/services/ItemDataService";
import Item from "@/types/Item";
import ResponseData from "@/types/ResponseData";
import ItemDetails from "./ItemDetails.vue";

const table = reactive({
    isLoading: true,
    columns: [
        {
            label: "Item Id",
            field: "item_id",
            width: "3%",
            sortable: true,
            isKey: true,
        },
        {
            label: "Name",
            field: "name",
            width: "80%",
            sortable: true,
            display: function (row: any) {
                return (
                '<a href="/items/' + row.item_id + '" class="name-btn">' + row.name + "</button>"
                );
            }
        },
        {
            label: "",
            field: "quick",
            width: "10%",
        }
    ],
    rows: [] as Array<Item>,
    showEditModal: false,
    currentItemId: -1,
    totalRecordCount: 0,
    sortable: {
        order: "item",
        sort: "asc",
    }
});


export default defineComponent({
    name: "ItemTable",
    components: { TableLite, ItemDetails },
    data() { return {table, doSearch, updateCheckedRows, tableLoadingFinish, editClicked, deleteClicked, editModalDone} },
    props: {
        msg: String,
    },
});
const editModalDone=function() {
    table.showEditModal=false;
    doSearch('item_id', 'asc');
}
const editClicked=function(itemId:number) {
    console.log('edit clicked for:'+itemId);
    table.currentItemId=itemId;
    table.showEditModal=true;
}
const deleteClicked=function(itemId:number) {
    console.log('delete clicked for:'+itemId);

    ItemDataService.delete(itemId)
        .then((response: ResponseData) => {
            console.log(response.data);
            const idx=table.rows.findIndex(e=>e.item_id===itemId);
            table.rows.splice(idx,1);
            table.totalRecordCount--;
        })
        .catch((e: Error) => {
          console.log(e);
        });
}
const doSearch = (order: string, sort: string) => {
    table.isLoading = true;

    ItemDataService.getAll()
        .then((response: ResponseData) => {
            // this.clubs = response.data;
            console.log(response.data);
            // refresh table rows
            table.rows = response.data;
            table.totalRecordCount = response.data.length;
            table.sortable.order = order;
            table.sortable.sort = sort;
            table.isLoading = false;
        })
        .catch((e: Error) => {
            console.log(e);
            table.isLoading = false;
        });
};

const tableLoadingFinish = (elements: any) => {
    const self:any=this as any;
    const self2=ref(null);
    table.isLoading = false;
    Array.prototype.forEach.call(elements, function (element) {
        if (element.classList.contains("name-btn")) {
            element.addEventListener("click",  () => {
                // do your click event
                console.log(self.dataset.id + " name-btn click!!");
            });
        }
        if (element.classList.contains("quick-btn-edit")) {
            // do your click event
            element.addEventListener("click",  function(this:any) {
                console.log(this.dataset.id + " quick-btn-edit click!!");
            });
        }
        if (element.classList.contains("quick-btn-delete")) {
            // do your click event
            element.addEventListener("click",  function(this:any) {
                console.log(this.dataset.id + " quick-btn-delete click!!");
            });
        }
    });
};

const updateCheckedRows = (rowsKey: string) => {
    // do your checkbox click event
    console.log(`Selected: ${rowsKey}`);
};
// Initial load
doSearch('item_id', 'asc');

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
