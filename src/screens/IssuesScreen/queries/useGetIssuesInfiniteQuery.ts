import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const QUERY_KEY = ['Issues'];

const fetchIssues = async (
  owner: string,
  repository: string,
  pageParam: number,
  issuesState: string,
) => {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repository}/issues`,
    { params: { page: pageParam, per_page: 7, state: issuesState } },
  );
  return data;
};

export const useGetIssuesInfiniteQuery = (
  owner: string,
  repository: string,
  issuesState: string,
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEY,
    queryFn: ({ pageParam }) =>
      fetchIssues(owner, repository, pageParam, issuesState),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
};
