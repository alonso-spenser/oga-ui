import { defineStore } from "pinia";
import type {} from "pinia-plugin-persistedstate";
import {
  createPageQueryState,
  type PageQueryState,
} from "./page-type";

/**
 * Generic page store state.
 */
export interface GenericPageState<T> {
  pageQueryState: PageQueryState;
  normalQueryState: Record<string, any>;
  formModel: T;
}

/**
 * Create a persisted page store with query state and a reusable form model.
 * @param name Store name
 * @param defaultModel Default form model
 */
export const CreatePageStore = <T extends object>(
  name: string,
  defaultModel: T,
) => {
  const getRawDefault = (): T => ({ ...defaultModel });

  return defineStore(`${name}Store`, {
    persist: true,

    state: (): GenericPageState<T> => ({
      pageQueryState: createPageQueryState(),
      normalQueryState: {},
      formModel: getRawDefault(),
    }),

    getters: {},

    actions: {
      updatePageQueryState(data: Partial<PageQueryState>) {
        this.$patch((state) => {
          Object.assign(state.pageQueryState, data);
        });
      },

      updateNormalQueryState(data: Partial<Record<string, any>>) {
        this.$patch((state) => {
          Object.assign(state.normalQueryState, data);
        });
      },

      getDefaultModel(): T {
        return getRawDefault();
      },

      updateFormModel(data: Partial<T> | null) {
        if (!data) return;

        this.$patch((state) => {
          Object.assign(state.formModel as T, data);
        });
      },

      resetFormModel() {
        this.$patch((state) => {
          Object.assign(state.formModel as T, getRawDefault());
        });
      },

      resetAll() {
        this.$reset();
      },
    },
  });
};
