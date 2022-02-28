import React, { Suspense } from 'react'
import { Gitlab } from '@gitbeaker/node';
import { Skeleton } from '@chakra-ui/react';

function ItemPageWithData({ id }) {
  //const story = 
  return (
    <></>
  )
}

export default function ItemPage({ id }) {
  if (!id) return null

  return (
    <Suspense fallback={<Skeleton count={10} />}>
      <ItemPageWithData id={id} />
    </Suspense>
  )
}