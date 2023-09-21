import { Component, Vue } from "vue-property-decorator";

@Component
export default class Helper extends Vue {
  protected groupBy<T>(collection:T[], key: keyof T): Record<keyof T, T[]> {
    const groupedResult = collection.reduce((previous, current: T) => {
      if (!previous[current[key]]) {
        previous[current[key]] = [] as T[];
      }

      previous[current[key]].push(current);
      return previous;
    }, {} as any);
    return groupedResult;
  }
}
