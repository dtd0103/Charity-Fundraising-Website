<!-- src/components/ProjectList.vue -->
<template>
  <div class="project-list">
    <h2>Featured Projects</h2>
    <div class="projects">
      <div
        class="project"
        v-for="project in projects"
        :key="project.id"
      >
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <button @click="donateToProject(project.id)">Donate</button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.project-list {
  padding: 20px;
}
.projects {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.project {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
