export interface Person {
  id: string
  token: string
}

export interface Establishment {
  token: string
  name: string
  lat: number
  lng: number
}

export interface Exchanges {
  id: string
  person: Person
  establishment: Establishment
  date: Date
}
