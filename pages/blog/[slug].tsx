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
  toc?: string[];
}

interface TableOfContentsProps {
  toc: string[];
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  if (toc.length === 0) return null;
  return (
    <div className="flex max-w-full flex-col gap-1 xl:max-w-[200px] 2xl:max-w-[240px]">
      <p className="mb-1 font-semibold text-white">TABLE OF CONTENTS</p>
      <ol>
        {toc.map((x) => {
          return (
            <li key={x} className="mt-3">
              <p className="text-sm text-[#D4D4D4]">{x}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

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
        <title>{frontMatter.title + "- Would You Bot"}</title>
        <meta name="description" content={frontMatter.description} />
        <meta
          property="og:title"
          content={frontMatter.title + "- Would You Bot"}
        />
        <meta property="og:description" content={frontMatter.description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={frontMatter.seoDate} />
        <meta property="article:author" content={frontMatter.author.name} />
        <meta property="article:tag" content={frontMatter.tags[0]} />
        <meta property="article:tag" content={frontMatter.tags[1]} />
        <meta property="article:tag" content={frontMatter.tags[2]} />
        <meta property="canonical" />
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
            alt={frontMatter.title + "- Would You Bot"}
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
        <div className="xl: relative left-0 top-0 mb-10 flex border-b border-neutral-500 pb-5 xl:fixed xl:left-4 xl:top-40 xl:border-b-0">
          <TableOfContents toc={frontMatter.toc || []} />
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
