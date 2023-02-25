<template-extends base="../../../../../Base">
<slot replace>
  <slot parent></slot>
  ChildHasOverridesDefaultFullHasParent default.
</slot>
</template-extends>


<script>

import Base from "../../../../../Base.vue";
export default {
  name: "ChildHasOverridesDefaultFullHasParent",
  extends: Base,
}
</script>
