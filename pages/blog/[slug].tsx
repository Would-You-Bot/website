import Button from "@/components/Button";
import blogStyles from "@/styles/blog.module.css";
import { POST_PATH, postPaths } from "@/utils/mdx";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { motion, useScroll, useSpring } from "framer-motion";

const components = {
  Button: Button,
  a: CustomLink,
};

function CustomLink(props: any) {
  return <a {...props} target="_blank" />;
}

interface FrontMatter {
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
}

const BlogPost: NextPage<{
  source: MDXRemoteSerializeResult;
  frontMatter: FrontMatter;
}> = ({ source, frontMatter }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta name="description" content={frontMatter.description} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={frontMatter.seoDate} />
        <meta property="article:author" content={frontMatter.author.name} />
        <meta property="article:tag" content={frontMatter.tags[0]} />
        <meta property="article:tag" content={frontMatter.tags[1]} />
        <meta property="article:tag" content={frontMatter.tags[2]} />
        {frontMatter.thumbnail?.large && (
          <meta
            key="og:image"
            property="og:image"
            content={frontMatter.thumbnail?.large}
          />
        )}
      </Head>

      <motion.div className={blogStyles["progress-bar"]} style={{ scaleX }} />
      <div className="mt-36 px-8 text-neutral-300 xl:px-[17vw]">
        <Link
          href="/blog"
          className="text-neutral-300 transition-all hover:text-white"
        >
          <p className="mb-4">&larr; Back</p>
        </Link>
        {frontMatter.thumbnail?.banner && (
          <Image
            src={frontMatter.thumbnail.banner}
            alt={frontMatter.title}
            width={1000}
            height={200}
            className="mb-4 h-auto w-full rounded-lg"
          />
        )}
        <h1 className="text-4xl font-bold text-white">{frontMatter.title}</h1>
        <p className="mt-4">{frontMatter.description}</p>
        <div className="mt-4 flex items-center">
          <Image
            src={frontMatter.author.avatar}
            alt={frontMatter.author.name}
            width={30}
            height={30}
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-4">
            <p className="text-neutral-300">{frontMatter.author.name}</p>
            <p className="text-sm text-neutral-400">{frontMatter.date}</p>
          </div>
        </div>
        <div className="my-4 flex flex-wrap gap-1 border-b border-b-neutral-500 pb-4">
          {frontMatter.tags.map((tag) => (
            <p
              key={tag}
              className="min-w-fit rounded-full border border-neutral-500 px-2 py-1 text-xs text-neutral-300"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>

      <main
        className={`markdown px-8 text-neutral-300 xl:px-[17vw] ${blogStyles.markdown}`}
      >
        <MDXRemote {...source} components={components} />
      </main>
    </>
  );
};

export default BlogPost;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POST_PATH, `${params?.slug}.mdx`);
  const source = readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postPaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
