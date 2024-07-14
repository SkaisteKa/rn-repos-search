import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const fetchRepository = async (owner: string, repository: string) => {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repository}`,
  );
  return data;
};

export const useGetRepositoryMutation = () =>
  useMutation({
    mutationFn: ({
      owner,
      repository,
    }: {
      owner: string;
      repository: string;
    }) => fetchRepository(owner, repository),
  });
