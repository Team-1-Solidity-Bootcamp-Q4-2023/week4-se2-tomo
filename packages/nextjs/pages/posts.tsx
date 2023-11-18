// pages/posts.tsx
import { GetServerSideProps } from 'next';
import { PrismaClient, Post } from '@prisma/client';

const prisma = new PrismaClient();

interface PostsProps {
    posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => (
    <div>
        <h1>Posts</h1>
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </li>
            ))}
        </ul>
    </div>
);

export const getServerSideProps: GetServerSideProps<PostsProps> = async () => {
    const posts = await prisma.post.findMany();
    return {
        props: {
            posts,
        },
    };
};

export default Posts;
