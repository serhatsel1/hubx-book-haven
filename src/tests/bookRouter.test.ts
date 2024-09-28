import request from "supertest";
import express from "express";
import { bookRouter } from "../routes/bookRouter";
import { jest } from "@jest/globals";
import { AuthorBaseModel, IAuthor } from "../models/AuthorModel";
import { BookBaseModel } from "../models/BookModel";

const app = express();
app.use(express.json());
app.use("/", bookRouter);

jest.mock("../models/BookModel");
jest.mock("../models/AuthorModel");

describe("Book API uç noktaları", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET /books tüm kitapları döndürmeli", async () => {
    const mockBooks = [
      {
        _id: "65198e687ab704997683d7a1",
        title: "Kitap 1",
        author: {
          _id: "65198e687ab704997683d7a2",
          name: "Yazar 1",
          country: "Türkiye",
          birthDate: new Date("1990-01-01"),
        },
        price: 10,
        isbn: "978-1-23456789-7",
        language: "Türkçe",
        numberOfPages: 200,
        publisher: "Yayınevi A",
      },
      {
        _id: "65198e687ab704997683d7a3",
        title: "Kitap 2",
        author: {
          _id: "65198e687ab704997683d7a4",
          name: "Yazar 2",
          country: "İngiltere",
          birthDate: new Date("1985-05-10"),
        },
        price: 20,
        isbn: "978-9-87654321-0",
        language: "İngilizce",
        numberOfPages: 300,
        publisher: "Yayınevi B",
      },
    ];
    (BookBaseModel.find as unknown as jest.Mock).mockResolvedValue(mockBooks);

    const res = await request(app).get("/books");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: "65198e687ab704997683d7a1",
          title: "Kitap 1",
          author: expect.objectContaining({
            _id: "65198e687ab704997683d7a2",
            name: "Yazar 1",
          }),
        }),
        expect.objectContaining({
          _id: "65198e687ab704997683d7a3",
          title: "Kitap 2",
          author: expect.objectContaining({
            _id: "65198e687ab704997683d7a4",
            name: "Yazar 2",
          }),
        }),
      ])
    );
  });

  it("POST /books yeni bir kitap oluşturmalı", async () => {
    const newBookData = {
      title: "Yeni Kitap",
      author: {
        name: "Yazar Yeni",
        country: "Türkiye",
        birthDate: "1990-01-01",
      },
      price: 15,
      language: "Türkçe",
      numberOfPages: 250,
      publisher: "Yayınevi C",
    };
    const mockAuthor = new AuthorBaseModel({
      _id: "65198e687ab704997683d7a5",
      name: "Yazar Yeni",
      country: "Türkiye",
      birthDate: new Date("1990-01-01"),
    } as IAuthor);
    const mockBook = {
      _id: "65198e687ab704997683d7a6",
      ...newBookData,
      author: mockAuthor, // Author nesnesini ata
      isbn: "978-3-45678901-2",
    };
    (
      AuthorBaseModel.create as unknown as jest.Mock<
        typeof AuthorBaseModel.create
      >
    ).mockResolvedValue([mockAuthor]);
    (
      BookBaseModel.create as unknown as jest.Mock<typeof BookBaseModel.create>
    ).mockResolvedValue([new BookBaseModel(mockBook)]);

    const res = await request(app).post("/books").send(newBookData);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        title: "Yeni Kitap",
        author: expect.any(Object),
        price: 15,
        isbn: expect.any(String),
        language: "Türkçe",
        numberOfPages: 250,
        publisher: "Yayınevi C",
      })
    );
  });

  // Diğer test senaryoları (PUT /books/:id, DELETE /books/:id) benzer şekilde eklenebilir
});
