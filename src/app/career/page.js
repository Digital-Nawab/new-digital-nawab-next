import Image from 'next/image'
import Career from '@/components/carrer/Career'
import React from 'react'

export const metadata = {
  title: 'Build Your Career with Digital Nawab | Careers & Opportunities',
  description:
    'Explore career opportunities at Digital Nawab. Join our team of passionate digital marketing, SEO, web development, and design professionals to grow your skills and create digital impact.',
  alternates: {
    canonical: 'https://www.digitalnawab.com/career',
  },
}

const page = () => {
  return (
    <div>
      <Career />
    </div>
  )
}

export default page
