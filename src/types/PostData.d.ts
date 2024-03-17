type PostData = {
  markdown: string,
  title: string,
  summary: string,
  thumbnail: string,
  id: string,
  author: string,
  timestamp: Date,
  public: boolean,
  tags: string[],
  views: number
}