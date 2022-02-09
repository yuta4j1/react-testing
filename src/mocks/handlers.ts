import { rest } from "msw";

const apiUrl = (path: string): string => {
  return "http://localhost:5432" + path;
};

export const handlers = [
  rest.get(apiUrl("/todos"), (req, res, ctx) => {
    const todos = [
      {
        id: 1,
        text: "朝起きる",
        done: true
      },
      {
        id: 2,
        text: "歯を磨く",
        done: true
      },
      {
        id: 3,
        text: "漫画を読む",
        done: false
      },
      {
        id: 4,
        text: "breakfast",
        done: false
      },
      {
        text: "TODO",
        done: false,
        id: 5
      },
      {
        text: "テストリスト",
        done: false,
        id: 6
      }
    ];
    return res(
      ctx.status(200),
      ctx.json({
        todos
      })
    );
  })
];
