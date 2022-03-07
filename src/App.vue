<template>

    <div id="app">
        <div class="py-10">
            <nav class="bg-gray-100 h-10 fixed top-0 left-0 right-0" style="z-index:100">
                <div class="max-w-6x1 mx-auto px-4">
                    <div class="flex justify-between">
                        <div class="flex space-x-4">
                            <router-link to="/" class="hidden md:flex items-center inline-block pt-1 pb-1 mr-4 text-lg whitespace-no-wrap">
                                <img src="./assets/pencil-icon.png" class="h-8 w-8" alt="List Maker"/>
                                <span class="font-semibold text-xl tracking-tight">List Maker</span>
                            </router-link>

                        </div>

                    </div>
                </div>
            </nav>


            <div class="container mx-auto sm:px-2 mt-3">
                <router-view />
            </div>
        </div>
    </div>

    <!-- https://www.youtube.com/watch?v=TYcNDRav-N4 -->
    <div id="modals"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "App",
    mounted() {
        const mobileMenuButton=document.querySelector(".mobile-menu-button");
        mobileMenuButton?.addEventListener("click", () => {
            const mobileMenu=document.querySelector(".mobile-menu");
            mobileMenu?.classList.toggle("hidden");
        });
    },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
