import { ref } from "vue";
import { projectFireStore } from "@/configs/firebase";

function useCollection(name) {
  const error = ref(null);
  const isPending = ref(false);

  async function addRecord(record) {
    error.value = null;
    isPending.value = true;
    try {
      const response = await projectFireStore.collection(name).add(record);

      return response;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    } finally {
      isPending.value = false;
    }
  }

  async function getRecords() {
    error.value = null;

    try {
      const response = await projectFireStore.collection(name).get();

      const data = response.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      return data;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  }

  return { error, isPending, addRecord, getRecords };
}

export default useCollection;
