<script setup>
import api from "@/services/api";
import TaskItem from "./TaskItem.vue";
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
        checked: task.checked,
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
      checked: false,
    });
    tasks.value.push({
      id: response.data.id,
      name: response.data.name,
      checked: false,
    });
    newTaskName.value = "";
    fetchTasks();
  } catch (error) {
    console.error("Ошибка добавления задачи:", error);
  }
};

const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
    tasks.value = tasks.value.filter((task) => task.id !== id);
    await fetchTasks();
  } catch (error) {
    console.error("Ошибка удаления задачи:", error);
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
const updateTaskChecked = async ({ id, checked }) => {
  try {
    await api.patch(`/tasks/${id}`, {
      checked: checked,
    });
    await fetchTasks();
  } catch (error) {
    console.error("Ошибка обновления состояния задачи:", error);
  }
};
</script>

<template>
  <div>
    <!-- Форма для добавления задачи -->
    <el-row>
      <el-col 
        :span="20" 
        :offset="1"
      >
        <el-input v-model="newTaskName" />
      </el-col>
      <el-col 
        :span="2" 
        :offset="1"
      >
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          @click="addTask"
        >
          Add
        </el-button>
      </el-col>
    </el-row>
    <!-- Список задач -->
    <el-row>
      <el-col :span="24">
        <el-container>
          <ul>
            <TaskItem
              v-for="task in tasks"
              :key="task.id"
              :task="task"
              @delete="deleteTask"
              @update:checked="updateTaskChecked"
            />
          </ul>
        </el-container>
      </el-col>
    </el-row>
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
  white-space: break-spaces;
}
</style>
