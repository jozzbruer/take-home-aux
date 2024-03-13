export interface Comment {
	id: number;
	parent_id: number | null;
	display_name: string;
	text: string;
	created_at: string;
}

export type PostData = {
	page: number;
	page_size: number;
	total_pages: number;
	total_items: number;
	data: Post[];
};

export type Post = {
	post_url?: string;
	title: string;
	created_at?: string;
	num_hugs?: number;
	patient_description?: string;
	assessment?: string;
	question?: string;
	comments?: Record<string, Comment>;
	ref?: any;
};

export interface CardProps {
	post: Post[];
}
