import Vue from "vue";
import Api from "@/services/Api";

Vue.prototype.$api = Api.getInstance();
