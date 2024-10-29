export interface BaseUser {
  id: string;
  username: string;
  name: string;
  email: string;
  imageUrl: string;
  profilePicture: string;
  bio: string | null;
}

export interface SocialLinks {
  twitter: string | null;
  linkedIn: string | null;
  personalWebsite: string | null;
  telegram: string | null;
}

export interface Post {
  id: string;
  title: string;
  imageUrl: string | null;
  description: string;
  content: string;
  published: boolean;
  createdAt: string;
  likes: number;
  comments: number;
}

export interface UserStats {
  posts: number;
  likes: number;
  bookmarks: number;
  followers: number;
  following: number;
}

export interface ProfileUser {
  blog: {
    id: string;
    title: string;
    imageUrl: string | null;
    description: string;
  };
}

export interface UserConnection {
  id: string;
  name: string;
  username: string;
  imageUrl: string | null;
  profilePicture?: string;
  bio?: string;
}

export interface User extends BaseUser, SocialLinks {
  posts: Post[];
  likes: ProfileUser[];
  bookmarks: ProfileUser[];
  followers: UserConnection[];
  following: UserConnection[];
  stats: UserStats;
}
