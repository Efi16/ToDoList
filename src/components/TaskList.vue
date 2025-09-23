<script setup>
import api from "@/services/api";
import { ref } from "vue";
const tasks = ref([]);
const newTaskName = ref("");

const fetchTasks = async () => {
  try {
    const response = await api.get("/tasks");
    if (Array.isArray(response.data)) {
      tasks.value = response.data.map((task) => ({
        id: task.id,
        name: task.name,
      }));
    } else {
      console.warn("Неверные данные.");
    }
  } catch (error) {
    console.error("Ошибка получения задач:", error);
  }
};
fetchTasks();
const addTask = async () => {
  if (!newTaskName.value.trim()) return;

  try {
    const response = await api.post("/tasks", {
      name: newTaskName.value,
    });
    tasks.value.push({ id: response.data.id, name: response.data.name });
    newTaskName.value = "";
  } catch (error) {
    console.error("Ошибка добавления задачи:", error);
  }
};
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}`);
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  } catch (error) {
    console.error("Ошибка удаления задачи:", error);
  }
};
</script>

<template>
  <div>
    <el-container>
      <!-- Форма для добавления задачи -->
      <el-input v-model="newTaskName" placeholder="Название новой задачи" />
      <el-button
        @click="addTask"
        type="success"
        icon="el-icon-circle-plus-outline"
        >Add</el-button
      >
    </el-container>
    <!-- Список задач -->
    <el-container class="task-list">
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <el-row>
            <el-col :span="12"
              ><p>{{ task.name }}</p></el-col
            >
            <el-col :span="2" :offset="10">
              <el-button
                id="delete-button"
                @click="deleteTask(task.id)"
                icon="el-icon-close"
                type="danger"
                >Delete</el-button
              >
            </el-col>
          </el-row>
        </li>
      </ul>
    </el-container>
  </div>
</template>

<style>
ul {
  list-style-type: none;
  width: 100%;
  display: inline-block;
  align-items: center;
}
p {
  display: inline-block;
  margin-right: 3%;
  margin-left: 3%;
}
#delete-button {
  margin-top: 5px;
}
li {
  margin-top: 12px;
  background-color: rgba(135, 206, 250, 0.3);
}
</style>
