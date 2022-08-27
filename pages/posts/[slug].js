import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import Image from 'next/image'

import { MDXRemote } from 'next-mdx-remote'
import { getPostBySlug, getAllPosts, getPostMDXSource } from '../../lib/posts'

import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import Article from '../../components/article'
import Callout from '../../components/callout'
import DateFormatter from '../../components/date-formatter'


const components = { img: Image, Callout }

export default function Post({ post, source }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <h1>Loading…</h1>
        ) : (
          <>
            <Head>
              <title>
                {post.title}
              </title>
              <meta
                name="description"
                content={post.excerpt}
              />
            </Head>

            <Article>
              <MDXRemote {...source} components={components} />

              <div className="py-12 text-sm">
                <span>
                  Originally published on&nbsp;
                  <DateFormatter dateString={post.date} />.
                </span>

                { post.date != post.modified &&
                  <span>
                    Last update on&nbsp;
                    <DateFormatter dateString={post.modified} />.
                  </span>
                }
              </div>
            </Article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)

  const source = await getPostMDXSource(post.content)

  return {
    props: {
      post: {
        ...post,
      },
      source: source
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
