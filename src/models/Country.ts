interface Country {
  name: { common: string, official: string };
  flags: { png: string, alt: string };
  cioc: string;
  fifa: string;
  capital: string[];
  region: string;
  subregion: string;
  currencies: Record<string, { name: string, symbol: string }>;
  population: number;
}

export default Country;
