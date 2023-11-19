import { POST_PATH, postPaths } from "@/utils/mdx";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";

interface PageProps {
  posts: {
    content: string;
    data: {
      title: string;
      description: string;
      date: string;
      seoDate: string;
      thumbnail?: {
        large?: string;
        banner?: string;
        alt?: string;
      };
      author: {
        name: string;
        avatar: string;
      };
      tags: string[];
      pinned?: boolean;
    };
    filePath: string;
  }[];
}

const BlogPosts: NextPage<PageProps> = ({ posts }) => {
  return (
    <main className="px-8 xl:px-[17vw]">
      <h1 className="mt-36 text-4xl font-bold text-white">
        <span className="text-brand-red-100 drop-shadow-red-glow">Would</span>{" "}
        <span className="text-brand-blue-100 drop-shadow-blue-glow">You</span>{" "}
        Blog
      </h1>

      <div className="mt-8 flex flex-col gap-4">
        {posts.length === 0 && (
          <p className="text-lg text-neutral-300">
            There are no blog posts yet.
          </p>
        )}
        {posts
          .sort((a, b) =>
            a.data.pinned === b.data.pinned ? 0 : a.data.pinned ? -1 : 1,
          )
          .map((post) => (
            <Link
              href={`/blog/${post.filePath.replace(/\.mdx?$/, "")}`}
              key={post.filePath}
              className="relative flex flex-col items-start justify-between rounded-lg bg-neutral-800 p-4 text-neutral-300 transition-all duration-300 hover:bg-neutral-700 sm:flex-row"
            >
              <div className="z-10 flex flex-col items-start gap-2">
                <div className="flex w-full flex-wrap items-center gap-2">
                  <div className="flex-no-wrap flex items-center gap-2">
                    <Image
                      src={post.data.author.avatar}
                      alt={post.data.author.name}
                      width={50}
                      height={50}
                      className="h-10 w-10 rounded-full"
                    />
                    <h4 className="mb-1 text-xl font-bold text-white">
                      {post.data.title}
                    </h4>
                  </div>
                  <div className="flex h-fit flex-wrap gap-2">
                    {post.data.tags.slice(0, 4).map((tag) => (
                      <p
                        key={tag}
                        className="rounded-full border border-neutral-500 px-2 py-1 text-xs text-neutral-300"
                      >
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="text-left">
                  <p className="mb-2 text-sm text-neutral-400">
                    {post.data.date}
                  </p>
                  <p className="text-sm">{post.data.description}</p>
                </div>
              </div>
              {post.data.thumbnail?.large && (
                <div className="relative mt-4 aspect-video min-w-full sm:min-w-[200px]">
                  <Image
                    src={post.data.thumbnail.large}
                    alt={post.data.thumbnail.alt || post.data.title}
                    className="rounded-lg sm:mt-0"
                    fill
                  />
                </div>
              )}
              {post.data.pinned && (
                <svg
                  width="210"
                  height="297"
                  viewBox="0 0 210 297"
                  fill="currentColor"
                  className="absolute -right-3 -top-3 z-10 h-10 w-10 rounded-full bg-neutral-700 p-1 text-neutral-300 shadow"
                >
                  <path d="m 37.279436,221.88246 c 0,-0.34438 0.257235,-0.67605 21.723636,-28.01043 11.44456,-14.573 20.89617,-26.63857 21.0036,-26.81238 0.12457,-0.20157 -2.81639,-3.35001 -8.12038,-8.69323 -6.9607,-7.0122 -8.36673,-8.55465 -8.62898,-9.46623 -0.81961,-2.84901 -0.0914,-4.23754 4.65512,-8.87671 4.78949,-4.68112 6.81632,-6.04111 10.39631,-6.97585 2.41758,-0.63124 4.42626,-0.41608 7.01659,0.75157 1.15095,0.51882 2.69745,1.02295 3.43666,1.1203 1.45981,0.19223 4.00068,-0.22433 5.23545,-0.85832 0.41725,-0.21424 8.060448,-5.92014 16.984898,-12.67978 15.77496,-11.94843 16.24625,-12.33109 16.94463,-13.75854 0.95679,-1.95561 0.99605,-3.92211 0.1182,-5.9201 -1.14716,-2.610915 -0.76706,-6.174751 0.98767,-9.260417 0.9534,-1.676551 3.95765,-4.741306 5.21638,-5.321438 1.35337,-0.623753 2.89186,-0.620596 4.23333,0.0087 1.49552,0.701541 33.29553,32.584145 33.85747,33.945395 0.53783,1.30286 0.50452,2.74625 -0.0933,4.04339 -0.58013,1.25873 -3.64489,4.26298 -5.32144,5.21639 -3.05358,1.73647 -6.67835,2.12323 -9.26042,0.98806 -1.99701,-0.87796 -3.96419,-0.83913 -5.9181,0.11683 -1.4246,0.69699 -1.8155,1.17827 -13.75124,16.93052 -6.75673,8.91723 -12.46353,16.56088 -12.68178,16.98588 -0.64058,1.24745 -1.05871,3.78319 -0.86561,5.24956 0.0973,0.7392 0.59869,2.27954 1.11411,3.42297 1.14554,2.5413 1.35602,4.39338 0.7788,6.85309 -0.84388,3.59606 -2.24131,5.70782 -6.9969,10.57349 -4.63782,4.74518 -6.02266,5.47184 -8.8767,4.6578 -0.91391,-0.26066 -2.43575,-1.64844 -9.46403,-8.63034 -5.705278,-5.66762 -8.482488,-8.2533 -8.712188,-8.11134 -0.18546,0.11462 -11.75436,9.18059 -25.70867,20.1466 -13.95432,10.96602 -26.144152,20.53042 -27.088522,21.25424 -1.653211,1.26712 -2.214574,1.54857 -2.214574,1.11033 z" />
                </svg>
              )}
            </Link>
          ))}
      </div>
    </main>
  );
};

export default BlogPosts;

export function getStaticProps() {
  const posts = postPaths.map((filePath) => {
    const source = readFileSync(path.join(POST_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}
