import { useApi, useMutation } from './useApi';
import { couplesApi, Couple } from '../services/api';

// Hook to get all couples
export function useCouples() {
  return useApi(() => couplesApi.getAll(), []);
}

// Hook to get a specific couple
export function useCouple(id: number) {
  return useApi(() => couplesApi.getById(id), [id]);
}

// Hook to get couples with videos
export function useCouplesWithVideos() {
  return useApi(() => couplesApi.getWithVideos(), []);
}

// Hook for couple mutations
export function useCouplesMutations() {
  const createMutation = useMutation((data: { names: string; title: string; description?: string; location?: string; date?: string; videoUrl?: string }) => 
    couplesApi.create(data)
  );
  const updateMutation = useMutation(({ id, data }: { id: number; data: { names?: string; title?: string; description?: string; location?: string; date?: string; videoUrl?: string; coverImageUrl?: string } }) => 
    couplesApi.update(id, data)
  );
  const deleteMutation = useMutation(couplesApi.delete);
  const uploadImagesMutation = useMutation(({ coupleId, files }: { coupleId: number; files: FileList }) =>
    couplesApi.uploadImages(coupleId, files)
  );
  const uploadCoverMutation = useMutation(({ coupleId, file }: { coupleId: number; file: File }) =>
    couplesApi.uploadCover(coupleId, file)
  );
  const deleteImageMutation = useMutation(couplesApi.deleteImage);
  const reorderImagesMutation = useMutation(({ coupleId, images }: { coupleId: number; images: { id: number; orderIndex: number }[] }) =>
    couplesApi.reorderImages(coupleId, images)
  );

  return {
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,
    uploadImages: uploadImagesMutation,
    uploadCover: uploadCoverMutation,
    deleteImage: deleteImageMutation,
    reorderImages: reorderImagesMutation,
  };
}