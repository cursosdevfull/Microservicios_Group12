type TState = "closed" | "opened" | "half-opened";
type TRequest = (...args: any[]) => Promise<any>;

interface IOptions {
  thresholdFailures: number;
  openBreakerTimeout: number;
  closeBreakerTimeout: number;
}

const request = (movieId: number, page: number, limit: number) => {
  return new Promise((resolve, reject) => {
    const rnd = Math.random();
    if (rnd > 0.5) {
      console.log("requesting...", movieId, page, limit);
      resolve("success");
    } else {
      reject("failed");
    }
  });
};

class RequestCircuitBreaker {
  request: TRequest;
  options: IOptions;
  state: TState = "opened";
  failCount = 0;
  successCount = 0;
  finishTimeHalfState = 0;
  triggerFromClose = 0;

  constructor(request: TRequest, options: IOptions) {
    this.request = request;
    this.options = options;
  }

  async fire(...args: any[]) {
    if (this.state === "closed" && Date.now() < this.triggerFromClose) {
      throw new Error("Circuit Breaker is closed");
    }

    try {
      const response = await this.request(...args);
      console.log("response", response);
      this.success(response);
    } catch (error) {
      console.log("error", error);
      this.fail();
    }
  }

  success(response: any) {
    if (this.state === "half-opened") {
      this.successCount++;

      if (Date.now() >= this.finishTimeHalfState) {
        this.state = "opened";
        this.reset();
      }
    }

    if (this.state === "closed") {
      this.state = "opened";
      this.reset();
    }

    return response;
  }

  fail() {
    if (this.state === "closed") {
      this.triggerFromClose = Date.now() + this.options.closeBreakerTimeout;
      return;
    }

    if (this.state === "opened") {
      this.state = "half-opened";
      this.failCount = 1;
      this.finishTimeHalfState = Date.now() + this.options.openBreakerTimeout;
      return;
    }

    if (this.state === "half-opened") {
      this.failCount++;

      if (Date.now() > this.finishTimeHalfState) {
        this.reset();
        this.failCount = 1;
        this.finishTimeHalfState = Date.now() + this.options.openBreakerTimeout;
        return;
      }

      if (this.failCount >= this.options.thresholdFailures) {
        this.state = "closed";
        this.reset();
        this.triggerFromClose = Date.now() + this.options.closeBreakerTimeout;
        return;
      }
    }
  }

  reset() {
    this.failCount = 0;
    this.successCount = 0;
    this.finishTimeHalfState = 0;
    this.triggerFromClose = 0;
  }
}

const requestCircuitBreaker = new RequestCircuitBreaker(request, {
  thresholdFailures: 3,
  openBreakerTimeout: 5000,
  closeBreakerTimeout: 5000,
});

setInterval(() => {
  requestCircuitBreaker
    .fire(1001, 1, 30)
    .catch((err) => console.log(err.message));
}, 1000);
