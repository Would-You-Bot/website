export default interface DiscordUser {
    id: string
    username: string
    avatar: string
    discriminator: string
    public_flags: number
    flags: number
    banner: any
    accent_color: number
    global_name: string
    avatar_decoration: any
    banner_color: string
    mfa_enabled: boolean
    locale: string
    premium_type: number
    iat: number
    exp: number,
    staff: boolean
  }
  
  export interface JAPIUser {
    cache_expiry: number;
    cached: boolean;
    data: Data;
    presence: Presence;
    connections: Connections;
  }
  export interface Data {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner?: null;
    accent_color: number;
    global_name: string;
    avatar_decoration_data?: null;
    banner_color: string;
    tag: string;
    createdAt: string;
    createdTimestamp: number;
    public_flags_array?: (string)[] | null;
    defaultAvatarURL: string;
    avatarURL: string;
    bannerURL?: null;
    bio?: null;
    premium_since?: null;
    premium_guild_since?: null;
  }
  export interface Presence {
    status: string;
    activities?: (ActivitiesEntity)[] | null;
    clientStatus?: (string)[] | null;
  }
  export interface ActivitiesEntity {
    name: string;
    type: number;
    url?: null;
    details?: null;
    state: string;
    applicationId?: null;
    timestamps?: null;
    party?: null;
    assets?: null;
    flags: number;
    emoji?: null;
    buttons?: (null)[] | null;
    createdTimestamp: number;
  }
  export interface Connections {
    error: string;
  }
  