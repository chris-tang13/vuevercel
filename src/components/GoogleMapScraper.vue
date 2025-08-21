<template>
  <div class="google-map-scraper">
    <h1>Google Maps 评分抓取工具</h1>
    <div class="input-container">
      <label for="urlInput">输入Google Maps URL（多个URL用英文逗号分隔）</label>
      <textarea
        id="urlInput"
        v-model="urlInput"
        placeholder="https://www.google.com/maps/place/Example+Place,..."
        rows="4"
      ></textarea>
    </div>
    <div class="button-container">
      <button @click="scrapeData" :disabled="isScraping">提取数据</button>
      <button @click="exportToExcel" :disabled="!canExport">导出数据</button>
    </div>
    <div class="results-container" v-if="results.length > 0">
      <h2>抓取结果</h2>
      <table class="results-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>URL</th>
            <th>评分</th>
            <th>评价数量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="index">
            <td>{{ index + 1 }}</td>
            <td class="url-cell">{{ result.url }}</td>
            <td>{{ result.rating || 'N/A' }}</td>
            <td>{{ result.reviewCount || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="loading" v-if="isScraping">
      <p>正在抓取数据，请稍候...</p>
    </div>
    <div class="empty-state" v-else-if="results.length === 0">
      <p>请输入Google Maps URL并点击"提取数据"按钮</p>
    </div>
  </div>
</template>

<script>
// 注意：浏览器环境中直接抓取Google Maps可能会遇到跨域问题
// 实际应用中建议使用后端服务进行抓取

export default {
  name: 'GoogleMapScraper',
  data() {
    return {
      urlInput: '',
      results: [],
      isScraping: false,
      canExport: false
    }
  },
  methods: {
    async scrapeData() {
      if (!this.urlInput.trim()) {
        alert('请输入至少一个Google Maps URL');
        return;
      }

      const urls = this.urlInput.split(',').map(url => url.trim()).filter(url => url);
      this.results = [];
      this.isScraping = true;
      this.canExport = false;

      try {
        for (let i = 0; i < urls.length; i++) {
          const url = urls[i];

          try {
            // 发送请求到后端服务
            // 使用相对路径，避免硬编码地址
            const response = await fetch('/api/scrape-google-map', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ url })
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.results.push({
              url: data.url,
              rating: data.rating || '获取失败',
              reviewCount: data.reviewCount || '获取失败'
            });
          } catch (error) {
            console.error(`抓取URL失败: ${url}`, error);
            this.results.push({
              url: url,
              rating: '获取失败',
              reviewCount: '获取失败'
            });
          }

          // 强制更新DOM
          this.$forceUpdate();
        }
      } catch (error) {
        console.error('抓取数据失败:', error);
        alert('抓取数据失败，请重试');
      } finally {
        this.isScraping = false;
        this.canExport = this.results.length > 0;
      }
    },
    exportToExcel() {
      if (this.results.length === 0) {
        alert('没有数据可导出');
        return;
      }

      // 这里使用简单的CSV导出，实际应用中可以使用xlsx.js等库
      let csvContent = '序号,URL,评分,评价数量\n';
      this.results.forEach((result, index) => {
        csvContent += `${index + 1},${result.url},${result.rating},${result.reviewCount}\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'google_maps_ratings.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
</script>

<style scoped>
.google-map-scraper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.input-container {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
}

.button-container {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
}

.results-table th, .results-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.results-table th {
  background-color: #f2f2f2;
}

.url-cell {
  max-width: 400px;
  word-break: break-all;
}

.loading, .empty-state {
  padding: 20px;
  text-align: center;
  color: #666;
}
</style>