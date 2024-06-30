import { Metadata } from 'next';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';
import BlogItem from '@/components/Blog/BlogItem';
import { getAllBlogs } from '@/app/libs/markdown';
import BlogCover from '@/components/Blog/BlogCover';
import BlogList from '@/components/Blog/BlogList';

const BlogHero = dynamic(() => import('@/containers/blog/hero'), {
  ssr: false,
});
const CTASection = dynamic(() => import('@/containers/cta'), { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL('https://odigos.io'),
  title: 'Odigos - Instant Distributed Tracing',
  icons: '/images/logo/logo.png',
  openGraph: {
    title: 'Odigos - Instant Distributed Tracing',
    images: '/images/hero/overview.gif',
  },
};

const BlogPage = async () => {
  const posts = getAllBlogs([
    'title',
    'date',
    'excerpt',
    'coverImage',
    'slug',
    'body',
  ]);

  return (
    <div style={{ background: theme.colors.secondary }}>
      <BlogHero />
      <BlogCover blog={posts[0]} />
      <BlogList posts={posts.slice(1)} />
      <CTASection />
    </div>
  );
};

export default BlogPage;
