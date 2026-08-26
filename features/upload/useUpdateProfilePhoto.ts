import FileService from "@/services/file-service";
import { useMutation } from "@tanstack/react-query";

export const singlePhoto = async (file: File): Promise<string> => {
  const result = await FileService.uploadSinglePhoto(file);
  return result.data; 
};

export const useUploadSinglePhoto = () => {

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (file: File) => singlePhoto(file),
    onSuccess: (res) => {

    },
  });

  return {
    uploadPhoto: mutateAsync,
    isPending,
  };
};