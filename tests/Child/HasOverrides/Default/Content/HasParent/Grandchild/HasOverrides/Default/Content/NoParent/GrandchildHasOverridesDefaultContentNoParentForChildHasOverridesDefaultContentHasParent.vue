<template-extends base="../../../../../ChildHasOverridesDefaultContentHasParent">
  <slot>GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentHasParent default.</slot>
</template-extends>

<script>
import ChildHasOverridesDefaultContentHasParent from "../../../../../ChildHasOverridesDefaultContentHasParent.vue";

export default {
  name: "GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentHasParent",
  extends: ChildHasOverridesDefaultContentHasParent,
}
</script>
