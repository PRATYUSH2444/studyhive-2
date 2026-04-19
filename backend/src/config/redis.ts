export const redisGet = async (key: string) => {
  const url = `${process.env.REDIS_URL}/get/${key}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.REDIS_TOKEN}` }
  })
  if (!res.ok) return null
  const data = await res.json() as any
  return data.result
}

export const redisSet = async (key: string, value: string, exSeconds?: number) => {
  const url = exSeconds 
    ? `${process.env.REDIS_URL}/set/${key}/${encodeURIComponent(value)}/ex/${exSeconds}`
    : `${process.env.REDIS_URL}/set/${key}/${encodeURIComponent(value)}`
  await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.REDIS_TOKEN}` }
  })
}

export const redisDel = async (key: string) => {
  await fetch(`${process.env.REDIS_URL}/del/${key}`, {
    headers: { Authorization: `Bearer ${process.env.REDIS_TOKEN}` }
  })
}

export const redisIncr = async (key: string) => {
  const res = await fetch(`${process.env.REDIS_URL}/incr/${key}`, {
    headers: { Authorization: `Bearer ${process.env.REDIS_TOKEN}` }
  })
  if (!res.ok) return null
  const data = await res.json() as any
  return data.result
}
