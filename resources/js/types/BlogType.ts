enum EnumStatus {
  DRAFT = "DRAFT",
  PUBLISH = "PUBLISH",
}

export type DataBlogSchema = {
  id: bigint;
  title: string;
  slug: string;
  desc?: string;
  cover_image?: string;
  status: EnumStatus;
  author?: string;
  created_at: string;
  updated_at: string;
};

export type TagSchema = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type BlogTagSchema = {
  id: number;
  blog_id: number;
  tag_id: number;
  created_at: Date;
  updated_at: Date;
};

export type BlogSectionSchema = {
  id: number;
  blog_id: number;
  order: number;
  type_view_content?: string | null;
  url_asset?: string | null;
  caption?: string | null;
  sub_title?: string | null;
  body?: string | null;
  created_at: Date;
  updated_at: Date;
};

export type AllBlogSchema = DataBlogSchema & {
  blog_tags?: BlogTagSchema &
    {
      tag: TagSchema;
    }[];
  blog_sections?: BlogSectionSchema[];
};

export type SectionRequestType = {
  id: number;
  order: number;
  type_view_content: string;
  url_asset?: File | string | null;
  caption: string;
  sub_title: string;
  body: string;
};

export type FormRequestType = {
  title: string;
  desc: string;
  cover_image?: File | string | null;
  status: "DRAFT" | "PUBLISH";
  author: string;
  tags: string[];
  sections: SectionRequestType[];
};
