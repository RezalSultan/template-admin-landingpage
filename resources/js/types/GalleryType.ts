export type DataGallerySchema = {
  id: number;
  name_url: string;
  title: string;
  description: string | null;
  event_date: string | Date | null;
  width: number;
  height: number;
  created_at: string;
  updated_at: string;
};

export type FormGalleryRequest = {
  name_url: string | File | null;
  title: string;
  description: string | null;
  event_date: string | Date | null;
};
