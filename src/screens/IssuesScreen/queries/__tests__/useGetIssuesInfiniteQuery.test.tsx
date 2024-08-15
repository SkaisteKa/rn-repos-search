import { ReactNode } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MockAdapter from 'axios-mock-adapter';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useGetIssuesInfiniteQuery } from '../useGetIssuesInfiniteQuery';

interface WrapperProps {
  children: ReactNode;
}

const mock = new MockAdapter(axios);
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const Wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetIssuesInfiniteQuery', () => {
  beforeEach(() => {
    mock.reset();
    jest.useFakeTimers();
  });

  it('should successfully fetch the initial page of issues', async () => {
    jest.useFakeTimers();
    const owner = 'facebook';
    const repository = 'react';
    const issuesState = 'open';
    const mockData = [
      { id: 1, title: 'Issue 1' },
      { id: 2, title: 'Issue 2' },
    ];

    mock
      .onGet(`https://api.github.com/repos/${owner}/${repository}/issues`, {
        params: { page: 1, per_page: 7, state: issuesState },
      })
      .reply(200, mockData);

    const { result } = renderHook(
      () => useGetIssuesInfiniteQuery(owner, repository, issuesState),
      {
        wrapper: Wrapper,
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.pages[0]).toBeDefined();
    expect(result.current.data?.pages[0]).toEqual(mockData);
    expect(result.current.isError).toBeFalsy();
  });

  it('should fetch the next page of issues', async () => {
    const owner = 'facebook';
    const repository = 'react';
    const issuesState = 'open';
    const initialMockData = [
      { id: 1, title: 'Issue 1' },
      { id: 2, title: 'Issue 2' },
    ];
    const nextMockData = [
      { id: 3, title: 'Issue 3' },
      { id: 4, title: 'Issue 4' },
    ];

    mock
      .onGet(`https://api.github.com/repos/${owner}/${repository}/issues`, {
        params: { page: 1, per_page: 7, state: issuesState },
      })
      .reply(200, initialMockData);

    mock
      .onGet(`https://api.github.com/repos/${owner}/${repository}/issues`, {
        params: { page: 2, per_page: 7, state: issuesState },
      })
      .reply(200, nextMockData);

    const { result } = renderHook(
      () => useGetIssuesInfiniteQuery(owner, repository, issuesState),
      {
        wrapper: Wrapper,
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.pages[0]).toEqual(initialMockData);

    await act(async () => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.data?.pages.length).toBe(2);
    });

    expect(result.current.data?.pages[1]).toEqual(nextMockData);
    expect(result.current.isError).toBeFalsy();
  });
});
