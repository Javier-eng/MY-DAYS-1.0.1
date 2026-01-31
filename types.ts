
export enum StudioView {
  WRITER = 'writer',
  ARTIST = 'artist',
  SPEAKER = 'speaker',
  GALLERY = 'gallery'
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export interface AudioRecording {
  id: string;
  text: string;
  voice: string;
  timestamp: number;
}
