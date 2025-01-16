export interface ShardStats {
  id: number
  status: Status
  ping: number
  guilds: number
  members: number
  selected?: boolean
}

export interface ClusterStats extends Array<ShardStats> {}

export const Status = {
  Ready: 0,
  Connecting: 1,
  Reconnecting: 2,
  Idle: 3,
  Nearly: 4,
  Disconnected: 5,
  'Waiting For Guilds': 6,
  Identifying: 7,
  Resuming: 8
} as const

export type Status = (typeof Status)[keyof typeof Status]
