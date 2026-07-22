import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const claimButton = () => screen.getByRole("button", { name: "보상 수령" });

const getTotalPoints = () =>
  Number(within(claimButton()).getByText(/^\d+$/).textContent);

async function addTask(
  user: ReturnType<typeof userEvent.setup>,
  title: string,
  reward?: number,
) {
  await user.click(screen.getByRole("button", { name: "퀘스트 추가" }));
  await user.type(
    screen.getByPlaceholderText("퀘스트를 입력하세요"),
    title,
  );
  if (reward !== undefined) {
    fireEvent.change(screen.getByRole("slider"), {
      target: { value: String(reward) },
    });
  }
  await user.click(screen.getByRole("button", { name: "접수" }));
  await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument(), {
    timeout: 2000,
  });
}

async function completeTask(user: ReturnType<typeof userEvent.setup>, title: string) {
  await user.click(screen.getByRole("button", { name: "퀘스트 완료 도장" }));
  await user.click(screen.getByText(title));
  await user.click(screen.getByRole("button", { name: "퀘스트 완료 도장" }));
  await waitFor(() =>
    expect(screen.queryByText(title)).not.toBeInTheDocument(),
  );
}

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("퀘스트를 추가하면 게시판에 표시된다", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "설거지하기");

    expect(screen.getByText("설거지하기")).toBeInTheDocument();
  });

  it("퀘스트를 완료하면 게시판에서 사라지고 보상 포인트를 획득한다", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "빨래 개기", 10);
    expect(getTotalPoints()).toBe(0);

    await completeTask(user, "빨래 개기");

    expect(getTotalPoints()).toBe(10);
  });

  it("완료한 퀘스트를 목록에서 삭제해도 포인트는 차감되지 않는다", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "독서하기", 10);
    await completeTask(user, "독서하기");
    expect(getTotalPoints()).toBe(10);

    await user.click(screen.getByRole("button", { name: "해결한 일 목록" }));
    await user.click(screen.getByRole("button", { name: "삭제" }));
    await user.click(screen.getByRole("button", { name: "예" }));
    await user.click(screen.getByRole("button", { name: "닫기" }));

    expect(getTotalPoints()).toBe(10);
  });

  it("보상을 등록하고 수령하면 보유 포인트가 차감된다", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "운동하기", 50);
    await completeTask(user, "운동하기");
    expect(getTotalPoints()).toBe(50);

    await user.click(screen.getByRole("button", { name: "보상 목록 추가" }));
    await user.type(
      screen.getByPlaceholderText("보상 이름을 입력하세요"),
      "커피 한잔",
    );
    await user.click(screen.getByRole("button", { name: "등록" }));
    await waitFor(() =>
      expect(
        screen.queryByPlaceholderText("보상 이름을 입력하세요"),
      ).not.toBeInTheDocument(),
    );

    await user.click(claimButton());
    await user.click(screen.getByRole("button", { name: /보상 선택/ }));
    await user.click(screen.getByText("커피 한잔"));
    await user.click(screen.getByRole("button", { name: "✓ 수령하기" }));

    await waitFor(() => expect(getTotalPoints()).toBe(0));
  });

  it("전체 초기화를 실행하면 퀘스트와 포인트가 모두 사라진다", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "청소하기", 30);
    await completeTask(user, "청소하기");
    expect(getTotalPoints()).toBe(30);

    await user.click(screen.getByRole("button", { name: "데이터 관리" }));
    await user.click(screen.getByText("전체 초기화"));
    await user.click(screen.getByRole("button", { name: "초기화" }));

    await waitFor(() =>
      expect(screen.queryByText("데이터 관리")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("퀘스트를 붙여보세요")).toBeInTheDocument();
    expect(getTotalPoints()).toBe(0);
  });

  it("백업 파일을 가져오면 기존 데이터가 대체된다", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "기존 퀘스트");

    const backupFile = new File(
      [
        JSON.stringify({
          version: 1,
          exportedAt: new Date().toISOString(),
          tasks: [
            {
              id: "backup-1",
              title: "가져온 퀘스트",
              description: "",
              dueDate: "",
              priority: "low",
              reward: 15,
              author: "",
            },
          ],
          completedTasks: [],
          rewards: [],
          spentPoints: 0,
          earnedPoints: 0,
        }),
      ],
      "backup.json",
      { type: "application/json" },
    );

    await user.click(screen.getByRole("button", { name: "데이터 관리" }));
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await user.upload(fileInput, backupFile);

    await waitFor(() =>
      expect(screen.queryByText("데이터 관리")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("가져온 퀘스트")).toBeInTheDocument();
    expect(screen.queryByText("기존 퀘스트")).not.toBeInTheDocument();
  });

  it("형식이 올바르지 않은 파일을 가져오면 오류 메시지를 보여준다", async () => {
    const user = userEvent.setup();
    render(<App />);

    const invalidFile = new File(
      [JSON.stringify({ foo: "bar" })],
      "invalid.json",
      { type: "application/json" },
    );

    await user.click(screen.getByRole("button", { name: "데이터 관리" }));
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await user.upload(fileInput, invalidFile);

    await waitFor(() =>
      expect(
        screen.getByText("백업 파일 형식이 올바르지 않습니다."),
      ).toBeInTheDocument(),
    );
  });
});
