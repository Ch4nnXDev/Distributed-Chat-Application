import {describe, it, expect, vi} from "vitest";

vi.mock("./../controllers/conversationDBController", () => ({
    default: vi.fn
}));

describe("conversationDBController", () => {
    it("should create a conversation successfully", async () => ({  
}))