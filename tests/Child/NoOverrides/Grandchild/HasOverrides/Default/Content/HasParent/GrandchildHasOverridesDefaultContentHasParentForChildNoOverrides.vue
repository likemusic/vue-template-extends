<template-extends base="../../../../../ChildNoOverrides">
<slot>
  <slot parent></slot>
  GrandchildHasOverridesDefaultContentHasParentForChildNoOverrides default.
</slot>
</template-extends>


<script>
import ChildNoOverrides from "../../../../../ChildNoOverrides.vue";

export default {
  name: "GrandchildHasOverridesDefaultContentHasParentForChildNoOverrides",
  extends: ChildNoOverrides,
}
</script>
