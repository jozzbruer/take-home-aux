import { Post, PostData } from '../utils/type';
import { useCallback, useEffect, useMemo, useState } from 'react';

const fetchPosts = async (pageParam = 1, option = {}): Promise<PostData> => {
	const result = await fetch(`http://localhost:8000/posts?page=${pageParam}`, option);
	const data = await result.json();
	return data;
};

const useFetchPosts = (pageParam = 1) => {
	const [results, setResults] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<any>({});
	const [hasNextPage, setHasNextPage] = useState(false);

	const fetchData = useCallback(async (page: number) => {
		setIsLoading(true);
		setIsError(false);
		setError({});

		try {
			const data = await fetchPosts(page);
			setResults((prev) => [...prev, ...data.data]);
			setHasNextPage(data.page < data.total_pages);
		} catch (error) {
			setIsError(true);
			setError({ message: error });
		}

		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchData(pageParam);
	}, [fetchData, pageParam]);

	const refetchPosts = useCallback(() => {
		// Clear existing results and refetch from page 1
		setResults([]);
		fetchData(1);
	}, [fetchData]);

	return useMemo(
		() => ({
			results,
			isLoading,
			isError,
			error,
			hasNextPage,
			refetchPosts,
		}),
		[results, isLoading, isError, error, hasNextPage, refetchPosts]
	);
};

export default useFetchPosts;
