<template>
  <oga-page :offset="240" :percentage="100">
    <oga-image-upload
      v-model="fileList"
      :action="action"
      :radius="15"
      :max="12"
    ></oga-image-upload>
    <el-button @click="fileList = []">
      Clear
    </el-button>
  </oga-page>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
const action = "http://127.0.0.1:9000/api/upload";
// const fileList = ref([])
const fileList = ref([
  {
    id: "2027031720153362433",
    fileType: 0,
    coverImage: "",
    refType: 1,
    title: "4",
    needPass: 1,
    url: "https://file.infoservision.com/000000/1831413006281592833.webp",
    description: "",
    suffix: "webp",
  },
  {
    id: "2027031720153362434",
    fileType: 0,
    coverImage: "",
    refType: 1,
    title: "2",
    needPass: 1,
    url: "https://file.infoservision.com/000000/1831413004348018689.webp",
    description: "",
    suffix: "webp",
  },
  {
    id: "2027031720157556738",
    fileType: 0,
    coverImage: "",
    refType: 1,
    title: "8",
    needPass: 1,
    url: "https://file.infoservision.com/000000/1831413006269009921.webp",
    description: "",
    suffix: "webp",
  },
  {
    id: "2027031720157556739",
    fileType: 0,
    coverImage: "",
    refType: 1,
    title: "FERTILIZER 2",
    needPass: 1,
    url: "https://file.infoservision.com/1828832854729150465/1831385798674599938.webp",
    description: "",
    suffix: "webp",
  },
  {
    id: "2027031720161751041",
    fileType: 0,
    coverImage: "",
    refType: 1,
    title: "10",
    needPass: 1,
    url: "https://file.infoservision.com/000000/1831413006201901058.webp",
    description: "",
    suffix: "webp",
  },
  {
    id: "2027031720161751042",
    fileType: 0,
    coverImage: "",
    refType: 1,
    title: "9",
    needPass: 1,
    url: "https://file.infoservision.com/000000/1831412994445266946.webp",
    description: "",
    suffix: "webp",
  },
  {
    id: "2027031720165945345",
    fileType: 0,
    coverImage: "",
    refType: 1,
    title: "7",
    needPass: 1,
    url: "https://file.infoservision.com/000000/1831413002473164802.webp",
    description: "",
    suffix: "webp",
  },
  {
    id: "2027031720165945346",
    fileType: 0,
    coverImage: "",
    refType: 1,
    title: "1",
    needPass: 1,
    url: "https://file.infoservision.com/000000/1831412990943023106.webp",
    description: "",
    suffix: "webp",
  },
  {
    id: "2027031720165945347",
    fileType: 0,
    coverImage: "",
    refType: 1,
    title: "1",
    needPass: 1,
    url: "https://file.infoservision.com/000000/1831429366684438530.webp",
    description: "",
    suffix: "webp",
  },
  {
    id: "2027031720170139649",
    fileType: 0,
    coverImage: "",
    refType: 1,
    title: "3",
    needPass: 1,
    url: "https://file.infoservision.com/000000/1831429368706093057.webp",
    description: "",
    suffix: "webp",
  },
  {
    id: "2027031720170139650",
    fileType: 0,
    coverImage: "",
    refType: 1,
    title: "2",
    needPass: 1,
    url: "https://file.infoservision.com/000000/1831429364817973250.webp",
    description: "",
    suffix: "webp",
  },
]);
// fileList.value = []
onMounted(() => {});
</script>
