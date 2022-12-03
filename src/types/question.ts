export interface IQuestion {
  id: number;
  text: string;
  shortText: string;
  sound?: string;
  image?: string;
  youtubeId?: string;
  options: string[];
  timer: number;
  answer?: string;
}
