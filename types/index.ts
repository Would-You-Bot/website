export type PackLanguage = 'en_EN' | 'de_DE' | 'it_IT' | 'fr_FR' | 'es_ES'

export const packMap: Record<PackType, string> = {
  wouldyourather: 'Would You Rather',
  neverhaveiever: 'Never Have I Ever',
  whatwouldyoudo: 'What Would You Do',
  truth: 'Truth',
  dare: 'Dare',
  topic: 'Topic',
  mixed: 'Mixed',
  wyr: 'Would You Rather',
  nhie: 'Never Have I Ever',
  wwyd: 'What Would You Do'
}

export enum PackType {
  wouldyourather = 'wouldyourather',
  neverhaveiever = 'neverhaveiever',
  whatwouldyoudo = 'whatwouldyoudo',
  truth = 'truth',
  dare = 'dare',
  topic = 'topic',
  mixed = 'mixed',
  wyr = 'wyr',
  nhie = 'nhie',
  wwyd = 'wwyd'
}
