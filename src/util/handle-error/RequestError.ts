export default class RequestError extends Error {
  readonly title?: string;
  readonly content: string;
  readonly reason?: string;

  constructor({title, content, reason}: {title?: string, content: string, reason?: string}) {
    super(title ? `${title}-${content}` : content);
    this.title = title;
    this.content = content;
    this.reason = reason;
  }
}
