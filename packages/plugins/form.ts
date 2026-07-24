import { ElMessage, type FormInstance } from "element-plus";
import i18n from "../i18n/base";
import { isNative } from "./utility";

export type FormSubmitHandler = (formEl: FormInstance) => void;
export type FormValidationErrorList = Record<string, { message?: string }[]>;

/**
 * Reset form fields.
 */
export const formReset = (formEl?: FormInstance): void => {
  formEl?.resetFields();
};

/**
 * Validate a form and run the submit handler when validation succeeds.
 */
export const formValidation = (
  formEl?: FormInstance,
  submit?: FormSubmitHandler,
): void => {
  if (!formEl) return;

  formEl.validate((valid, fieldList) => {
    if (valid && submit && !isNative(submit)) {
      submit(formEl);
      return;
    }

    ElMessage({
      message:
        getFirstValidationError(fieldList) ??
        i18n.global.t("formValidation.error"),
      type: "warning",
    });
  });
};

/**
 * Extract the first validation error message.
 */
export const getFirstValidationError = (
  fieldList?: FormValidationErrorList,
): string | null => {
  if (!fieldList) return null;

  for (const errors of Object.values(fieldList)) {
    if (errors?.length) {
      const message = errors[0]?.message;
      if (message && message.trim()) {
        return message.replace(/^请输入/, "").replace(/^Please input/, "");
      }
    }
  }

  return null;
};
