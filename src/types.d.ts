export interface NFT {
  address: string;
  index: number;
  owner: {
    address: string;
    name: string;
    is_scam: boolean;
    icon: string;
  };
  collection?: {
    address: string;
    name: string;
  };
  verified: boolean;
  metadata: {
    name: string;
    image: string;
    description: string;
  };
  previews: {
    resolution: string;
    url: string;
  }[];
  dns: string;
  approved_by: string[];
}
