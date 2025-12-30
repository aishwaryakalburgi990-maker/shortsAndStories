import { useApi, useMutation } from './useApi';
import { aboutApi, AboutMe } from '../services/api';

// Hook to get about information
export function useAbout() {
  return useApi(() => aboutApi.get(), []);
}

// Hook for about mutations
export function useAboutMutations() {
  const updateMutation = useMutation((data: Partial<AboutMe>) =>
    aboutApi.update(data)
  );
  const uploadProfileMutation = useMutation((file: File) =>
    aboutApi.uploadProfile(file)
  );

  return {
    update: updateMutation,
    uploadProfile: uploadProfileMutation,
  };
}