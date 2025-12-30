import { useApi, useMutation } from './useApi';
import { heroApi, HeroImage } from '../services/api';

// Hook to get hero images
export function useHeroImages() {
  return useApi(() => heroApi.getAll(), []);
}

// Hook for hero mutations
export function useHeroMutations() {
  const replaceMutation = useMutation(({ orderIndex, file }: { orderIndex: number; file: File }) =>
    heroApi.replace(orderIndex, file)
  );
  const reorderMutation = useMutation((images: { id: number; orderIndex: number }[]) =>
    heroApi.reorder(images)
  );

  return {
    replace: replaceMutation,
    reorder: reorderMutation,
  };
}