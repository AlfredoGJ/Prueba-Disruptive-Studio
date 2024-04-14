import { Topic } from "../../domain/models";

export interface ITopicRepository {
  getTopicByName(name: string): Promise<Topic>;
  getTopicById(id: string): Promise<Topic>;
  createTopic(topic: Topic): void;
  getAllTopics(): Promise<Topic[]>;
  getAllTopicsWithContentCount(): Promise<Topic[]>;
  existTopicByName(name: string): Promise<Boolean>;
  getTopicsThatAcceptsContent(contentType: string): Promise<Topic[]>;
  deleteTopic(id: string): Promise<Boolean>;
  updateTopic(id: string, topic: Topic): Promise<any>;
  existTopicById(id: string): Promise<Boolean>;
}
