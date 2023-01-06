<script setup>
import { useDark, useToggle } from "@vueuse/core"

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<template>
  <div>
    <nav
      class="fixed top-0 left-0 right-0 flex h-16 place-content-between bg-white z-40 dark:bg-gray-900 border-b-2"
    >
      <li class="list-none my-auto md:w-full sm:w-64">
        <router-link
          :to="{ name: 'Home' }"
          class="text-black p-10 text-3xl font-bold dark:text-white"
          >Home</router-link
        >
      </li>
      <li
        class="list-none my-auto flex mr-3 md:w-full justify-end sm:w-64 w-32"
      >
        <div class="border-2 border-gray-600 w-52 flex gap-1">
          <h1 class="pl-3 dark:text-white text-sm">
            {{ detailSurahs.number }}
          </h1>
          <h1 class="dark:text-white text-sm">
            {{ detailSurahs.name }} {{ detailSurahs.numberOfAyahs }}
          </h1>
        </div>
      </li>
      <li class="list-none md:p-5 m-auto">
        <button
          class="ml-4 px-5 rounded-full bg-black dark:bg-white"
          @click="toggleDark()"
        >
          <font-awesome-icon
            :icon="isDark == true ? ['fas', 'sun'] : ['fas', 'moon']"
            class="text-yellow-500"
          ></font-awesome-icon>
        </button>
      </li>
    </nav>
    <section class="detail h-auto bg-gray-100 pt-20 dark:bg-gray-900">
      <div
        class="flex flex-wrap md:mx-20 my-5"
        v-for="ayah in detailSurahs.ayahs"
      >
        <div class="md:p-10 p-3">
          <h1 class="dark:text-white">{{ ayah.verseId }}</h1>
        </div>
        <div class="flex-1 md:p-10 p-3">
          <h1 class="text-sm md:text-lg dark:text-white">
            {{ ayah.indoText }}
          </h1>
        </div>
        <div class="flex-1 w-full text-right mr-3">
          <h1 class="md:text-4xl text-3xl font-light my-2 dark:text-white">
            {{ ayah.ayahText }}
          </h1>
          <p class="dark:text-white">{{ ayah.readText }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
export default {
  name: "detail",
  data: function () {
    return {
      detailSurahs: [],
    }
  },
  components: {
    FontAwesomeIcon,
  },
  props: ["surahs", "index"],
  methods: {
    goBack() {
      this.$router.push("/")
    },
    toggleDark() {
      this.isDark = !this.isDark
      localStorage.setItem("darkMode", isDark)
    },
  },
  mounted: function () {
    let n = parseInt(this.index) + 1
    console.log(n)
    fetch(`https://quranapi.idn.sch.id/surah/${n}`)
      .then((res) => res.json())
      .then((datas) => {
        this.detailSurahs = datas
      })
    let isDark = localStorage.getItem("darkMode") == "true"
    return {
      isDark,
    }
  },
}
</script>
<style></style>
