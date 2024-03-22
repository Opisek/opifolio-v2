type PostData = {
  markdown: string,
  title: string,
  summary: string,
  thumbnail: string,
  dbid?: number,
  id?: string,
  author: string,
  timestamp: Date,
  public: boolean,
  tags: string[],
  views?: number
}