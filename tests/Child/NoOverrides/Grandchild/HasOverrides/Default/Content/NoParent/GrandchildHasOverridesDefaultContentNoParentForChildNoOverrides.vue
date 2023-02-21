<template-extends base="../../../../../ChildNoOverrides">
  <slot>GrandchildHasOverridesDefaultContentNoParentForChildNoOverrides default.</slot>
</template-extends>

<script>
import ChildNoOverrides from "../../../../../ChildNoOverrides.vue";

export default {
  name: "GrandchildHasOverridesDefaultContentNoParentForChildNoOverrides",
  extends: ChildNoOverrides,
}
</script>
