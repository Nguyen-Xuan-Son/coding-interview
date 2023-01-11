interface DocumentAttributes {
  id: number;
  hash: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default DocumentAttributes;
