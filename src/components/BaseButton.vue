<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "success", "danger", "ghost"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: null,
  },
  iconPosition: {
    type: String,
    default: "left",
    validator: (value) => ["left", "right"].includes(value),
  },
});

const emit = defineEmits(["click"]);

const variantClasses = computed(() => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 border-blue-600",
    secondary:
      "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:border-blue-500",
    success: "bg-green-600 text-white hover:bg-green-700 border-green-600",
    danger: "bg-red-600 text-white hover:bg-red-700 border-red-600",
    ghost: "bg-transparent text-gray-600 hover:text-gray-900 border-transparent",
  };

  return variants[props.variant];
});

const sizeClasses = computed(() => {
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return sizes[props.size];
});

const disabledClasses = computed(() => {
  return props.disabled || props.loading
    ? "opacity-50 cursor-not-allowed hover:bg-current"
    : "cursor-pointer";
});

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all border-2',
      variantClasses,
      sizeClasses,
      disabledClasses,
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <slot name="icon-left" v-if="!loading && iconPosition === 'left'"></slot>

    <slot></slot>

    <slot name="icon-right" v-if="!loading && iconPosition === 'right'"></slot>
  </button>
</template>

