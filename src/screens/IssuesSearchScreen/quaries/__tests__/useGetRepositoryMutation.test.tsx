import React, { ReactNode } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MockAdapter from 'axios-mock-adapter';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useGetRepositoryMutation } from '../useGetRepositoryMutation';

interface WrapperProps {
  children: ReactNode;
}

const mock = new MockAdapter(axios);
const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: false } },
});

const Wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetRepositoryMutation', () => {
  beforeEach(() => {
    mock.reset();
    jest.useFakeTimers();
  });

  it('should successfully fetch the repository data', async () => {
    jest.useFakeTimers();
    const owner = 'facebook';
    const repository = 'react';
    const mockData = { full_name: `${owner}/${repository}` };

    mock
      .onGet(`https://api.github.com/repos/${owner}/${repository}`)
      .reply(200, mockData);

    const { result } = renderHook(() => useGetRepositoryMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      await waitFor(() => result.current.mutateAsync({ owner, repository }));
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isError).toBeFalsy();
  });
});
