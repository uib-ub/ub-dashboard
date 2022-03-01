export default function RepositoryStatus({ repo }) {
  return (
    <div className="item">
      <p>{repo ?? 'hei'}</p>
    </div>
  )
}