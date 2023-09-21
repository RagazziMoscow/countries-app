<template>
  <div class="text-center">
    <template v-for="(button, index) in buttons">
      <v-tooltip v-if="button.icon" :key="index" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text @click="button.action">
            <v-icon>{{ button.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ button.title }}</span>
      </v-tooltip>
      <v-btn
        v-else
        :key="index"
        :loading="button.loading"
        :disabled="button.disabled"
        :color="button.color || 'primary'"
        large
        @click="button.action"
        class="mr-2"
      >
        {{ button.title }}
      </v-btn>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Button from "@/models/Button";

@Component
export default class Buttons extends Vue {
  @Prop({ type: Array, required: true }) readonly buttons!: Button[];
}
</script>
