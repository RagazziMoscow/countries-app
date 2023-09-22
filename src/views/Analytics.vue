<template>
  <div class="analytics py-6">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <div>
      <v-card outlined class="my-4">
        <v-card-title>Regions</v-card-title>
        <VueEcharts :option="regionsChartOptions" :init-option="initOptions" :ei.sync="EIRegions" />
      </v-card>

      <v-card outlined class="my-4">
        <v-card-title>Currencies</v-card-title>
        <VueEcharts :option="currenciesChartOptions" :init-option="initOptions" :ei.sync="EICurrencies" />
      </v-card>

      <v-card outlined class="my-4">
        <v-card-title>Population</v-card-title>
        <VueEcharts :option="populationChartOptions" :init-option="initOptions" :ei.sync="EIPopulation" />
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import Helper from "@/mixins/Helper";

import Country from "@/models/Country";

const ECHARTS_OPTIONS = {
  width: 1000,
  height: 400
};

const ECHARTS_MOBILE_OPTIONS = {
  width: 250,
  height: 200
};

@Component
export default class Analytics extends Mixins(Helper) {
  @State readonly countries!: Country[];

  @Action readonly loadAllCountries!: () => Promise<void>;

  public isLoading = false;
  public initOptions = (window.innerWidth) <= 600 ? ECHARTS_MOBILE_OPTIONS : ECHARTS_OPTIONS;

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

  /* eslint-disable */
  public EIRegions: echarts.ECharts = {} as echarts.ECharts;
  public EICurrencies: echarts.ECharts = {} as echarts.ECharts;
  public EIPopulation: echarts.ECharts = {} as echarts.ECharts;

  private async created(): Promise<void> {
    window.addEventListener("resize", this.onResize, false);

    this.isLoading = true;
    await this.loadCountries();
    this.prepareRegions();
    this.prepareCurrencies();
    this.preparePopulations();
    this.isLoading = false;
  }

    private destroyed() {
      window.removeEventListener("resize", this.onResize, false);
    }

  private onResize(): void {
    this.initOptions = (window.innerWidth) <= 600 ? ECHARTS_MOBILE_OPTIONS : ECHARTS_OPTIONS;
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: { type: "category", data: currencies, axisTick: { alignWithLabel: true } },
      series: [ { data: currenciesValues, type: 'bar', barWidth: '60%', } ]
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
