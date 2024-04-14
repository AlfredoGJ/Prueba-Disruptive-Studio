import { ContentType } from "../../domain/models";

export interface IContentTypeRepository {
  createContentType(contentType: ContentType): void;
  getAllContentTypes(): Promise<ContentType[]>;
  existContentTypeByName(name: string): Promise<Boolean>;
  existContentTypeById(id: string): Promise<Boolean>;
  deleteContentType(id: string): Promise<Boolean>;
  updataContentType(id: string, contentType: ContentType): Promise<any>;
}
