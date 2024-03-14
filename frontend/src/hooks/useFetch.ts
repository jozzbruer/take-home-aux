import { Comment, Post, PostData } from '../utils/type';
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
			const updatedResults = data.data.map((post: Post) => {
				// If "selected" field doesn't exist, create it and set it to false
				if (!('selected' in post)) {
					post.selected = false;
				}
				return post;
			});
			setResults((prev) => [...prev, ...updatedResults]);
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

	const handleHugUpdate = useCallback(async (post_url: string) => {
		try {
			const response = await fetch(`http://localhost:8000/posts/${post_url}/update_hugs`, {
				method: 'PUT',
			});
			if (!response.ok) {
				throw new Error('Failed to update hug');
			}
			// Update the "selected" field in the local state
			setResults((prevResults) => {
				return prevResults.map((post) => {
					if (post.post_url === post_url) {
						if (post.selected) {
							return {
								...post,
								num_hugs: post.num_hugs - 1,
								selected: false,
							};
						} else {
							return {
								...post,
								num_hugs: post.num_hugs + 1,
								selected: true,
							};
						}
					}
					return post;
				});
			});
		} catch (error) {
			console.error('Error updating hug:', error);
		}
	}, []);

	const handleAddComment = useCallback(async (post_url: string, comment: Comment) => {
		try {
			const response = await fetch(`http://localhost:8000/posts/${post_url}/add_comment`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(comment),
			});
			if (!response.ok) {
				throw new Error('Failed to add comment');
			}
			setResults((prevResults: any) => {
				return prevResults.map((post: any) => {
					if (post.post_url === post_url) {
						return {
							...post,
							comments: { ...post.comments, comment },
						};
					}
					return post;
				});
			});
		} catch (error) {
			console.error('Error adding comment:', error);
		}
	}, []);

	return useMemo(
		() => ({
			results,
			isLoading,
			isError,
			error,
			hasNextPage,
			handleHugUpdate,
			handleAddComment,
		}),
		[results, isLoading, isError, error, hasNextPage, handleHugUpdate, handleAddComment]
	);
};

export default useFetchPosts;
