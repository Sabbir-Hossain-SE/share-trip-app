export interface VsToolProduct {
  productId: string
  name: string
  slug: string
  icon: string
  details: string
  dependentSettingCount: number
  version: string
}

export interface VsToolProductSubscription {
  subscriptionId: string
  productId: string
  product: VsToolProduct
  name: string
  slogan: string
  priceTitle: string
  features: unknown
}

export interface MyOrgProduct {
  productSubscriptionId: string
  subscriptionId: string
  product: VsToolProduct
  startDate: string
  expiredDate: string
  dependentSettingCompleteCount: number
  organizationSetupDone: boolean
}

export interface MyProduct {
  productSubscriptionId: string
  subscriptionId: string
  subscription: VsToolProductSubscription
  startDate: string
  expiredDate: string
  dependentSettingCompleteCount: number
  organizationSetupDone: boolean
}
