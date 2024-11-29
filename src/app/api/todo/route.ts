import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const data = await prisma.todo.findMany();
  return NextResponse.json({ res: data });
};

export const POST = async (req: NextRequest) => {
  try {
    const { title, description, image } = await req.json();
    await prisma.todo.create({
      data: {
        description: description,
        image: image,
        title: title,
      },
    });
    return NextResponse.json({ message: "Uspeshno Dobovlen" });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};

export const DELETE = async (id: NextRequest) => {
  const { searchParams } = new URL(id.url);
  const itemId = searchParams.get("id");
  await prisma.todo.delete({
    where: {
      id: +itemId!,
    },
  });
  return NextResponse.json({ message: "Udalen" });
};

export const PUT = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("id");
  const { title, description, image } = await req.json();

  await prisma.todo.update({
    where: {
      id: +itemId!,
    },
    data: {
      description: description,
      image: image,
      title: title,
    },
  });
  return NextResponse.json({ message: "Ozgordy" });
};
