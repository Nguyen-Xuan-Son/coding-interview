import { PrismaClient } from '@prisma/client';
import DocumentAttributes from '../models/document';

interface IDocumentRepository {
  createUserDocument(payload: DocumentAttributes, authorId: number): Promise<DocumentAttributes>;
  getDocumentByHash(hash: string): Promise<DocumentAttributes | null>;
}

const prisma = new PrismaClient();

class DocumentRepository implements IDocumentRepository {
  async createUserDocument(payload: DocumentAttributes): Promise<DocumentAttributes> {
    const user = await prisma.document.create({
      data: {
        hash: payload.hash,
        authorId: payload.authorId
      }
    });
    return user;
  }

  async getDocumentByHash(hash: string): Promise<DocumentAttributes | null> {
    const document = await prisma.document.findFirst({
      where: { hash }
    });
    return document;
  }
}

export default new DocumentRepository();
