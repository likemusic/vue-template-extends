<template-extends base="../../../../../ChildHasOverridesDefaultContentNoParent">
<slot>
  <slot parent></slot>
  GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentNoParent default.
</slot>
</template-extends>

<script>
import ChildHasOverridesDefaultContentNoParent from "../../../../../ChildHasOverridesDefaultContentNoParent.vue";

export default {
  name: "GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentNoParent",
  extends: ChildHasOverridesDefaultContentNoParent,
}
</script>
