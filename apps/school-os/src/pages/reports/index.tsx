import { useLocation } from '@tanstack/react-router'

export default () => {
  const { href } = useLocation()

  return <p className="text-muted font-mono text-sm break-all">{href}</p>
}
