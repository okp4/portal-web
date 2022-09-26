import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'

const HomeWithoutSSR = dynamic(async () => import('./home/Home'), {
  ssr: false
})

const HomePage: NextPage = () => <HomeWithoutSSR />

export default HomePage
