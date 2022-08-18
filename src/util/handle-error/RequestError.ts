export default class RequestError extends Error {
  readonly title?: string;
  readonly content: string;
  readonly cause?: string;

  constructor({title, content, cause}: {title?: string, content: string, cause?: string}) {
    super(title ? `${title}-${content}` : content);
    this.title = title;
    this.content = content;
    this.cause = cause;
  }
}
