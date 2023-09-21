<template>
  <div class="analytics py-6">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <div>
      <v-card outlined class="my-4">
        <v-card-title>Regions</v-card-title>
        <VueEcharts :option="regionsChartOptions" :init-option="InitOptions" :ei.sync="EIRegions" />
      </v-card>

      <v-card outlined class="my-4">
        <v-card-title>Currencies</v-card-title>
        <VueEcharts :option="currenciesChartOptions" :init-option="InitOptions" :ei.sync="EICurrencies" />
      </v-card>

      <v-card outlined class="my-4">
        <v-card-title>Population</v-card-title>
        <VueEcharts :option="populationChartOptions" :init-option="InitOptions" :ei.sync="EIPopulation" />
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import Helper from "@/mixins/Helper";

import Country from "@/models/Country";

@Component
export default class Analytics extends Mixins(Helper) {
  @State readonly countries!: Country[];

  @Action readonly loadAllCountries!: () => Promise<void>;

  public isLoading = false;

  /* eslint-disable */
  public regionsChartOptions: echarts.EChartOption = {
    xAxis: { type: "category", data: [] },
    yAxis: { type: "value" },
    series: [{ data: [], type: "bar", label: { show: true, position: "inside" } }]
  };

  public currenciesChartOptions: echarts.EChartOption = {
    xAxis: { type: "category", data: [] },
    yAxis: { type: "value" },
    series: [{ data: [], type: "line" }]
  };

  public populationChartOptions: echarts.EChartOption = {
    xAxis: { type: "category", data: [] },
    yAxis: { type: "value" },
    series: [{ data: [], type: "line" }]
  };

  public echartsInitOptions = {
    width: 1200,
    height: 400
  };

  public echartsMobileInitOptions = {
    width: 250,
    height: 200
  };

  /* eslint-disable */
  public EIRegions: echarts.ECharts = {} as echarts.ECharts;
  public EICurrencies: echarts.ECharts = {} as echarts.ECharts;
  public EIPopulation: echarts.ECharts = {} as echarts.ECharts;

  public get InitOptions() {
    const isMobile = window.innerWidth <= 600;
    return isMobile ? this.echartsMobileInitOptions : this.echartsInitOptions;
  }

  private async created(): Promise<void> {
    this.isLoading = true;
    await this.loadCountries();
    this.prepareRegions();
    this.prepareCurrencies();
    this.preparePopulations();
    this.isLoading = false;
  }

  private async loadCountries(): Promise<void> {
    if (!this.countries.length) {
      try {
        await this.loadAllCountries();
      } catch (error: any) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  private prepareRegions(): void {
    const groups = this.groupBy<Country>(this.countries, "region");
    const regions = Object.keys(groups);
    const regionsValues = Object.values(groups).map((array) => array.length);
    const options: echarts.EChartOption = {
      xAxis: { type: "category", data: regions  },
      series: [ { data: regionsValues, type: "bar" } ]
    };

    this.EIRegions.setOption(options);
  }

  private prepareCurrencies(): void {
    const preparedValues: (Record<string, string>)[] = [];

    for (const country of this.countries) {
      Object.keys(country.currencies || []).forEach((currency) => preparedValues.push({ name: country.name.common, currency }));
    }

    const groups = this.groupBy<Record<string, string>>(preparedValues, "currency");
    const currencies = Object.keys(groups);
    const currenciesValues = Object.values(groups).map((array) => array.length);
    const options: echarts.EChartOption = {
      xAxis: { type: "category", data: currencies  },
      series: [ { data: currenciesValues, type: "line" } ]
    };

    this.EICurrencies.setOption(options);
  }

  private preparePopulations(): void {
    const selectedCountries = this.countries.slice()
        .sort((countryOne, countryTwo) => countryTwo.population - countryOne.population)
        .slice(0, 10);
    const countries = selectedCountries.map(country => country.name?.common || country.name?.official || "");
    const countriesValues = selectedCountries.map(country => country.population);
    const options: echarts.EChartOption = {
      xAxis: { type: "category", data: countries  },
      series: [ { data: countriesValues, type: "line" } ]
    };

    this.EIPopulation.setOption(options);
  }
}
</script>

<style scoped>
  .analytics {
    max-width: 70vw;
    margin: 0 auto;
  }
</style>
