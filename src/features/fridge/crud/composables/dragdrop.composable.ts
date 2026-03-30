import { useAlerts } from "@/composables/alert.composable";
import { ref, type Ref } from "vue";

const { scheduleAlert } = useAlerts();

const isDraggingOver = ref(false);

function handleDragOver(e: DragEvent) {
  e.preventDefault();
}
function handleDragEnter(e: DragEvent) {
  e.preventDefault();
  isDraggingOver.value = true;
}
function handleDragLeave(e: DragEvent) {
  const dragArea = e.currentTarget as HTMLElement;
  const target = e.relatedTarget as Node | null; // Node kvuli contains funkci, relatedTarget = element na ktery prijizdi mys (s target nefunguje)
  if (dragArea.contains(target)) return; // ignoruje kdyz se prejizdi mysi nad detmi formulare
  isDraggingOver.value = false;
}
function handleDrop(e: DragEvent, selectedImg: Ref) {
  e.preventDefault();
  isDraggingOver.value = false;

  // nacteni souboru z eventu
  const files = e.dataTransfer?.files;
  if (!files || files.length === 0) {
    selectedImg.value = null;
  } else {
    const file = files[0]!;
    if (!file?.type.startsWith("image/")) {
      scheduleAlert("You can only upload an image!");
      return;
    }

    selectedImg.value = file;
  }
}

function bindDragAndDrop(form: HTMLElement, selectedImg: Ref) {
  form.addEventListener("dragenter", handleDragEnter);
  form.addEventListener("dragover", handleDragOver);
  form.addEventListener("dragleave", handleDragLeave);
  form.addEventListener("drop", (e: DragEvent) => handleDrop(e, selectedImg));
}

export function useDragAndDrop() {
  return {
    isDraggingOver,
    bindDragAndDrop,
  };
}
