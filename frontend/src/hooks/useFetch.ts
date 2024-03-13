import { Post, PostData } from '../utils/type';
import { useEffect, useState } from 'react';

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

	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
		setError({});

		const controller = new AbortController();
		const { signal } = controller;

		fetchPosts(pageParam, { signal })
			.then((data: PostData) => {
				setResults((prev) => [...prev, ...data.data]);
				setHasNextPage(data.page < data.total_pages);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				if (signal.aborted) return;
				setIsError(true);
				setError({ message: error });
			});

		return () => controller.abort();
	}, [pageParam]);

	return { results, isLoading, isError, error, hasNextPage };
};

export default useFetchPosts;
