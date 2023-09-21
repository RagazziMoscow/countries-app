<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div v-if="currentUser">
        <router-link to="/" tag="span" class="text-h6">Home</router-link>
      </div>

      <v-spacer></v-spacer>
      <buttons v-if="currentUser" :buttons="buttons" />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mutation, State } from "vuex-class";

import User from "@/models/User";
import Button from "@/models/Button";

import Buttons from "@/components/Buttons.vue";

@Component({
  components: { Buttons }
})
export default class BaseLayout extends Vue {
  @State readonly currentUser!: User | null;

  @Mutation readonly setIsLoggedIn!: (isLoggedIn: boolean) => void;
  @Mutation readonly setCurrentUser!: (user: User | null) => void;

  public get buttons(): Button[] {
    return [
      {
        title: "Analytics",
        action: this.goToAnalytics,
        icon: "mdi-poll"
      },
      {
        title: "Profile",
        action: this.goToProfile,
        icon: "mdi-account-circle"
      },
      {
        title: "Logout",
        action: this.logout,
        icon: "mdi-logout"
      }
    ];
  }

  private goToAnalytics(): void {
    this.$router.push({ name: "analytics" });
  }

  private goToProfile(): void {
    this.$router.push({ name: "profile" });
  }

  private logout(): void {
    this.$router.push({ name: "register" });
    this.setIsLoggedIn(false);
    this.setCurrentUser(null);
  }
}
</script>
