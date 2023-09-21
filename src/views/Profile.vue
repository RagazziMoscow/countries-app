<template>
  <v-form v-model="isFormValid" ref="form" lazy-validation class="form pa-10">
    <v-text-field
      v-model="user.userName"
      :rules="userNameRules"
      label="User name"
      outlined
      required
    />

    <v-text-field
      v-model="user.email"
      :rules="emailRules"
      label="E-mail"
      outlined
      required
    />

    <buttons :buttons="buttons" />
  </v-form>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import Validation from "@/mixins/Validation";

import Button from "@/models/Button";
import User from "@/models/User";
import { ValidationRule, ValidationFunction } from "@/models/Validation";

import Buttons from "@/components/Buttons.vue";

@Component({
  components: { Buttons }
})
export default class Profile extends Mixins(Validation) {
  @State readonly currentUser!: User | null;

  @Action readonly updateCurrentUser!: (user: User) => Promise<void>;

  isFormValid = true;
  isSavingUser = false;
  user: User = {} as User;

  public get userNameRules(): ValidationFunction[] {
    return [this.validations[ValidationRule.REQUIRED]];
  }

  public get emailRules(): ValidationFunction[] {
    return [
      this.validations[ValidationRule.REQUIRED],
      this.validations[ValidationRule.EMAIL]
    ];
  }

  public get buttons(): Button[] {
    return [
      {
        title: "Save",
        action: this.save,
        color: "success",
        loading: this.isSavingUser
      },
      {
        title: "Go Back",
        action: this.goBack,
        color: "error"
      }
    ];
  }

  private created(): void {
    this.setUser();
  }

  private setUser(): void {
    this.user = Object.assign({}, this.currentUser);
  }

  private async save(): Promise<void> {
    this.isSavingUser = true;

    try {
      await this.updateCurrentUser(this.user);
      this.goBack();
    } catch (error: any) {
      console.error(error);
    } finally {
      this.isSavingUser = false;
    }
  }

  private goBack(): void {
    this.$router.go(-1);
  }
}
</script>
