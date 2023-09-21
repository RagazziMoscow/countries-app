import { StateType } from "@/store/state";
import User from "@/models/User";
import Country from "@/models/Country";

export default {
  setIsLoggedIn(state: StateType, isLoggedIn: boolean): void {
    state.isLoggedIn = isLoggedIn;
  },
  setCurrentUser(state: StateType, user: User | null): void {
    state.currentUser = user;
  },
  setCountries(state: StateType, countries: Country[]): void {
    state.countries = countries;
  }
};
