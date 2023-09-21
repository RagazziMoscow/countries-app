import Api from "@/services/Api";

declare module "vue/types/vue" {
  interface Vue {
    $api: Api;
  }
}
