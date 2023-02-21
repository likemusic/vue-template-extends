<template-extends base="../../../../../ChildHasOverridesDefaultContentNoParent">
<slot>GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentNoParent default.</slot>
</template-extends>

<script>
import ChildHasOverridesDefaultContentNoParent from "../../../../../ChildHasOverridesDefaultContentNoParent.vue";

export default {
  name: "GrandchildHasOverridesDefaultContentNoParentForChildHasOverridesDefaultContentNoParent",
  extends: ChildHasOverridesDefaultContentNoParent
}
</script>
