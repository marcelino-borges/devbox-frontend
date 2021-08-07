export interface IPortfolioItem {
  name: string;
  description: string;
  highlightImg: string;
  imgs: string[];
  storeUrl: string;
  otherUrls: {
    name: string;
    url: string;
  }[]
}
