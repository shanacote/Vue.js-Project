<template>
    <!-- <teleport to="#modals">
        <div v-if="showModal" class="modal"> -->
            <div v-if="currentItem.item_id" class="edit-form">
                <h4>Item</h4>
                <form>
                <div class="mb-4">
                    <label for="item_id">Item_id</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="item_id"
                    v-model="currentItem.item_id"
                    />
                </div>
                <div class="mb-4">
                    <label for="name">Name</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="name"
                    v-model="currentItem.name"
                    />
                </div>

                </form>



                <button type="submit" class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500 text-white hover:green-600" @click="updateItem">
                Save
                </button>
                <p>{{ message }}</p>
            </div>

            <div v-else>
                <br />
                <p>Please click on an Item...</p>
            </div>
        <!-- </div>
    </teleport> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemDataService from "@/services/ItemDataService";
import Item from "@/types/Item";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: "item",
    props: {
        currentItemId: String,
    },
    data() {
        return {
            currentItem: {} as Item,
            showModal: true,
            message: "",
        };
    },
    emits: ['doneUpdate'],
    methods: {
        getItem(id: any) {
            ItemDataService.get(id)
                .then((response: ResponseData) => {
                    this.currentItem = response.data;
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.error(e);
                });
        },


        updateItem() {
            ItemDataService.update(this.currentItem.item_id, this.currentItem)
            .then((response: ResponseData) => {
                console.log(response.data);
                this.message = "The item was updated successfully!";
                this.$emit('doneUpdate');
            })
            .catch((e: Error) => {
                console.error(e);
                this.$emit('doneUpdate');
            });
        },

    },
    mounted() {
        this.message = "";
        this.getItem(this.$route.params.id||this.$props.currentItemId);
    },
    dismount() {
        this.showModal=false;
    }
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 300px;
    width: 400px;
    background: gray;
    text-align: center;
}
</style>