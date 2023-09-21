import { Component, Vue } from "vue-property-decorator";
import { ValidationRule, ValidationFunction } from "@/models/Validation";

@Component
export default class Validation extends Vue {
  protected validations: Record<ValidationRule, ValidationFunction> = {
    [ValidationRule.REQUIRED]: (v: string) => !!v || "This field must be valid",
    [ValidationRule.EMAIL]: (v: string) => /.+@.+\..+/.test(v) || "This field must be an email"
  };
}
