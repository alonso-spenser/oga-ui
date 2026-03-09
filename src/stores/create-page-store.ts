import { defineStore } from "pinia";
import {
  type PageQueryState,
  createPageQueryState,
} from "@/stores/type/page-type.ts";

/**
 * Generic Page state
 *
 */
export interface GenericPageState<T> {
  pageQueryState: PageQueryState;
  normalQueryState: Record<string, any>;
  formModel: T;
}

/**
 * Create a page store
 * @param name Store name
 * @param defaultModel Default model
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
      /**
       * Update page query state
       * @param data
       */
      updatePageQueryState(data: Partial<PageQueryState>) {
        this.$patch((state) => {
          Object.assign(state.pageQueryState, data);
        });
      },

      /**
       * Update normal query state
       * @param data
       */
      updateNormalQueryState(data: Partial<Record<string, any>>) {
        this.$patch((state) => {
          Object.assign(state.normalQueryState, data);
        });
      },

      /**
       * Get the default form model
       */
      getDefaultModel(): T {
        return getRawDefault();
      },

      /**
       * Set form model
       */
      updateFormModel(data: Partial<T>) {
        this.$patch((state) => {
          Object.assign(state.formModel as T, data);
        });
      },

      /**
       * Reset form model
       */
      resetFormModel() {
        this.$patch((state) => {
          Object.assign(state.formModel as T, getRawDefault());
        });
      },

      /**
       * Reset all
       */
      resetAll() {
        this.$reset();
      },
    },
  });
};
