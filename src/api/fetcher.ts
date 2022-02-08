const BASE_PATH = "http://localhost:5432";

export async function getRequest<T>(path: string): Promise<T> {
  try {
    const v = await fetch(BASE_PATH + path, {
      method: "GET"
    });
    return v.json() as Promise<T>;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function postRequest<P, T>(path: string, param: P): Promise<T> {
  try {
    const v = await fetch(BASE_PATH + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(param)
    });
    return v.json() as Promise<T>;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
