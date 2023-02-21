<template-extends base="../../../../../ChildHasOverridesDefaultContentHasParent">
<slot>
  <slot parent></slot>
  GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentHasParent default.
</slot>
</template-extends>

<script>
import ChildHasOverridesDefaultContentHasParent from "../../../../../ChildHasOverridesDefaultContentHasParent.vue";

export default {
  name: "GrandchildHasOverridesDefaultContentHasParentForChildHasOverridesDefaultContentHasParent",
  extends: ChildHasOverridesDefaultContentHasParent,
}
</script>
