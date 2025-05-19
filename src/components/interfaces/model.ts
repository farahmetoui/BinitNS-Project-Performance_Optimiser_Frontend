export interface MetricsData {
  url: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
}

export interface webVitaldata {
  _id: string;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  totalBlockingTime: number;
  interactive: number;
  speedIndex: number;
  timeToFirstByte: number;
  firstInputDelay: number;
  inputLatency: number | null;
}

export interface ApplicationToTest {
  _id: any;
  id: any;
  name: string;
  mainUrl: string;
  urls: string[];

}


export interface Test {
  DateofTest: string;
  app: string;
  Metrics: MetricsData[];

}

export interface MetricsDataType {
  urlRapport: string;
  _id: string;
  url: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
  webVitalsId: string;
}

export const multiOptions = [
  { value: "All", text: "All", selected: true },
  { value: "https://online-we-fe-u.morgenfund.com/#login", text: "https://online-we-fe-u.morgenfund.com/#login", selected: false },
  { value: "https://online-we-fe-u.morgenfund.com/#multi-depot-dashboard", text: "https://online-we-fe-u.morgenfund.com/#multi-depot-dashboard", selected: false },
  { value: "https://online-we-fe-u.morgenfund.com/#dashboard", text: "https://online-we-fe-u.morgenfund.com/#dashboard", selected: false },
  { value: "https://online-we-fe-u.morgenfund.com/#watchlist", text: "https://online-we-fe-u.morgenfund.com/#watchlist", selected: false },
  { value: "https://online-we-fe-u.morgenfund.com/#settings/profile", text: "https://online-we-fe-u.morgenfund.com/#settings/profile", selected: false },
  { value: "https://online-we-fe-u.morgenfund.com/#postbox", text: "https://online-we-fe-u.morgenfund.com/#postbox", selected: false },
  { value: "https://online-we-fe-u.morgenfund.com/#transactions", text: "https://online-we-fe-u.morgenfund.com/#transactions", selected: false },
  { value: "https://online-we-fe-u.morgenfund.com/#manage-orders", text: "https://online-we-fe-u.morgenfund.com/#manage-orders", selected: false },
  { value: "https://online-we-fe-u.morgenfund.com/#link-depot", text: "https://online-we-fe-u.morgenfund.com/#link-depot", selected: false },
  { value: "https://online-we-fe-u.morgenfund.com/#usersettings/userprofile", text: "https://online-we-fe-u.morgenfund.com/#usersettings/userprofile", selected: false },
  { value: "https://www.morgenfund.com/de/private/kontakt/online-depot", text: "https://www.morgenfund.com/de/private/kontakt/online-depot", selected: false },
  { value: "https://online-we-fe-u.morgenfund.com/#fund-finder", text: "https://online-we-fe-u.morgenfund.com/#fund-finder", selected: false },


];
export const wiseOptions = [
  { value: "All", text: "All", selected: true },
  { value: "https://portfolio-online-we-fe-t.morgenfund.com/#/login", text: "https://portfolio-online-we-fe-t.morgenfund.com/#/login", selected: false },
  { value: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/", text: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/", selected: false },
  { value: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/my-account/experience-knowledge", text: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/my-account/experience-knowledge", selected: false },
  { value: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/manage-portfolio/", text: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/manage-portfolio/", selected: false },
  { value: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/document-centre/reports/", text: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/document-centre/reports/", selected: false },
  { value: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/settings/personal-details", text: "https://online-we-fe-u.morgenfund.com/#postbox", selected: false },
  { value: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/settings/pin-admin", text: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/settings/pin-admin", selected: false },
  { value: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/settings/tan-admin", text: "https://portfolio-online-we-fe-t.morgenfund.com/#/dashboard/settings/tan-admin", selected: false },

];

