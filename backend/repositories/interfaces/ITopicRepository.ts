import { Topic } from "../../domain/models";

export interface ITopicRepository {
  getTopicByName(name: string): Promise<Topic>;
  getTopicById(id: string): Promise<Topic>;
  createTopic(topic: Topic): void;
  getAllTopics(): Promise<Topic[]>;
  existTopic(name: string): Promise<Boolean>;
  getTopicsThatAcceptsContent(contentType: string): Promise<Topic[]>;
}
