const isRequestSuccessful = (response: Response) => response.status >= 200 && response.status < 204;

class HTTPError extends Error {
  public readonly httpStatus?: number;
  constructor(message: string, httpStatus?: number) {
    super(message);
    this.httpStatus = httpStatus;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

let prefix: string;
/**
 * The specified endpoint doesn't allow other origins, so...
 */
if (process.env.NODE_ENV === 'production') {
  /**
   * Bypass CORS in build by using this convenient service
   */
  prefix = 'https://cors-anywhere.herokuapp.com/dummy-hacxuuktha-ew.a.run.app'
} else {
  /**
   * Bypas CORS locally by proxy-ing
   */
  prefix = 'api'
}

export class Http {
  public static fetch = async (url: string, options?: RequestInit | undefined) => {

    /**
     * Using Express proxy over https://dummy-hacxuuktha-ew.a.run.app because it doesn't have CORS enabled
     */
    const result = await fetch(prefix + url, options);

    if (!isRequestSuccessful(result)) {
      throw new HTTPError('Http error occurred', result.status);
    }

    return result.json();
  }
}