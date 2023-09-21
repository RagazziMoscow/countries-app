<template>
  <div class="home py-6">
    <v-data-table
      :items="countries"
      :headers="headers"
      :sort-by="sortBy"
      :footer-props="footerProps"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      :loading="isLoading"
      class="elevation-10"
    >
      <template #top>
        <v-text-field v-model="search" label="Search" class="mx-4" />
      </template>

      <template #[`item.flag`]="{ item }">
        <v-img :src="getFlagPicture(item)" width="50px" />
      </template>

      <template #[`item.name`]="{ item }">
        <span>{{ getCountryName(item) }}</span>
      </template>

      <template #[`item.cioc`]="{ item }">
        <span>{{ getCountryCode(item) }}</span>
      </template>

      <template #[`item.currencies`]="{ item }">
        <span>{{ getCountryCurrencies(item) }}</span>
      </template>

      <template #[`item.capital`]="{ item }">
        <span>{{ getCountryCapital(item) }}</span>
      </template>
    </v-data-table>
    <!--
    <div class="list d-flex flex-wrap justify-space-around">
      <v-card v-for="country in countries" :key="country.id" max-width="344" :elevation="10" outlined class="mx-auto mb-6" >
        <v-img :src="getFlagPicture(country)" height="200px" />

        <v-card-title>
          {{ getCountryName(country) }}
        </v-card-title>

        <v-card-subtitle>
          1,000 miles of wonder
        </v-card-subtitle>

        <v-card-actions v-if="false">
          <v-btn color="orange lighten-2" text>
            Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition v-if="false">
          <div>
            <v-divider></v-divider>

            <v-card-text>
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </div>
    -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { DataTableHeader } from "vuetify";

import Country from "@/models/Country";

const ITEMS_PER_PAGE = 15;

@Component
export default class HomeView extends Vue {
 @State readonly countries!: Country[];

 @Action readonly loadAllCountries!: () => Promise<void>;

  isLoading = false;
  search = "";
  sortBy = ["name", "region", "subregion", "population"];
  headers: DataTableHeader[] = [
    { text: "Flag", value: "flag", sortable: false },
    { text: "Name", value: "name", sortable: false }, // TODO: try to implement sorting here
    { text: "Code", value: "cioc", sortable: false },
    { text: "Region", value: "region" },
    { text: "Subregion", value: "subregion" },
    { text: "Currencies", value: "currencies", sortable: false },
    { text: "Capital", value: "capital", sortable: false },
    { text: "Population", value: "population" }
  ];

  footerProps = {
    disableItemsPerPage: true,
    itemsPerPageOptions: [ITEMS_PER_PAGE],
    itemsPerPageText: ""
  };

  private async created(): Promise<void> {
    await this.loadCountries();
  }

  private async loadCountries(): Promise<void> {
    if (!this.countries.length) {
      this.isLoading = true;
      try {
        await this.loadAllCountries();
      } catch (error: any) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  public getFlagPicture(country: Country): string {
    return country.flags?.png || country.flags?.alt || "";
  }

  public getCountryName(country: Country): string {
    return country.name?.common || country.name?.official || "";
  }

  public getCountryCode(country: Country): string {
    return country.cioc || country.fifa || "";
  }

  public getCountryCurrencies(country: Country): string {
    const currencies = country.currencies ? Object.values(country.currencies).map(currency => currency.name) : [];
    return currencies.join(", ");
  }

  public getCountryCapital(country: Country): string {
    return country.capital?.join(", ") || "";
  }

  public filterOnlyCapsText(value: any, search: string, item: Country): boolean {
    return this.getCountryName(item).toLowerCase().includes(search.toLowerCase());
  }
}
</script>

<style>
  .home {
    max-width: 70vw;
    margin: 0 auto;
  }
</style>
