<template>
  <div data-testid="component">
    <slot>Base default.</slot>
    <slot name="custom">Base custom.</slot>
  </div>
</template>

<script>
export default {
  name: "Base"
}
</script>
