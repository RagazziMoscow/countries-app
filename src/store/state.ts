import User from "@/models/User";
import Country from "@/models/Country";

export interface StateType {
  isLoggedIn: boolean;
  currentUser: User | null;
  countries: Country[];
}

export const state: StateType = {
  isLoggedIn: false,
  currentUser: null,
  countries: []
};
