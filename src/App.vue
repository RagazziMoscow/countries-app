<template>
  <base-layout />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseLayout from "@/layouts/BaseLayout.vue";

@Component({
  components: { BaseLayout }
})
export default class App extends Vue {}
</script>
