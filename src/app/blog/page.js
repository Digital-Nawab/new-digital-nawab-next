import Image from 'next/image'
import { BlogPage } from '@/components/Blog/Blog'
import React from 'react'

export const metadata = {
  title: 'Digital Marketing Insights, SEO Guides & AI Search Strategies | Digital Nawab',
  description:
    'Explore the Digital Nawab blog for practical insights, expert guidance and actionable strategies covering SEO, Google Ads, social media, web development, and AI-powered search.',
  alternates: {
    canonical: 'https://www.digitalnawab.com/blog',
  },
}

const page = () => {
  return (
    <div>
      <BlogPage />
    </div>
  )
}

export default page
