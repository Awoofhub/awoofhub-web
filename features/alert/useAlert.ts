import { useRemoveAlert } from "./useRemoveAlert";
import { useSetAlert } from "./useSetAlert";
import { useUserAlert } from "./useUserAlert";

export const useAlert = (id: string) => {
  const isSubscribed = useUserAlert(id);
  const { setAlert } = useSetAlert({id});
  const { removeAlert } = useRemoveAlert({id});

  const toggleAlert = () => {
    if (isSubscribed) {
      removeAlert();
    } else {
      setAlert();
    }
  };

  return { toggleAlert, isSubscribed };
};