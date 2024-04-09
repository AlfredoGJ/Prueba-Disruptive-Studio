import { ContentType } from "../../domain/models";

export interface IContentTypeRepository {
  createContentType(contentType: ContentType): void;
  getAllContentTypes(): Promise<ContentType[]>;
  existContentType(name: string): Promise<Boolean>;
}
