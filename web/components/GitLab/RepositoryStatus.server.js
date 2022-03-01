import React, { Suspense } from 'react'
import { Gitlab } from '@gitbeaker/node';
import RepositoryStatus from './RepositoryStatus.client';

function RepositoryStatusWithData({ id }) {
  //const repo = 
  const repo = "Hei"
  return (
    <RepositoryStatus repo={repo} />
  )
}

export default function RepositoryStatusComponent({ id }) {
  if (!id) return null

  return (
    <Suspense fallback={'Loading...'}>
      <RepositoryStatusWithData id={id} />
    </Suspense>
  )
}