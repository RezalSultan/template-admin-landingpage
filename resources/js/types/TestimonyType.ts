export type DataTestimonySchema = {
  id: number;
  testimoni_name: string;
  satisfaction: number;
  expression: string;
  avatar_testimoni?: string | null;
  created_at: string;
  updated_at: string;
};

export type FormTestimonyRequest = {
  testimoni_name: string;
  satisfaction: number;
  expression: string;
  avatar_testimoni?: string | File | null;
};
