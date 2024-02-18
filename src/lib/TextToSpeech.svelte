<script lang="ts">
  import {
    onSnapshot,
    doc,
    getFirestore,
    updateDoc,
    setDoc,
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import { app } from "./config";

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const changeVoice = (isFemale: boolean) => {
    const iframe: any = document.getElementById("myIframe");
    const iframeContentDocument =
      iframe?.contentDocument || iframe?.contentWindow.document;

    let voice = "Salli";
    if (!isFemale) {
      voice = "Joey";
    }
    // select default voice
    const selectVoice = iframeContentDocument.querySelector(
      'select[name="neural"]'
    );
    if (selectVoice) {
      selectVoice.value = voice;
      const changeEvent = new Event("change", { bubbles: true });
      selectVoice.dispatchEvent(changeEvent);
    }
  };

  const defaultSetting = async () => {
    const iframe: any = document.getElementById("myIframe");
    const iframeContentDocument =
      iframe?.contentDocument || iframe?.contentWindow.document;
    // wait 3 sec to load the page fully
    await delay(3000);
    const changeEvent = new Event("change", { bubbles: true });

    // select default quality
    const selectQuality = iframeContentDocument.querySelector(
      'select[name="voice-choose"]'
    );
    if (selectQuality) {
      selectQuality.value = "neural";
      selectQuality.dispatchEvent(changeEvent);
    }
    await delay(500);

    // select default voice
    const selectVoice = iframeContentDocument.querySelector(
      'select[name="neural"]'
    );
    if (selectVoice) {
      selectVoice.value = "Salli";
      selectVoice.dispatchEvent(changeEvent);
    }

    const audio = iframeContentDocument.querySelector("audio");

    // detect audio plays
    audio.addEventListener("play", async () => {
      // Audio has started
      const db = getFirestore(app);
      await setDoc(doc(db, "setting", "audio"), {
        play: true,
        isGirl: isGirlTalking,
      });
    });

    // detect audio ends
    audio.addEventListener("ended", async () => {
      // Audio has stopped
      const db = getFirestore(app);
      await updateDoc(doc(db, "setting", "audio"), {
        play: false,
        isGirl: false,
      });
    });
  };

  const speechText = async (text: string) => {
    const iframe: any = document.getElementById("myIframe");
    const iframeContentDocument =
      iframe?.contentDocument || iframe?.contentWindow.document;

    const inputElement = iframeContentDocument.querySelector(".form-control");
    if (inputElement) {
      // remove emoji and set the value in the input
      inputElement.value = text.replace(/[^\x00-\x7F]/g, "").replace(" <3", "");
      const changeEvent = new Event("change", { bubbles: true });
      inputElement.dispatchEvent(changeEvent);
    }

    const submitBtn = iframeContentDocument.querySelector(".btn.btn-info");
    if (submitBtn) {
      const clickEvent = new Event("click", { bubbles: true });
      submitBtn.dispatchEvent(clickEvent);
    }
  };

  var isGirlTalking = false;

  onMount(async () => {
    await delay(4000);

    const db = getFirestore(app);
    await defaultSetting();

    // speech the change of the recent comment on firebase
    onSnapshot(doc(db, "message", "comment"), async (doc) => {
      const data = doc.data();
      if (data?.message) {
        isGirlTalking = false;
        changeVoice(isGirlTalking);
        await speechText(data.message);
      }
    });

    // speech the change of the recent response on firebase
    onSnapshot(doc(db, "message", "chatgpt"), async (doc) => {
      const data = doc.data();
      if (data?.message) {
        isGirlTalking = true;
        changeVoice(isGirlTalking);
        await speechText(data.message.replace(/\blofi\s*girl\b/gi, "LofiGPT"));
      }
    });
  });
</script>

<div class=" fixed top-0 left-0 w-screen h-screen opacity-30">
  <iframe
    id="myIframe"
    src="https://ai-service-demos.go-aws.com/polly"
    class="w-full h-full"
    title="read text"
  />
</div>
