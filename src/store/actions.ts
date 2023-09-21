import { ActionContext } from "vuex";

import Api from "@/services/Api";
import { StateType } from "@/store/state";
import User from "@/models/User";

export default {
  async updateCurrentUser(context: ActionContext<StateType, StateType>, user: User): Promise<void> {
    await Api.getInstance().updateCurrentUser(user);
    context.commit("setCurrentUser", user);
  },

  async loadAllCountries(context: ActionContext<StateType, StateType>): Promise<void> {
    const countries = await Api.getInstance().getAllCountries();
    context.commit("setCountries", countries);
  }
};
