<template>
    <div>
     
        <hero></hero>
        <service-introduction class="introduction"></service-introduction>
        
        <advantages class="advantage"></advantages>
        <awesome-features></awesome-features>
        
        <!-- <basic-elements></basic-elements>
        <inputs></inputs>
        <custom-controls></custom-controls>
        <navigation></navigation>
        <javascript-components></javascript-components>
        <icons></icons>
        <examples></examples>
        <download-section></download-section>
        <carousel></carousel> -->
    </div>
</template>
<script>
import Hero from "./components/Hero";
import BasicElements from "./components/BasicElements";
import Inputs from "./components/Inputs";
import CustomControls from "./components/CustomControls";
import Navigation from "./components/Navigation";
import JavascriptComponents from "./components/JavascriptComponents";
import Carousel from "./components/Carousel";
import Icons from "./components/Icons";
import Examples from "./components/Examples";
import DownloadSection from "./components/DownloadSection";
import ServiceIntroduction from './components/serviceIntro';
import AwesomeFeatures from './components/AwesomeFeatures';
import Advantages from './components/Advantages'
export default {
  name: "components",
  components: {
    Hero,
    BasicElements,
    Inputs,
    CustomControls,
    Navigation,
    JavascriptComponents,
    Carousel,
    Icons,
    Examples,
    DownloadSection,
    ServiceIntroduction,
    AwesomeFeatures,
    Advantages
  }
};
</script>

<style scoped lang="scss">
.introduction {
  margin-top: 10vh;
}
.advantage {
  margin-top: 10vh;
}
</style>
