<template>
  <div class="story-container">
    <h1>我的乡村生活</h1>
    <div class="story-content">
      <div class="story-item">
        <h2>放鸭子</h2>
        <img src="/images/duck.png" alt="小男孩放鸭子" class="story-image">
        <p>今天我到放鸭子，看着它们在水里游来游去真有趣。</p>
      </div>
      <div class="story-item">
        <h2>拔花生</h2>
        <img src="/images/peanut.png" alt="拔花生" class="story-image">
        <p>今天我还到帮奶奶拔花生，虽然很累但很开心能帮上忙。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoryPage'
}
</script>

<style scoped>
.story-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.story-content {
  line-height: 1.6;
  font-size: 1.1rem;
}

.story-item {
  margin-bottom: 3rem;
}

.story-item h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.story-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>