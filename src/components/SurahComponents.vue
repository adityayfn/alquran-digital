<script setup>
import { useDark, useToggle } from "@vueuse/core"

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div>
    <div class="jumbotron mt-10 relative w-full h-80 bg-right bg-fixed">
      <nav
        class="fixed top-0 left-0 right-0 flex h-16 place-content-between bg-white dark:bg-gray-900 z-40"
      >
        <li class="list-none my-auto">
          <router-link
            :surahs="surahs"
            :to="{ name: 'Home' }"
            class="text-black dark:text-white p-10 md:text-3xl font-bold sm:text-xl text-base"
            >Home</router-link
          >
        </li>
        <li class="list-none my-auto md:w-80">
          <input
            v-model="search"
            type="text"
            placeholder="Cari Surah"
            class="w-48 md:w-auto h-5 bg-gray-100 focus:outline-gray-800 focus:bg-white p-4 rounded-md"
          />
          <button
            class="md:ml-4 px-5 rounded-full bg-black dark:bg-white m-2"
            @click="toggleDark()"
          >
            <font-awesome-icon
              :icon="isDark == true ? ['fas', 'sun'] : ['fas', 'moon']"
              class="text-yellow-500"
            ></font-awesome-icon>
          </button>
        </li>
      </nav>
      <!-- <img src="../assets/img/bg.jpg" alt="" class="w-screen sm:h-72" /> -->
      <div class="jumbotron-text pt-24 px-10">
        <h1 class="font-bold text-5xl text-white text-shadow-md">
          Al-Qur'an Digital
        </h1>
        <p class="font-bold text-xl text-white text-shadow-md">
          Reading Al-Qur'an everywhere and every time
        </p>
      </div>
    </div>
    <section class="content h-auto bg-gray-100 dark:bg-gray-900 relative">
      <h1
        class="text-center text-5xl pt-5 pb-1 text-gray-800 dark:text-slate-100"
      >
        Daftar Surah
      </h1>
      <hr class="w-56 mx-auto border-blue-900" />
      <div class="flex flex-wrap mx-16 sm:mx-5">
        <div
          class="max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-10 flex gap-3 p-4 w-72 bg-transparent hover:bg-gray-300 hover:dark:bg-gray-600 transform motion-safe:hover:-translate-y-1 motion-safe:hover:scale-110 transition ease-in-out duration-300 cursor-pointer"
          v-for="(surah, index) in filteredSurahs"
          @click="getSurahByIndex(index)"
        >
          <div class="border-r-2 my-auto">
            <h1 class="px-2 text-gray-800 dark:text-slate-100">
              {{ surah.number }}
            </h1>
          </div>
          <div class="flex-1">
            <h1 class="text-gray-800 dark:text-slate-100">{{ surah.name }}</h1>
            <p class="text-gray-800 dark:text-slate-100">
              {{ surah.translationId }}
            </p>
          </div>
          <div class="">
            <h1 class="text-gray-800 dark:text-slate-100 text-3xl">
              {{ surah.asma }}
            </h1>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

export default {
  name: "surah",
  data: function () {
    return {
      surahs: [],
      search: "",
    }
  },
  components: {
    FontAwesomeIcon,
  },
  props: ["index"],
  methods: {
    getSurahByIndex(index) {
      this.$router.push("/detail/" + index)
    },
    toggleDark() {
      this.isDark = !this.isDark
      localStorage.setItem("darkMode", isDark)
    },
  },
  computed: {
    filteredSurahs() {
      return this.surahs.filter((surah) =>
        surah.name.toLowerCase().includes(this.search.toLowerCase())
      )
    },
  },
  mounted: function () {
    fetch(`https://quranapi.idn.sch.id/surah`)
      .then((res) => res.json())
      .then((datas) => {
        let i = datas.data
        for (let j of i) {
          this.surahs.push(j)
        }
      })
    let isDark = localStorage.getItem("darkMode") == "true"
    return {
      isDark,
    }
  },
}
</script>
<style>
.jumbotron {
  background-image: url("../assets/img/bg3.jpg");
}
</style>
