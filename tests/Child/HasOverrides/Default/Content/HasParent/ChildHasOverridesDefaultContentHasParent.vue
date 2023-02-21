<template-extends base="../../../../../Base">
  <slot>
    <slot parent></slot>
    ChildHasOverridesDefaultContentHasParent default.
  </slot>
</template-extends>

<script>
export default {
  name: "ChildHasOverridesDefaultContentHasParent"
}
</script>
