<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true,
    default: () => ({ id: null, name: "", checked: false }),
  },
});

const emit = defineEmits(["delete", "update:checked"]);

const deleteTask = () => {
  emit("delete", props.task.id);
};
const updateChecked = (newChecked) => {
  emit("update:checked", { id: props.task.id, checked: newChecked });
};
</script>

<template>
  <el-row>
    <el-col :span="20" :offset="1" class="task-col">
      <el-checkbox v-model="task.checked" @change="updateChecked">{{
        task.name
      }}</el-checkbox>
    </el-col>
    <el-col :span="2" :offset="1">
      <el-button
        id="delete-button"
        @click="deleteTask"
        icon="el-icon-close"
        type="danger"
        >Del</el-button
      >
    </el-col>
  </el-row>
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
}
#delete-button {
  margin-top: 5px;
}
</style>
