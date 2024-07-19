import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const QUERY_KEY = ['Issues'];

const fetchIssues = async (
  owner: string,
  repository: string,
  pageParam: number,
) => {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repository}/issues`,
    { params: { page: pageParam, per_page: 3 } },
  );
  return data;
};

export const useGetIssuesInfiniteQuery = (
  owner: string,
  repository: string,
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEY,
    queryFn: ({ pageParam }) => fetchIssues(owner, repository, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    initialPageParam: 1,
  });
};
