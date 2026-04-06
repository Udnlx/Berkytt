import { ref } from "vue";

interface MainInfo {
  address: string;
  phone: string;
  mobilePhone: string;
  whatsapp: string;
  email: string;
}

interface MenuItem {
  id: number;
  section: string;
  title: string;
  name: string;
}

interface MainInfoResponse {
  info: MainInfo;
  menuMan: MenuItem[];
  menuWoman: MenuItem[];
}

const cachedMainInfo = ref<MainInfo>({
  address: "",
  phone: "",
  mobilePhone: "",
  whatsapp: "",
  email: "",
});

const cachedMenuMan = ref<MenuItem[]>([]);
const cachedMenuWoman = ref<MenuItem[]>([]);

let fetchPromise: Promise<MainInfoResponse | null> | null = null;

export function useMainInfo() {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const apiKey = config.public.apiKey;

  async function load() {
    if (fetchPromise) return fetchPromise;

    fetchPromise = (async () => {
      try {
        const response = await fetch(`${apiBase}/maininfo`, {
          headers: {
            "X-API-KEY": apiKey,
          },
        });
        const data = await response.json();
        const infoData = data.info && data.info[0] ? data.info[0] : null;

        if (infoData) {
          cachedMainInfo.value = {
            address: infoData.address?.replace(/<[^>]*>/g, "") || "",
            phone: infoData.main_phone || "",
            mobilePhone: infoData.mobile_phone || "",
            whatsapp: infoData.whatsapp || "",
            email: infoData.email || "",
          };
        }

        if (data.menuMan && Array.isArray(data.menuMan)) {
          cachedMenuMan.value = data.menuMan;
        }

        if (data.menuWoman && Array.isArray(data.menuWoman)) {
          cachedMenuWoman.value = data.menuWoman;
        }

        return {
          info: cachedMainInfo.value,
          menuMan: cachedMenuMan.value,
          menuWoman: cachedMenuWoman.value,
        };
      } catch (error) {
        console.error("Failed to fetch maininfo data:", error);
        return null;
      }
    })();

    return fetchPromise;
  }

  return {
    mainInfo: cachedMainInfo,
    menuMan: cachedMenuMan,
    menuWoman: cachedMenuWoman,
    load,
  };
}
