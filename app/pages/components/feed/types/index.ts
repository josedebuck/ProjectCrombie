// Define all types in a separate types file for better organization
export type User = {
    id: string;
    username: string;
    avatar: string | null;
    cover: string | null;
    name: string | null;
    surname: string | null;
    description: string | null;
    work: string | null;
    createdAt: Date;
  };
  
  export type Comment = {
    id: number;
    desc: string;
    createdAt: Date;
    postId: number;
    userId: string;
  };
  
  export type Post = {
    id: number;
    desc: string;
    img: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: User;
    comments: Comment[];
    _count: {
      comments: number;
    };
  };
  
  export type FeedProps = {
    username?: string;
  };