import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";
import Link from "next/link";
import { getMDXComponent } from "next-contentlayer/hooks";
import { mdxComponents } from "lib/mdxComponents";

type PostsListProps = {
  posts: Array<Post>;
};

type PostDescriptionProps = {
  post: Post;
};

export const PostDescription = ({ post }: PostDescriptionProps) => {
  const MDXContent = getMDXComponent(post.excerpt.code);
  return <MDXContent components={mdxComponents} />;
};

export const PostsList = ({ posts }: PostsListProps) => {
  return (
    <section>
      <ul>
        {posts.map((post) => (
          <li className="mb-8 md:my-14" key={`${post.slug}`}>
            <div className="flex flex-col md:flex-row justify-between items-baseline">
              <h3 className="text-2xl mb-2 mr-2 leading-snug tracking-tight font-semibold">
                <Link href={post.url}>{post.formattedTitle}</Link>
              </h3>
              <div className="text-md whitespace-nowrap text-blue-700 dark:text-sky-400">
                { format(parseISO(post.created), 'MMM do yyyy')}
              </div>
            </div>
            <p className="text-md leading-relaxed">
              <PostDescription post={post}/>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
