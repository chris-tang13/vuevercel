<template>
  <div class="info-container">
    <h1>重要信息</h1>
    <div class="info-form">
      <h2>添加新信息</h2>
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" id="title" v-model="newInfo.title" placeholder="输入标题">
      </div>
      <div class="form-group">
        <label for="content">内容</label>
        <textarea id="content" v-model="newInfo.content" placeholder="输入内容"></textarea>
      </div>
      <button @click="addInfo">添加</button>
    </div>
    <div class="info-list">
      <h2>信息列表</h2>
      <div v-if="infoItems.length === 0" class="empty-message">暂无信息，请添加</div>
      <div v-else class="info-items">
        <div v-for="(item, index) in infoItems" :key="index" class="info-item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
          <button @click="deleteInfo(index)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoPage',
  data() {
    return {
      newInfo: {
        title: '',
        content: ''
      },
      infoItems: []
    }
  },
  methods: {
    addInfo() {
      if (!this.newInfo.title || !this.newInfo.content) {
        alert('请填写标题和内容');
        return;
      }
      this.infoItems.push({
        title: this.newInfo.title,
        content: this.newInfo.content
      });
      // 清空表单
      this.newInfo.title = '';
      this.newInfo.content = '';
      // 可以添加本地存储逻辑
      localStorage.setItem('infoItems', JSON.stringify(this.infoItems));
    },
    deleteInfo(index) {
      this.infoItems.splice(index, 1);
      localStorage.setItem('infoItems', JSON.stringify(this.infoItems));
    },
    loadInfoItems() {
      const items = localStorage.getItem('infoItems');
      if (items) {
        this.infoItems = JSON.parse(items);
      }
    }
  },
  mounted() {
    this.loadInfoItems();
  }
}
</script>

<style scoped>
.info-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.info-form,
.info-list {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #3498db;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  min-height: 150px;
  resize: vertical;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

.info-item {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.info-item p {
  color: #666;
  margin-bottom: 0.8rem;
}

.info-item button {
  background-color: #e74c3c;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.info-item button:hover {
  background-color: #c0392b;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 2rem 0;
}
</style>