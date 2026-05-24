export interface UnsplashUser {
  name: string;
  username: string;
  links: {
    html: string;
  };
}

export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  width: number;
  height: number;
  user: UnsplashUser;
  links: {
    html: string;
  };
}
