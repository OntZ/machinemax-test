const isRequestSuccessful = (response: Response) => response.status >= 200 && response.status < 204;

class HTTPError extends Error {
  public readonly httpStatus?: number;
  constructor(message: string, httpStatus?: number) {
    super(message);
    this.httpStatus = httpStatus;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class Http {
  public static fetch = async (url: string, options?: RequestInit | undefined) => {

    /**
     * Using Express proxy over https://dummy-hacxuuktha-ew.a.run.app because it doesn't have CORS enabled
     */
    const result = await fetch('api/' + url, options);

    if (!isRequestSuccessful(result)) {
      throw new HTTPError('Http error occurred', result.status);
    }

    return result.json();
  }
}