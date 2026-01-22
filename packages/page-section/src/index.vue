<template>
  <fieldset
      class="oga-page-section"
      :style="borderRadius > 0 ? `border-radius: ${borderRadius}px` : ''"
      :class="description ? 'has-description' : ''"
  >
    <legend v-if="heading">
      {{ heading }}
    </legend>
    <div
        v-if="$slots.header"
        class="oga-page-section-action">
      <slot name="header"></slot>
    </div>
    <p
        v-if="description"
        class="oga-page-section-description">
      {{ description }}
    </p>
    <div
        class="oga-page-section-content"
        v-if="$slots.default">
      <slot></slot>
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
const props = defineProps({
  heading: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  borderRadius: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="scss">
@use "../../style/index.scss" as var;

.oga-page-section {
  position: relative;
  padding: 1.25rem;
  border-radius: 7px;
  border: 1px solid #EBEEF5;
  -webkit-transition: .3s;
  transition: .3s;
  min-width: 5rem;

  &:hover {
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
  }

  &.has-description {
    padding-top: 5px;
  }

  &-action {
    right: 1.25rem;
    top: calc(-50% + 1.25rem);
    transform: translateY(calc(-50% + 1.25rem));
    position: absolute;
    background: #fff;

    .el-button--mini {
      &.el-button--text {
        margin-top: -6px;
      }
    }
  }

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  legend {
    margin: 0;
    font-size: 1rem;

    & + .oga-page-section-description {
      margin-top: 0;
    }
  }

  &-description {
    color: var.$colorSecondary;
    font-size: 13px;

    & + div {
      margin-top: 1rem;
    }
  }
}
</style>
