<template>
  <div>
    <surah :surahs="surahs"></surah>
  </div>
</template>
<script>
import Surah from "../components/SurahComponents.vue"
export default {
  name: "home",
  components: {
    Surah,
  },
  props: ["surahs", "search"],
}
</script>
<style></style>
