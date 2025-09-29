<script setup>
import TaskList from "./components/TaskList.vue";
</script>

<template>
  <div id="app">
    <header>
      <h1 class="main">To Do List</h1>
    </header>

    <main>
      <TaskList />
    </main>
  </div>
</template>

<style>
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
h1 {
  text-align: center;
}
</style>
