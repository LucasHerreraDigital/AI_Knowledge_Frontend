import type { Workspace } from "../types/workspace";

export const workspaces: Workspace[] = [
  {
    id: "w1",
    name: "Proyecto Node.js",
    description: "Documentación y desarrollo de Node.js",

    documents: [
      {
        id: "d1",
        name: "manual-node.pdf",
        mimeType: "application/pdf",
        extension: ".pdf",
        filePath: "/documents/manual-node.pdf",
        size: 24300000,
        extractedText: null,
        processingStatus: "COMPLETED",
        workspaceId: "w1",
        createdAt: "2026-08-01T09:00:00.000Z",
        updatedAt: "2026-08-01T09:00:00.000Z",
      },
      {
        id: "d2",
        name: "express-guide.pdf",
        mimeType: "application/pdf",
        extension: ".pdf",
        filePath: "/documents/express-guide.pdf",
        size: 15700000,
        extractedText: null,
        processingStatus: "COMPLETED",
        workspaceId: "w1",
        createdAt: "2026-08-01T10:00:00.000Z",
        updatedAt: "2026-08-01T10:00:00.000Z",
      },
      {
        id: "d3",
        name: "nodejs-design.pdf",
        mimeType: "application/pdf",
        extension: ".pdf",
        filePath: "/documents/nodejs-design.pdf",
        size: 10100000,
        extractedText: null,
        processingStatus: "PROCESSING",
        workspaceId: "w1",
        createdAt: "2026-08-02T09:00:00.000Z",
        updatedAt: "2026-08-02T09:00:00.000Z",
      },
      {
        id: "d4",
        name: "api-rest-best-practices.pdf",
        mimeType: "application/pdf",
        extension: ".pdf",
        filePath: "/documents/api-rest-best-practices.pdf",
        size: 8400000,
        extractedText: null,
        processingStatus: "COMPLETED",
        workspaceId: "w1",
        createdAt: "2026-08-02T11:00:00.000Z",
        updatedAt: "2026-08-02T11:00:00.000Z",
      },
    ],

    chats: [
      {
        id: "c1",
        title: "Event Loop en Node.js",
        workspaceId: "w1",
        createdAt: "2026-08-02T10:00:00.000Z",
        updatedAt: "2026-08-02T10:15:00.000Z",

        messages: [
          {
            id: "m1",
            chatId: "c1",
            role: "user",
            content: "¿Qué es el Event Loop de Node.js?",
            tokens: 12,
            model: null,
            createdAt: "2026-08-02T10:10:00.000Z",
          },
          {
            id: "m2",
            chatId: "c1",
            role: "assistant",
            content:
              "El Event Loop permite que Node.js maneje operaciones asíncronas sin bloquear el hilo principal.",
            tokens: 32,
            model: "qwen2.5",
            createdAt: "2026-08-02T10:11:00.000Z",
          },
        ],
      },

      {
        id: "c2",
        title: "Streams y Buffers",
        workspaceId: "w1",
        createdAt: "2026-08-01T15:00:00.000Z",
        updatedAt: "2026-08-01T15:30:00.000Z",

        messages: [
          {
            id: "m3",
            chatId: "c2",
            role: "user",
            content: "¿Cómo funcionan los streams?",
            tokens: 10,
            model: null,
            createdAt: "2026-08-01T15:20:00.000Z",
          },
          {
            id: "m4",
            chatId: "c2",
            role: "assistant",
            content:
              "Los streams permiten procesar datos progresivamente sin cargar todo el contenido en memoria.",
            tokens: 30,
            model: "qwen2.5",
            createdAt: "2026-08-01T15:21:00.000Z",
          },
        ],
      },
    ],

    createdAt: "2026-08-01T08:00:00.000Z",
    updatedAt: "2026-08-02T10:15:00.000Z",
  },

  {
    id: "w2",
    name: "Proyecto React",
    description: "Desarrollo frontend con React y TypeScript",

    documents: [
      {
        id: "d5",
        name: "react-guide.pdf",
        mimeType: "application/pdf",
        extension: ".pdf",
        filePath: "/documents/react-guide.pdf",
        size: 18500000,
        extractedText: null,
        processingStatus: "COMPLETED",
        workspaceId: "w2",
        createdAt: "2026-08-01T09:00:00.000Z",
        updatedAt: "2026-08-01T09:00:00.000Z",
      },
      {
        id: "d6",
        name: "typescript-handbook.pdf",
        mimeType: "application/pdf",
        extension: ".pdf",
        filePath: "/documents/typescript-handbook.pdf",
        size: 22100000,
        extractedText: null,
        processingStatus: "COMPLETED",
        workspaceId: "w2",
        createdAt: "2026-08-01T11:00:00.000Z",
        updatedAt: "2026-08-01T11:00:00.000Z",
      },
      {
        id: "d7",
        name: "react-patterns.pdf",
        mimeType: "application/pdf",
        extension: ".pdf",
        filePath: "/documents/react-patterns.pdf",
        size: 9200000,
        extractedText: null,
        processingStatus: "PROCESSING",
        workspaceId: "w2",
        createdAt: "2026-08-02T09:00:00.000Z",
        updatedAt: "2026-08-02T09:00:00.000Z",
      },
    ],

    chats: [
      {
        id: "c3",
        title: "Hooks de React",
        workspaceId: "w2",
        createdAt: "2026-08-02T09:00:00.000Z",
        updatedAt: "2026-08-02T09:20:00.000Z",

        messages: [
          {
            id: "m5",
            chatId: "c3",
            role: "user",
            content: "¿Cuándo debería usar useMemo?",
            tokens: 9,
            model: null,
            createdAt: "2026-08-02T09:10:00.000Z",
          },
          {
            id: "m6",
            chatId: "c3",
            role: "assistant",
            content:
              "useMemo sirve para memorizar el resultado de un cálculo costoso entre renders.",
            tokens: 28,
            model: "qwen2.5",
            createdAt: "2026-08-02T09:11:00.000Z",
          },
        ],
      },

      {
        id: "c4",
        title: "Componentes y Props",
        workspaceId: "w2",
        createdAt: "2026-08-01T14:00:00.000Z",
        updatedAt: "2026-08-01T14:30:00.000Z",

        messages: [
          {
            id: "m7",
            chatId: "c4",
            role: "user",
            content: "¿Qué diferencia hay entre props y state?",
            tokens: 11,
            model: null,
            createdAt: "2026-08-01T14:20:00.000Z",
          },
          {
            id: "m8",
            chatId: "c4",
            role: "assistant",
            content:
              "Las props son datos recibidos por un componente mientras que el state representa datos internos que pueden cambiar.",
            tokens: 35,
            model: "qwen2.5",
            createdAt: "2026-08-01T14:21:00.000Z",
          },
        ],
      },
    ],

    createdAt: "2026-08-01T08:00:00.000Z",
    updatedAt: "2026-08-02T09:20:00.000Z",
  },

  {
    id: "w3",
    name: "Arquitectura",
    description: "Arquitectura de software y sistemas",

    documents: [
      {
        id: "d8",
        name: "software-architecture.pdf",
        mimeType: "application/pdf",
        extension: ".pdf",
        filePath: "/documents/software-architecture.pdf",
        size: 31200000,
        extractedText: null,
        processingStatus: "COMPLETED",
        workspaceId: "w3",
        createdAt: "2026-08-01T09:00:00.000Z",
        updatedAt: "2026-08-01T09:00:00.000Z",
      },
      {
        id: "d9",
        name: "clean-architecture.pdf",
        mimeType: "application/pdf",
        extension: ".pdf",
        filePath: "/documents/clean-architecture.pdf",
        size: 27800000,
        extractedText: null,
        processingStatus: "COMPLETED",
        workspaceId: "w3",
        createdAt: "2026-08-01T10:00:00.000Z",
        updatedAt: "2026-08-01T10:00:00.000Z",
      },
    ],

    chats: [
      {
        id: "c5",
        title: "Clean Architecture",
        workspaceId: "w3",
        createdAt: "2026-08-02T12:00:00.000Z",
        updatedAt: "2026-08-02T12:20:00.000Z",

        messages: [
          {
            id: "m9",
            chatId: "c5",
            role: "user",
            content: "¿Qué ventajas tiene Clean Architecture?",
            tokens: 10,
            model: null,
            createdAt: "2026-08-02T12:10:00.000Z",
          },
          {
            id: "m10",
            chatId: "c5",
            role: "assistant",
            content:
              "Clean Architecture ayuda a separar responsabilidades y reducir el acoplamiento entre las distintas partes del sistema.",
            tokens: 31,
            model: "qwen2.5",
            createdAt: "2026-08-02T12:11:00.000Z",
          },
        ],
      },
    ],

    createdAt: "2026-08-01T08:00:00.000Z",
    updatedAt: "2026-08-02T12:20:00.000Z",
  },
];