<template>
  <div class="form-container">
    <v-card outlined elevation="5" style="width: 500px; max-width: 70vw">
      <v-form v-model="isFormValid" ref="form" lazy-validation class="pa-10">
        <v-text-field
          v-model="userName"
          :rules="userNameRules"
          label="User name"
          outlined
          required
        />

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          outlined
          required
        />

        <buttons :buttons="[registerButton]" />
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Ref } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import Validation from "@/mixins/Validation";

import Button from "@/models/Button";
import User from "@/models/User";
import Buttons from "@/components/Buttons.vue";
import { ValidationRule, ValidationFunction } from "@/models/Validation";

// TODO: try to use v-card

@Component({
  components: { Buttons }
})
export default class Register extends Mixins(Validation) {
    @Mutation readonly setIsLoggedIn!: (isLoggedIn: boolean) => void;
    @Mutation readonly setCurrentUser!: (user: User | null) => void;

    @Ref("form") readonly form!: HTMLFormElement;

    isFormValid = true;
    isRegistering = false;
    userName = "";
    email = "";

    public get userNameRules(): ValidationFunction[] {
      return [this.validations[ValidationRule.REQUIRED]];
    }

    public get emailRules(): ValidationFunction[] {
      return [
        this.validations[ValidationRule.REQUIRED],
        this.validations[ValidationRule.EMAIL]
      ];
    }

    public get registerButton(): Button {
      return {
        title: "Register",
        action: this.register,
        loading: this.isRegistering,
        disabled: !this.isFormValid
      };
    }

    public async register(): Promise<void> {
      this.isRegistering = true;

      if (this.form.validate()) {
        try {
          const user = { userName: this.userName, email: this.email };

          await this.$api.register(user);
          this.setIsLoggedIn(true);
          this.setCurrentUser(user);
          await this.$router.push({ name: "home" });
        } catch (error: any) {
          console.error(error);
        } finally {
          this.isRegistering = false;
        }
      }
    }
}
</script>

<style lang="scss" scoped>
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
  }

  /*.form {*/
  /*  width: 500px;*/
  /*  max-width: 70vw;*/
  /*}*/
</style>
