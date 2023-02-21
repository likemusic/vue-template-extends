<template-extends base="../../ChildNoOverrides"></template-extends>

<script>
import ChildNoOverrides from "../../ChildNoOverrides.vue";

export default {
  name: "GrandChildNoOverridesForChildNoOverrides",
  extends: ChildNoOverrides,
}
</script>

