<template>
  <div class="card_item">
    <div class="card_inner">
      <img :src="book.bookCover" class="book_cover" />
      <div class="card_item_right">
        <div class="book_title">{{ `${book.bookName}${index + 1}` }}</div>
        <div class="book_author">{{ book.catlog }}</div>
        <div class="book_tags">
          <div class="book_tag" v-for="(item, index) in book.tags" :key="index">
            {{ item }}
          </div>
        </div>
        <div class="book_desc">
          {{ book.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{
  book: any;
  index: any;
}>();
const { book, index } = toRefs(props);
</script>

<style lang="scss" scoped>
.card_item {
  margin: 20px auto;
  content-visibility: auto;
  contain-intrinsic-size: 120px;
}
.card_inner{
  display: flex;
  text-align: left;
  .book_cover{
    width: 120px;
    height: 120px;
  }
  .card_item_right{
    width: 500px;
    margin-left: 10px;
  }
  .book_tags{
    display: flex;
    .book_tag{
      width: 50px;
      height: 20px;
      background: #ccc;
      line-height: 20px;
      text-align: center;
      margin-right: 10px;
    }
  }
}
</style>
