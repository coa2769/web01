<template>
  <div id="app">
    <!-- 속성으로 정보 전송 -->
    <speech-box :headerText="A.header" :footerText="A.footer">
      <!-- slot에 넣을 HTML마크업 시작 -->
      <div>
        <p>
          {{A.message}}
        </p>
      </div>
      <!-- slot에 넣을 HTML마크업 끝 -->
    </speech-box>

    <speech-box class="sanders" :headerText="B.header" :footerText="B.footer">
      <div>
        <!--CSS의 class를 지정하여 스타일도 줄 수 있다.-->
        <p class="sanders-content">
          {{B.message}}
        </p>
      </div>    
    </speech-box>

  </div>
</template>

<script>
import SpeechBox from './components/SpeechBox.vue'

export default {
  name: 'app',
  components: {
    SpeechBox
  },
  data : function(){
    return {
      A:{
        header : "오바마 대통령 고별 연설문",
        footer : "2017.01.10 - 시카고",
        message : `저의 동료 국민 여러분, .....(지면관계상 생략)`
      },
      B:{
        header : "버니샌더스 경선 패배 연설문",
        footer : "2016.07.25-필라델피아 웰스파고",
        message : `감사합니다. 여러분 정말 감사합니다......(지면 관계상 생략)`
      }
    };
  }
}
</script>

<style>
  .senders { background-color:antiquewhite;}
  .senders-content{font-family:굴림; text-decoration: underline;}
</style>
