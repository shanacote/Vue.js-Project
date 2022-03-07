<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="mb-4">
        <label for="item">Item</label>
        <input
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-white-200 rounded"
          id="name"
          required
          v-model="item.name"
          name="name"
        />
      </div>


      <button @click="saveItem" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-500 text-white hover:bg-blue-600">Save</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-500 text-white hover:bg-blue-600" @click="newItem">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemDataService from "@/services/ItemDataService";
import Item from "@/types/Item";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: "add-item",
    data() {
        return {
            item: {
                item_id: 0,
                name: ""
            } as Item,
            submitted: false
        };
    },
    emits: ['doneUpdate'],
    methods: {
        saveItem() {
            let data = {
                name: this.item.name
            };

            ItemDataService.create(data).then((response: ResponseData) => {
                this.item.item_id = response.data.item_id;
                console.log(response.data);
                this.submitted = true;
                this.$emit('doneUpdate');
            }).catch((e: Error) => {
                console.log(e);
                this.$emit('doneUpdate');
            });
        },

        newItem() {
            this.item = {} as Item;
        },
    },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>