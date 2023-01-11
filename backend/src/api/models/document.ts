interface DocumentAttributes {
  id?: number;
  hash: string;
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default DocumentAttributes;
