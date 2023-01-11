import DocumentRepository from '../repositories/DocumentRepository';
import DocumentAttributes from '../models/document';

interface IDocumentService {
  createDocument(payload: DocumentAttributes): Promise<DocumentAttributes>;
  getDocumentByHash(hash: string): Promise<DocumentAttributes>;
}

class DocumentService implements IDocumentService {
  async createDocument(payload: DocumentAttributes): Promise<DocumentAttributes> {
    const document = await DocumentRepository.getDocumentByHash(payload.hash);

    if (document) throw new Error('Hash must be unique');

    return DocumentRepository.createUserDocument({
      hash: payload.hash,
      authorId: payload.authorId
    });
  }

  async getDocumentByHash(hash: string): Promise<DocumentAttributes> {
    const document = await DocumentRepository.getDocumentByHash(hash);
    if (document) return document;

    return { hash: '', authorId: 0 };
  }
}

export default new DocumentService();
